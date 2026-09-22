/**
 * Backend proxy per FatSecret Platform API (OAuth 1.0a) e per l'AI (Gemini).
 *
 * Perche' OAuth 1.0a e non OAuth 2.0 per FatSecret: le credenziali OAuth 2.0
 * Client Credentials di FatSecret richiedono di inserire un indirizzo IP
 * fisso in whitelist. Cloudflare Workers non ha un IP fisso (gira su
 * migliaia di server nel mondo), quindi quel metodo non funziona qui.
 * OAuth 1.0a firma ogni richiesta con Consumer Key + Consumer Secret e non
 * richiede whitelist di IP.
 *
 * Le chiavi FatSecret da usare sono quelle mostrate su FatSecret sotto
 * "REST API OAuth 1.0 Credentials" (Consumer Key / Consumer Secret),
 * NON quelle OAuth 2.0 (Client ID / Client Secret).
 *
 * Secret da impostare su Cloudflare (Settings -> Variables and secrets):
 *   FATSECRET_CONSUMER_KEY
 *   FATSECRET_CONSUMER_SECRET
 *   GEMINI_API_KEY       (console: aistudio.google.com/apikey)
 *
 * Endpoint esposti da questo Worker:
 *   GET  /api/foods/search?q=pollo   -> lista di alimenti (nome + id)
 *   GET  /api/foods/:id              -> dettaglio con tutte le porzioni reali
 *   POST /api/claude                 -> proxy verso l'AI (Gemini), usato per
 *                                        riconoscimento foto, Consiglia,
 *                                        Assistente e traduzione nomi
 */

var FATSECRET_REST_URL = "https://platform.fatsecret.com/rest/server.api";

// Se in futuro Google ritira questo alias, sostituiscilo con l'ID modello
// attuale da https://ai.google.dev/gemini-api/docs/models (deve supportare
// testo + immagini). Se il Worker inizia a fallire con un errore tipo
// "modello non trovato" nei log, e' quasi certamente questa riga.
var GEMINI_MODEL = "gemini-3.6-flash";

