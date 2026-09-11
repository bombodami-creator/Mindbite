import React, { useState, useMemo, useRef, useEffect } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.kn-root {
  --paper: #12151A;
  --shell-bg: var(--card);
  --card: #1B1F26;
  --card-alt: #222831;
  --input-bg: #1F242C;
  --ink: #F3F5F7;
  --ink-soft: #9AA3B2;
  --line: #2B3038;
  --accent: #2ECC8F;
  --accent-soft: #17301F;
  --btn-bg: var(--accent);
  --btn-bg-text: #0B1F16;
  --carb: #F2994A;
  --fat: #E8B23D;
  --protein: #2ECC8F;
  --clay: #E5654A;
  --btn-text: #0B1F16;
  --shadow: 0 6px 20px rgba(0,0,0,0.28);
  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-pill: 999px;
  font-family: 'Inter', sans-serif;
  color: var(--ink);
  background: var(--paper);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14px 10px;
  box-sizing: border-box;
  transition: background 0.2s, color 0.2s;
}
.kn-root.kn-light {
  --paper: #E8EEEB;
  --shell-bg: #F4F7F5;
  --card: #FFFFFF;
  --card-alt: #EDF3EF;
  --input-bg: #FFFFFF;
  --ink: #21302B;
  --ink-soft: #77847F;
  --line: #E3E9E6;
  --accent: #176B56;
  --accent-soft: #E7F2EC;
  --btn-bg: var(--accent);
  --btn-bg-text: #FFFFFF;
  --carb: #F2994A;
  --fat: #3274A6;
  --protein: #176B56;
  --clay: #E0533A;
  --btn-text: #FFFFFF;
  --shadow: 0 4px 16px rgba(30,40,60,0.08);
}
.kn-root * { box-sizing: border-box; }
.kn-shell {
  width: 100%;
  max-width: 460px;
  background: var(--shell-bg);
  border-radius: 22px;
  box-shadow: var(--shadow);
  padding: 20px 16px 18px;
  position: relative;
}
.kn-brand { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
.kn-brand-mark { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 26px; letter-spacing: -0.01em; color: var(--accent); }
.kn-brand-tag { font-size: 13px; color: var(--ink-soft); }
.kn-divider { height: 1px; background: var(--line); margin: 20px 0 24px; }

.kn-field { margin-bottom: 18px; }
.kn-label { display: block; font-size: 13px; color: var(--ink-soft); margin-bottom: 6px; }
.kn-input {
  width: 100%; font-family: 'Inter', sans-serif; font-size: 15px; padding: 12px 14px;
  border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--input-bg); color: var(--ink);
}
.kn-input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }

.kn-btn {
  width: 100%; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
  padding: 14px 16px; border-radius: var(--radius-md);
  border: none; cursor: pointer; background: var(--btn-bg); color: var(--btn-bg-text);
  box-shadow: 0 4px 14px rgba(23,107,86,0.28);
}
.kn-btn:hover { filter: brightness(1.04); }
.kn-btn:disabled { opacity: 0.4; cursor: default; box-shadow: none; }
.kn-btn-ghost { background: none; border: 1px solid var(--line); color: var(--ink); box-shadow: none; }
.kn-btn-ghost:hover { background: var(--card-alt); color: var(--ink); }
.kn-btn-row { display: flex; gap: 10px; margin-top: 8px; }

.kn-link-row { text-align: center; margin-top: 18px; font-size: 13px; color: var(--ink-soft); }
.kn-link { color: var(--accent); text-decoration: underline; cursor: pointer; background: none; border: none; font: inherit; padding: 0; }
.kn-back-link { font-size: 13px; color: var(--ink-soft); background: none; border: none; cursor: pointer; margin-bottom: 16px; text-decoration: underline; padding: 0; display: inline-block; }

.kn-steps { display: flex; gap: 14px; margin-bottom: 22px; }
.kn-step { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--line); }
.kn-step.active { color: var(--ink); font-weight: 600; }
.kn-step.done { color: var(--accent); }
.kn-step-num { width: 18px; height: 18px; border-radius: 50%; border: 1px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 11px; }

.kn-h1 { font-family: 'Inter', sans-serif; font-weight: 700; font-size: 19px; letter-spacing: -0.01em; margin: 0 0 6px; }
.kn-sub { font-size: 13px; color: var(--ink-soft); margin: 0 0 16px; line-height: 1.45; }

.kn-toggle-row { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
.kn-toggle { flex: 1; padding: 10px 14px; text-align: center; border: 1px solid var(--line); border-radius: var(--radius-pill); cursor: pointer; font-size: 13.5px; font-weight: 500; }
.kn-toggle.sel { border-color: var(--accent); background: var(--accent); color: var(--btn-text); }

.kn-choice-card { border: 1px solid var(--line); border-radius: var(--radius-md); padding: 14px 16px; margin-bottom: 10px; cursor: pointer; box-shadow: var(--shadow); }
.kn-choice-card.sel { border-color: var(--accent); background: var(--card-alt); }
.kn-choice-title { font-weight: 600; font-size: 14.5px; margin-bottom: 2px; }
.kn-choice-desc { font-size: 12.5px; color: var(--ink-soft); line-height: 1.4; }

.kn-slider-row { margin-bottom: 20px; }
.kn-slider-label { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; }
.kn-slider { width: 100%; accent-color: var(--accent); }

.kn-result-num { font-family: 'Inter', sans-serif; font-size: 64px; line-height: 1; margin: 4px 0 0; color: var(--accent); }
.kn-result-label { font-size: 13px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.05em; }
.kn-result-note { font-size: 13.5px; color: var(--ink-soft); margin-top: 8px; }

.kn-stat-row { display: flex; margin: 22px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 14px 0; }
.kn-stat { flex: 1; }
.kn-stat + .kn-stat { padding-left: 16px; margin-left: 16px; }
.kn-stat-val { font-family: 'Inter', sans-serif; font-size: 24px; letter-spacing: 0.02em; }
.kn-stat-lbl { font-size: 12px; color: var(--ink-soft); }

.kn-macro-row { margin-bottom: 14px; }
.kn-macro-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.kn-macro-name { font-size: 14px; font-weight: 600; }
.kn-macro-pct-primary { font-size: 16px; font-weight: 800; }
.kn-macro-grams-light { font-size: 12px; color: var(--ink-soft); font-weight: 400; }
.kn-macro-bar-track { height: 8px; background: var(--paper); border-radius: 4px; overflow: hidden; border: 1px solid var(--line); }
.kn-macro-bar-fill { height: 100%; }

.kn-credit { text-align: center; font-style: italic; font-size: 10.5px; color: var(--ink-soft); margin-top: 22px; }

/* Diario */
.kn-diario-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.kn-diario-date { font-size: 13px; color: var(--ink-soft); text-transform: capitalize; }
.kn-diario-links { display: flex; gap: 14px; }
.kn-diario-link { font-size: 13px; color: var(--accent); text-decoration: underline; background: none; border: none; cursor: pointer; font-family: inherit; padding: 0; }

.kn-kcal-block { margin: 14px 0 20px; }
.kn-kcal-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.kn-kcal-num { font-family: 'Inter', sans-serif; font-size: 36px; color: var(--accent); }
.kn-kcal-of { font-size: 14px; color: var(--ink-soft); }
.kn-kcal-remain { font-size: 12.5px; color: var(--ink-soft); margin-top: 6px; }
.kn-bar-track { height: 10px; background: var(--paper); border-radius: 5px; overflow: hidden; border: 1px solid var(--line); }
.kn-bar-fill { height: 100%; background: var(--accent); }
.kn-bar-fill.over { background: var(--clay); }

.kn-mini-macros { display: flex; gap: 16px; margin: 16px 0 22px; }
.kn-mini-macro { flex: 1; }
.kn-mini-macro-top { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--ink-soft); margin-bottom: 4px; }
.kn-mini-macro-track { height: 5px; background: var(--paper); border-radius: 3px; border: 1px solid var(--line); overflow: hidden; }

.kn-meal-card { border: none; border-radius: var(--radius-lg); margin-bottom: 14px; background: var(--card); box-shadow: var(--shadow); overflow: hidden; }
.kn-meal-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; }
.kn-meal-name { font-size: 14.5px; font-weight: 600; }
.kn-meal-kcal { font-size: 12.5px; color: var(--ink-soft); }
.kn-meal-add { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--line); background: none; cursor: pointer; font-size: 14px; line-height: 1; color: var(--ink-soft); }
.kn-meal-add:hover { border-color: var(--accent); color: var(--accent); }
.kn-meal-items { border-top: 1px solid var(--line); }
.kn-meal-item { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13.5px; }
.kn-meal-item + .kn-meal-item { border-top: 1px dashed var(--line); }
.kn-meal-item.has-detail { cursor: pointer; }
.kn-meal-item.has-detail:hover { background: transparent; }
.kn-meal-item-chevron { font-size: 10px; color: var(--ink-soft); margin-right: 6px; display: inline-block; width: 8px; }
.kn-meal-item-detail { padding: 4px 0 10px 14px; background: transparent; }
.kn-meal-item-detail-row { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--ink-soft); padding: 2px 0; }
.kn-meal-empty { padding: 10px 14px; font-size: 12.5px; color: var(--ink-soft); font-style: italic; border-top: 1px solid var(--line); }

.kn-entry-row { display: flex; gap: 10px; margin-top: 18px; }
.kn-entry-btn { flex: 1; border: none; border-radius: var(--radius-md); padding: 13px; text-align: center; font-size: 13.5px; font-weight: 500; cursor: pointer; background: var(--card); box-shadow: var(--shadow); }
.kn-entry-btn:hover { border-color: var(--accent); }

.kn-navbar { display: flex; align-items: flex-end; border-top: 1px solid var(--line); margin-top: 24px; padding-top: 10px; gap: 2px; }
.kn-navbar-tab { flex: 1; text-align: center; font-size: 10.5px; padding: 4px 2px 6px; color: var(--ink-soft); cursor: pointer; border-radius: var(--radius-pill); display: flex; flex-direction: column; align-items: center; gap: 2px; }
.kn-navbar-tab.active { color: var(--accent); font-weight: 600; }

/* Calendario */
.kn-cal-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
.kn-cal-nav { background: var(--card); border: none; border-radius: var(--radius-pill); width: 32px; height: 32px; cursor: pointer; font-size: 14px; color: var(--ink-soft); box-shadow: var(--shadow); }
.kn-cal-nav:hover { border-color: var(--accent); color: var(--accent); }
.kn-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-bottom: 4px; }
.kn-cal-weekday { text-align: center; font-size: 11px; color: var(--ink-soft); padding-bottom: 6px; }
.kn-day-cell { aspect-ratio: 1; border: 1px solid transparent; border-radius: var(--radius-pill); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; font-size: 13px; gap: 3px; }
.kn-day-cell.empty { cursor: default; }
.kn-day-cell.today { border-color: var(--accent); }
.kn-day-cell.sel { background: var(--accent); color: var(--btn-text); }
.kn-day-dot { width: 5px; height: 5px; border-radius: 50%; }
.kn-day-dot.ok { background: var(--accent); }
.kn-day-dot.alto { background: var(--clay); }
.kn-day-dot.basso { background: var(--fat); }

.kn-cal-legend { display: flex; gap: 14px; font-size: 11.5px; color: var(--ink-soft); margin: 6px 0 18px; }
.kn-cal-legend-item { display: flex; align-items: center; gap: 5px; }

.kn-day-detail { border: none; border-radius: var(--radius-lg); padding: 18px; box-shadow: var(--shadow); background: var(--card); }
.kn-day-detail-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.kn-day-detail-date { font-family: 'Inter', sans-serif; font-size: 20px; letter-spacing: 0.02em; }
.kn-day-detail-kcal { font-size: 14px; color: var(--ink-soft); }

/* Profilo */
.kn-profile-section { margin-bottom: 26px; }
.kn-profile-heading { font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-soft); margin-bottom: 12px; }
.kn-save-note { font-size: 12.5px; color: var(--accent); margin-top: 10px; text-align: center; }

/* Community */
.kn-code-box { display: flex; align-items: center; justify-content: space-between; border: none; border-radius: var(--radius-lg); padding: 16px 18px; margin-bottom: 8px; box-shadow: var(--shadow); background: var(--card); }
.kn-code-value { font-family: 'Inter', sans-serif; font-size: 22px; letter-spacing: 0.1em; color: var(--accent); }
.kn-code-actions { display: flex; gap: 8px; }
.kn-code-btn { background: var(--card-alt); border: none; border-radius: var(--radius-pill); padding: 7px 12px; font-size: 12px; cursor: pointer; color: var(--ink-soft); }
.kn-code-btn:hover { border-color: var(--accent); color: var(--accent); }
.kn-code-hint { font-size: 12px; color: var(--ink-soft); line-height: 1.5; margin-bottom: 4px; }
.kn-contact-card { display: flex; justify-content: space-between; align-items: center; border: none; border-radius: var(--radius-lg); padding: 14px 16px; margin-bottom: 10px; box-shadow: var(--shadow); background: var(--card); }
.kn-contact-card.disconnesso { opacity: 0.55; }
.kn-contact-name { font-weight: 600; font-size: 14px; }
.kn-contact-meta { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
.kn-contact-tag { font-size: 11px; padding: 3px 9px; border-radius: 10px; border: 1px solid var(--line); color: var(--ink-soft); }
.kn-disconnect-btn { background: none; border: 1px solid var(--clay); border-radius: var(--radius-pill); padding: 7px 12px; font-size: 12px; cursor: pointer; color: var(--clay); }
.kn-disconnect-btn:hover { border-color: var(--clay); }
.kn-empty { font-size: 13px; color: var(--ink-soft); text-align: center; padding: 20px 0; font-style: italic; }

/* Foto / ricette */
.kn-drop { border: 1.5px dashed var(--line); border-radius: var(--radius-lg); padding: 40px 20px; text-align: center; cursor: pointer; background: var(--card-alt); }
.kn-drop:hover { border-color: var(--accent); }
.kn-drop-icon { font-size: 28px; margin-bottom: 10px; }
.kn-drop-label { font-size: 14px; margin-bottom: 4px; }
.kn-drop-hint { font-size: 12px; color: var(--ink-soft); }
.kn-privacy { font-size: 11.5px; color: var(--ink-soft); text-align: center; margin-top: 14px; line-height: 1.5; }
.kn-photo-preview { width: 100%; border-radius: var(--radius-lg); border: none; margin-bottom: 16px; display: block; box-shadow: var(--shadow); }
.kn-loading { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: var(--ink-soft); padding: 30px 0; justify-content: center; }
.kn-spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--line); border-top-color: var(--accent); animation: kn-spin 0.8s linear infinite; }
@keyframes kn-spin { to { transform: rotate(360deg); } }
.kn-dish-name { font-family: 'Inter', sans-serif; font-size: 26px; letter-spacing: 0.02em; color: var(--accent); margin: 0 0 2px; }
.kn-dish-sub { font-size: 12.5px; color: var(--ink-soft); margin-bottom: 18px; }
.kn-ing-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px dashed var(--line); }
.kn-ing-name { flex: 1; font-size: 14px; }
.kn-ing-grams { width: 64px; font-size: 13.5px; padding: 8px 8px; border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--input-bg); color: var(--ink); text-align: right; }
.kn-ing-kcal { width: 60px; font-size: 12.5px; color: var(--ink-soft); text-align: right; }
.kn-ing-del { background: none; border: none; color: var(--ink-soft); cursor: pointer; font-size: 16px; line-height: 1; padding: 0 2px; }
.kn-ing-del:hover { color: var(--clay); }
.kn-total-row { display: flex; justify-content: space-between; align-items: baseline; padding: 16px 0 6px; margin-top: 4px; border-top: 1px solid var(--line); }
.kn-total-num { font-family: 'Inter', sans-serif; font-size: 30px; color: var(--accent); }
.kn-total-label { font-size: 12px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.05em; }
.kn-check-row { display: flex; align-items: center; gap: 10px; margin: 4px 0 16px; cursor: pointer; font-size: 14px; }
.kn-check-box { width: 20px; height: 20px; border: 1px solid var(--line); border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kn-check-box.on { background: var(--accent); border-color: var(--accent); color: var(--btn-text); font-size: 12px; }
.kn-error { font-size: 13px; color: var(--clay); text-align: center; margin: 12px 0; }
.kn-recipe-card { display: flex; gap: 12px; border: none; border-radius: var(--radius-md); padding: 12px; margin-bottom: 10px; box-shadow: var(--shadow); background: var(--card); }
.kn-recipe-thumb { width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover; flex-shrink: 0; background: var(--card-alt); }
.kn-recipe-info { flex: 1; min-width: 0; }
.kn-recipe-name-input { font-size: 14px; font-weight: 600; border: none; background: none; color: var(--ink); width: 100%; padding: 0; margin-bottom: 2px; font-family: inherit; }
.kn-recipe-name-input:focus { outline: none; border-bottom: 1px solid var(--accent); }
.kn-recipe-meta { font-size: 12px; color: var(--ink-soft); }
.kn-recipe-del { background: none; border: none; color: var(--ink-soft); cursor: pointer; font-size: 12px; padding: 0; align-self: flex-start; }
.kn-recipe-del:hover { color: var(--clay); }

/* Consiglio cena */
.kn-residuo-box { border: none; border-radius: var(--radius-lg); padding: 16px 18px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: baseline; box-shadow: var(--shadow); background: var(--card); }
.kn-residuo-num { font-family: 'Inter', sans-serif; font-size: 26px; color: var(--accent); }
.kn-residuo-label { font-size: 12px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.05em; }
.kn-textarea { width: 100%; font-family: 'Inter', sans-serif; font-size: 14px; padding: 12px 14px; border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--input-bg); color: var(--ink); resize: vertical; min-height: 70px; }
.kn-or-sep { text-align: center; font-size: 12px; color: var(--ink-soft); margin: 14px 0; text-transform: uppercase; letter-spacing: 0.05em; }
.kn-proposta-card { border: none; border-radius: var(--radius-lg); padding: 18px; margin-bottom: 16px; box-shadow: var(--shadow); background: var(--card); }
.kn-proposta-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
.kn-proposta-nome { font-family: 'Inter', sans-serif; font-size: 21px; letter-spacing: 0.02em; }
.kn-proposta-kcal { font-family: 'Inter', sans-serif; font-size: 21px; color: var(--accent); white-space: nowrap; }
.kn-proposta-meta { font-size: 12px; color: var(--ink-soft); margin-bottom: 12px; }
.kn-proposta-ing { font-size: 13px; color: var(--ink-soft); margin-bottom: 10px; line-height: 1.6; }
.kn-proposta-steps { font-size: 13px; margin: 0 0 14px; padding-left: 18px; line-height: 1.7; }
.kn-nota-integrazione { background: var(--card-alt); border-left: 3px solid var(--fat); border-radius: var(--radius-md); padding: 10px 12px; margin: 0 0 14px; font-size: 12.5px; line-height: 1.5; }
.kn-alert-pasto { background: var(--accent-soft); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 18px; display: flex; gap: 10px; align-items: flex-start; }
.kn-alert-pasto-icon { font-size: 18px; flex-shrink: 0; line-height: 1.3; }
.kn-alert-pasto-text { font-size: 12.5px; line-height: 1.5; color: var(--ink); }
.kn-alert-pasto-title { font-weight: 700; font-size: 13px; margin-bottom: 3px; }
.kn-proposta-btnrow { display: flex; gap: 8px; }
.kn-proposta-btn-sm { flex: 1; font-size: 12.5px; padding: 10px; border-radius: var(--radius-pill); border: 1px solid var(--line); background: var(--card); cursor: pointer; color: var(--ink); text-align: center; font-weight: 500; }
.kn-proposta-btn-sm:hover { border-color: var(--accent); }
.kn-proposta-btn-sm.principale { background: var(--accent); color: var(--btn-text); border-color: var(--accent); }

/* Community: proposte */
.kn-share-card { border: none; border-radius: var(--radius-lg); padding: 16px; margin-bottom: 12px; box-shadow: var(--shadow); background: var(--card); }
.kn-share-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.kn-share-nome { font-weight: 600; font-size: 14.5px; }
.kn-share-kcal { font-size: 13px; color: var(--ink-soft); }
.kn-adapt-box { background: var(--card-alt); border-radius: var(--radius-md); padding: 12px 14px; margin-top: 10px; font-size: 12.5px; line-height: 1.5; }
.kn-adapt-name { font-weight: 600; margin-bottom: 3px; }
.kn-validate-btn { margin-top: 8px; font-size: 12px; padding: 7px 12px; border-radius: var(--radius-pill); border: 1px solid var(--line); background: var(--card); cursor: pointer; color: var(--ink); font-weight: 500; }
.kn-validate-btn.on { background: var(--accent); color: var(--btn-text); border-color: var(--accent); }

/* Cerca alimento */
.kn-search-list { max-height: 320px; overflow-y: auto; }
.kn-search-item { display: flex; justify-content: space-between; align-items: center; padding: 13px 14px; border: none; border-radius: var(--radius-md); margin-bottom: 8px; cursor: pointer; box-shadow: var(--shadow); background: var(--card); }
.kn-search-item:hover { border-color: var(--accent); }
.kn-search-item-name { font-size: 14px; }
.kn-search-item-kcal { font-size: 12px; color: var(--ink-soft); }
.kn-weigh-box { border: none; border-radius: var(--radius-lg); padding: 18px; margin-bottom: 16px; box-shadow: var(--shadow); background: var(--card); }
.kn-weigh-name { font-family: 'Inter', sans-serif; font-size: 22px; letter-spacing: 0.02em; color: var(--accent); margin-bottom: 12px; }
.kn-weigh-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
.kn-weigh-input { width: 90px; font-size: 18px; padding: 8px 10px; border: 1px solid var(--line); border-radius: var(--radius-md); background: var(--input-bg); color: var(--ink); text-align: right; }
.kn-weigh-kcal { font-family: 'Inter', sans-serif; font-size: 26px; color: var(--ink); }
.kn-macro-mini-grid { display: flex; gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--line); }
.kn-macro-mini-cell { flex: 1; text-align: center; }
.kn-macro-mini-val { display: block; font-family: 'Inter', sans-serif; font-size: 18px; }
.kn-macro-mini-lbl { font-size: 11px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.04em; }

.kn-fridge-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
.kn-fridge-item { display: flex; align-items: center; gap: 12px; background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 12px 14px; }
.kn-fridge-icon { width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--card-alt); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.kn-fridge-name { font-size: 13.5px; font-weight: 600; }
.kn-fridge-qty { font-size: 11.5px; color: var(--ink-soft); margin-top: 1px; }
.kn-fridge-add-row { display: flex; gap: 8px; margin-bottom: 8px; }
.kn-fridge-add-row .kn-input:first-child { flex: 2; }
.kn-fridge-add-row .kn-input:last-child { flex: 1; }

/* Statistiche */
.kn-chart-card { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 20px 16px 14px; margin-bottom: 18px; display: flex; align-items: flex-end; justify-content: space-between; height: 160px; }
.kn-chart-bar-wrap { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: 8px; }
.kn-chart-bar { width: 18px; border-radius: 6px 6px 2px 2px; background: var(--accent); min-height: 4px; }
.kn-chart-bar.over { background: var(--clay); }
.kn-chart-bar-lbl { font-size: 10.5px; color: var(--ink-soft); }
.kn-donut-card { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 18px 16px; display: flex; align-items: center; gap: 18px; margin-bottom: 16px; }
.kn-donut { width: 84px; height: 84px; border-radius: 50%; flex-shrink: 0; }
.kn-donut-legend { font-size: 12.5px; line-height: 2; }
.kn-donut-dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 7px; }
.kn-success-card { background: var(--accent-soft); border-radius: var(--radius-lg); padding: 14px 16px; font-size: 13px; line-height: 1.5; }

