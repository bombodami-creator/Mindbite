import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// window.storage esiste solo dentro l'ambiente Claude (artifact).
// Fuori da lì (qui su Vercel) lo ricreiamo appoggiandoci a localStorage,
// con la stessa identica interfaccia, così l'app non si rompe.
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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