function percentEncode(str) {
  return encodeURIComponent(str).replace(/[!*'()]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function generateNonce() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function hmacSha1Base64(key, message) {
  var enc = new TextEncoder();
  var cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );
  var sigBuffer = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  var bytes = new Uint8Array(sigBuffer);
  var binary = "";
  for (var i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

async function firmaRichiesta(params, consumerKey, consumerSecret) {
  var oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: generateNonce(),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0"
  };

  var allParams = {};
  var k;
  for (k in params) allParams[k] = params[k];
  for (k in oauthParams) allParams[k] = oauthParams[k];

  var sortedKeys = Object.keys(allParams).sort();
  var paramString = sortedKeys
    .map(function (key) {
      return percentEncode(key) + "=" + percentEncode(allParams[key]);
    })
    .join("&");

  var baseString =
    "GET&" + percentEncode(FATSECRET_REST_URL) + "&" + percentEncode(paramString);

  var signingKey = percentEncode(consumerSecret) + "&";
  var signature = await hmacSha1Base64(signingKey, baseString);

  allParams.oauth_signature = signature;

  var finalKeys = Object.keys(allParams).sort();
  var finalQuery = finalKeys
    .map(function (key) {
      return percentEncode(key) + "=" + percentEncode(allParams[key]);
    })
    .join("&");

  return FATSECRET_REST_URL + "?" + finalQuery;
}

async function chiamaFatSecret(env, methodParams) {
  var consumerKey = env.FATSECRET_CONSUMER_KEY;
  var consumerSecret = env.FATSECRET_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) {
    throw new Error("Consumer Key/Secret FatSecret mancanti nelle variabili del Worker");
  }

  var params = { format: "json" };
  var k;
  for (k in methodParams) params[k] = methodParams[k];

  var url = await firmaRichiesta(params, consumerKey, consumerSecret);
  var res = await fetch(url);
  var data = await res.json();

  if (data.error) {
    throw new Error("FatSecret: " + (data.error.message || JSON.stringify(data.error)));
  }
  return data;
}

async function traduciNomiInItaliano(env, nomi) {
  if (!env.GEMINI_API_KEY || nomi.length === 0) return nomi;
  try {
    var prompt =
      "Traduci in italiano ciascuno di questi nomi di alimenti, restando conciso come un nome di alimento, non una frase. " +
      "Se un nome e' gia' in italiano, o e' un nome di marchio/prodotto che non andrebbe tradotto, lascialo invariato. " +
      "Rispondi SOLO con un array JSON di stringhe, nello stesso ordine e la stessa lunghezza dell'elenco in input, " +
      "senza testo introduttivo, senza spiegazioni, senza blocchi markdown. " +
      "Input: " + JSON.stringify(nomi);

    var risposta = await chiediAllAI(env, prompt, 800);
    var testo = (risposta.content || []).map(function (b) { return b.text || ""; }).join("").trim();
    var pulito = testo.replace(/```json|```/g, "").trim();
    var tradotti = JSON.parse(pulito);

    if (Array.isArray(tradotti) && tradotti.length === nomi.length) return tradotti;
    return nomi;
  } catch (e) {
    // Se la traduzione fallisce per qualsiasi motivo, meglio mostrare i nomi
    // originali (in inglese) che bloccare la ricerca.
    return nomi;
  }
}

async function cercaAlimenti(env, query) {
  var data = await chiamaFatSecret(env, {
    method: "foods.search",
    search_expression: query,
    max_results: "20",
    region: "IT",
    language: "it",
    generic_description: "regional"
  });

  var grezzi = (data.foods && data.foods.food) || [];
  var lista = Array.isArray(grezzi) ? grezzi : [grezzi];

  var risultati = lista.map(function (f) {
    return {
      id: f.food_id,
      nome: f.food_name,
      marca: f.brand_name || null,
      descrizioneBreve: f.food_description || ""
    };
  });

  // Alimenti generici (senza marca, es. "Petto di pollo") prima dei prodotti
  // di marca specifici: di solito sono la risposta piu' utile a una ricerca semplice.
  risultati.sort(function (a, b) {
    var aGenerico = a.marca ? 1 : 0;
    var bGenerico = b.marca ? 1 : 0;
    return aGenerico - bGenerico;
  });

  // FatSecret ci restituisce i nomi in inglese anche con region/language IT
  // (la vera localizzazione e' una funzione Premier a pagamento separata, non
  // disponibile sul nostro piano). Li traduciamo al volo con l'AI, una sola
  // chiamata per l'intera lista di risultati.
  var nomiOriginali = risultati.map(function (r) { return r.nome; });
  var nomiTradotti = await traduciNomiInItaliano(env, nomiOriginali);
  risultati.forEach(function (r, i) {
    r.nome = nomiTradotti[i] || r.nome;
  });

  return risultati;
}

async function dettaglioAlimento(env, foodId) {
  var data = await chiamaFatSecret(env, {
    method: "food.get.v4",
    food_id: foodId,
    region: "IT",
    language: "it",
    generic_description: "regional"
  });

  var food = data.food || {};
  var grezze = (food.servings && food.servings.serving) || [];
  var porzioni = Array.isArray(grezze) ? grezze : [grezze];

  // Traduciamo in un colpo solo il nome dell'alimento e tutte le etichette
  // delle porzioni (es. "1 cup", "1 slice"), non solo il nome come nell'elenco
  // di ricerca: altrimenti le unita' di misura restano in inglese.
  var testiOriginali = [food.food_name].concat(porzioni.map(function (p) { return p.serving_description; }));
  var testiTradotti = await traduciNomiInItaliano(env, testiOriginali);
  var nomeTradotto = testiTradotti[0] || food.food_name;

  return {
    id: food.food_id,
    nome: nomeTradotto,
    porzioni: porzioni.map(function (p, i) {
      return {
        etichetta: testiTradotti[i + 1] || p.serving_description,
        grammi: p.metric_serving_unit === "g" ? parseFloat(p.metric_serving_amount) : null,
        kcal: parseFloat(p.calories) || 0,
        carboidratiG: parseFloat(p.carbohydrate) || 0,
        grassiG: parseFloat(p.fat) || 0,
        proteineG: parseFloat(p.protein) || 0
      };
    })
  };
}

function jsonResponse(obj, status) {
  if (!status) status = 200;
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  // Le risposte con status 204/205/304 non possono avere un body (lo vieta
  // l'HTTP): se lo status e' uno di questi, torniamo solo gli header CORS.
  if (status === 204 || status === 205 || status === 304) {
    return new Response(null, { status: status, headers: headers });
  }
  headers["Content-Type"] = "application/json";
  return new Response(JSON.stringify(obj), { status: status, headers: headers });
}

// Converte i blocchi in stile Anthropic (usati dal client, in App.jsx) nel
// formato "parts" richiesto dall'API Gemini, cosi' il client non deve
// cambiare: continua a mandare [{type:"text", text}, {type:"image", source:
// {type:"base64", media_type, data}}] esattamente come prima.
function convertiContentPerGemini(content) {
  var blocchi = Array.isArray(content) ? content : [{ type: "text", text: String(content) }];
  return blocchi.map(function (b) {
    if (b.type === "image") {
      return { inline_data: { mime_type: b.source.media_type, data: b.source.data } };
    }
    return { text: b.text };
  });
}

async function chiediAllAI(env, content, maxTokens) {
  var apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY mancante nelle variabili del Worker");
  }

  var url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    GEMINI_MODEL +
    ":generateContent?key=" +
    apiKey;

  var corpo = JSON.stringify({
    contents: [{ role: "user", parts: convertiContentPerGemini(content) }],
    generationConfig: { maxOutputTokens: maxTokens || 1000 }
  });

  // Gemini a volte risponde con un errore transitorio ("alta domanda,
  // riprova piu' tardi") nei momenti di picco: ritentiamo un paio di volte
  // con una breve attesa crescente prima di arrenderci, cosi' l'utente non
  // deve riprovare a mano per un intoppo che si risolve da solo in pochi
  // secondi.
  var tentativiMax = 3;
  var attesaMs = 800;
  var ultimoErrore = null;

  for (var tentativo = 0; tentativo < tentativiMax; tentativo++) {
    var res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: corpo
    });
    var data = await res.json();

    if (!data.error) {
      var candidato = data.candidates && data.candidates[0];
      var parti = candidato && candidato.content && candidato.content.parts;
      if (!parti) {
        var motivo = (candidato && candidato.finishReason) || (data.promptFeedback && data.promptFeedback.blockReason);
        throw new Error("Gemini: risposta senza contenuto" + (motivo ? " (" + motivo + ")" : ""));
      }
      var testo = parti.map(function (p) { return p.text || ""; }).join("");
      // Adattiamo alla forma che il client (App.jsx) e traduciNomiInItaliano
      // si aspettano: { content: [{ text: "..." }] }, la stessa struttura
      // usata prima con l'API Anthropic.
      return { content: [{ text: testo }] };
    }

    ultimoErrore = data.error.message || JSON.stringify(data.error);
    var transitorio = res.status === 503 || /overloaded|high demand|unavailable/i.test(ultimoErrore);
    if (!transitorio || tentativo === tentativiMax - 1) {
      throw new Error("Gemini: " + ultimoErrore);
    }
    await new Promise(function (risolvi) { setTimeout(risolvi, attesaMs); });
    attesaMs *= 2;
  }

  throw new Error("Gemini: " + ultimoErrore);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return jsonResponse({}, 204);
    }

    var url = new URL(request.url);

    try {
      if (url.pathname === "/api/foods/search" && request.method === "GET") {
        var q = url.searchParams.get("q");
        if (!q || q.trim().length < 2) {
          return jsonResponse({ error: "Query troppo corta" }, 400);
        }
        var risultati = await cercaAlimenti(env, q.trim());
        return jsonResponse({ risultati: risultati });
      }

      var matchDettaglio = url.pathname.match(/^\/api\/foods\/([^/]+)$/);
      if (matchDettaglio && request.method === "GET") {
        var dettaglio = await dettaglioAlimento(env, matchDettaglio[1]);
        return jsonResponse(dettaglio);
      }

      if (url.pathname === "/api/claude" && request.method === "POST") {
        var corpo = await request.json();
        if (!corpo || !corpo.content) {
          return jsonResponse({ error: "Campo content mancante" }, 400);
        }
        var rispostaAI = await chiediAllAI(env, corpo.content, corpo.maxTokens);
        return jsonResponse(rispostaAI);
      }

      return jsonResponse({ error: "Rotta non trovata" }, 404);
    } catch (err) {
      console.error("Errore Worker:", err.message, err.stack);
      return jsonResponse({ error: err.message || "Errore interno" }, 502);
    }
  }
};