/* Assistente AI */
.kn-ai-header { text-align: center; padding: 18px 10px 22px; }
.kn-ai-robot { font-size: 50px; }
.kn-ai-card { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 16px 18px; margin-bottom: 12px; }
.kn-ai-card-title { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
.kn-ai-card-text { font-size: 13px; color: var(--ink-soft); line-height: 1.5; }

/* Andamento peso */
.kn-weight-card { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 16px; margin-bottom: 18px; }
.kn-weight-log-row { display: flex; justify-content: space-between; align-items: center; background: var(--card); border-radius: var(--radius-md); box-shadow: var(--shadow); padding: 10px 14px; margin-bottom: 8px; font-size: 13px; }

.kn-bilancio-periodo { text-align: center; font-size: 12.5px; color: var(--ink-soft); margin-bottom: 16px; }
.kn-bilancio-grid { display: flex; gap: 12px; margin-bottom: 16px; }
.kn-bilancio-cell { flex: 1; background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 14px; text-align: center; }
.kn-bilancio-cell-lbl { font-size: 11px; color: var(--ink-soft); margin-bottom: 6px; }
.kn-bilancio-cell-val { font-family: 'Inter', sans-serif; font-weight: 800; font-size: 20px; letter-spacing: -0.02em; }
.kn-bilancio-verdict { border-radius: var(--radius-lg); padding: 14px 16px; margin-bottom: 16px; font-size: 13px; line-height: 1.5; }
.kn-bilancio-verdict.ok { background: var(--accent-soft); color: var(--ink); }
.kn-bilancio-verdict.warn { background: #FBF0E4; color: var(--ink); }
.kn-bilancio-comp-row { display: flex; justify-content: space-between; padding: 8px 0; border-top: 1px dashed var(--line); font-size: 13px; }
.kn-bilancio-comp-row:first-child { border-top: none; }

/* Dashboard progressi */
.kn-link-list { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); margin-bottom: 18px; overflow: hidden; }
.kn-link-row { display: flex; align-items: center; gap: 12px; padding: 13px 16px; cursor: pointer; border-top: 1px solid var(--line); }
.kn-link-row:first-child { border-top: none; }
.kn-link-row-icon { font-size: 18px; width: 22px; text-align: center; }
.kn-link-row-label { flex: 1; font-size: 14px; font-weight: 500; }
.kn-link-row-chevron { color: var(--ink-soft); font-size: 14px; }
.kn-promemoria-card { background: var(--accent-soft); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.5; }
.kn-dispensa-suggest-card { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 12px 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 12px; }
.kn-dispensa-suggest-info { flex: 1; min-width: 0; }
.kn-dispensa-suggest-nome { font-size: 13.5px; font-weight: 600; }
.kn-dispensa-suggest-motivo { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
.kn-dispensa-suggest-badge { font-size: 10.5px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.04em; }

.kn-result-num, .kn-stat-val, .kn-kcal-num, .kn-day-detail-date, .kn-code-value,
.kn-dish-name, .kn-total-num, .kn-residuo-num, .kn-proposta-nome, .kn-proposta-kcal,
.kn-weigh-kcal, .kn-weigh-name, .kn-brand-mark {
  font-weight: 800; letter-spacing: -0.02em;
}
.kn-macro-bar-track, .kn-bar-track, .kn-mini-macro-track { border-radius: var(--radius-pill); }
.kn-macro-bar-fill, .kn-bar-fill { border-radius: var(--radius-pill); }

/* Anello circolare kcal */
.kn-ring-wrap { position: relative; width: 128px; height: 128px; flex-shrink: 0; }
.kn-ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.kn-ring-num { font-size: 19px; font-weight: 800; letter-spacing: -0.02em; line-height: 1; }
.kn-ring-lbl { font-size: 9px; color: var(--ink-soft); margin-top: 2px; text-align: center; }

.kn-home-top { display: flex; align-items: stretch; gap: 12px; margin-bottom: 16px; }
.kn-greeting { font-size: 18px; font-weight: 700; margin-bottom: 1px; }
.kn-greeting-sub { font-size: 12px; color: var(--ink-soft); }
.kn-ring-card { flex: 1.3; background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); display: flex; align-items: center; justify-content: center; padding: 16px; }
.kn-rimaste-card { flex: 1; background: linear-gradient(145deg, var(--accent-soft), #D9ECDF); border-radius: var(--radius-lg); padding: 16px 14px; display: flex; flex-direction: column; justify-content: center; }
.kn-rimaste-lbl-top { font-size: 11px; color: var(--ink-soft); }
.kn-rimaste-num { font-size: 18px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; margin-top: 4px; }
.kn-rimaste-lbl { font-size: 10.5px; color: var(--ink-soft); margin-top: 6px; }

.kn-mini-macros-card { background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 14px 16px; margin-bottom: 16px; display: flex; gap: 14px; }
.kn-mini-macros-card .kn-mini-macro { flex: 1; }
.kn-mini-macros-card .kn-mini-macro-top { font-size: 10.5px; color: var(--ink-soft); margin-bottom: 4px; }
.kn-mini-macros-card b { display: block; font-size: 12px; margin-bottom: 6px; }
.kn-mini-macros-card .kn-mini-macro-track { height: 5px; background: var(--line); border-radius: var(--radius-pill); overflow: hidden; }

.kn-meal-icon { width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--card-alt); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }

.kn-navbar-fab { width: 50px; height: 50px; border-radius: 50%; background: var(--accent); color: var(--btn-text); display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; box-shadow: 0 6px 16px rgba(23,107,86,0.4); margin-top: -22px; border: 4px solid var(--card); }

.kn-home-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.kn-icon-btn { width: 34px; height: 34px; border-radius: 50%; background: var(--card); box-shadow: var(--shadow); border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.kn-meal-list { background: transparent; box-shadow: none; overflow: visible; margin-bottom: 18px; display: flex; flex-direction: column; gap: 10px; }
.kn-meal-row { display: flex; align-items: center; gap: 12px; padding: 12px 14px; cursor: pointer; background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); }
.kn-meal-row-name { font-size: 13.5px; font-weight: 600; }
.kn-meal-row-sub { font-size: 11px; color: var(--ink-soft); margin-top: 1px; }
.kn-meal-row-kcal { font-size: 12px; color: var(--ink-soft); font-weight: 500; white-space: nowrap; }
.kn-meal-row-expand { padding: 12px 14px; background: var(--card); border-radius: var(--radius-lg); box-shadow: var(--shadow); margin-top: -6px; }
.kn-meal-add-link { background: none; border: none; color: var(--accent); font-size: 12.5px; font-weight: 600; cursor: pointer; padding: 8px 0 0; }
`;

const ATTIVITA = [
  { id: "sedentario", nome: "Sedentario", desc: "Poco o nessun esercizio, lavoro d'ufficio o comunque non fisico.", fattore: 1.2 },
  { id: "leggero", nome: "Leggermente attivo", desc: "Esercizio leggero 1-3 giorni a settimana, o camminate regolari.", fattore: 1.375 },
  { id: "moderato", nome: "Moderatamente attivo", desc: "Esercizio moderato 3-5 giorni a settimana.", fattore: 1.55 },
  { id: "intenso", nome: "Molto attivo", desc: "Esercizio intenso 6-7 giorni a settimana.", fattore: 1.725 },
  { id: "molto_intenso", nome: "Estremamente attivo", desc: "Lavoro fisico pesante o doppi allenamenti quotidiani.", fattore: 1.9 },
];

const OBIETTIVI = [
  { id: "perdita", nome: "Perdere peso", desc: "Deficit calorico calibrato su un ritmo sostenibile." },
  { id: "mantenimento", nome: "Mantenere il peso", desc: "Introito pari al tuo consumo energetico giornaliero." },
  { id: "aumento", nome: "Aumentare la massa", desc: "Surplus calorico moderato per crescita muscolare." },
];

const GIORNI_SETTIMANA = ["L", "M", "M", "G", "V", "S", "D"];
const MESI = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

// Incolla qui l'URL del tuo Worker (vedi fatsecret-backend/README.md) per
// attivare la ricerca vera su FatSecret. Vuoto = usa solo l'elenco locale.
const FATSECRET_API_BASE = "https://mindebite.bombodami.workers.dev";

// Incolla qui l'URL del tuo backend Mindbite (vedi mindbite-backend/README.md)
// per attivare login vero e sincronizzazione dati online multi-dispositivo.
// Vuoto = i dati restano solo su questo dispositivo/sessione.
const BACKEND_API_BASE = "";

// In alternativa al backend sopra: incolla qui la configurazione del tuo
// progetto Firebase (Impostazioni progetto -> Generali -> Le tue app -> </>)
// per login vero con email reale di recupero password, e dati sincronizzati
// su Firestore multi-dispositivo. Questi valori NON sono segreti: la
// sicurezza vera la fanno le Regole di sicurezza di Firestore/Authentication.
// Se compilato, ha priorita' sul backend sopra. null = resta sul locale.
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDMZBII1qQt3SMjaneV3YHXztk_6fGNgfA",
  authDomain: "mindbite-884c0.firebaseapp.com",
  projectId: "mindbite-884c0",
  storageBucket: "mindbite-884c0.firebasestorage.app",
  messagingSenderId: "101578058269",
  appId: "1:101578058269:web:243752dc9bdf83802eb4f4",
};
// Esempio:
// const FIREBASE_CONFIG = {
//   apiKey: "AIza...",
//   authDomain: "tuo-progetto.firebaseapp.com",
//   projectId: "tuo-progetto",
//   storageBucket: "tuo-progetto.appspot.com",
//   messagingSenderId: "123456789",
//   appId: "1:123456789:web:abcdef",
// };

// Questo file (condiviso con l'anteprima Claude) non importa MAI il pacchetto
// "firebase" direttamente: se lo facesse, romperebbe l'anteprima qui dove quel
// pacchetto non esiste. L'inizializzazione vera avviene invece in main.jsx
// (che Claude non vede, esiste solo nel pacchetto Vercel), il quale espone
// l'istanza gia' pronta su window.__firebaseModules prima di montare l'app.
async function caricaFirebase() {
  if (!FIREBASE_CONFIG) throw new Error("Firebase non configurato");
  if (typeof window !== "undefined" && window.__firebaseModules) {
    return window.__firebaseModules;
  }
  throw new Error(
    "Firebase non è disponibile in questo ambiente di anteprima: funzionerà una volta che l'app sarà pubblicata online (Vercel) con il pacchetto installato."
  );
}

// Adatta Firestore alla stessa identica interfaccia di window.storage, cosi'
// tutto il resto dell'app (diario, frigo, peso, ricette...) continua a
// funzionare senza modifiche: cambia solo dove i dati finiscono davvero.
function creaStorageFirebase(fb, uid) {
  const { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } = fb.fsMod;
  function percorso(shared) {
    return shared ? collection(fb.db, "shared") : collection(fb.db, "users", uid, "data");
  }
  return {
    async get(key, shared) {
      const ref = doc(percorso(shared), key);
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("Chiave non trovata: " + key);
      return { key, value: snap.data().value, shared: !!shared };
    },
    async set(key, value, shared) {
      const ref = doc(percorso(shared), key);
      await setDoc(ref, { key, value });
      return { key, value, shared: !!shared };
    },
    async delete(key, shared) {
      const ref = doc(percorso(shared), key);
      await deleteDoc(ref);
      return { key, deleted: true, shared: !!shared };
    },
    async list(prefix, shared) {
      const col = percorso(shared);
      const qy = prefix
        ? query(col, where("key", ">=", prefix), where("key", "<", prefix + "\uf8ff"))
        : query(col);
      const snaps = await getDocs(qy);
      const keys = [];
      snaps.forEach((d) => keys.push(d.data().key));
      return { keys, prefix: prefix || "", shared: !!shared };
    },
  };
}

function tradurriErroreFirebase(e) {
  const c = e && e.code;
  const mappa = {
    "auth/wrong-password": "Email o password non corretti.",
    "auth/user-not-found": "Nessun account trovato con questa email.",
    "auth/invalid-credential": "Email o password non corretti.",
    "auth/email-already-in-use": "Esiste gia' un account con questa email.",
    "auth/weak-password": "Password troppo debole: almeno 6 caratteri.",
    "auth/invalid-email": "Email non valida.",
    "auth/too-many-requests": "Troppi tentativi: riprova tra qualche minuto.",
    "auth/network-request-failed": "Problema di connessione. Riprova.",
  };
  if (mappa[c]) return mappa[c];
  const msg = (e && e.message) || "";
  if (/cannot find|resolve module|failed to fetch dynamically|firebase\/(app|auth|firestore)/i.test(msg)) {
    return "Firebase non è disponibile in questo ambiente di anteprima: funzionerà una volta che l'app sarà pubblicata online (Vercel) con il pacchetto installato.";
  }
  return msg || "Errore imprevisto. Riprova.";
}

const G = (label, grammi) => ({ label, grammi });
const DB_ALIMENTI = [
  { nome: "Petto di pollo", kcal100: 165, carb100: 0, fat100: 3.6, protein100: 31,
    unita: [G("grammi", 1), G("porzione (150g)", 150)] },
  { nome: "Riso bianco cotto", kcal100: 130, carb100: 28.2, fat100: 0.3, protein100: 2.7,
    unita: [G("grammi", 1), G("porzione (200g)", 200)] },
  { nome: "Pasta cotta", kcal100: 158, carb100: 31, fat100: 0.9, protein100: 5.8,
    unita: [G("grammi", 1), G("porzione (80g crudi ≈ 200g cotti)", 200)] },
  { nome: "Pane comune", kcal100: 275, carb100: 50, fat100: 3.2, protein100: 9,
    unita: [G("grammi", 1), G("fetta", 30)] },
  { nome: "Uova", kcal100: 143, carb100: 0.7, fat100: 9.5, protein100: 12.6,
    unita: [G("grammi", 1), G("uovo medio", 50)] },
  { nome: "Yogurt greco magro", kcal100: 59, carb100: 3.6, fat100: 0.4, protein100: 10,
    unita: [G("grammi", 1), G("vasetto (170g)", 170)] },
  { nome: "Parmigiano reggiano", kcal100: 402, carb100: 0, fat100: 29, protein100: 33,
    unita: [G("grammi", 1), G("cucchiaio grattugiato", 10)] },
  { nome: "Olio extravergine d'oliva", kcal100: 899, carb100: 0, fat100: 100, protein100: 0,
    unita: [G("grammi", 1), G("cucchiaio", 10), G("cucchiaino", 5)] },
  { nome: "Tonno al naturale", kcal100: 116, carb100: 0, fat100: 1, protein100: 26,
    unita: [G("grammi", 1), G("scatoletta sgocciolata", 80)] },
  { nome: "Salmone", kcal100: 208, carb100: 0, fat100: 13, protein100: 20,
    unita: [G("grammi", 1), G("filetto (150g)", 150)] },
  { nome: "Manzo magro", kcal100: 187, carb100: 0, fat100: 8, protein100: 27,
    unita: [G("grammi", 1), G("porzione (150g)", 150)] },
  { nome: "Bresaola", kcal100: 151, carb100: 0.5, fat100: 2, protein100: 32,
    unita: [G("grammi", 1), G("fetta", 10)] },
  { nome: "Mozzarella", kcal100: 253, carb100: 2.2, fat100: 19, protein100: 18,
    unita: [G("grammi", 1), G("pallina (125g)", 125)] },
  { nome: "Patate lesse", kcal100: 87, carb100: 20, fat100: 0.1, protein100: 1.9,
    unita: [G("grammi", 1), G("patata media", 150)] },
  { nome: "Zucchine", kcal100: 17, carb100: 3.1, fat100: 0.2, protein100: 1.2,
    unita: [G("grammi", 1), G("zucchina media", 200)] },
  { nome: "Insalata mista", kcal100: 15, carb100: 2.9, fat100: 0.2, protein100: 1.4,
    unita: [G("grammi", 1), G("ciotola (100g)", 100)] },
  { nome: "Pomodori", kcal100: 19, carb100: 3.9, fat100: 0.2, protein100: 0.9,
    unita: [G("grammi", 1), G("pomodoro medio", 120)] },
  { nome: "Mela", kcal100: 52, carb100: 14, fat100: 0.2, protein100: 0.3,
    unita: [G("grammi", 1), G("mela media", 150)] },
  { nome: "Banana", kcal100: 89, carb100: 23, fat100: 0.3, protein100: 1.1,
    unita: [G("grammi", 1), G("banana media", 120)] },
  { nome: "Mandorle", kcal100: 579, carb100: 22, fat100: 50, protein100: 21,
    unita: [G("grammi", 1), G("manciata (30g)", 30)] },
  { nome: "Avena", kcal100: 379, carb100: 66, fat100: 7, protein100: 13,
    unita: [G("grammi", 1), G("porzione (40g)", 40)] },
  { nome: "Ceci cotti", kcal100: 164, carb100: 27, fat100: 2.6, protein100: 8.9,
    unita: [G("grammi", 1), G("porzione (150g)", 150)] },
  { nome: "Lenticchie cotte", kcal100: 116, carb100: 20, fat100: 0.4, protein100: 9,
    unita: [G("grammi", 1), G("porzione (150g)", 150)] },
  { nome: "Pane integrale", kcal100: 247, carb100: 41, fat100: 3.4, protein100: 13,
    unita: [G("grammi", 1), G("fetta", 30)] },
  { nome: "Cracker", kcal100: 428, carb100: 65, fat100: 15, protein100: 10,
    unita: [G("grammi", 1), G("cracker", 5)] },
];

const PASTI_OGGI_INIT = {
  Colazione: [{ nome: "Yogurt greco + cracker integrali", kcal: 220 }],
  Pranzo: [
    { nome: "Pasta al pomodoro (80g)", kcal: 420 },
    { nome: "Insalata mista", kcal: 60 },
  ],
  Merenda: [{ nome: "Barretta proteica", kcal: 180 }],
  Cena: [],
};

function statoGiorno(day, oggiNum) {
  if (day > oggiNum) return null;
  const r = day % 3;
  if (r === 0) return "ok";
  if (r === 1) return "alto";
  return "basso";
}

function generaCodice() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "";
  for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return "KEY-" + c;
}

function generaCodiceTemporaneo() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function ridimensionaImmagine(file, maxLato = 640, qualita = 0.7) {
  const dataUrl = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = dataUrl;
  });
  const scala = Math.min(1, maxLato / Math.max(img.width, img.height));
  const w = Math.round(img.width * scala);
  const h = Math.round(img.height * scala);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", qualita);
}

// Stima la percentuale di grasso corporeo dalla formula US Navy (misure in cm).
// E' una stima indicativa (margine dichiarato ~3-4%), non una misurazione clinica.
function stimaGrassoCorporeo(sesso, vita, collo, altezza, fianchi) {
  if (!vita || !collo || !altezza) return null;
  if (sesso === "uomo") {
    if (vita <= collo) return null;
    return 495 / (1.0324 - 0.19077 * Math.log10(vita - collo) + 0.15456 * Math.log10(altezza)) - 450;
  }
  if (!fianchi || vita + fianchi <= collo) return null;
  return 495 / (1.29579 - 0.35004 * Math.log10(vita + fianchi - collo) + 0.221 * Math.log10(altezza)) - 450;
}

function GraficoPeso({ dati, pesoObiettivo }) {
  const w = 300, h = 140, pad = 24;
  if (!dati || dati.length < 2) {
    return <div className="kn-empty">Registra almeno due pesate per vedere il grafico.</div>;
  }
  const valori = dati.map((d) => d.peso);
  const obiettivoNum = parseFloat(pesoObiettivo) || null;
  const min = Math.min(...valori, obiettivoNum || Infinity) - 1;
  const max = Math.max(...valori, obiettivoNum || -Infinity) + 1;
  const x = (i) => pad + (i * (w - pad * 2)) / (dati.length - 1);
  const y = (v) => h - pad - ((v - min) * (h - pad * 2)) / (max - min || 1);
  const punti = dati.map((d, i) => `${x(i)},${y(d.peso)}`).join(" ");
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {obiettivoNum != null && (
        <line x1={pad} x2={w - pad} y1={y(obiettivoNum)} y2={y(obiettivoNum)} stroke="var(--fat)" strokeWidth="1.5" strokeDasharray="4 4" />
      )}
      <polyline points={punti} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {dati.map((d, i) => (
        <circle key={i} cx={x(i)} cy={y(d.peso)} r="3.5" fill="var(--accent)" />
      ))}
    </svg>
  );
}

function KcalRing({ pct, kcal, target, light }) {
  const size = 88, stroke = 9, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const clampedPct = Math.min(100, Math.max(0, pct));
  const dash = (c * clampedPct) / 100;
  const trackColor = light ? "rgba(255,255,255,0.25)" : "var(--line)";
  const fillColor = light ? "#FFFFFF" : "var(--accent)";
  return (
    <div className="kn-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={fillColor} strokeWidth={stroke}
          strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="kn-ring-center">
        <div className="kn-ring-num" style={light ? { color: "#fff" } : undefined}>{kcal}</div>
        <div className="kn-ring-lbl" style={light ? { color: "rgba(255,255,255,0.8)" } : undefined}>di {target} kcal</div>
      </div>
    </div>
  );
}

const ICONE_PASTO = { Colazione: "🥐", Pranzo: "🍝", Merenda: "🍎", Cena: "🍽️" };

function pastoSuggeritoOra(ora) {
  const h = ora != null ? ora : new Date().getHours();
  if (h >= 5 && h < 11) return "Colazione";
  if (h >= 11 && h < 15) return "Pranzo";
  if (h >= 15 && h < 18) return "Merenda";
  return "Cena";
}

const NOTE_PASTO = {
  Colazione: "Punta su una fonte proteica (uova, yogurt greco, latte) insieme a carboidrati poco raffinati, e limita gli zuccheri semplici — arrivi più sazio a metà mattina.",
  Merenda: "Meglio qualcosa con proteine o fibre (frutta secca, yogurt, un frutto) che uno snack confezionato zuccherato. Tienila piccola: deve solo portarti al pasto successivo.",
};

function iconaFrigo(nome) {
  const n = nome.toLowerCase();
  if (n.includes("pollo") || n.includes("tacchino")) return "🍗";
  if (n.includes("manzo") || n.includes("carne")) return "🥩";
  if (n.includes("pesce") || n.includes("salmone") || n.includes("tonno")) return "🐟";
  if (n.includes("uov")) return "🥚";
  if (n.includes("latt") || n.includes("yogurt")) return "🥛";
  if (n.includes("formagg") || n.includes("parmigian") || n.includes("mozzarell")) return "🧀";
  if (n.includes("zucchin")) return "🥒";
  if (n.includes("pomodor")) return "🍅";
  if (n.includes("insalata") || n.includes("lattuga") || n.includes("verdur")) return "🥬";
  if (n.includes("pane")) return "🍞";
  if (n.includes("pasta") || n.includes("riso")) return "🍚";
  if (n.includes("frutta") || n.includes("mela") || n.includes("banana")) return "🍎";
  return "🥫";
}

function Navbar({ screen, setScreen, onCommunity, onFoto, onOggi }) {
  return (
    <div className="kn-navbar">
      <div className={"kn-navbar-tab" + (screen === "diario" ? " active" : "")} onClick={onOggi}>
        <div style={{ fontSize: 17 }}>🏠</div>Oggi
      </div>
      <div className={"kn-navbar-tab" + (screen === "calendario" ? " active" : "")} onClick={() => setScreen("calendario")}>
        <div style={{ fontSize: 17 }}>📅</div>Calendario
      </div>
      <div className="kn-navbar-fab" onClick={onFoto}>📷</div>
      <div className={"kn-navbar-tab" + (screen === "community" ? " active" : "")} onClick={() => { setScreen("community"); onCommunity && onCommunity(); }}>
        <div style={{ fontSize: 17 }}>👥</div>Community
      </div>
      <div className={"kn-navbar-tab" + (screen === "profilo" ? " active" : "")} onClick={() => setScreen("profilo")}>
        <div style={{ fontSize: 17 }}>⚙️</div>Altro
      </div>
    </div>
  );
}

function StepTabs({ current }) {
  const steps = [
    { id: 1, label: "Dati" },
    { id: 2, label: "Attività" },
    { id: 3, label: "Obiettivo" },
  ];
  return (
    <div className="kn-steps">
      {steps.map((s) => (
        <div key={s.id} className={"kn-step" + (s.id === current ? " active" : s.id < current ? " done" : "")}>
          <span className="kn-step-num">{s.id < current ? "✓" : s.id}</span>
          {s.label}
        </div>
      ))}
    </div>
  );
}

// Rende intercambiabili le "unità" locali (calcolate da kcal/100g) e le
// "porzioni" reali restituite dal backend FatSecret (già calcolate per intero).
function normalizzaPorzioni(alimento) {
  if (alimento.unita) {
    return alimento.unita.map((u) => ({
      etichetta: u.label,
      grammi: u.grammi,
      kcalUnit: (alimento.kcal100 * u.grammi) / 100,
      carbUnit: (alimento.carb100 * u.grammi) / 100,
      fatUnit: (alimento.fat100 * u.grammi) / 100,
      proteinUnit: (alimento.protein100 * u.grammi) / 100,
    }));
  }
  if (alimento.porzioni) {
    return alimento.porzioni.map((p) => ({
      etichetta: p.etichetta,
      grammi: p.grammi,
      kcalUnit: p.kcal,
      carbUnit: p.carboidratiG,
      fatUnit: p.grassiG,
      proteinUnit: p.proteineG,
    }));
  }
  return [];
}

function creaStorageRemoto(base, token) {
  async function richiesta(method, path, body) {
    const res = await fetch(base + path, {
      method,
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (res.status === 404) throw new Error("Chiave non trovata");
    if (!res.ok) {
      let msg = "Errore backend (" + res.status + ")";
      try { const d = await res.json(); if (d && d.error) msg = d.error; } catch (e) {}
      throw new Error(msg);
    }
    return res.json();
  }
  return {
    async get(key, shared) {
      return richiesta("GET", "/kv/" + encodeURIComponent(key) + (shared ? "?shared=1" : ""));
    },
    async set(key, value, shared) {
      return richiesta("PUT", "/kv/" + encodeURIComponent(key) + (shared ? "?shared=1" : ""), { value, shared: !!shared });
    },
    async delete(key, shared) {
      return richiesta("DELETE", "/kv/" + encodeURIComponent(key) + (shared ? "?shared=1" : ""));
    },
    async list(prefix, shared) {
      const q = "?prefix=" + encodeURIComponent(prefix || "") + (shared ? "&shared=1" : "");
      return richiesta("GET", "/kv-list" + q);
    },
  };
}

function salvaTokenLocale(token) {
  try { localStorage.setItem("mindbite_auth_token", token); } catch (e) {}
}
function leggiTokenLocale() {
  try { return localStorage.getItem("mindbite_auth_token"); } catch (e) { return null; }
}
function rimuoviTokenLocale() {
  try { localStorage.removeItem("mindbite_auth_token"); } catch (e) {}
}

export default function MindbiteApp() {
  const [screen, setScreen] = useState("login");
  const [tema, setTema] = useState("chiaro");
  const [salvato, setSalvato] = useState(false);
  const fileInputRef = useRef(null);

  // --- Account: email/password ricordati, profilo persistente ---
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountEsistente, setAccountEsistente] = useState(null); // null = ancora in caricamento (solo modalita' locale)
  const [erroreLogin, setErroreLogin] = useState(null);
  const [caricandoAccount, setCaricandoAccount] = useState(true);
  const [authToken, setAuthToken] = useState(null); // presente solo in modalita' backend online
  const [firebaseUid, setFirebaseUid] = useState(null); // presente solo in modalita' Firebase
  const [recuperaEmailInviata, setRecuperaEmailInviata] = useState(false); // modalita' Firebase: email di reset vera inviata

  useEffect(() => {
    (async () => {
      if (FIREBASE_CONFIG) {
        try {
          const fb = await caricaFirebase();
          fb.authMod.onAuthStateChanged(fb.auth, async (user) => {
            if (user) {
              setFirebaseUid(user.uid);
              setAccountEmail(user.email || "");
              window.storage = creaStorageFirebase(fb, user.uid);
              try {
                const r = await window.storage.get("account:profilo", false);
                caricaProfiloInStato(JSON.parse(r.value));
                setGiornoVisualizzato(null);
                setScreen("diario");
              } catch (e) {
                /* loggato ma profilo non ancora salvato: resta sul login finche' non registra i dati */
              }
            }
            setCaricandoAccount(false);
          });
        } catch (e) {
          setCaricandoAccount(false);
        }
        return;
      }
      if (BACKEND_API_BASE) {
        const tokenSalvato = leggiTokenLocale();
        if (tokenSalvato) {
          window.storage = creaStorageRemoto(BACKEND_API_BASE, tokenSalvato);
          try {
            const r = await window.storage.get("account:profilo", false);
            const p = JSON.parse(r.value);
            caricaProfiloInStato(p);
            setAccountEmail(p.email || "");
            setAuthToken(tokenSalvato);
            setCaricandoAccount(false);
            setScreen("diario");
            return;
          } catch (e) {
            rimuoviTokenLocale();
          }
        }
        setCaricandoAccount(false);
        return;
      }
      try {
        const r = await window.storage.get("account:profilo", false);
        const p = JSON.parse(r.value);
        setAccountEsistente(true);
        setAccountEmail(p.email || "");
      } catch (e) {
        setAccountEsistente(false);
      }
      setCaricandoAccount(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function raccogliProfiloCorrente(extra) {
    return {
      email: accountEmail,
      password: accountPassword,
      sesso, eta, peso, altezza, pesoObiettivo,
      attivita, obiettivo, ritmo, carbP, fatP,
      ...extra,
    };
  }

  async function salvaProfiloPersistente(extra) {
    try {
      await window.storage.set("account:profilo", JSON.stringify(raccogliProfiloCorrente(extra)), false);
    } catch (e) {
      /* salvataggio fallito silenziosamente nel prototipo */
    }
  }

  function caricaProfiloInStato(p) {
    setSesso(p.sesso || "uomo");
    setEta(p.eta || "");
    setPeso(p.peso || "");
    setAltezza(p.altezza || "");
    setPesoObiettivo(p.pesoObiettivo || "");
    setAttivita(p.attivita || null);
    setObiettivo(p.obiettivo || null);
    setRitmo(p.ritmo != null ? p.ritmo : 0.5);
    setCarbP(p.carbP != null ? p.carbP : 40);
    setFatP(p.fatP != null ? p.fatP : 30);
  }

  async function accedi() {
    setErroreLogin(null);
    if (!accountEmail.trim() || !accountPassword) {
      setErroreLogin("Inserisci email e password.");
      return;
    }

    if (FIREBASE_CONFIG) {
      try {
        const fb = await caricaFirebase();
        const cred = await fb.authMod.signInWithEmailAndPassword(fb.auth, accountEmail.trim(), accountPassword);
        setFirebaseUid(cred.user.uid);
        window.storage = creaStorageFirebase(fb, cred.user.uid);
        try {
          const r = await window.storage.get("account:profilo", false);
          caricaProfiloInStato(JSON.parse(r.value));
        } catch (e) {
          /* profilo non ancora salvato: restera' vuoto finche' non completa l'onboarding */
        }
        setGiornoVisualizzato(null); setScreen("diario");
      } catch (e) {
        setErroreLogin(tradurriErroreFirebase(e));
      }
      return;
    }

    if (BACKEND_API_BASE) {
      try {
        const res = await fetch(BACKEND_API_BASE + "/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: accountEmail.trim(), password: accountPassword }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErroreLogin(data.error || "Email o password non corretti.");
          return;
        }
        salvaTokenLocale(data.token);
        window.storage = creaStorageRemoto(BACKEND_API_BASE, data.token);
        setAuthToken(data.token);
        try {
          const r = await window.storage.get("account:profilo", false);
          caricaProfiloInStato(JSON.parse(r.value));
        } catch (e) {
          /* profilo non ancora salvato: restera' vuoto finche' non completa l'onboarding */
        }
        setGiornoVisualizzato(null); setScreen("diario");
      } catch (e) {
        setErroreLogin("Non sono riuscito a contattare il server. Controlla la connessione e riprova.");
      }
      return;
    }

    try {
      const r = await window.storage.get("account:profilo", false);
      const p = JSON.parse(r.value);
      if (p.email !== accountEmail.trim() || p.password !== accountPassword) {
        setErroreLogin("Email o password non corretti.");
        return;
      }
      caricaProfiloInStato(p);
      setGiornoVisualizzato(null); setScreen("diario");
    } catch (e) {
      setErroreLogin("Email o password non corretti.");
    }
  }

  async function iniziaRegistrazione() {
    setErroreLogin(null);
    if (!accountEmail.trim() || !accountPassword) {
      setErroreLogin("Inserisci email e password per registrarti.");
      return;
    }

    if (FIREBASE_CONFIG) {
      try {
        const fb = await caricaFirebase();
        const cred = await fb.authMod.createUserWithEmailAndPassword(fb.auth, accountEmail.trim(), accountPassword);
        setFirebaseUid(cred.user.uid);
        window.storage = creaStorageFirebase(fb, cred.user.uid);
        setScreen("tutorial");
      } catch (e) {
        setErroreLogin(tradurriErroreFirebase(e));
      }
      return;
    }

    if (BACKEND_API_BASE) {
      try {
        const res = await fetch(BACKEND_API_BASE + "/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: accountEmail.trim(), password: accountPassword }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErroreLogin(data.error || "Registrazione non riuscita.");
          return;
        }
        salvaTokenLocale(data.token);
        window.storage = creaStorageRemoto(BACKEND_API_BASE, data.token);
        setAuthToken(data.token);
        setScreen("tutorial");
      } catch (e) {
        setErroreLogin("Non sono riuscito a contattare il server. Controlla la connessione e riprova.");
      }
      return;
    }

    setScreen("tutorial");
  }

  function disconnettiAccount() {
    if (FIREBASE_CONFIG && firebaseUid) {
      caricaFirebase().then((fb) => fb.authMod.signOut(fb.auth)).catch(() => {});
      setFirebaseUid(null);
    }
    rimuoviTokenLocale();
    setAuthToken(null);
    setAccountEmail("");
    setAccountPassword("");
    setAccountEsistente(false);
    setGiornoVisualizzato(null);
    setScreen("login");
  }

  // --- Recupero password (codice temporaneo; con backend online e' un vero endpoint, altrimenti simulato in locale) ---
  const [recuperaEmail, setRecuperaEmail] = useState("");
  const [recuperaCodice, setRecuperaCodice] = useState(null);
  const [recuperaCodiceInserito, setRecuperaCodiceInserito] = useState("");
  const [recuperaNuovaPassword, setRecuperaNuovaPassword] = useState("");
  const [recuperaErrore, setRecuperaErrore] = useState(null);
  const [recuperaFatto, setRecuperaFatto] = useState(false);

  function resetRecupero() {
    setRecuperaEmail("");
    setRecuperaCodice(null);
    setRecuperaCodiceInserito("");
    setRecuperaNuovaPassword("");
    setRecuperaErrore(null);
    setRecuperaFatto(false);
    setRecuperaEmailInviata(false);
  }

  async function richiediCodiceRecupero() {
    setRecuperaErrore(null);

    if (FIREBASE_CONFIG) {
      try {
        const fb = await caricaFirebase();
        await fb.authMod.sendPasswordResetEmail(fb.auth, recuperaEmail.trim());
        setRecuperaEmailInviata(true);
      } catch (e) {
        setRecuperaErrore(tradurriErroreFirebase(e));
      }
      return;
    }

    if (BACKEND_API_BASE) {
      try {
        const res = await fetch(BACKEND_API_BASE + "/auth/request-reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: recuperaEmail.trim() }),
        });
        const data = await res.json();
        if (!res.ok) {
          setRecuperaErrore(data.error || "Non trovo nessun account con questa email.");
          return;
        }
        setRecuperaCodice(data.code);
      } catch (e) {
        setRecuperaErrore("Non sono riuscito a contattare il server. Riprova.");
      }
      return;
    }

    try {
      const r = await window.storage.get("account:profilo", false);
      const p = JSON.parse(r.value);
      if (p.email !== recuperaEmail.trim()) {
        setRecuperaErrore("Non trovo nessun account con questa email su questo dispositivo.");
        return;
      }
      setRecuperaCodice(generaCodiceTemporaneo());
    } catch (e) {
      setRecuperaErrore("Non trovo nessun account con questa email su questo dispositivo.");
    }
  }

  async function confermaNuovaPassword() {
    setRecuperaErrore(null);
    if (!recuperaNuovaPassword) {
      setRecuperaErrore("Inserisci una nuova password.");
      return;
    }

    if (BACKEND_API_BASE) {
      try {
        const res = await fetch(BACKEND_API_BASE + "/auth/confirm-reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: recuperaEmail.trim(), code: recuperaCodiceInserito.trim(), newPassword: recuperaNuovaPassword }),
        });
        const data = await res.json();
        if (!res.ok) {
          setRecuperaErrore(data.error || "Codice non corretto.");
          return;
        }
        setRecuperaFatto(true);
      } catch (e) {
        setRecuperaErrore("Non sono riuscito a contattare il server. Riprova.");
      }
      return;
    }

    if (recuperaCodiceInserito.trim() !== recuperaCodice) {
      setRecuperaErrore("Codice non corretto.");
      return;
    }
    try {
      const r = await window.storage.get("account:profilo", false);
      const p = JSON.parse(r.value);
      p.password = recuperaNuovaPassword;
      await window.storage.set("account:profilo", JSON.stringify(p), false);
      setRecuperaFatto(true);
    } catch (e) {
      setRecuperaErrore("Account non trovato.");
    }
  }

  const [sesso, setSesso] = useState("uomo");
  const [eta, setEta] = useState("");
  const [peso, setPeso] = useState("");
  const [altezza, setAltezza] = useState("");
  const [pesoObiettivo, setPesoObiettivo] = useState("");

  const [attivita, setAttivita] = useState(null);
  const [obiettivo, setObiettivo] = useState(null);
  const [ritmo, setRitmo] = useState(0.5);

  const [carbP, setCarbP] = useState(40);
  const [fatP, setFatP] = useState(40);
  const proteinP = Math.max(10, 100 - carbP - fatP);

  const oggi = new Date();
  const [selectedDay, setSelectedDay] = useState(oggi.getDate());
  const primoGiornoMese = new Date(oggi.getFullYear(), oggi.getMonth(), 1);
  const giorniNelMese = new Date(oggi.getFullYear(), oggi.getMonth() + 1, 0).getDate();
  const offsetIniziale = (primoGiornoMese.getDay() + 6) % 7;

  // --- Diario: pasti modificabili, salvati per data reale ---
  const [pastiOggi, setPastiOggi] = useState(() => JSON.parse(JSON.stringify(PASTI_OGGI_INIT)));
  const [pastoDestinazione, setPastoDestinazione] = useState(null);
  const [dettagliEspansi, setDettagliEspansi] = useState({});
  const [pastiEspansi, setPastiEspansi] = useState({});
  const [pastiCaricati, setPastiCaricati] = useState(false);
  const [storicoDiario, setStoricoDiario] = useState({}); // { "YYYY-MM-DD": kcalTotali }

  function chiaveGiorno(date) {
    return "diario:" + date.toISOString().slice(0, 10);
  }

  useEffect(() => {
    if (caricandoAccount) return; // aspetta che window.storage sia quello giusto (Firestore/backend/locale)
    (async () => {
      try {
        const r = await window.storage.get(chiaveGiorno(oggi), false);
        if (r) setPastiOggi(JSON.parse(r.value));
      } catch (e) {
        /* nessun dato salvato per oggi ancora: resta il vuoto di default */
      }
      setPastiCaricati(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caricandoAccount]);

  useEffect(() => {
    if (!pastiCaricati) return;
    window.storage.set(chiaveGiorno(oggi), JSON.stringify(pastiOggi), false).catch(() => {
      setToastDiario("Salvataggio non riuscito: controlla la connessione e riprova.");
      setTimeout(() => setToastDiario(""), 5000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastiOggi, pastiCaricati]);

  async function caricaStoricoDiario() {
    try {
      const lista = await window.storage.list("diario:", false);
      const chiavi = (lista && lista.keys) || [];
      const mappa = {};
      for (const k of chiavi) {
        try {
          const r = await window.storage.get(k, false);
          if (!r) continue;
          const dati = JSON.parse(r.value);
          const data = k.replace("diario:", "");
          const tot = Object.values(dati).flat().reduce((s, it) => s + (it.kcal || 0), 0);
          mappa[data] = tot;
        } catch (e) {
          /* voce corrotta, la saltiamo */
        }
      }
      setStoricoDiario(mappa);
    } catch (e) {
      setStoricoDiario({});
    }
  }

  const [giornoVisualizzato, setGiornoVisualizzato] = useState(null); // null = oggi, altrimenti Date
  const [dettaglioGiornoSel, setDettaglioGiornoSel] = useState(null); // { Colazione:[...], ... } | null
  const [caricandoDettaglioGiorno, setCaricandoDettaglioGiorno] = useState(false);

  async function apriDettaglioGiorno(d) {
    setSelectedDay(d);
    const dataObj = new Date(oggi.getFullYear(), oggi.getMonth(), d);
    if (d === oggi.getDate()) {
      setGiornoVisualizzato(null);
      setScreen("diario");
      return;
    }
    setGiornoVisualizzato(dataObj);
    setCaricandoDettaglioGiorno(true);
    setDettaglioGiornoSel(null);
    try {
      const r = await window.storage.get(chiaveGiorno(dataObj), false);
      setDettaglioGiornoSel(r ? JSON.parse(r.value) : { Colazione: [], Pranzo: [], Merenda: [], Cena: [] });
    } catch (e) {
      setDettaglioGiornoSel({ Colazione: [], Pranzo: [], Merenda: [], Cena: [] });
    }
    setCaricandoDettaglioGiorno(false);
    setScreen("diario");
  }

  function tornaAOggi() {
    setGiornoVisualizzato(null);
    setDettaglioGiornoSel(null);
  }

  useEffect(() => {
    if (screen === "calendario" || screen === "statistiche" || screen === "bilancio" || screen === "progressi") caricaStoricoDiario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  function togglePastoEspanso(nome) {
    setPastiEspansi((prev) => ({ ...prev, [nome]: !prev[nome] }));
  }

  function toggleDettaglio(pasto, idx) {
    const chiave = pasto + "-" + idx;
    setDettagliEspansi((prev) => ({ ...prev, [chiave]: !prev[chiave] }));
  }

  function rimuoviAlimento(pasto, idx) {
    setPastiOggi((prev) => ({ ...prev, [pasto]: prev[pasto].filter((_, i) => i !== idx) }));
  }
  function aggiungiAlPasto(pasto, voce) {
    setPastiOggi((prev) => ({ ...prev, [pasto]: [...prev[pasto], voce] }));
  }

  // --- Cerca alimento: elenco locale + ricerca live su FatSecret (se configurata) ---
  const [cercaQuery, setCercaQuery] = useState("");
  const [risultatiRemoti, setRisultatiRemoti] = useState(null); // null = usa elenco locale
  const [cercaCaricando, setCercaCaricando] = useState(false);
  const [cercaErrore, setCercaErrore] = useState(null);
  const [caricandoDettaglioRemoto, setCaricandoDettaglioRemoto] = useState(false);

  const [alimentoScelto, setAlimentoScelto] = useState(null); // { nome }
  const [porzioniAttive, setPorzioniAttive] = useState([]);
  const [unitaScelta, setUnitaScelta] = useState(null);
  const [quantitaScelta, setQuantitaScelta] = useState(1);

  useEffect(() => {
    if (!FATSECRET_API_BASE || cercaQuery.trim().length < 2) {
      setRisultatiRemoti(null);
      setCercaErrore(null);
      setCercaCaricando(false);
      return;
    }
    setCercaCaricando(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`${FATSECRET_API_BASE}/api/foods/search?q=${encodeURIComponent(cercaQuery.trim())}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setRisultatiRemoti(data.risultati || []);
        setCercaErrore(null);
      } catch (e) {
        setRisultatiRemoti(null);
        setCercaErrore("Ricerca online non disponibile al momento — uso l'elenco locale.");
      }
      setCercaCaricando(false);
    }, 400);
    return () => clearTimeout(handle);
  }, [cercaQuery]);

  function resetCerca() {
    setCercaQuery("");
    setRisultatiRemoti(null);
    setCercaErrore(null);
    setAlimentoScelto(null);
    setPorzioniAttive([]);
    setUnitaScelta(null);
    setQuantitaScelta(1);
  }

  function impostaPorzioni(nome, porzioni) {
    setAlimentoScelto({ nome });
    setPorzioniAttive(porzioni);
    const prima = porzioni[0] || null;
    setUnitaScelta(prima);
    setQuantitaScelta(prima && prima.etichetta === "grammi" ? 100 : 1);
  }

  function selezionaAlimentoLocale(a) {
    impostaPorzioni(a.nome, normalizzaPorzioni(a));
  }

  async function selezionaAlimentoRemoto(risultato) {
    setCaricandoDettaglioRemoto(true);
    setCercaErrore(null);
    try {
      const res = await fetch(`${FATSECRET_API_BASE}/api/foods/${encodeURIComponent(risultato.id)}`);
      if (!res.ok) throw new Error();
      const dettaglio = await res.json();
      const porz = normalizzaPorzioni(dettaglio);
      if (porz.length === 0) throw new Error();
      impostaPorzioni(dettaglio.nome || risultato.nome, porz);
    } catch (e) {
      setCercaErrore("Non sono riuscito a caricare il dettaglio di questo alimento. Riprova o scegline un altro.");
    }
    setCaricandoDettaglioRemoto(false);
  }

  function grammiCorrenti() {
    if (!unitaScelta) return 0;
    return quantitaScelta * (unitaScelta.grammi || 0);
  }
  function macroCorrenti() {
    if (!unitaScelta) return { kcal: 0, carb: 0, fat: 0, protein: 0 };
    return {
      kcal: Math.round(unitaScelta.kcalUnit * quantitaScelta),
      carb: Math.round(unitaScelta.carbUnit * quantitaScelta * 10) / 10,
      fat: Math.round(unitaScelta.fatUnit * quantitaScelta * 10) / 10,
      protein: Math.round(unitaScelta.proteinUnit * quantitaScelta * 10) / 10,
    };
  }
  function aggiungiDaElenco() {
    if (!alimentoScelto || !unitaScelta || !pastoDestinazione) return;
    const m = macroCorrenti();
    const g = grammiCorrenti();
    let quantitaLabel;
    if (unitaScelta.etichetta === "grammi") {
      quantitaLabel = `${quantitaScelta}g`;
    } else if (quantitaScelta === 1) {
      quantitaLabel = unitaScelta.etichetta;
    } else {
      quantitaLabel = `${quantitaScelta}× ${unitaScelta.etichetta}`;
    }
    const conGrammi = unitaScelta.etichetta !== "grammi" && unitaScelta.grammi != null ? ` · ${g}g` : "";
    aggiungiAlPasto(pastoDestinazione, {
      nome: `${alimentoScelto.nome} (${quantitaLabel}${conGrammi})`,
      kcal: m.kcal,
      carboidratiG: m.carb,
      grassiG: m.fat,
      proteineG: m.protein,
    });
    setToastDiario("Alimento aggiunto.");
    resetCerca();
    setPastoDestinazione(null);
    setGiornoVisualizzato(null); setScreen("diario");
    setTimeout(() => setToastDiario(""), 3000);
  }

  // --- Community ---
  const [codice, setCodice] = useState("KEY-7F2QX9");
  const [contatti, setContatti] = useState([
    { id: 1, nome: "Marco Bombonato", connessoIl: "12 ago 2026", stato: "connesso", kcalResiduiStimati: 1450 },
  ]);
  const [toastCommunity, setToastCommunity] = useState("");
  const [proposteMie, setProposteMie] = useState([]);
  const [caricandoProposte, setCaricandoProposte] = useState(false);
  const [convalidate, setConvalidate] = useState({}); // { [propostaId+contattoId]: true }

  function rigeneraCodice() {
    setCodice(generaCodice());
  }
  function disconnetti(id) {
    const contatto = contatti.find((c) => c.id === id);
    setContatti((prev) => prev.map((c) => (c.id === id ? { ...c, stato: "disconnesso" } : c)));
    setCodice(generaCodice());
    if (contatto) {
      setToastCommunity(`Disconnesso da ${contatto.nome}. Potrà riconnettersi solo condividendogli il nuovo codice.`);
      setTimeout(() => setToastCommunity(""), 4500);
    }
  }

  // --- Foto / ricette ---
  const [fotoSubScreen, setFotoSubScreen] = useState("cattura"); // cattura | analisi | conferma
  const [fotoDataUrl, setFotoDataUrl] = useState(null);
  const [nomePiatto, setNomePiatto] = useState("");
  const [ingredienti, setIngredienti] = useState([]);
  const [macroOriginali, setMacroOriginali] = useState(null);
  const [erroreFoto, setErroreFoto] = useState(null);
  const [salvaRicetta, setSalvaRicetta] = useState(false);
  const [nomeRicetta, setNomeRicetta] = useState("");
  const [toastDiario, setToastDiario] = useState("");
  const [ricette, setRicette] = useState([]);
  const [caricandoRicette, setCaricandoRicette] = useState(false);

  function resetFoto() {
    setFotoDataUrl(null);
    setNomePiatto("");
    setIngredienti([]);
    setMacroOriginali(null);
    setErroreFoto(null);
    setSalvaRicetta(false);
    setNomeRicetta("");
    setFotoSubScreen("cattura");
  }

  async function gestisciFile(file) {
    if (!file) return;
    setErroreFoto(null);
    try {
      const dataUrl = await ridimensionaImmagine(file);
      setFotoDataUrl(dataUrl);
      await analizza(dataUrl);
    } catch (e) {
      setErroreFoto("Non sono riuscito a leggere la foto. Riprova.");
    }
  }

  async function analizza(dataUrl) {
    setFotoSubScreen("analisi");
    try {
      const base64 = dataUrl.split(",")[1];
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64 } },
                {
                  type: "text",
                  text:
                    "Sei un nutrizionista. Analizza la foto del piatto e stima ingredienti, grammi e valori nutrizionali. " +
                    "Rispondi SOLO con un oggetto JSON valido, senza testo introduttivo, senza spiegazioni, senza blocchi markdown. " +
                    "Formato esatto: {\"nomePiatto\": string, \"ingredienti\": [{\"nome\": string, \"grammi\": number, \"kcal\": number}], " +
                    "\"kcalTotali\": number, \"carboidratiG\": number, \"grassiG\": number, \"proteineG\": number}",
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      const testo = (data.content || []).map((b) => b.text || "").join("").trim();
      const pulito = testo.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(pulito);

      const ing = (parsed.ingredienti || []).map((i) => ({
        nome: i.nome,
        grammi: i.grammi,
        kcal: i.kcal,
        kcalPerGrammo: i.grammi > 0 ? i.kcal / i.grammi : 0,
      }));

      setNomePiatto(parsed.nomePiatto || "Piatto non identificato");
      setNomeRicetta(parsed.nomePiatto || "");
      setIngredienti(ing);
      setMacroOriginali({
        kcalTotali: parsed.kcalTotali || ing.reduce((s, i) => s + i.kcal, 0),
        carboidratiG: parsed.carboidratiG || 0,
        grassiG: parsed.grassiG || 0,
        proteineG: parsed.proteineG || 0,
      });
      setFotoSubScreen("conferma");
    } catch (e) {
      console.error(e);
      setErroreFoto("Il riconoscimento non è riuscito. Puoi riprovare o inserire i dati a mano.");
      setNomePiatto("");
      setIngredienti([]);
      setFotoSubScreen("conferma");
    }
  }

  function aggiornaGrammi(idx, nuoviGrammi) {
    setIngredienti((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, grammi: nuoviGrammi, kcal: Math.round(ing.kcalPerGrammo * nuoviGrammi) } : ing))
    );
  }
  function aggiungiIngredienteVuoto() {
    setIngredienti((prev) => [...prev, { nome: "Nuovo ingrediente", grammi: 100, kcal: 0, kcalPerGrammo: 0 }]);
  }
  function rimuoviIngrediente(idx) {
    setIngredienti((prev) => prev.filter((_, i) => i !== idx));
  }

  const kcalTotaliCorrenti = ingredienti.reduce((s, i) => s + (i.kcal || 0), 0);
  const rapportoKcal = macroOriginali && macroOriginali.kcalTotali > 0 ? kcalTotaliCorrenti / macroOriginali.kcalTotali : 1;

  async function registraPasto() {
    if (salvaRicetta) {
      const id = "recipe_" + Date.now();
      const record = {
        id,
        nome: nomeRicetta || nomePiatto || "Ricetta senza nome",
        creataIl: new Date().toISOString(),
        kcalTotali: kcalTotaliCorrenti,
        carboidratiG: macroOriginali ? Math.round(macroOriginali.carboidratiG * rapportoKcal) : 0,
        grassiG: macroOriginali ? Math.round(macroOriginali.grassiG * rapportoKcal) : 0,
        proteineG: macroOriginali ? Math.round(macroOriginali.proteineG * rapportoKcal) : 0,
        ingredienti: ingredienti.map(({ nome, grammi, kcal }) => ({ nome, grammi, kcal })),
        foto: fotoDataUrl,
      };
      try {
        await window.storage.set("recipe:" + id, JSON.stringify(record), false);
        setToastDiario("Pasto registrato e ricetta salvata.");
      } catch (e) {
        setToastDiario("Pasto registrato. Il salvataggio della ricetta non è riuscito.");
      }
    } else {
      setToastDiario("Pasto registrato. La foto è stata scartata.");
    }
    if (pastoDestinazione) {
      aggiungiAlPasto(pastoDestinazione, {
        nome: nomePiatto || "Alimento",
        kcal: kcalTotaliCorrenti,
        carboidratiG: macroOriginali ? Math.round(macroOriginali.carboidratiG * rapportoKcal) : null,
        grassiG: macroOriginali ? Math.round(macroOriginali.grassiG * rapportoKcal) : null,
        proteineG: macroOriginali ? Math.round(macroOriginali.proteineG * rapportoKcal) : null,
        ingredienti: ingredienti.map(({ nome, grammi, kcal }) => ({ nome, grammi, kcal })),
      });
    }
    setPastoDestinazione(null);
    resetFoto();
    setGiornoVisualizzato(null); setScreen("diario");
    setTimeout(() => setToastDiario(""), 4000);
  }

  // --- Andamento peso e misure corporee ---
  const [pesoStorico, setPesoStorico] = useState([]);
  const [caricandoPeso, setCaricandoPeso] = useState(false);
  const [nuovoPesoValore, setNuovoPesoValore] = useState("");
  const [mostraMisure, setMostraMisure] = useState(false);
  const [nuovaVita, setNuovaVita] = useState("");
  const [nuovoCollo, setNuovoCollo] = useState("");
  const [nuoviFianchi, setNuoviFianchi] = useState("");
  const [nuovoBraccio, setNuovoBraccio] = useState("");
  const [nuovaCoscia, setNuovaCoscia] = useState("");
  const [mostraBilancia, setMostraBilancia] = useState(false);
  const [nuovaMassaGrassaPct, setNuovaMassaGrassaPct] = useState("");
  const [nuovaMassaMuscolareKg, setNuovaMassaMuscolareKg] = useState("");
  const [nuovaMassaOsseaKg, setNuovaMassaOsseaKg] = useState("");

  async function apriPesoStorico() {
    setCaricandoPeso(true);
    try {
      const r = await window.storage.get("peso:storico", false);
      setPesoStorico(r ? JSON.parse(r.value) : []);
    } catch (e) {
      setPesoStorico([]);
    }
    setCaricandoPeso(false);
  }

  async function registraPeso() {
    const valore = parseFloat(nuovoPesoValore);
    if (!valore || valore <= 0) return;
    const voce = {
      data: new Date().toISOString().slice(0, 10),
      peso: valore,
      vita: nuovaVita ? parseFloat(nuovaVita) : null,
      collo: nuovoCollo ? parseFloat(nuovoCollo) : null,
      fianchi: nuoviFianchi ? parseFloat(nuoviFianchi) : null,
      braccio: nuovoBraccio ? parseFloat(nuovoBraccio) : null,
      coscia: nuovaCoscia ? parseFloat(nuovaCoscia) : null,
      massaGrassaPct: nuovaMassaGrassaPct ? parseFloat(nuovaMassaGrassaPct) : null,
      massaMuscolareKg: nuovaMassaMuscolareKg ? parseFloat(nuovaMassaMuscolareKg) : null,
      massaOsseaKg: nuovaMassaOsseaKg ? parseFloat(nuovaMassaOsseaKg) : null,
    };
    const aggiornato = [...pesoStorico.filter((v) => v.data !== voce.data), voce].sort((a, b) => a.data.localeCompare(b.data));
    setPesoStorico(aggiornato);
    try {
      await window.storage.set("peso:storico", JSON.stringify(aggiornato), false);
    } catch (e) {}
    setNuovoPesoValore("");
    setNuovaVita(""); setNuovoCollo(""); setNuoviFianchi(""); setNuovoBraccio(""); setNuovaCoscia("");
    setNuovaMassaGrassaPct(""); setNuovaMassaMuscolareKg(""); setNuovaMassaOsseaKg("");
    setMostraMisure(false);
    setMostraBilancia(false);
    setPeso(String(valore));
    await salvaProfiloPersistente({ peso: String(valore) });
  }

  async function rimuoviPesoVoce(data) {
    const aggiornato = pesoStorico.filter((v) => v.data !== data);
    setPesoStorico(aggiornato);
    try {
      await window.storage.set("peso:storico", JSON.stringify(aggiornato), false);
    } catch (e) {}
  }

  // Confronta calo di peso teorico (dal deficit calorico reale registrato) con quello
  // misurato tra le ultime due pesate, sui giorni realmente trascorsi tra le due (non una settimana fissa).
  function calcolaBilancio() {
    if (pesoStorico.length < 2) return null;
    const ordinati = [...pesoStorico].sort((a, b) => a.data.localeCompare(b.data));
    const p1 = ordinati[ordinati.length - 2];
    const p2 = ordinati[ordinati.length - 1];
    const giorni = Math.max(1, Math.round((new Date(p2.data) - new Date(p1.data)) / 86400000));
    const target = (calc && calc.target) || 2100;
    const oggiChiave = oggi.toISOString().slice(0, 10);

    let sommaDeficit = 0;
    let giorniConDati = 0;
    const d1 = new Date(p1.data + "T00:00:00");
    for (let i = 1; i <= giorni; i++) {
      const d = new Date(d1);
      d.setDate(d1.getDate() + i);
      const chiave = d.toISOString().slice(0, 10);
      let kcalGiorno = null;
      if (chiave === oggiChiave) kcalGiorno = Object.values(pastiOggi).flat().reduce((s, it) => s + it.kcal, 0);
      else if (storicoDiario[chiave] != null) kcalGiorno = storicoDiario[chiave];
      if (kcalGiorno != null) {
        sommaDeficit += target - kcalGiorno;
        giorniConDati++;
      }
    }

    const deficitMedioGiornaliero = giorniConDati > 0 ? sommaDeficit / giorniConDati : null;
    const caloAtteso = deficitMedioGiornaliero != null ? (deficitMedioGiornaliero * giorni) / 7700 : null;
    const caloReale = p1.peso - p2.peso;

    let composizione = null;
    const altezzaNum = parseFloat(altezza);
    // Se ci sono dati diretti della bilancia (massa grassa %), sono piu' precisi della stima
    // da circonferenze: li usiamo in priorita', e ricorriamo alla formula solo se mancano.
    const fat1 = p1.massaGrassaPct != null ? p1.massaGrassaPct : stimaGrassoCorporeo(sesso, p1.vita, p1.collo, altezzaNum, p1.fianchi);
    const fat2 = p2.massaGrassaPct != null ? p2.massaGrassaPct : stimaGrassoCorporeo(sesso, p2.vita, p2.collo, altezzaNum, p2.fianchi);
    const fontiDirette = p1.massaGrassaPct != null && p2.massaGrassaPct != null;
    if (fat1 != null && fat2 != null) {
      const massaGrassa1 = (p1.peso * fat1) / 100;
      const massaGrassa2 = (p2.peso * fat2) / 100;
      const massaMagra1 = p1.peso - massaGrassa1;
      const massaMagra2 = p2.peso - massaGrassa2;
      composizione = {
        grassoPct2: fat2,
        deltaGrasso: massaGrassa2 - massaGrassa1,
        deltaMagra: massaMagra2 - massaMagra1,
        fonteDiretta: fontiDirette,
        deltaMuscolo: p1.massaMuscolareKg != null && p2.massaMuscolareKg != null ? p2.massaMuscolareKg - p1.massaMuscolareKg : null,
      };
    }

    return {
      dataInizio: p1.data,
      dataFine: p2.data,
      giorni,
      giorniConDati,
      copertura: giorniConDati / giorni,
      caloAtteso,
      caloReale,
      composizione,
    };
  }

  // --- Frigo/Dispensa: inventario persistente ---
  const [frigoItems, setFrigoItems] = useState([]);
  const [caricandoFrigo, setCaricandoFrigo] = useState(false);
  const [nuovoFrigoNome, setNuovoFrigoNome] = useState("");
  const [nuovoFrigoQta, setNuovoFrigoQta] = useState("");
  const [categoriaAttiva, setCategoriaAttiva] = useState("frigo"); // "frigo" | "dispensa"

  const [scansioneSub, setScansioneSub] = useState("idle"); // idle | analisi | conferma
  const [fotoScansioneDataUrl, setFotoScansioneDataUrl] = useState(null);
  const [risultatiScansione, setRisultatiScansione] = useState([]);
  const [erroreScansione, setErroreScansione] = useState(null);
  const scansioneRef = useRef(null);

  async function apriFrigo() {
    setCaricandoFrigo(true);
    try {
      const r = await window.storage.get("frigo:items", false);
      setFrigoItems(r ? JSON.parse(r.value) : []);
    } catch (e) {
      setFrigoItems([]);
    }
    setCaricandoFrigo(false);
  }

  async function salvaFrigo(lista) {
    setFrigoItems(lista);
    try {
      await window.storage.set("frigo:items", JSON.stringify(lista), false);
    } catch (e) {
      /* salvataggio fallito silenziosamente nel prototipo */
    }
  }

  function aggiungiAlFrigo() {
    if (!nuovoFrigoNome.trim()) return;
    const nuovo = { id: "f_" + Date.now(), nome: nuovoFrigoNome.trim(), quantita: nuovoFrigoQta.trim() || "1", categoria: categoriaAttiva };
    salvaFrigo([...frigoItems, nuovo]);
    setNuovoFrigoNome("");
    setNuovoFrigoQta("");
  }

  function rimuoviDalFrigo(id) {
    salvaFrigo(frigoItems.filter((it) => it.id !== id));
  }

  function descrizioneDalFrigo() {
    return frigoItems.map((it) => `${it.nome} (${it.quantita})`).join(", ");
  }

  function resetScansione() {
    setScansioneSub("idle");
    setFotoScansioneDataUrl(null);
    setRisultatiScansione([]);
    setErroreScansione(null);
  }

  async function gestisciFotoScansione(file) {
    if (!file) return;
    setErroreScansione(null);
    try {
      const dataUrl = await ridimensionaImmagine(file);
      setFotoScansioneDataUrl(dataUrl);
      await analizzaScansione(dataUrl);
    } catch (e) {
      setErroreScansione("Non sono riuscito a leggere la foto. Riprova.");
    }
  }

  async function analizzaScansione(dataUrl) {
    setScansioneSub("analisi");
    try {
      const base64 = dataUrl.split(",")[1];
      const luogo = categoriaAttiva === "frigo" ? "frigorifero" : "dispensa";
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64 } },
                {
                  type: "text",
                  text:
                    `Questa è una foto dentro un ${luogo}. Elenca gli alimenti che riesci a riconoscere con una stima della quantità. ` +
                    "Rispondi SOLO con un array JSON valido, senza testo introduttivo, senza blocchi markdown. " +
                    'Formato esatto: [{"nome": string, "quantita": string}]. Se non riconosci nulla con certezza, rispondi con un array vuoto [].',
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      const testo = (data.content || []).map((b) => b.text || "").join("").trim();
      const pulito = testo.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(pulito);
      const lista = Array.isArray(parsed) ? parsed : [];
      setRisultatiScansione(lista.map((it, i) => ({ id: "s_" + i, nome: it.nome, quantita: it.quantita || "", selezionato: true })));
      setScansioneSub("conferma");
    } catch (e) {
      console.error(e);
      setErroreScansione("Non sono riuscito ad analizzare la foto. Riprova o aggiungi gli ingredienti a mano.");
      setScansioneSub("idle");
    }
  }

  function toggleSelezioneScansione(id) {
    setRisultatiScansione((prev) => prev.map((it) => (it.id === id ? { ...it, selezionato: !it.selezionato } : it)));
  }

  function confermaScansione() {
    const nuovi = risultatiScansione
      .filter((it) => it.selezionato)
      .map((it) => ({ id: "f_" + Date.now() + "_" + it.id, nome: it.nome, quantita: it.quantita || "1", categoria: categoriaAttiva }));
    salvaFrigo([...frigoItems, ...nuovi]);
    resetScansione();
  }

  // --- Consiglio pasto (frigo o menu esterno) ---
  const [consiglioSub, setConsiglioSub] = useState("input"); // input | analisi | proposte
  const [consiglioModo, setConsiglioModo] = useState("frigo"); // "frigo" | "menu"
  const [pastoConsiglio, setPastoConsiglio] = useState("Cena"); // "Pranzo" | "Cena"
  const [descrizioneFrigo, setDescrizioneFrigo] = useState("");
  const [fotoFrigoDataUrl, setFotoFrigoDataUrl] = useState(null);
  const [fotoMenuDataUrl, setFotoMenuDataUrl] = useState(null);
  const [vuoiDolce, setVuoiDolce] = useState(false);
  const [proposteCena, setProposteCena] = useState([]);
  const [erroreConsiglio, setErroreConsiglio] = useState(null);
  const fileFrigoRef = useRef(null);
  const fileMenuRef = useRef(null);

  function resetConsiglio() {
    setConsiglioSub("input");
    setConsiglioModo("frigo");
    setDescrizioneFrigo("");
    setFotoFrigoDataUrl(null);
    setFotoMenuDataUrl(null);
    setVuoiDolce(false);
    setProposteCena([]);
    setErroreConsiglio(null);
  }

  function kcalConsumatiOggi() {
    return Object.values(pastiOggi).flat().reduce((s, i) => s + i.kcal, 0);
  }

  // Cena: usa il residuo reale (ultimo pasto, ha senso "raccogliere" quello che manca).
  // Pranzo: usa una quota bilanciata sulla giornata, non il residuo letterale
  // (a meta' giornata il residuo sarebbe quasi tutto il budget e non direbbe nulla di utile).
  const [riduzioneRecuperoAttiva, setRiduzioneRecuperoAttiva] = useState(false);

  // Se ieri (un giorno gia' chiuso) ha superato l'obiettivo di una soglia significativa,
  // propone 1-2 giorni con un obiettivo leggermente ridotto per bilanciare — mai sotto la
  // soglia di sicurezza. Sempre facoltativo: e' solo un suggerimento, mai un blocco.
  function calcolaRecupero() {
    const target = (calc && calc.target) || 2100;
    const ieri = new Date(oggi);
    ieri.setDate(oggi.getDate() - 1);
    const chiaveIeri = ieri.toISOString().slice(0, 10);
    const kcalIeri = storicoDiario[chiaveIeri];
    if (kcalIeri == null) return null;
    const sogliaAlto = target * 1.08;
    if (kcalIeri <= sogliaAlto) return null;

    const eccesso = kcalIeri - target;
    const giorniConsigliati = eccesso > target * 0.15 ? 2 : 1;
    const riduzioneIdeale = Math.round(eccesso / giorniConsigliati);
    const minSicurezza = sesso === "uomo" ? 1500 : 1200;
    const targetRidotto = Math.max(minSicurezza, target - riduzioneIdeale);
    const riduzioneEffettiva = target - targetRidotto;

    return { dataEccesso: chiaveIeri, kcalIeri, eccesso, giorniConsigliati, riduzioneEffettiva, targetRidotto };
  }

  function calcolaBudgetPasto(pasto) {
    const targetBase = (calc && calc.target) || 2100;
    const recupero = riduzioneRecuperoAttiva ? calcolaRecupero() : null;
    const target = recupero ? recupero.targetRidotto : targetBase;
    if (pasto === "Cena") {
      const consumato = kcalConsumatiOggi();
      return {
        kcal: Math.max(0, target - consumato),
        carb: calc ? Math.max(0, Math.round(calc.carbG * 0.45)) : 60,
        fat: calc ? Math.max(0, Math.round(calc.fatG * 0.6)) : 25,
        protein: calc ? Math.max(0, Math.round(calc.proteinG * 0.55)) : 40,
        base: recupero ? "recupero" : "residuo",
      };
    }
    const quota = 0.35; // quota indicativa di un pranzo bilanciato sul totale giornaliero
    return {
      kcal: calc ? Math.round(target * quota) : 700,
      carb: calc ? Math.round(calc.carbG * quota) : 70,
      fat: calc ? Math.round(calc.fatG * quota) : 25,
      protein: calc ? Math.round(calc.proteinG * quota) : 35,
      base: recupero ? "recupero" : "bilanciato",
    };
  }

  async function gestisciFotoFrigo(file) {
    if (!file) return;
    try {
      const dataUrl = await ridimensionaImmagine(file);
      setFotoFrigoDataUrl(dataUrl);
    } catch (e) {
      setErroreConsiglio("Non sono riuscito a leggere la foto. Riprova.");
    }
  }

  async function gestisciFotoMenu(file) {
    if (!file) return;
    setErroreConsiglio(null);
    try {
      const dataUrl = await ridimensionaImmagine(file);
      setFotoMenuDataUrl(dataUrl);
      await chiediConsiglio(dataUrl);
    } catch (e) {
      setErroreConsiglio("Non sono riuscito a leggere la foto. Riprova.");
    }
  }

  async function chiediConsiglio(fotoMenuAppenaScattata) {
    setErroreConsiglio(null);
    setConsiglioSub("analisi");
    const budget = calcolaBudgetPasto(pastoConsiglio);
    const kcalResidue = budget.kcal;
    const carbResiduo = budget.carb;
    const fatResiduo = budget.fat;
    const proteinResiduo = budget.protein;
    const nomePasto = pastoConsiglio === "Pranzo" ? "il pranzo" : "la cena";
    const frasePastoBudget =
      budget.base === "residuo"
        ? `Per ${nomePasto} di oggi l'utente ha a disposizione circa ${kcalResidue} kcal, ${carbResiduo}g di carboidrati, ${fatResiduo}g di grassi e ${proteinResiduo}g di proteine residui rispetto all'obiettivo giornaliero.`
        : `Per ${nomePasto}, in un piano alimentare bilanciato sull'intera giornata, la porzione indicata e' di circa ${kcalResidue} kcal, ${carbResiduo}g di carboidrati, ${fatResiduo}g di grassi e ${proteinResiduo}g di proteine — indipendentemente da quanto gia' mangiato oggi.`;

    const content = [];
    let testoPrompt;

    if (consiglioModo === "menu") {
      const fotoDaUsare = fotoMenuAppenaScattata || fotoMenuDataUrl;
      if (!fotoDaUsare) {
        setErroreConsiglio("Manca la foto del menù.");
        setConsiglioSub("input");
        return;
      }
      content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: fotoDaUsare.split(",")[1] } });
      testoPrompt =
        `Questa è la foto del menù di un ristorante o di una mensa. ${frasePastoBudget} ` +
        "Leggi i piatti disponibili nel menù e scegli le 2 opzioni migliori per restare in linea con questo budget, anche stimando di dover chiedere una porzione più piccola se necessario. " +
        "Rispondi SOLO con un array JSON valido, senza testo introduttivo, senza spiegazioni, senza blocchi markdown. Formato esatto: " +
        '[{"nome": string, "kcalTotali": number, "carboidratiG": number, "grassiG": number, "proteineG": number, "motivo": string, "consiglioPorzione": string}]';
    } else {
      const fraseCompletamento =
        pastoConsiglio === "Cena"
          ? "La cena deve concludere in modo corretto e bilanciato l'alimentazione della giornata. Se gli ingredienti disponibili indicati non bastano per raggiungere in modo equilibrato le kcal e i macro di questo budget (es. mancano abbastanza proteine, o il pasto risulterebbe troppo scarso), NON forzare una ricetta incompleta: dillo chiaramente e consiglia cosa aggiungere o comprare (un alimento specifico e una quantità indicativa) per completare correttamente la cena, oppure suggerisci un'alternativa più sensata. "
          : "Se gli ingredienti disponibili indicati non bastano per un pranzo equilibrato secondo questo budget, dillo chiaramente e consiglia cosa aggiungere o comprare (un alimento specifico e una quantità indicativa) per completarlo, oppure suggerisci un'alternativa più sensata. ";
      testoPrompt =
        `Sei un nutrizionista pratico. ${frasePastoBudget} ` +
        fraseCompletamento +
        (vuoiDolce
          ? "Se rientra in questo budget, includi un dolce semplice in almeno una delle proposte, altrimenti ometti il dolce e spiegalo nel nome della ricetta con una parentesi. "
          : "Non includere dolci. ") +
        "Proponi 2 opzioni veloci da preparare (max 20-25 minuti), usando principalmente gli ingredienti disponibili indicati. " +
        "Rispondi SOLO con un array JSON valido, senza testo introduttivo, senza spiegazioni, senza blocchi markdown. Formato esatto: " +
        '[{"nome": string, "tempoMinuti": number, "dolceIncluso": boolean, "ingredienti": [{"nome": string, "grammi": number, "kcal": number}], "kcalTotali": number, "carboidratiG": number, "grassiG": number, "proteineG": number, "passaggi": [string], "notaIntegrazione": string}]' +
        ' Nel campo "notaIntegrazione" scrivi il consiglio su cosa aggiungere/comprare se serve, altrimenti lascialo come stringa vuota "".' +
        (descrizioneFrigo ? `\n\nIngredienti disponibili: ${descrizioneFrigo}` : "");
      if (fotoFrigoDataUrl) {
        content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: fotoFrigoDataUrl.split(",")[1] } });
      }
    }
    content.push({ type: "text", text: testoPrompt });

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1200,
          messages: [{ role: "user", content }],
        }),
      });
      const data = await response.json();
      const testo = (data.content || []).map((b) => b.text || "").join("").trim();
      const pulito = testo.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(pulito);
      const lista = (Array.isArray(parsed) ? parsed : []).map((p) => ({ ...p, modo: consiglioModo }));
      setProposteCena(lista);
      // La foto del menu ha esaurito il suo scopo: la scartiamo subito, non serve piu' e non va salvata.
      if (consiglioModo === "menu") setFotoMenuDataUrl(null);
      setConsiglioSub("proposte");
    } catch (e) {
      console.error(e);
      setErroreConsiglio("Non sono riuscito a generare proposte. Riprova, magari con una descrizione più semplice.");
      setConsiglioSub("input");
    }
  }

  function registraProposta(p) {
    aggiungiAlPasto(pastoConsiglio, {
      nome: p.nome,
      kcal: p.kcalTotali,
      carboidratiG: p.carboidratiG != null ? p.carboidratiG : null,
      grassiG: p.grassiG != null ? p.grassiG : null,
      proteineG: p.proteineG != null ? p.proteineG : null,
      ingredienti: p.ingredienti || [],
    });
    setToastDiario(`${pastoConsiglio} registrato/a dalla proposta.`);
    setGiornoVisualizzato(null); setScreen("diario");
    resetConsiglio();
    setRiduzioneRecuperoAttiva(false);
    setTimeout(() => setToastDiario(""), 4000);
  }

  async function condividiProposta(p) {
    const id = "proposta_" + Date.now();
    const record = {
      id,
      nome: p.nome,
      kcalTotali: p.kcalTotali,
      tempoMinuti: p.tempoMinuti,
      dolceIncluso: p.dolceIncluso,
      ingredienti: p.ingredienti,
      condivisaIl: new Date().toISOString(),
    };
    try {
      await window.storage.set("proposta:" + id, JSON.stringify(record), true);
      setToastDiario("Proposta condivisa con la community.");
    } catch (e) {
      setToastDiario("Condivisione non riuscita, riprova dalla Community.");
    }
    setTimeout(() => setToastDiario(""), 4000);
  }

  async function apriProposte() {
    setCaricandoProposte(true);
    try {
      const lista = await window.storage.list("proposta:", true);
      const chiavi = (lista && lista.keys) || [];
      const record = [];
      for (const k of chiavi) {
        try {
          const r = await window.storage.get(k, true);
          if (r) record.push(JSON.parse(r.value));
        } catch (e) {}
      }
      record.sort((a, b) => new Date(b.condivisaIl) - new Date(a.condivisaIl));
      setProposteMie(record);
    } catch (e) {
      setProposteMie([]);
    }
    setCaricandoProposte(false);
  }

  function toggleConvalida(propostaId, contattoId) {
    const chiave = propostaId + "_" + contattoId;
    setConvalidate((prev) => ({ ...prev, [chiave]: !prev[chiave] }));
  }

  async function apriRicette() {
    setCaricandoRicette(true);
    try {
      const lista = await window.storage.list("recipe:", false);
      const chiavi = (lista && lista.keys) || [];
      const record = [];
      for (const k of chiavi) {
        try {
          const r = await window.storage.get(k, false);
          if (r) record.push(JSON.parse(r.value));
        } catch (e) {}
      }
      record.sort((a, b) => new Date(b.creataIl) - new Date(a.creataIl));
      setRicette(record);
    } catch (e) {
      setRicette([]);
    }
    setCaricandoRicette(false);
  }
  async function rinominaRicetta(id, nuovoNome) {
    setRicette((prev) => prev.map((r) => (r.id === id ? { ...r, nome: nuovoNome } : r)));
    const target = ricette.find((r) => r.id === id);
    if (!target) return;
    try {
      await window.storage.set("recipe:" + id, JSON.stringify({ ...target, nome: nuovoNome }), false);
    } catch (e) {}
  }
  async function eliminaRicetta(id) {
    setRicette((prev) => prev.filter((r) => r.id !== id));
    try {
      await window.storage.delete("recipe:" + id, false);
    } catch (e) {}
  }

  const calc = useMemo(() => {
    const p = parseFloat(peso) || 0;
    const h = parseFloat(altezza) || 0;
    const a = parseFloat(eta) || 0;
    if (!p || !h || !a || !attivita) return null;

    const bmr = sesso === "uomo" ? 10 * p + 6.25 * h - 5 * a + 5 : 10 * p + 6.25 * h - 5 * a - 161;
    const fattore = ATTIVITA.find((x) => x.id === attivita).fattore;
    const tdee = bmr * fattore;

    const deltaGiornaliero = (ritmo * 7700) / 7;
    let target = tdee;
    if (obiettivo === "perdita") target = tdee - deltaGiornaliero;
    if (obiettivo === "aumento") target = tdee + deltaGiornaliero;

    const minSicurezza = sesso === "uomo" ? 1500 : 1200;
    const targetSicuro = Math.max(target, minSicurezza);

    const carbG = (targetSicuro * (carbP / 100)) / 4;
    const fatG = (targetSicuro * (fatP / 100)) / 9;
    const proteinG = (targetSicuro * (proteinP / 100)) / 4;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      target: Math.round(targetSicuro),
      sottoMinimo: target < minSicurezza,
      carbG: Math.round(carbG),
      fatG: Math.round(fatG),
      proteinG: Math.round(proteinG),
    };
  }, [peso, altezza, eta, sesso, attivita, obiettivo, ritmo, carbP, fatP, proteinP]);

  // --- Statistiche ---
  const datiSettimana = useMemo(() => {
    const target = (calc && calc.target) || 2100;
    const consumatoOggi = Object.values(pastiOggi).flat().reduce((s, it) => s + it.kcal, 0);
    const giorni = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(oggi);
      d.setDate(oggi.getDate() - i);
      const chiave = d.toISOString().slice(0, 10);
      const kcal = i === 0 ? consumatoOggi : (storicoDiario[chiave] || 0);
      const haDato = i === 0 ? consumatoOggi > 0 : storicoDiario[chiave] != null;
      giorni.push({ label: GIORNI_SETTIMANA[(d.getDay() + 6) % 7], kcal, haDato, oltre: haDato && kcal > target });
    }
    return giorni;
  }, [calc, oggi, storicoDiario, pastiOggi]);

  const giorniConDati = datiSettimana.filter((g) => g.haDato);
  const giorniInLinea = giorniConDati.filter((g) => !g.oltre).length;

  // --- Assistente AI ---
  const [assistenteOsservazioni, setAssistenteOsservazioni] = useState([]);
  const [caricandoAssistente, setCaricandoAssistente] = useState(false);
  const [erroreAssistente, setErroreAssistente] = useState(null);

  async function generaOsservazioniAI() {
    setCaricandoAssistente(true);
    setErroreAssistente(null);
    const target = (calc && calc.target) || 2100;
    const giorniLoggati = datiSettimana.filter((g) => g.haDato);
    if (giorniLoggati.length === 0) {
      setAssistenteOsservazioni([
        { titolo: "Ancora nessun dato", testo: "Non hai registrazioni negli ultimi giorni: inizia a segnare i pasti nel diario e torna qui per ricevere osservazioni vere sulla tua settimana." },
      ]);
      setCaricandoAssistente(false);
      return;
    }
    const riepilogo = giorniLoggati
      .map((g) => `${g.label}: ${g.kcal} kcal (obiettivo ${target})`)
      .join(", ");
    const prompt =
      `Sei un assistente nutrizionale sintetico e concreto. Ecco le kcal registrate nei giorni disponibili (non necessariamente consecutivi) di un utente ` +
      `con obiettivo ${target} kcal/giorno e ripartizione macro circa 40% carboidrati, 30% grassi, 30% proteine: ${riepilogo}. ` +
      "Scrivi ESATTAMENTE 2 osservazioni brevi e utili (una positiva o di incoraggiamento, una un consiglio pratico su cosa migliorare), " +
      "in italiano, tono diretto e amichevole, senza inventare dati che non hai. " +
      "Rispondi SOLO con un array JSON valido, senza testo introduttivo, senza blocchi markdown. " +
      'Formato esatto: [{"titolo": string, "testo": string}]';
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 500,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const testo = (data.content || []).map((b) => b.text || "").join("").trim();
      const pulito = testo.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(pulito);
      setAssistenteOsservazioni(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error(e);
      setErroreAssistente("Non sono riuscito a generare le osservazioni. Riprova tra poco.");
    }
    setCaricandoAssistente(false);
  }

  // --- Consigli dispensa: prodotti da tenere sempre pronti ---
  const [consigliDispensa, setConsigliDispensa] = useState([]);
  const [caricandoConsigliDispensa, setCaricandoConsigliDispensa] = useState(false);
  const [erroreConsigliDispensa, setErroreConsigliDispensa] = useState(null);
  const [dispensaAggiunti, setDispensaAggiunti] = useState({}); // { "nome-prodotto": true }

  async function generaConsigliDispensa() {
    setCaricandoConsigliDispensa(true);
    setErroreConsigliDispensa(null);
    setDispensaAggiunti({});
    const giaPresenti = frigoItems.map((it) => it.nome).join(", ") || "nessuno";
    const prompt =
      "Sei un nutrizionista pratico. Suggerisci ESATTAMENTE 5 prodotti da tenere sempre pronti in frigo o in dispensa, " +
      `adatti a un utente con obiettivo "${obiettivo || "mantenimento"}" e una ripartizione macro di circa ${carbP}% carboidrati, ${fatP}% grassi, ${proteinP}% proteine. ` +
      `Questi prodotti sono gia' presenti e vanno evitati nei suggerimenti: ${giaPresenti}. ` +
      "Scegli alimenti base, non piatti pronti, pensati per essere versatili e usabili in piu' ricette. " +
      "Rispondi SOLO con un array JSON valido, senza testo introduttivo, senza spiegazioni, senza blocchi markdown. Formato esatto: " +
      '[{"nome": string, "categoria": "frigo" o "dispensa", "motivo": string}]';
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 600,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const testo = (data.content || []).map((b) => b.text || "").join("").trim();
      const pulito = testo.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(pulito);
      setConsigliDispensa(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error(e);
      setErroreConsigliDispensa("Non sono riuscito a generare i consigli. Riprova tra poco.");
    }
    setCaricandoConsigliDispensa(false);
  }

  function aggiungiConsiglioAlFrigo(item) {
    const categoria = item.categoria === "dispensa" ? "dispensa" : "frigo";
    const nuovo = { id: "f_" + Date.now(), nome: item.nome, quantita: "1", categoria };
    salvaFrigo([...frigoItems, nuovo]);
    setDispensaAggiunti((prev) => ({ ...prev, [item.nome]: true }));
  }

  const segna = (setter) => (v) => {
    setter(v);
    setSalvato(false);
  };

  return (
    <div className={"kn-root" + (tema === "chiaro" ? " kn-light" : "")}>
      <style>{STYLE}</style>
      <div className="kn-shell">

        {screen === "login" && (
          <>
            <div className="kn-brand">
              <span className="kn-brand-mark">Mindbite</span>
              <span className="kn-brand-tag">il tuo diario alimentare</span>
            </div>
            <div className="kn-divider" />
            {caricandoAccount ? (
              <div className="kn-loading"><span className="kn-spinner" /> Un attimo…</div>
            ) : (
              <>
                <div className="kn-field">
                  <label className="kn-label">Email</label>
                  <input className="kn-input" type="email" placeholder="nome@esempio.it" value={accountEmail} onChange={(e) => { setAccountEmail(e.target.value); setErroreLogin(null); }} />
                </div>
                <div className="kn-field">
                  <label className="kn-label">Password</label>
                  <input className="kn-input" type="password" placeholder="••••••••" value={accountPassword} onChange={(e) => { setAccountPassword(e.target.value); setErroreLogin(null); }} />
                </div>
                {erroreLogin && <p className="kn-error" style={{ marginTop: 0 }}>{erroreLogin}</p>}
                <button className="kn-btn" onClick={accedi}>Accedi</button>

                <div className="kn-divider" />

                <button className="kn-btn kn-btn-ghost" onClick={() => { setErroreLogin(null); setScreen("registrati"); }}>Registrati</button>
                <div className="kn-link-row">
                  <button className="kn-link" onClick={() => { resetRecupero(); setScreen("recupera-password"); }}>Password dimenticata?</button>
                </div>
              </>
            )}
          </>
        )}

        {screen === "registrati" && (
          <>
            <button className="kn-back-link" onClick={() => setScreen("login")}>‹ torna al login</button>
            <h1 className="kn-h1">Crea il tuo account</h1>
            <p className="kn-sub">Email e password restano su questo dispositivo — usale per accedere di nuovo senza rifare l'onboarding.</p>
            <div className="kn-field">
              <label className="kn-label">Email</label>
              <input className="kn-input" type="email" placeholder="nome@esempio.it" value={accountEmail} onChange={(e) => { setAccountEmail(e.target.value); setErroreLogin(null); }} />
            </div>
            <div className="kn-field">
              <label className="kn-label">Password</label>
              <input className="kn-input" type="password" placeholder="••••••••" value={accountPassword} onChange={(e) => { setAccountPassword(e.target.value); setErroreLogin(null); }} />
            </div>
            {erroreLogin && <p className="kn-error" style={{ marginTop: 0 }}>{erroreLogin}</p>}
            {accountEsistente && (
              <p className="kn-error" style={{ marginTop: 0 }}>Attenzione: su questo dispositivo esiste già un account salvato — continuando lo sostituirai.</p>
            )}
            <button className="kn-btn" onClick={iniziaRegistrazione}>Continua</button>
          </>
        )}

        {screen === "recupera-password" && (
          <>
            <button className="kn-back-link" onClick={() => { resetRecupero(); setScreen("login"); }}>‹ torna al login</button>
            <h1 className="kn-h1">Recupera password</h1>

            {FIREBASE_CONFIG ? (
              <>
                {!recuperaEmailInviata ? (
                  <>
                    <p className="kn-sub">Inserisci l'email del tuo account: ti mandiamo un link vero per reimpostare la password.</p>
                    <div className="kn-field">
                      <label className="kn-label">Email</label>
                      <input className="kn-input" type="email" placeholder="nome@esempio.it" value={recuperaEmail} onChange={(e) => { setRecuperaEmail(e.target.value); setRecuperaErrore(null); }} />
                    </div>
                    {recuperaErrore && <p className="kn-error" style={{ marginTop: 0 }}>{recuperaErrore}</p>}
                    <button className="kn-btn" onClick={richiediCodiceRecupero} disabled={!recuperaEmail.trim()}>Invia email di reset</button>
                  </>
                ) : (
                  <>
                    <p className="kn-sub">Controlla la tua casella email: ti abbiamo mandato un link per scegliere una nuova password.</p>
                    <button className="kn-btn" onClick={() => { resetRecupero(); setScreen("login"); }}>Torna al login</button>
                  </>
                )}
              </>
            ) : (
              <>
                {!recuperaFatto && recuperaCodice === null && (
                  <>
                    <p className="kn-sub">Inserisci l'email del tuo account: ti generiamo un codice temporaneo per reimpostare la password.</p>
                    <div className="kn-field">
                      <label className="kn-label">Email</label>
                      <input className="kn-input" type="email" placeholder="nome@esempio.it" value={recuperaEmail} onChange={(e) => { setRecuperaEmail(e.target.value); setRecuperaErrore(null); }} />
                    </div>
                    {recuperaErrore && <p className="kn-error" style={{ marginTop: 0 }}>{recuperaErrore}</p>}
                    <button className="kn-btn" onClick={richiediCodiceRecupero} disabled={!recuperaEmail.trim()}>Invia codice</button>
                  </>
                )}

                {!recuperaFatto && recuperaCodice !== null && (
                  <>
                    <div className="kn-success-card" style={{ marginBottom: 18 }}>
                      Prototipo senza invio email vero: in un'app reale questo codice arriverebbe alla tua casella di posta. Per ora te lo mostriamo qui — <b>{recuperaCodice}</b>.
                    </div>
                    <div className="kn-field">
                      <label className="kn-label">Codice ricevuto</label>
                      <input className="kn-input" type="text" placeholder="es. 123456" value={recuperaCodiceInserito} onChange={(e) => { setRecuperaCodiceInserito(e.target.value); setRecuperaErrore(null); }} />
                    </div>
                    <div className="kn-field">
                      <label className="kn-label">Nuova password</label>
                      <input className="kn-input" type="password" placeholder="••••••••" value={recuperaNuovaPassword} onChange={(e) => { setRecuperaNuovaPassword(e.target.value); setRecuperaErrore(null); }} />
                    </div>
                    {recuperaErrore && <p className="kn-error" style={{ marginTop: 0 }}>{recuperaErrore}</p>}
                    <button className="kn-btn" onClick={confermaNuovaPassword}>Reimposta password</button>
                  </>
                )}

                {recuperaFatto && (
                  <>
                    <p className="kn-sub">Password aggiornata. Puoi accedere di nuovo con quella nuova.</p>
                    <button className="kn-btn" onClick={() => { resetRecupero(); setAccountEmail(recuperaEmail); setAccountPassword(""); setScreen("login"); }}>Torna al login</button>
                  </>
                )}
              </>
            )}
          </>
        )}

        {screen === "tutorial" && (
          <>
            <h1 className="kn-h1">Benvenuto su Mindbite</h1>
            <p className="kn-sub">Prima di iniziare, ecco cosa puoi fare — due minuti e sei operativo.</p>

            <div className="kn-ai-card">
              <div className="kn-ai-card-title">📓 Diario</div>
              <div className="kn-ai-card-text">Ogni pasto che registri aggiorna subito l'anello delle kcal e i macro rimasti per la giornata.</div>
            </div>
            <div className="kn-ai-card">
              <div className="kn-ai-card-title">📷 Foto o ricerca</div>
              <div className="kn-ai-card-text">Scatta una foto del piatto per un riconoscimento automatico, oppure cerca l'alimento da un elenco e indica tu il peso.</div>
            </div>
            <div className="kn-ai-card">
              <div className="kn-ai-card-title">🧊 Frigo e Consiglia</div>
              <div className="kn-ai-card-text">Tieni aggiornato cosa hai in casa (anche scansionando una foto), poi chiedi "Cosa cucino stasera?" per proposte su misura per le kcal che ti restano.</div>
            </div>
            <div className="kn-ai-card">
              <div className="kn-ai-card-title">👥 Community</div>
              <div className="kn-ai-card-text">Condividi il tuo codice con chi vuoi che segua i tuoi progressi, e scambia proposte di cena.</div>
            </div>
            <div className="kn-ai-card">
              <div className="kn-ai-card-title">📊 Statistiche e assistente</div>
              <div className="kn-ai-card-text">Guarda l'andamento della settimana e ricevi osservazioni pratiche generate su misura per te.</div>
            </div>

            <button className="kn-btn" style={{ marginTop: 8 }} onClick={() => setScreen("step1")}>Inizia</button>
          </>
        )}

        {screen === "step1" && (
          <>
            <StepTabs current={1} />
            <h1 className="kn-h1">I tuoi dati</h1>
            <p className="kn-sub">Servono per calcolare il tuo fabbisogno calorico con la formula di Mifflin-St Jeor.</p>
            <div className="kn-field">
              <label className="kn-label">Sesso</label>
              <div className="kn-toggle-row">
                <div className={"kn-toggle" + (sesso === "uomo" ? " sel" : "")} onClick={() => setSesso("uomo")}>Uomo</div>
                <div className={"kn-toggle" + (sesso === "donna" ? " sel" : "")} onClick={() => setSesso("donna")}>Donna</div>
              </div>
            </div>
            <div className="kn-field">
              <label className="kn-label">Età (anni)</label>
              <input className="kn-input" type="number" value={eta} onChange={(e) => setEta(e.target.value)} placeholder="es. 34" />
            </div>
            <div className="kn-field">
              <label className="kn-label">Peso attuale (kg)</label>
              <input className="kn-input" type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="es. 100" />
            </div>
            <div className="kn-field">
              <label className="kn-label">Altezza (cm)</label>
              <input className="kn-input" type="number" value={altezza} onChange={(e) => setAltezza(e.target.value)} placeholder="es. 178" />
            </div>
            <div className="kn-field">
              <label className="kn-label">Peso obiettivo — facoltativo (kg)</label>
              <input className="kn-input" type="number" value={pesoObiettivo} onChange={(e) => setPesoObiettivo(e.target.value)} placeholder="es. 80" />
            </div>
            <button className="kn-btn" onClick={() => setScreen("step2")} disabled={!eta || !peso || !altezza}>Continua</button>
          </>
        )}

        {screen === "step2" && (
          <>
            <StepTabs current={2} />
            <h1 className="kn-h1">Quanto ti muovi</h1>
            <p className="kn-sub">Scegli il livello che descrive la tua settimana tipo, non quella ideale.</p>
            {ATTIVITA.map((a) => (
              <div key={a.id} className={"kn-choice-card" + (attivita === a.id ? " sel" : "")} onClick={() => setAttivita(a.id)}>
                <div className="kn-choice-title">{a.nome}</div>
                <div className="kn-choice-desc">{a.desc}</div>
              </div>
            ))}
            <div className="kn-btn-row">
              <button className="kn-btn kn-btn-ghost" onClick={() => setScreen("step1")}>Indietro</button>
              <button className="kn-btn" onClick={() => setScreen("step3")} disabled={!attivita}>Continua</button>
            </div>
          </>
        )}

        {screen === "step3" && (
          <>
            <StepTabs current={3} />
            <h1 className="kn-h1">Il tuo obiettivo</h1>
            <p className="kn-sub">Regola il ritmo settimanale: più è graduale, più è facile mantenerlo nel tempo.</p>
            {OBIETTIVI.map((o) => (
              <div key={o.id} className={"kn-choice-card" + (obiettivo === o.id ? " sel" : "")} onClick={() => setObiettivo(o.id)}>
                <div className="kn-choice-title">{o.nome}</div>
                <div className="kn-choice-desc">{o.desc}</div>
              </div>
            ))}
            {(obiettivo === "perdita" || obiettivo === "aumento") && (
              <div className="kn-slider-row" style={{ marginTop: 16 }}>
                <div className="kn-slider-label"><span>Ritmo settimanale</span><span>{ritmo.toFixed(2)} kg</span></div>
                <input className="kn-slider" type="range" min="0.25" max="1" step="0.05" value={ritmo} onChange={(e) => setRitmo(parseFloat(e.target.value))} />
              </div>
            )}
            <div className="kn-btn-row">
              <button className="kn-btn kn-btn-ghost" onClick={() => setScreen("step2")}>Indietro</button>
              <button className="kn-btn" onClick={() => setScreen("result")} disabled={!obiettivo}>Calcola</button>
            </div>
          </>
        )}

        {screen === "result" && calc && (
          <>
            <p className="kn-result-label">Il tuo fabbisogno giornaliero</p>
            <p className="kn-result-num">{calc.target}</p>
            <p className="kn-result-label">kcal al giorno</p>
            {obiettivo === "perdita" && <p className="kn-result-note">Per perdere circa {ritmo.toFixed(2)} kg a settimana</p>}
            {obiettivo === "aumento" && <p className="kn-result-note">Per aumentare circa {ritmo.toFixed(2)} kg a settimana</p>}
            {calc.sottoMinimo && (
              <p className="kn-result-note" style={{ color: "var(--clay)" }}>
                Il deficit richiesto scenderebbe sotto la soglia di sicurezza: il valore è stato limitato.
              </p>
            )}
            <div className="kn-stat-row">
              <div className="kn-stat"><div className="kn-stat-val">{calc.bmr}</div><div className="kn-stat-lbl">metabolismo basale</div></div>
              <div className="kn-stat"><div className="kn-stat-val">{calc.tdee}</div><div className="kn-stat-lbl">consumo di mantenimento</div></div>
            </div>
            <h1 className="kn-h1" style={{ fontSize: 19 }}>Macronutrienti</h1>
            <p className="kn-sub" style={{ marginBottom: 16 }}>Puoi regolare la ripartizione, il calcolo si aggiorna subito.</p>
            <div className="kn-slider-row">
              <div className="kn-slider-label"><span>Carboidrati</span><span>{carbP}%</span></div>
              <input className="kn-slider" type="range" min="15" max="65" value={carbP} onChange={(e) => setCarbP(parseInt(e.target.value))} />
            </div>
            <div className="kn-slider-row">
              <div className="kn-slider-label"><span>Grassi</span><span>{fatP}%</span></div>
              <input className="kn-slider" type="range" min="15" max="55" value={fatP} onChange={(e) => setFatP(parseInt(e.target.value))} />
            </div>
            <div className="kn-macro-row">
              <div className="kn-macro-top"><span className="kn-macro-name">Carboidrati</span><span className="kn-macro-pct-primary">{carbP}% <span className="kn-macro-grams-light">({calc.carbG} g)</span></span></div>
              <div className="kn-macro-bar-track"><div className="kn-macro-bar-fill" style={{ width: carbP + "%", background: "var(--carb)" }} /></div>
            </div>
            <div className="kn-macro-row">
              <div className="kn-macro-top"><span className="kn-macro-name">Grassi</span><span className="kn-macro-pct-primary">{fatP}% <span className="kn-macro-grams-light">({calc.fatG} g)</span></span></div>
              <div className="kn-macro-bar-track"><div className="kn-macro-bar-fill" style={{ width: fatP + "%", background: "var(--fat)" }} /></div>
            </div>
            <div className="kn-macro-row">
              <div className="kn-macro-top"><span className="kn-macro-name">Proteine</span><span className="kn-macro-pct-primary">{proteinP}% <span className="kn-macro-grams-light">({calc.proteinG} g)</span></span></div>
              <div className="kn-macro-bar-track"><div className="kn-macro-bar-fill" style={{ width: proteinP + "%", background: "var(--protein)" }} /></div>
            </div>
            <button className="kn-btn" style={{ marginTop: 12 }} onClick={async () => { await salvaProfiloPersistente(); setAccountEsistente(true); setGiornoVisualizzato(null); setScreen("diario"); }}>Salva e vai al diario</button>
          </>
        )}

        {screen === "diario" && (() => {
          const vistaOggi = giornoVisualizzato === null;
          const pastiMostrati = vistaOggi ? pastiOggi : (dettaglioGiornoSel || { Colazione: [], Pranzo: [], Merenda: [], Cena: [] });
          const tuttiGliAlimenti = Object.values(pastiMostrati).flat();
          const consumato = tuttiGliAlimenti.reduce((s, i) => s + i.kcal, 0);
          const target = (calc && calc.target) || 2100;
          const pct = Math.min(100, Math.round((consumato / target) * 100));
          const sopra = consumato > target;
          const carboAssuntiG = tuttiGliAlimenti.reduce((s, i) => s + (i.carboidratiG || 0), 0);
          const grassiAssuntiG = tuttiGliAlimenti.reduce((s, i) => s + (i.grassiG || 0), 0);
          const proteineAssunteG = tuttiGliAlimenti.reduce((s, i) => s + (i.proteineG || 0), 0);

          if (!vistaOggi && caricandoDettaglioGiorno) {
            return (
              <>
                <div className="kn-loading"><span className="kn-spinner" /> Carico quel giorno…</div>
              </>
            );
          }

          return (
            <>
              {vistaOggi ? (
                <div className="kn-home-header">
                  <div style={{ flex: 1 }}>
                    <div className="kn-greeting">Ciao!</div>
                    <div className="kn-greeting-sub">{oggi.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</div>
                  </div>
                  <button className="kn-icon-btn" onClick={() => { setScreen("assistente"); generaOsservazioniAI(); }} title="Assistente" style={{ marginRight: 6 }}>🤖</button>
                  <button className="kn-icon-btn" onClick={() => setScreen("profilo")} title="Profilo">⚙️</button>
                </div>
              ) : (
                <div className="kn-home-header">
                  <div style={{ flex: 1 }}>
                    <div className="kn-greeting" style={{ fontSize: 16 }}>{giornoVisualizzato.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</div>
                    <div className="kn-greeting-sub">stai guardando lo storico</div>
                  </div>
                  <button className="kn-btn" style={{ width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={tornaAOggi}>Oggi</button>
                </div>
              )}

              <div className="kn-home-top">
                <div className="kn-ring-card">
                  <KcalRing pct={pct} kcal={consumato} target={target} />
                </div>
                <div className="kn-rimaste-card">
                  <div className="kn-rimaste-lbl-top">{vistaOggi ? "Rimangono" : (sopra ? "Oltre" : "Rimanevano")}</div>
                  <div className="kn-rimaste-num">{sopra ? consumato - target : target - consumato} kcal</div>
                  <div className="kn-rimaste-lbl">{vistaOggi ? "per la cena" : "quel giorno"}</div>
                </div>
              </div>

              {vistaOggi && (
                <div className="kn-mini-macros-card">
                  <div className="kn-mini-macro">
                    <div className="kn-mini-macro-top"><span>Carbo</span></div>
                    <b className="kn-macro-pct-primary" style={{ display: "block", marginBottom: 2 }}>{calc ? Math.round((carboAssuntiG / calc.carbG) * 100) : 0}%</b>
                    <span className="kn-macro-grams-light">{carboAssuntiG}g / {calc ? calc.carbG : "—"}g</span>
                    <div className="kn-mini-macro-track" style={{ marginTop: 6 }}><div className="kn-macro-bar-fill" style={{ width: Math.min(100, calc ? (carboAssuntiG / calc.carbG) * 100 : 0) + "%", background: "var(--accent)" }} /></div>
                  </div>
                  <div className="kn-mini-macro">
                    <div className="kn-mini-macro-top"><span>Grassi</span></div>
                    <b className="kn-macro-pct-primary" style={{ display: "block", marginBottom: 2 }}>{calc ? Math.round((grassiAssuntiG / calc.fatG) * 100) : 0}%</b>
                    <span className="kn-macro-grams-light">{grassiAssuntiG}g / {calc ? calc.fatG : "—"}g</span>
                    <div className="kn-mini-macro-track" style={{ marginTop: 6 }}><div className="kn-macro-bar-fill" style={{ width: Math.min(100, calc ? (grassiAssuntiG / calc.fatG) * 100 : 0) + "%", background: "var(--accent)" }} /></div>
                  </div>
                  <div className="kn-mini-macro">
                    <div className="kn-mini-macro-top"><span>Proteine</span></div>
                    <b className="kn-macro-pct-primary" style={{ display: "block", marginBottom: 2 }}>{calc ? Math.round((proteineAssunteG / calc.proteinG) * 100) : 0}%</b>
                    <span className="kn-macro-grams-light">{proteineAssunteG}g / {calc ? calc.proteinG : "—"}g</span>
                    <div className="kn-mini-macro-track" style={{ marginTop: 6 }}><div className="kn-macro-bar-fill" style={{ width: Math.min(100, calc ? (proteineAssunteG / calc.proteinG) * 100 : 0) + "%", background: "var(--accent)" }} /></div>
                  </div>
                </div>
              )}

              {vistaOggi && (
                <div className="kn-diario-links" style={{ marginBottom: 18 }}>
                  <button className="kn-diario-link" onClick={() => setScreen("calendario")}>calendario</button>
                  <button className="kn-diario-link" onClick={() => { setScreen("ricette"); apriRicette(); }}>ricette</button>
                  <button className="kn-diario-link" onClick={() => { apriPesoStorico(); setScreen("progressi"); }}>progressi</button>
                </div>
              )}

              <div className="kn-profile-heading" style={{ marginTop: 4 }}>{vistaOggi ? "I tuoi pasti di oggi" : "Pasti registrati"}</div>
              <div className="kn-meal-list">
                {Object.entries(pastiMostrati).map(([nome, items], i) => {
                  const tot = items.reduce((s, it) => s + it.kcal, 0);
                  const vuoto = items.length === 0;
                  const espansoPasto = !!pastiEspansi[nome];
                  return (
                    <React.Fragment key={nome}>
                      <div
                        className="kn-meal-row"
                        style={!vistaOggi && vuoto ? { cursor: "default" } : undefined}
                        onClick={() => { if (vistaOggi || !vuoto) togglePastoEspanso(nome); }}
                      >
                        <span className="kn-meal-icon">{ICONE_PASTO[nome] || "🍴"}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="kn-meal-row-name">{nome}</div>
                          <div className="kn-meal-row-sub">{vuoto ? (vistaOggi ? "Tocca per aggiungere" : "Nessuna registrazione") : `${items.length} ${items.length > 1 ? "alimenti" : "alimento"}`}</div>
                        </div>
                        <div className="kn-meal-row-kcal">{tot > 0 ? `${tot} kcal` : "—"}</div>
                      </div>

                      {vistaOggi && espansoPasto && vuoto && (
                        <div className="kn-meal-row-expand">
                          <div className="kn-btn-row" style={{ marginTop: 0 }}>
                            <button className="kn-btn kn-btn-ghost" onClick={(e) => { e.stopPropagation(); setPastoDestinazione(nome); resetFoto(); setScreen("foto"); }}>📷 Foto</button>
                            <button className="kn-btn kn-btn-ghost" onClick={(e) => { e.stopPropagation(); setPastoDestinazione(nome); resetCerca(); setScreen("cerca"); }}>🔍 Cerca</button>
                          </div>
                        </div>
                      )}

                      {espansoPasto && !vuoto && (
                        <div className="kn-meal-row-expand">
                          {items.map((it, idx) => {
                            const haIngredienti = it.ingredienti && it.ingredienti.length > 0;
                            const haMacro = it.carboidratiG != null || it.grassiG != null || it.proteineG != null;
                            const haDettaglio = haIngredienti || haMacro;
                            const chiave = nome + "-" + idx;
                            const espansoItem = !!dettagliEspansi[chiave];
                            return (
                              <React.Fragment key={idx}>
                                <div
                                  className={"kn-meal-item" + (haDettaglio ? " has-detail" : "")}
                                  onClick={(e) => { e.stopPropagation(); haDettaglio && toggleDettaglio(nome, idx); }}
                                >
                                  <span>{haDettaglio && <span className="kn-meal-item-chevron">{espansoItem ? "▾" : "▸"}</span>}{it.nome}</span>
                                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    {it.kcal} kcal
                                    {vistaOggi && (
                                      <button
                                        className="kn-ing-del"
                                        onClick={(e) => { e.stopPropagation(); rimuoviAlimento(nome, idx); }}
                                        title="Rimuovi"
                                      >✕</button>
                                    )}
                                  </span>
                                </div>
                                {haDettaglio && espansoItem && (
                                  <div className="kn-meal-item-detail">
                                    {haIngredienti && it.ingredienti.map((ing, k) => (
                                      <div className="kn-meal-item-detail-row" key={k}>
                                        <span>{ing.nome} — {ing.grammi}g</span>
                                        <span>{ing.kcal} kcal</span>
                                      </div>
                                    ))}
                                    {!haIngredienti && haMacro && (
                                      <div className="kn-meal-item-detail-row">
                                        <span>Carbo {it.carboidratiG}g · Grassi {it.grassiG}g · Proteine {it.proteineG}g</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                          {vistaOggi && (
                            <div style={{ display: "flex", gap: 14 }}>
                              <button
                                className="kn-meal-add-link"
                                onClick={(e) => { e.stopPropagation(); setPastoDestinazione(nome); resetFoto(); setScreen("foto"); }}
                              >
                                + foto
                              </button>
                              <button
                                className="kn-meal-add-link"
                                onClick={(e) => { e.stopPropagation(); setPastoDestinazione(nome); resetCerca(); setScreen("cerca"); }}
                              >
                                + cerca alimento
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {vistaOggi && (() => {
                const pastoOra = pastoSuggeritoOra();
                const titoloSezione = { Colazione: "Stamattina", Pranzo: "A pranzo", Merenda: "Nel pomeriggio", Cena: "Stasera" }[pastoOra];
                return (
                  <>
                    <div className="kn-profile-heading" style={{ marginTop: 4 }}>{titoloSezione}</div>
                    <div className="kn-entry-row">
                      <div className="kn-entry-btn" onClick={() => { setPastoDestinazione(pastoOra); resetFoto(); setScreen("foto"); }}>Foto del piatto</div>
                      <div className="kn-entry-btn" onClick={() => { setPastoDestinazione(pastoOra); resetCerca(); setScreen("cerca"); }}>Cerca alimento</div>
                    </div>
                    <div className="kn-entry-row">
                      <div className="kn-entry-btn" onClick={() => { setPastoConsiglio(pastoOra === "Pranzo" ? "Pranzo" : "Cena"); resetConsiglio(); apriFrigo(); setScreen("consiglio"); }}>Consiglia</div>
                      <div className="kn-entry-btn" onClick={() => { apriFrigo(); setScreen("frigo"); }}>Il tuo frigo</div>
                    </div>
                  </>
                );
              })()}

              {toastDiario && <p className="kn-save-note">{toastDiario}</p>}

              <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onOggi={() => { setGiornoVisualizzato(null); setScreen("diario"); }} onFoto={() => { setPastoDestinazione(pastoSuggeritoOra()); resetFoto(); setScreen("foto"); }} />
            </>
          );
        })()}

        {screen === "calendario" && (() => {
          const target = (calc && calc.target) || 2100;
          const celle = [];
          for (let i = 0; i < offsetIniziale; i++) celle.push(null);
          for (let d = 1; d <= giorniNelMese; d++) celle.push(d);

          function kcalPerGiorno(d) {
            const dataObj = new Date(oggi.getFullYear(), oggi.getMonth(), d);
            const chiave = dataObj.toISOString().slice(0, 10);
            if (d === oggi.getDate()) return Object.values(pastiOggi).flat().reduce((s, it) => s + it.kcal, 0);
            return storicoDiario[chiave] != null ? storicoDiario[chiave] : null;
          }
          function statoPerGiorno(d) {
            const k = kcalPerGiorno(d);
            if (k == null) return null;
            if (k === 0) return null;
            if (k > target * 1.08) return "alto";
            if (k < target * 0.85) return "basso";
            return "ok";
          }

          return (
            <>
              <div className="kn-cal-top">
                <button className="kn-cal-nav">‹</button>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em" }}>{MESI[oggi.getMonth()]} {oggi.getFullYear()}</span>
                <button className="kn-cal-nav">›</button>
              </div>
              <p className="kn-sub" style={{ marginBottom: 12 }}>Tocca un giorno per vedere cosa hai mangiato.</p>
              <div className="kn-cal-grid">
                {GIORNI_SETTIMANA.map((g, i) => (<div className="kn-cal-weekday" key={i}>{g}</div>))}
                {celle.map((d, i) => {
                  if (d === null) return <div className="kn-day-cell empty" key={i} />;
                  const stato = statoPerGiorno(d);
                  return (
                    <div key={i} className={"kn-day-cell" + (d === oggi.getDate() ? " today" : "") + (d === selectedDay ? " sel" : "")} onClick={() => apriDettaglioGiorno(d)}>
                      <span>{d}</span>
                      {stato && <span className={"kn-day-dot " + stato} />}
                    </div>
                  );
                })}
              </div>
              <div className="kn-cal-legend">
                <div className="kn-cal-legend-item"><span className="kn-day-dot ok" /> in linea</div>
                <div className="kn-cal-legend-item"><span className="kn-day-dot alto" /> sopra</div>
                <div className="kn-cal-legend-item"><span className="kn-day-dot basso" /> sotto</div>
              </div>
              <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onOggi={() => { setGiornoVisualizzato(null); setScreen("diario"); }} onFoto={() => { setPastoDestinazione(pastoSuggeritoOra()); resetFoto(); setScreen("foto"); }} />
            </>
          );
        })()}

        {screen === "community" && (
          <>
            <h1 className="kn-h1">Community</h1>
            <p className="kn-sub">Chi ha accesso ai tuoi progressi, e come gestire chi può vederli.</p>

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Il tuo codice</div>
              <div className="kn-code-box">
                <span className="kn-code-value">{codice}</span>
                <div className="kn-code-actions">
                  <button className="kn-code-btn" onClick={() => { navigator.clipboard && navigator.clipboard.writeText(codice); }}>Copia</button>
                  <button className="kn-code-btn" onClick={rigeneraCodice}>Rigenera</button>
                </div>
              </div>
              <p className="kn-code-hint">Condividilo con chi vuoi che segua i tuoi progressi. Rigenerarlo invalida tutti i codici già condivisi in precedenza.</p>
            </div>

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Contatti connessi</div>
              {contatti.filter((c) => c.stato === "connesso").length === 0 && <div className="kn-empty">Nessun contatto connesso</div>}
              {contatti.filter((c) => c.stato === "connesso").map((c) => (
                <div className="kn-contact-card" key={c.id}>
                  <div>
                    <div className="kn-contact-name">{c.nome}</div>
                    <div className="kn-contact-meta">connesso dal {c.connessoIl}</div>
                  </div>
                  <button className="kn-disconnect-btn" onClick={() => disconnetti(c.id)}>Disconnetti</button>
                </div>
              ))}
            </div>

            {contatti.some((c) => c.stato === "disconnesso") && (
              <div className="kn-profile-section" style={{ marginBottom: 6 }}>
                <div className="kn-profile-heading">Disconnessi di recente</div>
                {contatti.filter((c) => c.stato === "disconnesso").map((c) => (
                  <div className="kn-contact-card disconnesso" key={c.id}>
                    <div>
                      <div className="kn-contact-name">{c.nome}</div>
                      <div className="kn-contact-meta">serve un nuovo codice per riconnettersi</div>
                    </div>
                    <span className="kn-contact-tag">disconnesso</span>
                  </div>
                ))}
              </div>
            )}

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Le tue proposte condivise</div>
              {caricandoProposte && <div className="kn-loading"><span className="kn-spinner" /> Carico le proposte…</div>}
              {!caricandoProposte && proposteMie.length === 0 && (
                <div className="kn-empty">Nessuna cena condivisa ancora. Condividine una dalla proposta "Consiglia".</div>
              )}
              {!caricandoProposte && proposteMie.map((p) => (
                <div className="kn-share-card" key={p.id}>
                  <div className="kn-share-top">
                    <span className="kn-share-nome">{p.nome}</span>
                    <span className="kn-share-kcal">{p.kcalTotali} kcal</span>
                  </div>
                  <div className="kn-recipe-meta">{p.tempoMinuti} min · {p.dolceIncluso ? "con dolce" : "senza dolce"}</div>

                  {contatti.filter((c) => c.stato === "connesso").map((c) => {
                    const rapporto = c.kcalResiduiStimati / p.kcalTotali;
                    let consiglio;
                    if (rapporto < 0.9) {
                      consiglio = `Per restare nelle sue kcal residue (${c.kcalResiduiStimati}), conviene ridurre le porzioni di circa il ${Math.round((1 - rapporto) * 100)}%.`;
                    } else if (rapporto > 1.15) {
                      consiglio = `Ha margine: potrebbe anche aumentare leggermente le porzioni restando nelle sue ${c.kcalResiduiStimati} kcal residue.`;
                    } else {
                      consiglio = `Le porzioni indicate sono già in linea con le sue ${c.kcalResiduiStimati} kcal residue.`;
                    }
                    const chiave = p.id + "_" + c.id;
                    const convalidata = !!convalidate[chiave];
                    return (
                      <div className="kn-adapt-box" key={c.id}>
                        <div className="kn-adapt-name">{c.nome}</div>
                        {consiglio}
                        <div>
                          <button className={"kn-validate-btn" + (convalidata ? " on" : "")} onClick={() => toggleConvalida(p.id, c.id)}>
                            {convalidata ? "✓ Convalidata da " + c.nome.split(" ")[0] : "Segna come convalidata"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {toastCommunity && <p className="kn-save-note">{toastCommunity}</p>}

            <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onOggi={() => { setGiornoVisualizzato(null); setScreen("diario"); }} onFoto={() => { setPastoDestinazione(pastoSuggeritoOra()); resetFoto(); setScreen("foto"); }} />
          </>
        )}

        {screen === "profilo" && (
          <>
            <h1 className="kn-h1">Profilo</h1>
            <p className="kn-sub">Rivedi e correggi in ogni momento i dati inseriti in fase di registrazione.</p>

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Dati personali</div>
              <div className="kn-toggle-row">
                <div className={"kn-toggle" + (sesso === "uomo" ? " sel" : "")} onClick={() => segna(setSesso)("uomo")}>Uomo</div>
                <div className={"kn-toggle" + (sesso === "donna" ? " sel" : "")} onClick={() => segna(setSesso)("donna")}>Donna</div>
              </div>
              <div className="kn-field"><label className="kn-label">Età (anni)</label><input className="kn-input" type="number" value={eta} onChange={(e) => segna(setEta)(e.target.value)} /></div>
              <div className="kn-field"><label className="kn-label">Peso attuale (kg)</label><input className="kn-input" type="number" value={peso} onChange={(e) => segna(setPeso)(e.target.value)} /></div>
              <div className="kn-field"><label className="kn-label">Altezza (cm)</label><input className="kn-input" type="number" value={altezza} onChange={(e) => segna(setAltezza)(e.target.value)} /></div>
              <div className="kn-field" style={{ marginBottom: 0 }}><label className="kn-label">Peso obiettivo (kg)</label><input className="kn-input" type="number" value={pesoObiettivo} onChange={(e) => segna(setPesoObiettivo)(e.target.value)} /></div>
            </div>

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Livello di attività</div>
              {ATTIVITA.map((a) => (
                <div key={a.id} className={"kn-choice-card" + (attivita === a.id ? " sel" : "")} onClick={() => segna(setAttivita)(a.id)}>
                  <div className="kn-choice-title">{a.nome}</div>
                  <div className="kn-choice-desc">{a.desc}</div>
                </div>
              ))}
            </div>

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Obiettivo</div>
              {OBIETTIVI.map((o) => (
                <div key={o.id} className={"kn-choice-card" + (obiettivo === o.id ? " sel" : "")} onClick={() => segna(setObiettivo)(o.id)}>
                  <div className="kn-choice-title">{o.nome}</div>
                  <div className="kn-choice-desc">{o.desc}</div>
                </div>
              ))}
              {(obiettivo === "perdita" || obiettivo === "aumento") && (
                <div className="kn-slider-row" style={{ marginTop: 14 }}>
                  <div className="kn-slider-label"><span>Ritmo settimanale</span><span>{ritmo.toFixed(2)} kg</span></div>
                  <input className="kn-slider" type="range" min="0.25" max="1" step="0.05" value={ritmo} onChange={(e) => segna(setRitmo)(parseFloat(e.target.value))} />
                </div>
              )}
            </div>

            <div className="kn-profile-section">
              <div className="kn-profile-heading">Ripartizione macro</div>
              <div className="kn-slider-row">
                <div className="kn-slider-label"><span>Carboidrati</span><span>{carbP}%</span></div>
                <input className="kn-slider" type="range" min="15" max="65" value={carbP} onChange={(e) => segna(setCarbP)(parseInt(e.target.value))} />
              </div>
              <div className="kn-slider-row" style={{ marginBottom: 4 }}>
                <div className="kn-slider-label"><span>Grassi</span><span>{fatP}%</span></div>
                <input className="kn-slider" type="range" min="15" max="55" value={fatP} onChange={(e) => segna(setFatP)(parseInt(e.target.value))} />
              </div>
            </div>

            <div className="kn-profile-section" style={{ marginBottom: 6 }}>
              <div className="kn-profile-heading">Aspetto</div>
              <div className="kn-toggle-row">
                <div className={"kn-toggle" + (tema === "chiaro" ? " sel" : "")} onClick={() => segna(setTema)("chiaro")}>Chiaro</div>
                <div className={"kn-toggle" + (tema === "scuro" ? " sel" : "")} onClick={() => segna(setTema)("scuro")}>Scuro</div>
              </div>
            </div>

            <button className="kn-btn kn-btn-ghost" style={{ marginBottom: 10 }} onClick={() => { apriPesoStorico(); setScreen("progressi"); }}>I tuoi progressi</button>
            <button className="kn-btn" onClick={async () => { await salvaProfiloPersistente(); setSalvato(true); }}>Salva modifiche</button>
            {salvato && <p className="kn-save-note">Modifiche salvate</p>}
            <button className="kn-btn kn-btn-ghost" style={{ marginTop: 10 }} onClick={disconnettiAccount}>Disconnetti</button>

            <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onOggi={() => { setGiornoVisualizzato(null); setScreen("diario"); }} onFoto={() => { setPastoDestinazione(pastoSuggeritoOra()); resetFoto(); setScreen("foto"); }} />
          </>
        )}

        {screen === "foto" && (
          <>
            <button className="kn-back-link" onClick={() => { resetFoto(); setGiornoVisualizzato(null); setScreen("diario"); }}>‹ torna al diario</button>
            <h1 className="kn-h1">Aggiungi dalla foto</h1>
            <p className="kn-sub">La foto resta in memoria solo per il tempo dell'analisi, salvo tua scelta di salvarla come ricetta.</p>

            {fotoSubScreen === "cattura" && (
              <>
                <div className="kn-field">
                  <label className="kn-label">Per quale pasto?</label>
                  <div className="kn-toggle-row">
                    {["Colazione", "Pranzo", "Merenda", "Cena"].map((p) => (
                      <div
                        key={p}
                        className={"kn-toggle" + (pastoDestinazione === p ? " sel" : "")}
                        onClick={() => setPastoDestinazione(p)}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {NOTE_PASTO[pastoDestinazione] && (
                  <div className="kn-alert-pasto">
                    <span className="kn-alert-pasto-icon">💡</span>
                    <div className="kn-alert-pasto-text">
                      <div className="kn-alert-pasto-title">Per {pastoDestinazione.toLowerCase()}</div>
                      {NOTE_PASTO[pastoDestinazione]}
                    </div>
                  </div>
                )}

                <label className="kn-drop" htmlFor="input-foto-piatto">
                  <div className="kn-drop-icon">📷</div>
                  <div className="kn-drop-label">Scatta o carica una foto del piatto</div>
                  <div className="kn-drop-hint">JPG o PNG, verrà ridimensionata automaticamente</div>
                </label>
                <input
                  id="input-foto-piatto"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                  onChange={(e) => gestisciFile(e.target.files && e.target.files[0])}
                />
                <p className="kn-privacy">
                  La foto non viene salvata da nessuna parte finché non confermi la registrazione.
                  Se scegli di salvarla come ricetta, resterà nella tua libreria personale — altrimenti viene scartata subito dopo il calcolo delle calorie.
                </p>
                {erroreFoto && <p className="kn-error">{erroreFoto}</p>}
              </>
            )}

            {fotoSubScreen === "analisi" && (
              <>
                {fotoDataUrl && <img className="kn-photo-preview" src={fotoDataUrl} alt="Foto del piatto" />}
                <div className="kn-loading"><span className="kn-spinner" /> Sto riconoscendo il piatto…</div>
              </>
            )}

            {fotoSubScreen === "conferma" && (
              <>
                {fotoDataUrl && <img className="kn-photo-preview" src={fotoDataUrl} alt="Foto del piatto" />}
                {erroreFoto && <p className="kn-error">{erroreFoto}</p>}
                {nomePiatto && <p className="kn-dish-name">{nomePiatto}</p>}
                <p className="kn-dish-sub">Correggi i grammi se serve: le calorie si aggiornano da sole.</p>

                {ingredienti.map((ing, idx) => (
                  <div className="kn-ing-row" key={idx}>
                    <span className="kn-ing-name">{ing.nome}</span>
                    <input className="kn-ing-grams" type="number" value={ing.grammi} onChange={(e) => aggiornaGrammi(idx, parseFloat(e.target.value) || 0)} />
                    <span className="kn-ing-kcal">{ing.kcal} kcal</span>
                    <button className="kn-ing-del" onClick={() => rimuoviIngrediente(idx)} title="Rimuovi ingrediente">✕</button>
                  </div>
                ))}

                <button className="kn-btn kn-btn-ghost" style={{ marginTop: 10, fontSize: 13, textTransform: "none" }} onClick={aggiungiIngredienteVuoto}>+ aggiungi ingrediente</button>

                <div className="kn-total-row"><span className="kn-total-label">Totale</span><span className="kn-total-num">{kcalTotaliCorrenti} kcal</span></div>
                {macroOriginali && (
                  <div className="kn-mini-macros" style={{ marginTop: 0 }}>
                    <span className="kn-mini-macro">Carbo <b>{Math.round(macroOriginali.carboidratiG * rapportoKcal)}g</b></span>
                    <span className="kn-mini-macro">Grassi <b>{Math.round(macroOriginali.grassiG * rapportoKcal)}g</b></span>
                    <span className="kn-mini-macro">Prot. <b>{Math.round(macroOriginali.proteineG * rapportoKcal)}g</b></span>
                  </div>
                )}

                <div className="kn-check-row" onClick={() => setSalvaRicetta((v) => !v)}>
                  <span className={"kn-check-box" + (salvaRicetta ? " on" : "")}>{salvaRicetta ? "✓" : ""}</span>
                  Salva anche come ricetta
                </div>
                {salvaRicetta && (
                  <div className="kn-field">
                    <label className="kn-label">Nome della ricetta</label>
                    <input className="kn-input" type="text" value={nomeRicetta} onChange={(e) => setNomeRicetta(e.target.value)} placeholder="es. Pasta al pomodoro della nonna" />
                  </div>
                )}

                <div className="kn-btn-row">
                  <button className="kn-btn kn-btn-ghost" onClick={resetFoto}>Riprova</button>
                  <button className="kn-btn" onClick={registraPasto} disabled={ingredienti.length === 0}>Registra pasto</button>
                </div>
              </>
            )}
          </>
        )}

        {screen === "cerca" && (
          <>
            <button className="kn-back-link" onClick={() => { resetCerca(); setPastoDestinazione(null); setGiornoVisualizzato(null); setScreen("diario"); }}>‹ torna al diario</button>
            <h1 className="kn-h1">Cerca alimento</h1>
            <p className="kn-sub">
              {pastoDestinazione ? `Aggiungi a: ${pastoDestinazione}` : "Scegli un pasto"} — cerca, scegli l'unità e la quantità.
            </p>

            {NOTE_PASTO[pastoDestinazione] && (
              <div className="kn-alert-pasto">
                <span className="kn-alert-pasto-icon">💡</span>
                <div className="kn-alert-pasto-text">
                  <div className="kn-alert-pasto-title">Per {pastoDestinazione.toLowerCase()}</div>
                  {NOTE_PASTO[pastoDestinazione]}
                </div>
              </div>
            )}

            {!alimentoScelto && (() => {
              const usaRemoti = FATSECRET_API_BASE && risultatiRemoti !== null;
              const localiFiltrati = DB_ALIMENTI.filter((a) => a.nome.toLowerCase().includes(cercaQuery.toLowerCase()));
              return (
                <>
                  <div className="kn-field">
                    <input
                      className="kn-input"
                      type="text"
                      value={cercaQuery}
                      onChange={(e) => setCercaQuery(e.target.value)}
                      placeholder="es. pollo, riso, mela…"
                      autoFocus
                    />
                  </div>

                  {cercaCaricando && <div className="kn-loading"><span className="kn-spinner" /> Cerco su FatSecret…</div>}
                  {cercaErrore && <p className="kn-error" style={{ marginTop: 0 }}>{cercaErrore}</p>}
                  {caricandoDettaglioRemoto && <div className="kn-loading"><span className="kn-spinner" /> Carico le porzioni…</div>}

                  {!cercaCaricando && !caricandoDettaglioRemoto && (
                    <div className="kn-search-list">
                      {usaRemoti
                        ? risultatiRemoti.map((r) => (
                            <div className="kn-search-item" key={r.id} onClick={() => selezionaAlimentoRemoto(r)}>
                              <span className="kn-search-item-name">{r.nome}{r.marca ? ` — ${r.marca}` : ""}</span>
                              <span className="kn-search-item-kcal">FatSecret</span>
                            </div>
                          ))
                        : localiFiltrati.map((a) => (
                            <div className="kn-search-item" key={a.nome} onClick={() => selezionaAlimentoLocale(a)}>
                              <span className="kn-search-item-name">{a.nome}</span>
                              <span className="kn-search-item-kcal">{a.kcal100} kcal /100g</span>
                            </div>
                          ))}
                      {usaRemoti && risultatiRemoti.length === 0 && <div className="kn-empty">Nessun risultato su FatSecret per questa ricerca.</div>}
                      {!usaRemoti && cercaQuery.trim().length > 0 && localiFiltrati.length === 0 && (
                        <div className="kn-empty">Nessun alimento trovato nell'elenco locale.</div>
                      )}
                    </div>
                  )}
                </>
              );
            })()}

            {alimentoScelto && (() => {
              const m = macroCorrenti();
              const g = grammiCorrenti();
              return (
                <>
                  <div className="kn-weigh-box">
                    <div className="kn-weigh-name">{alimentoScelto.nome}</div>

                    <label className="kn-label">Unità di misura</label>
                    <div className="kn-toggle-row" style={{ marginBottom: 14, flexWrap: "wrap" }}>
                      {porzioniAttive.map((u) => (
                        <div
                          key={u.etichetta}
                          className={"kn-toggle" + (unitaScelta && unitaScelta.etichetta === u.etichetta ? " sel" : "")}
                          onClick={() => { setUnitaScelta(u); setQuantitaScelta(u.etichetta === "grammi" ? 100 : 1); }}
                        >
                          {u.etichetta}
                        </div>
                      ))}
                    </div>

                    <div className="kn-weigh-row">
                      <input
                        className="kn-weigh-input"
                        type="number"
                        value={quantitaScelta}
                        onChange={(e) => setQuantitaScelta(parseFloat(e.target.value) || 0)}
                        autoFocus
                      />
                      <span className="kn-label" style={{ marginBottom: 0 }}>
                        {unitaScelta && unitaScelta.etichetta === "grammi" ? "grammi" : `× ${unitaScelta ? unitaScelta.etichetta : ""}`}
                      </span>
                      <span className="kn-weigh-kcal" style={{ marginLeft: "auto" }}>{m.kcal} kcal</span>
                    </div>
                    {unitaScelta && unitaScelta.etichetta !== "grammi" && unitaScelta.grammi != null && (
                      <div className="kn-dish-sub" style={{ marginTop: 4, marginBottom: 0 }}>≈ {g}g totali</div>
                    )}

                    <div className="kn-macro-mini-grid">
                      <div className="kn-macro-mini-cell"><span className="kn-macro-mini-val">{m.carb}g</span><span className="kn-macro-mini-lbl">carbo</span></div>
                      <div className="kn-macro-mini-cell"><span className="kn-macro-mini-val">{m.fat}g</span><span className="kn-macro-mini-lbl">grassi</span></div>
                      <div className="kn-macro-mini-cell"><span className="kn-macro-mini-val">{m.protein}g</span><span className="kn-macro-mini-lbl">proteine</span></div>
                    </div>
                  </div>
                  <div className="kn-btn-row">
                    <button className="kn-btn kn-btn-ghost" onClick={() => { setAlimentoScelto(null); setPorzioniAttive([]); setUnitaScelta(null); }}>Cambia alimento</button>
                    <button className="kn-btn" onClick={aggiungiDaElenco} disabled={g <= 0}>Aggiungi</button>
                  </div>
                </>
              );
            })()}
          </>
        )}

        {screen === "progressi" && (() => {
          const ultimeDuePesate = pesoStorico.length >= 2 ? [...pesoStorico].sort((a, b) => a.data.localeCompare(b.data)).slice(-2) : null;
          const giorniUltimaPesata = pesoStorico.length >= 1 ? Math.max(0, Math.round((oggi - new Date([...pesoStorico].sort((a, b) => a.data.localeCompare(b.data)).slice(-1)[0].data + "T00:00:00")) / 86400000)) : null;
          const deltaPeso = ultimeDuePesate ? ultimeDuePesate[1].peso - ultimeDuePesate[0].peso : null;
          const giorniSopra = datiSettimana.filter((g) => g.haDato && g.oltre).length;
          const recupero = calcolaRecupero();
          return (
            <>
              <button className="kn-back-link" onClick={() => setScreen("profilo")}>‹ torna al profilo</button>
              <h1 className="kn-h1">I tuoi progressi</h1>

              <div className="kn-weight-card">
                {ultimeDuePesate ? (
                  <>
                    <p className="kn-sub" style={{ marginBottom: 12 }}>Dall'ultima pesata, {giorniUltimaPesata === 0 ? "oggi" : `${giorniUltimaPesata} giorni fa`}</p>
                    <div className="kn-bilancio-grid" style={{ marginBottom: 0 }}>
                      <div className="kn-bilancio-cell">
                        <div className="kn-bilancio-cell-lbl">Peso</div>
                        <div className="kn-bilancio-cell-val" style={{ color: deltaPeso <= 0 ? "var(--accent)" : "var(--clay)" }}>
                          {deltaPeso > 0 ? "+" : ""}{deltaPeso.toFixed(1)} kg
                        </div>
                      </div>
                      <div className="kn-bilancio-cell">
                        <div className="kn-bilancio-cell-lbl">Giorni in linea</div>
                        <div className="kn-bilancio-cell-val">{giorniInLinea} / {giorniConDati.length}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="kn-sub" style={{ marginBottom: 0 }}>Registra almeno due pesate per vedere qui il tuo andamento nel tempo.</p>
                )}
              </div>

              <div className="kn-weight-card">
                <p className="kn-sub" style={{ marginBottom: 10 }}>Ultimi 7 giorni</p>
                <div className="kn-bilancio-comp-row">
                  <span>In linea o sotto obiettivo</span>
                  <b style={{ color: "var(--accent)" }}>{giorniInLinea} giorni</b>
                </div>
                <div className="kn-bilancio-comp-row">
                  <span>Sopra obiettivo</span>
                  <b style={{ color: "var(--clay)" }}>{giorniSopra} giorni</b>
                </div>
              </div>

              <div className="kn-link-list">
                <div className="kn-link-row" onClick={() => setScreen("statistiche")}>
                  <span className="kn-link-row-icon">📊</span>
                  <span className="kn-link-row-label">Statistiche settimana</span>
                  <span className="kn-link-row-chevron">›</span>
                </div>
                <div className="kn-link-row" onClick={() => { apriPesoStorico(); setScreen("peso-storico"); }}>
                  <span className="kn-link-row-icon">⚖️</span>
                  <span className="kn-link-row-label">Andamento peso</span>
                  <span className="kn-link-row-chevron">›</span>
                </div>
                <div className="kn-link-row" onClick={() => { apriPesoStorico(); setScreen("bilancio"); }}>
                  <span className="kn-link-row-icon">📈</span>
                  <span className="kn-link-row-label">Bilancio</span>
                  <span className="kn-link-row-chevron">›</span>
                </div>
                <div className="kn-link-row" onClick={() => { setScreen("assistente"); generaOsservazioniAI(); }}>
                  <span className="kn-link-row-icon">🤖</span>
                  <span className="kn-link-row-label">Assistente</span>
                  <span className="kn-link-row-chevron">›</span>
                </div>
              </div>

              <div className="kn-profile-heading">Promemoria</div>
              {recupero ? (
                <div className="kn-promemoria-card">
                  Ieri hai superato l'obiettivo di circa {recupero.eccesso} kcal — capita, nessun problema. Se vuoi, possiamo bilanciare con un obiettivo un po' più leggero ({recupero.targetRidotto} kcal) per {recupero.giorniConsigliati === 1 ? "oggi" : `i prossimi ${recupero.giorniConsigliati} giorni`}.
                  <div style={{ marginTop: 10 }}>
                    <button
                      className="kn-btn"
                      style={{ width: "auto", padding: "8px 16px", fontSize: 13 }}
                      onClick={() => {
                        setRiduzioneRecuperoAttiva(true);
                        setPastoConsiglio("Cena");
                        resetConsiglio();
                        apriFrigo();
                        setScreen("consiglio");
                      }}
                    >
                      Proponimi un menù
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {consigliDispensa.length === 0 && !caricandoConsigliDispensa && (
                    <div className="kn-promemoria-card">
                      Nessun eccesso da bilanciare al momento. Nel frattempo, ecco alcuni prodotti base utili al tuo obiettivo, tenendo conto di cosa hai già in frigo e dispensa.
                      <div style={{ marginTop: 10 }}>
                        <button className="kn-btn" style={{ width: "auto", padding: "8px 16px", fontSize: 13 }} onClick={generaConsigliDispensa}>Suggeriscimi qualcosa</button>
                      </div>
                    </div>
                  )}
                  {caricandoConsigliDispensa && <div className="kn-loading"><span className="kn-spinner" /> Guardo cosa ti serve…</div>}
                  {erroreConsigliDispensa && <p className="kn-error">{erroreConsigliDispensa}</p>}
                  {consigliDispensa.map((item, i) => {
                    const aggiunto = !!dispensaAggiunti[item.nome];
                    return (
                      <div className="kn-dispensa-suggest-card" key={i}>
                        <div className="kn-dispensa-suggest-info">
                          <div className="kn-dispensa-suggest-badge">{item.categoria === "dispensa" ? "Dispensa" : "Frigo"}</div>
                          <div className="kn-dispensa-suggest-nome">{item.nome}</div>
                          <div className="kn-dispensa-suggest-motivo">{item.motivo}</div>
                        </div>
                        <button className="kn-code-btn" onClick={() => aggiungiConsiglioAlFrigo(item)} disabled={aggiunto}>
                          {aggiunto ? "✓ Aggiunto" : "+ Aggiungi"}
                        </button>
                      </div>
                    );
                  })}
                  {consigliDispensa.length > 0 && !caricandoConsigliDispensa && (
                    <button className="kn-btn kn-btn-ghost" style={{ marginTop: 4 }} onClick={generaConsigliDispensa}>Altri suggerimenti</button>
                  )}
                </>
              )}
            </>
          );
        })()}

        {screen === "bilancio" && (() => {
          const b = calcolaBilancio();
          return (
            <>
              <button className="kn-back-link" onClick={() => setScreen("peso-storico")}>‹ torna alle pesate</button>
              <h1 className="kn-h1">Bilancio</h1>
              <p className="kn-sub">Confronta il calo di peso atteso dal tuo deficit calorico reale con quello misurato — sui giorni davvero trascorsi tra le ultime due pesate, non su una settimana fissa.</p>

              {!b && <div className="kn-empty">Servono almeno due pesate per calcolare un bilancio.</div>}

              {b && (
                <>
                  <div className="kn-bilancio-periodo">
                    Dal {new Date(b.dataInizio + "T00:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "short" })} al {new Date(b.dataFine + "T00:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "short" })} — {b.giorni} giorni
                  </div>

                  <div className="kn-bilancio-grid">
                    <div className="kn-bilancio-cell">
                      <div className="kn-bilancio-cell-lbl">Calo atteso</div>
                      <div className="kn-bilancio-cell-val">{b.caloAtteso != null ? b.caloAtteso.toFixed(2) : "—"} kg</div>
                    </div>
                    <div className="kn-bilancio-cell">
                      <div className="kn-bilancio-cell-lbl">Calo misurato</div>
                      <div className="kn-bilancio-cell-val">{b.caloReale.toFixed(2)} kg</div>
                    </div>
                  </div>

                  {b.copertura < 0.5 && (
                    <div className="kn-bilancio-verdict warn">
                      Hai registrato i pasti solo {b.giorniConDati} giorni su {b.giorni} in questo periodo: il "calo atteso" è una stima poco affidabile con così pochi dati — prendilo con le pinze.
                    </div>
                  )}

                  {b.caloAtteso != null && b.copertura >= 0.5 && (
                    <div className={"kn-bilancio-verdict " + (Math.abs(b.caloAtteso - b.caloReale) <= 0.3 ? "ok" : "warn")}>
                      {Math.abs(b.caloAtteso - b.caloReale) <= 0.3
                        ? "Il calo misurato è in linea con l'atteso: il piano sta funzionando come previsto."
                        : b.caloReale > b.caloAtteso
                        ? "Hai perso più di quanto atteso dal solo deficit calorico — può capitare per variazioni di liquidi o misurazioni, non è detto sia grasso in più perso."
                        : "Hai perso meno di quanto atteso dal deficit calorico registrato — capita, non è necessariamente un problema: continua a monitorare."}
                    </div>
                  )}

                  {b.composizione && (
                    <>
                      <div className="kn-profile-heading">Composizione corporea{b.composizione.fonteDiretta ? "" : " (stima)"}</div>
                      <div className="kn-weight-card">
                        <div className="kn-bilancio-comp-row">
                          <span>Grasso corporeo{b.composizione.fonteDiretta ? "" : " stimato"} ora</span>
                          <b>{b.composizione.grassoPct2.toFixed(1)}%</b>
                        </div>
                        <div className="kn-bilancio-comp-row">
                          <span>Massa grassa</span>
                          <b style={{ color: b.composizione.deltaGrasso <= 0 ? "var(--accent)" : "var(--clay)" }}>
                            {b.composizione.deltaGrasso > 0 ? "+" : ""}{b.composizione.deltaGrasso.toFixed(2)} kg
                          </b>
                        </div>
                        <div className="kn-bilancio-comp-row">
                          <span>Massa magra</span>
                          <b style={{ color: b.composizione.deltaMagra >= 0 ? "var(--accent)" : "var(--clay)" }}>
                            {b.composizione.deltaMagra > 0 ? "+" : ""}{b.composizione.deltaMagra.toFixed(2)} kg
                          </b>
                        </div>
                        {b.composizione.deltaMuscolo != null && (
                          <div className="kn-bilancio-comp-row">
                            <span>di cui massa muscolare</span>
                            <b style={{ color: b.composizione.deltaMuscolo >= 0 ? "var(--accent)" : "var(--clay)" }}>
                              {b.composizione.deltaMuscolo > 0 ? "+" : ""}{b.composizione.deltaMuscolo.toFixed(2)} kg
                            </b>
                          </div>
                        )}
                      </div>
                      <p className="kn-sub" style={{ fontSize: 11.5, fontStyle: "italic" }}>
                        {b.composizione.fonteDiretta
                          ? "Dati dalla tua bilancia impedenziometrica."
                          : "Stima da circonferenze (formula US Navy), non una misurazione clinica: margine di errore indicativo ±3-4%."}
                      </p>
                    </>
                  )}
                </>
              )}
            </>
          );
        })()}

        {screen === "peso-storico" && (
          <>
            <button className="kn-back-link" onClick={() => setScreen("progressi")}>‹ torna ai progressi</button>
            <h1 className="kn-h1">Andamento peso</h1>
            <p className="kn-sub">Registra il peso quando vuoi: il tuo fabbisogno calorico si aggiorna automaticamente su quello più recente.</p>

            <div className="kn-fridge-add-row">
              <input className="kn-input" type="number" placeholder="es. 92.5" value={nuovoPesoValore} onChange={(e) => setNuovoPesoValore(e.target.value)} />
              <button className="kn-btn" style={{ flex: 1 }} onClick={registraPeso} disabled={!nuovoPesoValore}>Registra</button>
            </div>

            <div className="kn-check-row" style={{ marginTop: 4 }} onClick={() => setMostraMisure((v) => !v)}>
              <span className={"kn-check-box" + (mostraMisure ? " on" : "")}>{mostraMisure ? "✓" : ""}</span>
              Aggiungi anche le misure corporee (facoltativo)
            </div>

            {mostraMisure && (
              <div className="kn-weight-card" style={{ marginBottom: 18 }}>
                <p className="kn-sub" style={{ marginBottom: 12 }}>Non serve compilarle ogni volta: quando lo fai, il "Bilancio" può stimare anche massa grassa e massa magra, non solo il peso.</p>
                <div className="kn-fridge-add-row">
                  <input className="kn-input" type="number" placeholder="Vita (cm)" value={nuovaVita} onChange={(e) => setNuovaVita(e.target.value)} />
                  <input className="kn-input" type="number" placeholder="Collo (cm)" value={nuovoCollo} onChange={(e) => setNuovoCollo(e.target.value)} />
                </div>
                {sesso === "donna" && (
                  <div className="kn-field">
                    <input className="kn-input" type="number" placeholder="Fianchi (cm)" value={nuoviFianchi} onChange={(e) => setNuoviFianchi(e.target.value)} />
                  </div>
                )}
                <div className="kn-fridge-add-row" style={{ marginBottom: 0 }}>
                  <input className="kn-input" type="number" placeholder="Braccio (cm)" value={nuovoBraccio} onChange={(e) => setNuovoBraccio(e.target.value)} />
                  <input className="kn-input" type="number" placeholder="Coscia (cm)" value={nuovaCoscia} onChange={(e) => setNuovaCoscia(e.target.value)} />
                </div>
              </div>
            )}

            <div className="kn-check-row" style={{ marginTop: 4 }} onClick={() => setMostraBilancia((v) => !v)}>
              <span className={"kn-check-box" + (mostraBilancia ? " on" : "")}>{mostraBilancia ? "✓" : ""}</span>
              Ho anche i dati di una bilancia impedenziometrica (facoltativo)
            </div>

            {mostraBilancia && (
              <div className="kn-weight-card" style={{ marginBottom: 18 }}>
                <p className="kn-sub" style={{ marginBottom: 12 }}>Se la tua bilancia mostra già grasso corporeo, massa muscolare e ossea, inseriscili qui: sono più precisi della stima da circonferenze e verranno usati al loro posto nel "Bilancio".</p>
                <div className="kn-fridge-add-row">
                  <input className="kn-input" type="number" placeholder="Grasso (%)" value={nuovaMassaGrassaPct} onChange={(e) => setNuovaMassaGrassaPct(e.target.value)} />
                  <input className="kn-input" type="number" placeholder="Muscolo (kg)" value={nuovaMassaMuscolareKg} onChange={(e) => setNuovaMassaMuscolareKg(e.target.value)} />
                </div>
                <div className="kn-field" style={{ marginBottom: 0 }}>
                  <input className="kn-input" type="number" placeholder="Massa ossea (kg)" value={nuovaMassaOsseaKg} onChange={(e) => setNuovaMassaOsseaKg(e.target.value)} />
                </div>
              </div>
            )}

            {caricandoPeso && <div className="kn-loading"><span className="kn-spinner" /> Carico lo storico…</div>}

            {!caricandoPeso && (
              <div className="kn-weight-card">
                <GraficoPeso dati={pesoStorico} pesoObiettivo={pesoObiettivo} />
              </div>
            )}

            <button className="kn-btn kn-btn-ghost" style={{ marginBottom: 18 }} onClick={() => { apriPesoStorico(); setScreen("bilancio"); }}>Vedi il bilancio</button>

            {!caricandoPeso && pesoStorico.length === 0 && <div className="kn-empty">Nessuna pesata registrata ancora.</div>}
            {!caricandoPeso && [...pesoStorico].reverse().map((v) => {
              const fatPct = v.massaGrassaPct != null ? v.massaGrassaPct : stimaGrassoCorporeo(sesso, v.vita, v.collo, parseFloat(altezza), v.fianchi);
              return (
                <div className="kn-weight-log-row" key={v.data}>
                  <span>{new Date(v.data + "T00:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <b>{v.peso} kg{fatPct != null ? ` · ${fatPct.toFixed(1)}% grasso` : ""}{v.massaMuscolareKg != null ? ` · ${v.massaMuscolareKg}kg muscolo` : ""}</b>
                    <button className="kn-ing-del" onClick={() => rimuoviPesoVoce(v.data)} title="Rimuovi">✕</button>
                  </span>
                </div>
              );
            })}
          </>
        )}

        {screen === "statistiche" && (() => {
          const target = (calc && calc.target) || 2100;
          const maxKcal = Math.max(target * 1.2, ...datiSettimana.map((g) => g.kcal));
          const carbP2 = calc ? Math.round((calc.carbG * 4 * 100) / target) : 40;
          const fatP2 = calc ? Math.round((calc.fatG * 9 * 100) / target) : 30;
          const proteinP2 = Math.max(0, 100 - carbP2 - fatP2);
          const donutGradient = `conic-gradient(var(--accent) 0 ${carbP2}%, var(--fat) ${carbP2}% ${carbP2 + fatP2}%, var(--carb) ${carbP2 + fatP2}% 100%)`;
          return (
            <>
              <button className="kn-back-link" onClick={() => setScreen("progressi")}>‹ torna ai progressi</button>
              <h1 className="kn-h1">Statistiche</h1>
              <p className="kn-sub">Ultimi 7 giorni</p>

              <div className="kn-chart-card">
                {datiSettimana.map((g, i) => (
                  <div className="kn-chart-bar-wrap" key={i}>
                    {g.haDato ? (
                      <div className={"kn-chart-bar" + (g.oltre ? " over" : "")} style={{ height: Math.max(6, (g.kcal / maxKcal) * 100) + "%" }} />
                    ) : (
                      <div className="kn-chart-bar" style={{ height: "4px", background: "var(--line)" }} title="Nessun dato" />
                    )}
                    <span className="kn-chart-bar-lbl">{g.label}</span>
                  </div>
                ))}
              </div>

              <div className="kn-profile-heading">Ripartizione macro (obiettivo)</div>
              <div className="kn-donut-card">
                <div className="kn-donut" style={{ background: donutGradient }} />
                <div className="kn-donut-legend">
                  <div><span className="kn-donut-dot" style={{ background: "var(--accent)" }} />Carboidrati {carbP2}%</div>
                  <div><span className="kn-donut-dot" style={{ background: "var(--fat)" }} />Grassi {fatP2}%</div>
                  <div><span className="kn-donut-dot" style={{ background: "var(--carb)" }} />Proteine {proteinP2}%</div>
                </div>
              </div>

              <div className="kn-success-card">
                {giorniConDati.length === 0
                  ? "Non hai ancora registrazioni negli ultimi 7 giorni — inizia a segnare i pasti per vedere i tuoi progressi qui."
                  : giorniInLinea >= Math.ceil(giorniConDati.length * 0.7)
                  ? `Stai andando bene: sei rimasto nel tuo obiettivo per ${giorniInLinea} giorni su ${giorniConDati.length} registrati.`
                  : `Sei rimasto nel tuo obiettivo per ${giorniInLinea} giorni su ${giorniConDati.length} registrati — anche un giorno in più fa la differenza.`}
              </div>
            </>
          );
        })()}

        {screen === "assistente" && (
          <>
            <button className="kn-back-link" onClick={() => { setGiornoVisualizzato(null); setScreen("diario"); }}>‹ torna al diario</button>
            <div className="kn-ai-header">
              <div className="kn-ai-robot">🤖</div>
              <h1 className="kn-h1" style={{ marginTop: 10 }}>Assistente nutrizionale</h1>
              <p className="kn-sub">Osservazioni sulla tua settimana</p>
            </div>

            {caricandoAssistente && <div className="kn-loading"><span className="kn-spinner" /> Sto guardando i tuoi ultimi giorni…</div>}
            {erroreAssistente && <p className="kn-error">{erroreAssistente}</p>}
            {!caricandoAssistente && !erroreAssistente && assistenteOsservazioni.length === 0 && (
              <div className="kn-empty">Nessuna osservazione disponibile al momento.</div>
            )}
            {!caricandoAssistente && assistenteOsservazioni.map((o, i) => (
              <div className="kn-ai-card" key={i}>
                <div className="kn-ai-card-title">{o.titolo}</div>
                <div className="kn-ai-card-text">{o.testo}</div>
              </div>
            ))}

            {!caricandoAssistente && (
              <button className="kn-btn kn-btn-ghost" style={{ marginTop: 8 }} onClick={generaOsservazioniAI}>Aggiorna osservazioni</button>
            )}
          </>
        )}

        {screen === "frigo" && (() => {
          const itemsCategoria = frigoItems.filter((it) => (it.categoria || "frigo") === categoriaAttiva);
          const luogo = categoriaAttiva === "frigo" ? "frigo" : "dispensa";
          return (
            <>
              <button className="kn-back-link" onClick={() => { resetScansione(); setGiornoVisualizzato(null); setScreen("diario"); }}>‹ torna al diario</button>
              <h1 className="kn-h1">Frigo e dispensa</h1>
              <p className="kn-sub">Tienilo aggiornato: "Consiglia" userà questi ingredienti per proporti la cena senza doverli riscrivere ogni volta.</p>

              <div className="kn-toggle-row">
                <div className={"kn-toggle" + (categoriaAttiva === "frigo" ? " sel" : "")} onClick={() => { setCategoriaAttiva("frigo"); resetScansione(); }}>Frigo</div>
                <div className={"kn-toggle" + (categoriaAttiva === "dispensa" ? " sel" : "")} onClick={() => { setCategoriaAttiva("dispensa"); resetScansione(); }}>Dispensa</div>
              </div>

              {scansioneSub === "idle" && (
                <>
                  <label className="kn-drop" htmlFor="input-scansione" style={{ padding: "22px 20px", marginBottom: 16 }}>
                    <div className="kn-drop-icon">📷</div>
                    <div className="kn-drop-label">Fai una foto dentro il {luogo}</div>
                    <div className="kn-drop-hint">Riconosco cosa c'è, poi confermi tu cosa tenere</div>
                  </label>
                  <input
                    id="input-scansione"
                    ref={scansioneRef}
                    type="file"
                    accept="image/*"
                    style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    onChange={(e) => gestisciFotoScansione(e.target.files && e.target.files[0])}
                  />
                  {erroreScansione && <p className="kn-error">{erroreScansione}</p>}

                  <div className="kn-fridge-add-row">
                    <input className="kn-input" type="text" placeholder={`es. ${categoriaAttiva === "frigo" ? "Petto di pollo" : "Pasta"}`} value={nuovoFrigoNome} onChange={(e) => setNuovoFrigoNome(e.target.value)} />
                    <input className="kn-input" type="text" placeholder="qtà" value={nuovoFrigoQta} onChange={(e) => setNuovoFrigoQta(e.target.value)} />
                  </div>
                  <button className="kn-btn kn-btn-ghost" style={{ marginBottom: 18 }} onClick={aggiungiAlFrigo} disabled={!nuovoFrigoNome.trim()}>+ aggiungi manualmente</button>

                  {caricandoFrigo && <div className="kn-loading"><span className="kn-spinner" /> Carico…</div>}
                  {!caricandoFrigo && itemsCategoria.length === 0 && <div className="kn-empty">Ancora nessun alimento in {luogo}.</div>}
                  {!caricandoFrigo && itemsCategoria.length > 0 && (
                    <div className="kn-fridge-list">
                      {itemsCategoria.map((it) => (
                        <div className="kn-fridge-item" key={it.id}>
                          <span className="kn-fridge-icon">{iconaFrigo(it.nome)}</span>
                          <div style={{ flex: 1 }}>
                            <div className="kn-fridge-name">{it.nome}</div>
                            <div className="kn-fridge-qty">{it.quantita}</div>
                          </div>
                          <button className="kn-ing-del" onClick={() => rimuoviDalFrigo(it.id)} title="Rimuovi">✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    className="kn-btn"
                    disabled={frigoItems.length === 0}
                    onClick={() => {
                      resetConsiglio();
                      setDescrizioneFrigo(descrizioneDalFrigo());
                      setScreen("consiglio");
                    }}
                  >
                    Cosa cucino stasera?
                  </button>
                </>
              )}

              {scansioneSub === "analisi" && (
                <>
                  {fotoScansioneDataUrl && <img className="kn-photo-preview" src={fotoScansioneDataUrl} alt={`Foto del ${luogo}`} />}
                  <div className="kn-loading"><span className="kn-spinner" /> Sto guardando cosa c'è nel {luogo}…</div>
                </>
              )}

              {scansioneSub === "conferma" && (
                <>
                  {fotoScansioneDataUrl && <img className="kn-photo-preview" src={fotoScansioneDataUrl} alt={`Foto del ${luogo}`} />}
                  <p className="kn-sub" style={{ marginBottom: 12 }}>
                    {risultatiScansione.length === 0
                      ? "Non ho riconosciuto nulla con sicurezza da questa foto."
                      : "Ho tolto la spunta a quello che non riconosci: aggiungo solo le voci selezionate."}
                  </p>
                  {risultatiScansione.map((it) => (
                    <div className="kn-check-row" key={it.id} onClick={() => toggleSelezioneScansione(it.id)}>
                      <span className={"kn-check-box" + (it.selezionato ? " on" : "")}>{it.selezionato ? "✓" : ""}</span>
                      {it.nome}{it.quantita ? ` — ${it.quantita}` : ""}
                    </div>
                  ))}
                  <div className="kn-btn-row">
                    <button className="kn-btn kn-btn-ghost" onClick={resetScansione}>Annulla</button>
                    <button className="kn-btn" onClick={confermaScansione} disabled={risultatiScansione.every((it) => !it.selezionato)}>
                      Aggiungi selezionati
                    </button>
                  </div>
                </>
              )}
            </>
          );
        })()}

        {screen === "consiglio" && (() => {
          const budgetPasto = calcolaBudgetPasto(pastoConsiglio);
          return (
            <>
              <button className="kn-back-link" onClick={() => { resetConsiglio(); setRiduzioneRecuperoAttiva(false); setGiornoVisualizzato(null); setScreen("diario"); }}>‹ torna al diario</button>
              <h1 className="kn-h1">Cosa mangio</h1>
              <p className="kn-sub">Ti propongo due opzioni in linea col tuo piano — da quello che hai in casa, o leggendo un menù.</p>

              <div className="kn-field">
                <label className="kn-label">Per quale pasto?</label>
                <div className="kn-toggle-row">
                  <div className={"kn-toggle" + (pastoConsiglio === "Pranzo" ? " sel" : "")} onClick={() => setPastoConsiglio("Pranzo")}>Pranzo</div>
                  <div className={"kn-toggle" + (pastoConsiglio === "Cena" ? " sel" : "")} onClick={() => setPastoConsiglio("Cena")}>Cena</div>
                </div>
              </div>

              {riduzioneRecuperoAttiva && (
                <div className="kn-success-card" style={{ marginBottom: 12 }}>
                  Obiettivo di oggi leggermente più leggero per bilanciare ieri — capita, nessun problema. <button className="kn-link" style={{ fontSize: 12.5 }} onClick={() => setRiduzioneRecuperoAttiva(false)}>usa l'obiettivo normale</button>
                </div>
              )}

              <div className="kn-residuo-box">
                <span className="kn-residuo-label">{budgetPasto.base === "residuo" ? "Kcal rimaste oggi" : budgetPasto.base === "recupero" ? "Obiettivo di oggi" : "Porzione indicata a pranzo"}</span>
                <span className="kn-residuo-num">{budgetPasto.kcal}</span>
              </div>

              {consiglioSub === "input" && (
                <>
                  <div className="kn-toggle-row" style={{ marginBottom: 18 }}>
                    <div className={"kn-toggle" + (consiglioModo === "frigo" ? " sel" : "")} onClick={() => setConsiglioModo("frigo")}>Cosa ho in casa</div>
                    <div className={"kn-toggle" + (consiglioModo === "menu" ? " sel" : "")} onClick={() => setConsiglioModo("menu")}>Consulta menù</div>
                  </div>

                  {consiglioModo === "frigo" && (
                    <>
                      <div className="kn-field">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <label className="kn-label">Cosa hai in frigo o in dispensa?</label>
                          {frigoItems.length > 0 && (
                            <button className="kn-link" style={{ fontSize: 12 }} onClick={() => setDescrizioneFrigo(descrizioneDalFrigo())}>
                              usa il mio frigo
                            </button>
                          )}
                        </div>
                        <textarea
                          className="kn-textarea"
                          value={descrizioneFrigo}
                          onChange={(e) => setDescrizioneFrigo(e.target.value)}
                          placeholder="es. uova, zucchine, un petto di pollo, riso, yogurt greco…"
                        />
                      </div>

                      <div className="kn-or-sep">oppure</div>

                      <label className="kn-drop" htmlFor="input-foto-frigo">
                        <div className="kn-drop-icon">🧊</div>
                        <div className="kn-drop-label">{fotoFrigoDataUrl ? "Foto caricata — tocca per cambiarla" : "Fai una foto al frigo"}</div>
                        <div className="kn-drop-hint">Viene usata solo per generare le proposte, non viene salvata</div>
                      </label>
                      <input
                        id="input-foto-frigo"
                        ref={fileFrigoRef}
                        type="file"
                        accept="image/*"
                        style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                        onChange={(e) => gestisciFotoFrigo(e.target.files && e.target.files[0])}
                      />
                      {fotoFrigoDataUrl && <img className="kn-photo-preview" style={{ marginTop: 12 }} src={fotoFrigoDataUrl} alt="Foto del frigo" />}

                      <div className="kn-check-row" style={{ marginTop: 20 }} onClick={() => setVuoiDolce((v) => !v)}>
                        <span className={"kn-check-box" + (vuoiDolce ? " on" : "")}>{vuoiDolce ? "✓" : ""}</span>
                        Vuoi considerare anche un dolce, se rientra nelle kcal rimaste?
                      </div>

                      {erroreConsiglio && <p className="kn-error">{erroreConsiglio}</p>}

                      <button className="kn-btn" onClick={() => chiediConsiglio()} disabled={!descrizioneFrigo && !fotoFrigoDataUrl}>Proponimi qualcosa</button>
                    </>
                  )}

                  {consiglioModo === "menu" && (
                    <>
                      <label className="kn-drop" htmlFor="input-foto-menu">
                        <div className="kn-drop-icon">📋</div>
                        <div className="kn-drop-label">Fai una foto al menù</div>
                        <div className="kn-drop-hint">La leggo, ti consiglio cosa scegliere, e poi la scarto — non viene mai salvata</div>
                      </label>
                      <input
                        id="input-foto-menu"
                        ref={fileMenuRef}
                        type="file"
                        accept="image/*"
                        style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                        onChange={(e) => gestisciFotoMenu(e.target.files && e.target.files[0])}
                      />
                      {erroreConsiglio && <p className="kn-error">{erroreConsiglio}</p>}
                    </>
                  )}
                </>
              )}

              {consiglioSub === "analisi" && (
                <div className="kn-loading"><span className="kn-spinner" /> {consiglioModo === "menu" ? "Sto leggendo il menù…" : "Sto pensando alla soluzione migliore…"}</div>
              )}

              {consiglioSub === "proposte" && (
                <>
                  {proposteCena.length === 0 && <div className="kn-empty">Nessuna proposta generata, riprova.</div>}
                  {proposteCena.map((p, idx) => (
                    <div className="kn-proposta-card" key={idx}>
                      <div className="kn-proposta-top">
                        <span className="kn-proposta-nome">{p.nome}</span>
                        <span className="kn-proposta-kcal">{p.kcalTotali} kcal</span>
                      </div>
                      {p.modo === "menu" ? (
                        <>
                          <div className="kn-proposta-meta">dal menù</div>
                          <div className="kn-proposta-ing">{p.motivo}</div>
                          {p.consiglioPorzione && <div className="kn-proposta-ing" style={{ fontStyle: "italic" }}>{p.consiglioPorzione}</div>}
                        </>
                      ) : (
                        <>
                          <div className="kn-proposta-meta">{p.tempoMinuti} min · {p.dolceIncluso ? "con dolce" : "senza dolce"}</div>
                          <div className="kn-proposta-ing">{(p.ingredienti || []).map((i) => `${i.nome} (${i.grammi}g)`).join(" · ")}</div>
                          {p.passaggi && p.passaggi.length > 0 && (
                            <ol className="kn-proposta-steps">
                              {p.passaggi.map((s, i) => (<li key={i}>{s}</li>))}
                            </ol>
                          )}
                          {p.notaIntegrazione && (
                            <div className="kn-nota-integrazione">🛒 {p.notaIntegrazione}</div>
                          )}
                        </>
                      )}
                      <div className="kn-proposta-btnrow">
                        <button className="kn-proposta-btn-sm" onClick={() => condividiProposta(p)}>Condividi con la community</button>
                        <button className="kn-proposta-btn-sm principale" onClick={() => registraProposta(p)}>Registra come {pastoConsiglio.toLowerCase()}</button>
                      </div>
                    </div>
                  ))}
                  <button className="kn-btn kn-btn-ghost" onClick={() => setConsiglioSub("input")}>Rifai la richiesta</button>
                </>
              )}
            </>
          );
        })()}

        {screen === "ricette" && (
          <>
            <button className="kn-back-link" onClick={() => { setGiornoVisualizzato(null); setScreen("diario"); }}>‹ torna al diario</button>
            <h1 className="kn-h1">Ricette salvate</h1>
            <p className="kn-sub">Le foto analizzate e confermate come ricetta restano qui, rinominabili in ogni momento.</p>

            {caricandoRicette && <div className="kn-loading"><span className="kn-spinner" /> Carico le ricette…</div>}
            {!caricandoRicette && ricette.length === 0 && <div className="kn-empty">Nessuna ricetta salvata ancora.</div>}
            {!caricandoRicette && ricette.map((r) => (
              <div className="kn-recipe-card" key={r.id}>
                {r.foto ? <img className="kn-recipe-thumb" src={r.foto} alt={r.nome} /> : <div className="kn-recipe-thumb" />}
                <div className="kn-recipe-info">
                  <input className="kn-recipe-name-input" value={r.nome} onChange={(e) => rinominaRicetta(r.id, e.target.value)} />
                  <div className="kn-recipe-meta">{r.kcalTotali} kcal · {r.ingredienti.length} ingredienti</div>
                </div>
                <button className="kn-recipe-del" onClick={() => eliminaRicetta(r.id)}>elimina</button>
              </div>
            ))}
          </>
        )}

      </div>
      <p className="kn-credit">creato da Damiano Bombonato</p>
    </div>
  );
}
