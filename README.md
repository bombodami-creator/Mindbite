# Mindbite — pacchetto per GitHub + Vercel

## Metodo da telefono (nessun terminale necessario)

### 1. Crea il repository su GitHub
- Vai su **github.com** dal browser, accedi (o registrati, è gratis).
- Tocca **"+"** in alto → **"New repository"**.
- Dagli un nome (es. `mindbite`), lascialo pubblico o privato come preferisci, NON aggiungere README/gitignore automatici (li abbiamo già), poi **"Create repository"**.

### 2. Carica i file
Sulla pagina del repository appena creato:
- Tocca **"Add file"** → **"Upload files"**.
- Trascina/seleziona questi file dalla cartella che hai scaricato: `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `.gitignore`.
- Per la cartella `src/` (contiene `App.jsx` e `main.jsx`): la maggior parte dei browser mobili permette di trascinare l'intera cartella nell'area di upload; se il tuo non lo fa, tocca comunque **"Add file" → "Create new file"**, scrivi come nome `src/App.jsx` (GitHub crea automaticamente la sottocartella), incolla dentro il contenuto di `App.jsx`, poi ripeti per `src/main.jsx`.
- In fondo, tocca **"Commit changes"**.

### 3. Collega Vercel
- Vai su **vercel.com**, accedi (puoi farlo direttamente con il tuo account GitHub, è il modo più veloce).
- **"Add New..." → "Project"**.
- Vercel ti mostra la lista dei tuoi repository GitHub: seleziona `mindbite`.
- Vercel riconosce da solo che è un progetto Vite — non serve toccare nessuna impostazione di build.
- Tocca **"Deploy"**.

Dopo circa un minuto ottieni un indirizzo pubblico tipo `https://mindbite-xxxx.vercel.app` — aprilo dal telefono e prova "Foto del piatto": lì l'input file/fotocamera non ha il sandbox degli artifact di Claude, quindi dovrebbe funzionare normalmente.

Ogni volta che modifichi un file su GitHub (anche direttamente dal sito, con la matitina "Edit") e fai commit, Vercel ripubblica automaticamente la nuova versione in 1-2 minuti.

## Metodo da computer (se mai ne avrai uno a disposizione)

```bash
git init
git add .
git commit -m "Mindbite"
git remote add origin https://github.com/<tuo-utente>/mindbite.git
git push -u origin main
```
Poi collega il repository da vercel.com come sopra.

## Cosa funziona subito, cosa no

**Funziona subito una volta online**: navigazione tra le schermate, login/registrazione/recupero password (salvati su `localStorage` del browser al posto di `window.storage` di Claude — vedi `src/main.jsx`), calcolo kcal/macro, diario, calendario, foto/fotocamera (finalmente senza il blocco del sandbox), ricerca alimenti (locale, o vera se hai incollato l'URL del tuo Worker FatSecret in `FATSECRET_API_BASE` dentro `src/App.jsx`), frigo/dispensa con scansione, community, statistiche, andamento peso.

**Non funziona finché non colleghi un backend dedicato**: il riconoscimento foto e l'assistente AI (`fetch` verso `api.anthropic.com`) dentro Claude passano attraverso l'infrastruttura di Claude stesso senza bisogno di una chiave; qui invece vanno sostituiti con una chiamata a un tuo endpoint backend che tiene una vera chiave API Anthropic (stessa identica logica già vista per il proxy FatSecret). Se vuoi, prepariamo anche quello come prossimo passo.

## Struttura del progetto

```
mindbite-vercel/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── src/
    ├── main.jsx   (entry point + ripiego localStorage per window.storage)
    └── App.jsx    (l'app completa, identica a mindbite_app.jsx)
```
