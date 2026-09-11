import React from "react";
import { createRoot } from "react-dom/client";
import App, { FIREBASE_CONFIG } from "./App.jsx";

// window.storage esiste solo dentro l'ambiente Claude (artifact).
// Fuori da lì (qui su Vercel) lo ricreiamo appoggiandoci a localStorage,
// con la stessa identica interfaccia, così l'app non si rompe.
// Se Firebase è configurato (vedi sotto), viene sovrascritto subito dopo
// con la versione vera collegata a Firestore, non appena l'utente accede.
if (typeof window !== "undefined" && !window.storage) {
  const prefixOf = (shared) => (shared ? "shared:" : "priv:");

  window.storage = {
    async get(key, shared = false) {
      const raw = localStorage.getItem(prefixOf(shared) + key);
      if (raw === null) throw new Error("Chiave non trovata: " + key);
      return { key, value: raw, shared };
    },
    async set(key, value, shared = false) {
      localStorage.setItem(prefixOf(shared) + key, value);
      return { key, value, shared };
    },
    async delete(key, shared = false) {
      localStorage.removeItem(prefixOf(shared) + key);
      return { key, deleted: true, shared };
    },
    async list(prefix = "", shared = false) {
      const full = prefixOf(shared) + prefix;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(full)) keys.push(k.slice(prefixOf(shared).length));
      }
      return { keys, prefix, shared };
    },
  };
}

// Inizializzazione vera di Firebase: SOLO questo file (mai App.jsx, che è
// condiviso con l'anteprima Claude dove il pacchetto "firebase" non esiste)
// importa il pacchetto per davvero, con import statici che Vite può
// impacchettare correttamente per la build di produzione.
// Se FIREBASE_CONFIG è null (non ancora configurato), questo blocco viene
// semplicemente saltato e l'app resta sul localStorage sopra.
async function inizializzaFirebaseSeConfigurato() {
  if (!FIREBASE_CONFIG) return;
  const [{ initializeApp }, authMod, fsMod] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
    import("firebase/firestore"),
  ]);
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = authMod.getAuth(app);
  const db = fsMod.getFirestore(app);
  window.__firebaseModules = { authMod, fsMod, app, auth, db };
}

inizializzaFirebaseSeConfigurato().finally(() => {
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
