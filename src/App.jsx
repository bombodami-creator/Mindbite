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
.kn-macro-grams { font-size: 14px; }
.kn-macro-pct { font-size: 12px; color: var(--ink-soft); }
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
const FATSECRET_API_BASE = "https://mindbite.bombodami.workers.dev";

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

function Navbar({ screen, setScreen, onCommunity, onFoto }) {
  return (
    <div className="kn-navbar">
      <div className={"kn-navbar-tab" + (screen === "diario" ? " active" : "")} onClick={() => setScreen("diario")}>
        <div style={{ fontSize: 17 }}>🏠</div>Home
      </div>
      <div className={"kn-navbar-tab" + (screen === "calendario" ? " active" : "")} onClick={() => setScreen("calendario")}>
        <div style={{ fontSize: 17 }}>📅</div>Diario
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

export default function MindbiteApp() {
  const [screen, setScreen] = useState("login");
  const [tema, setTema] = useState("chiaro");
  const [salvato, setSalvato] = useState(false);
  const fileInputRef = useRef(null);

  // --- Account: email/password ricordati, profilo persistente ---
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountEsistente, setAccountEsistente] = useState(null); // null = ancora in caricamento
  const [erroreLogin, setErroreLogin] = useState(null);
  const [caricandoAccount, setCaricandoAccount] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("account:profilo", false);
        if (r) {
          const p = JSON.parse(r.value);
          setAccountEsistente(true);
          setAccountEmail(p.email || "");
        } else {
          setAccountEsistente(false);
        }
      } catch (e) {
        setAccountEsistente(false);
      }
      setCaricandoAccount(false);
    })();
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
    try {
      const r = await window.storage.get("account:profilo", false);
      const p = r ? JSON.parse(r.value) : null;
      if (!p || p.email !== accountEmail.trim() || p.password !== accountPassword) {
        setErroreLogin("Email o password non corretti.");
        return;
      }
      caricaProfiloInStato(p);
      setScreen("diario");
    } catch (e) {
      setErroreLogin("Non sono riuscito ad accedere. Riprova.");
    }
  }

  function iniziaRegistrazione() {
    setErroreLogin(null);
    if (!accountEmail.trim() || !accountPassword) {
      setErroreLogin("Inserisci email e password per registrarti.");
      return;
    }
    setScreen("tutorial");
  }

  // --- Recupero password (codice temporaneo, simulato: senza invio email vero) ---
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
  }

  async function richiediCodiceRecupero() {
    setRecuperaErrore(null);
    try {
      const r = await window.storage.get("account:profilo", false);
      const p = r ? JSON.parse(r.value) : null;
      if (!p || p.email !== recuperaEmail.trim()) {
        setRecuperaErrore("Non trovo nessun account con questa email su questo dispositivo.");
        return;
      }
      setRecuperaCodice(generaCodiceTemporaneo());
    } catch (e) {
      setRecuperaErrore("Non sono riuscito a verificare l'account. Riprova.");
    }
  }

  async function confermaNuovaPassword() {
    setRecuperaErrore(null);
    if (recuperaCodiceInserito.trim() !== recuperaCodice) {
      setRecuperaErrore("Codice non corretto.");
      return;
    }
    if (!recuperaNuovaPassword) {
      setRecuperaErrore("Inserisci una nuova password.");
      return;
    }
    try {
      const r = await window.storage.get("account:profilo", false);
      const p = r ? JSON.parse(r.value) : null;
      if (!p) {
        setRecuperaErrore("Account non trovato.");
        return;
      }
      p.password = recuperaNuovaPassword;
      await window.storage.set("account:profilo", JSON.stringify(p), false);
      setRecuperaFatto(true);
    } catch (e) {
      setRecuperaErrore("Non sono riuscito ad aggiornare la password. Riprova.");
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
  const [fatP, setFatP] = useState(30);
  const proteinP = Math.max(10, 100 - carbP - fatP);

  const oggi = new Date();
  const [selectedDay, setSelectedDay] = useState(oggi.getDate());
  const primoGiornoMese = new Date(oggi.getFullYear(), oggi.getMonth(), 1);
  const giorniNelMese = new Date(oggi.getFullYear(), oggi.getMonth() + 1, 0).getDate();
  const offsetIniziale = (primoGiornoMese.getDay() + 6) % 7;

  // --- Diario: pasti modificabili ---
  const [pastiOggi, setPastiOggi] = useState(() => JSON.parse(JSON.stringify(PASTI_OGGI_INIT)));
  const [pastoDestinazione, setPastoDestinazione] = useState(null);
  const [dettagliEspansi, setDettagliEspansi] = useState({});
  const [pastiEspansi, setPastiEspansi] = useState({});

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
    setScreen("diario");
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
        ingredienti: ingredienti.map(({ nome, grammi, kcal }) => ({ nome, grammi, kcal })),
      });
    }
    setPastoDestinazione(null);
    resetFoto();
    setScreen("diario");
    setTimeout(() => setToastDiario(""), 4000);
  }

  // --- Andamento peso ---
  const [pesoStorico, setPesoStorico] = useState([]);
  const [caricandoPeso, setCaricandoPeso] = useState(false);
  const [nuovoPesoValore, setNuovoPesoValore] = useState("");

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
    const voce = { data: new Date().toISOString().slice(0, 10), peso: valore };
    const aggiornato = [...pesoStorico.filter((v) => v.data !== voce.data), voce].sort((a, b) => a.data.localeCompare(b.data));
    setPesoStorico(aggiornato);
    try {
      await window.storage.set("peso:storico", JSON.stringify(aggiornato), false);
    } catch (e) {}
    setNuovoPesoValore("");
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

  // --- Consiglio cena ---
  const [consiglioSub, setConsiglioSub] = useState("input"); // input | analisi | proposte
  const [descrizioneFrigo, setDescrizioneFrigo] = useState("");
  const [fotoFrigoDataUrl, setFotoFrigoDataUrl] = useState(null);
  const [vuoiDolce, setVuoiDolce] = useState(false);
  const [proposteCena, setProposteCena] = useState([]);
  const [erroreConsiglio, setErroreConsiglio] = useState(null);
  const fileFrigoRef = useRef(null);

  function resetConsiglio() {
    setConsiglioSub("input");
    setDescrizioneFrigo("");
    setFotoFrigoDataUrl(null);
    setVuoiDolce(false);
    setProposteCena([]);
    setErroreConsiglio(null);
  }

  function kcalConsumatiOggi() {
    return Object.values(pastiOggi).flat().reduce((s, i) => s + i.kcal, 0);
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

  async function chiediConsiglio() {
    setErroreConsiglio(null);
    setConsiglioSub("analisi");
    const target = (calc && calc.target) || 2100;
    const consumato = kcalConsumatiOggi();
    const kcalResidue = Math.max(0, target - consumato);
    const carbResiduo = calc ? Math.max(0, Math.round(calc.carbG * 0.45)) : 60;
    const fatResiduo = calc ? Math.max(0, Math.round(calc.fatG * 0.6)) : 25;
    const proteinResiduo = calc ? Math.max(0, Math.round(calc.proteinG * 0.55)) : 40;

    const testoPrompt =
      `Sei un nutrizionista pratico. Per la cena di oggi l'utente ha a disposizione circa ${kcalResidue} kcal, ` +
      `${carbResiduo}g di carboidrati, ${fatResiduo}g di grassi e ${proteinResiduo}g di proteine residui. ` +
      (vuoiDolce
        ? "Se rientra nelle kcal residue, includi un dolce semplice in almeno una delle proposte, altrimenti ometti il dolce e spiegalo nel nome della ricetta con una parentesi. "
        : "Non includere dolci. ") +
      "Proponi 2 opzioni di cena veloci da preparare (max 20-25 minuti), usando principalmente gli ingredienti disponibili indicati. " +
      "Rispondi SOLO con un array JSON valido, senza testo introduttivo, senza spiegazioni, senza blocchi markdown. Formato esatto: " +
      '[{"nome": string, "tempoMinuti": number, "dolceIncluso": boolean, "ingredienti": [{"nome": string, "grammi": number, "kcal": number}], "kcalTotali": number, "passaggi": [string]}]' +
      (descrizioneFrigo ? `\n\nIngredienti disponibili: ${descrizioneFrigo}` : "");

    const content = [];
    if (fotoFrigoDataUrl) {
      content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: fotoFrigoDataUrl.split(",")[1] } });
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
      setProposteCena(Array.isArray(parsed) ? parsed : []);
      setConsiglioSub("proposte");
    } catch (e) {
      console.error(e);
      setErroreConsiglio("Non sono riuscito a generare proposte. Riprova, magari con una descrizione più semplice.");
      setConsiglioSub("input");
    }
  }

  function registraProposta(p) {
    aggiungiAlPasto("Cena", { nome: p.nome, kcal: p.kcalTotali, ingredienti: p.ingredienti || [] });
    setToastDiario("Cena registrata dalla proposta.");
    setScreen("diario");
    resetConsiglio();
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
    const giorni = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(oggi);
      d.setDate(oggi.getDate() - i);
      const stato = i === 0 ? "ok" : statoGiorno(d.getDate(), d.getDate());
      const kcal = stato === "alto" ? target + 320 : stato === "basso" ? target - 380 : target - 40;
      giorni.push({ label: GIORNI_SETTIMANA[(d.getDay() + 6) % 7], kcal, stato, oltre: kcal > target });
    }
    return giorni;
  }, [calc, oggi]);

  const giorniInLinea = datiSettimana.filter((g) => !g.oltre).length;

  // --- Assistente AI ---
  const [assistenteOsservazioni, setAssistenteOsservazioni] = useState([]);
  const [caricandoAssistente, setCaricandoAssistente] = useState(false);
  const [erroreAssistente, setErroreAssistente] = useState(null);

  async function generaOsservazioniAI() {
    setCaricandoAssistente(true);
    setErroreAssistente(null);
    const target = (calc && calc.target) || 2100;
    const riepilogo = datiSettimana
      .map((g) => `${g.label}: ${g.kcal} kcal (obiettivo ${target})`)
      .join(", ");
    const prompt =
      `Sei un assistente nutrizionale sintetico e concreto. Ecco le kcal registrate negli ultimi 7 giorni di un utente ` +
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
              <div className="kn-macro-top"><span className="kn-macro-name">Carboidrati</span><span className="kn-macro-grams">{calc.carbG} g <span className="kn-macro-pct">({carbP}%)</span></span></div>
              <div className="kn-macro-bar-track"><div className="kn-macro-bar-fill" style={{ width: carbP + "%", background: "var(--carb)" }} /></div>
            </div>
            <div className="kn-macro-row">
              <div className="kn-macro-top"><span className="kn-macro-name">Grassi</span><span className="kn-macro-grams">{calc.fatG} g <span className="kn-macro-pct">({fatP}%)</span></span></div>
              <div className="kn-macro-bar-track"><div className="kn-macro-bar-fill" style={{ width: fatP + "%", background: "var(--fat)" }} /></div>
            </div>
            <div className="kn-macro-row">
              <div className="kn-macro-top"><span className="kn-macro-name">Proteine</span><span className="kn-macro-grams">{calc.proteinG} g <span className="kn-macro-pct">({proteinP}%)</span></span></div>
              <div className="kn-macro-bar-track"><div className="kn-macro-bar-fill" style={{ width: proteinP + "%", background: "var(--protein)" }} /></div>
            </div>
            <button className="kn-btn" style={{ marginTop: 12 }} onClick={async () => { await salvaProfiloPersistente(); setAccountEsistente(true); setScreen("diario"); }}>Salva e vai al diario</button>
          </>
        )}

        {screen === "diario" && (() => {
          const consumato = Object.values(pastiOggi).flat().reduce((s, i) => s + i.kcal, 0);
          const target = (calc && calc.target) || 2100;
          const pct = Math.min(100, Math.round((consumato / target) * 100));
          const sopra = consumato > target;
          return (
            <>
              <div className="kn-home-header">
                <div style={{ flex: 1 }}>
                  <div className="kn-greeting">Ciao!</div>
                  <div className="kn-greeting-sub">{oggi.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</div>
                </div>
                <button className="kn-icon-btn" onClick={() => { setScreen("assistente"); generaOsservazioniAI(); }} title="Assistente" style={{ marginRight: 6 }}>🤖</button>
                <button className="kn-icon-btn" onClick={() => setScreen("profilo")} title="Profilo">⚙️</button>
              </div>

              <div className="kn-home-top">
                <div className="kn-ring-card">
                  <KcalRing pct={pct} kcal={consumato} target={target} />
                </div>
                <div className="kn-rimaste-card">
                  <div className="kn-rimaste-lbl-top">Rimangono</div>
                  <div className="kn-rimaste-num">{sopra ? consumato - target : target - consumato} kcal</div>
                  <div className="kn-rimaste-lbl">per la cena</div>
                </div>
              </div>

              <div className="kn-mini-macros-card">
                <div className="kn-mini-macro"><div className="kn-mini-macro-top"><span>Carbo</span></div><b>{Math.round((calc ? calc.carbG : 210) * 0.55)}g / {calc ? calc.carbG : 210}g</b><div className="kn-mini-macro-track"><div className="kn-macro-bar-fill" style={{ width: "55%", background: "var(--accent)" }} /></div></div>
                <div className="kn-mini-macro"><div className="kn-mini-macro-top"><span>Grassi</span></div><b>{Math.round((calc ? calc.fatG : 93) * 0.62)}g / {calc ? calc.fatG : 93}g</b><div className="kn-mini-macro-track"><div className="kn-macro-bar-fill" style={{ width: "62%", background: "var(--accent)" }} /></div></div>
                <div className="kn-mini-macro"><div className="kn-mini-macro-top"><span>Proteine</span></div><b>{Math.round((calc ? calc.proteinG : 105) * 0.69)}g / {calc ? calc.proteinG : 105}g</b><div className="kn-mini-macro-track"><div className="kn-macro-bar-fill" style={{ width: "69%", background: "var(--accent)" }} /></div></div>
              </div>

              <div className="kn-diario-links" style={{ marginBottom: 18 }}>
                <button className="kn-diario-link" onClick={() => setScreen("calendario")}>calendario</button>
                <button className="kn-diario-link" onClick={() => { setScreen("ricette"); apriRicette(); }}>ricette</button>
                <button className="kn-diario-link" onClick={() => setScreen("statistiche")}>statistiche</button>
              </div>

              <div className="kn-profile-heading" style={{ marginTop: 4 }}>I tuoi pasti di oggi</div>
              <div className="kn-meal-list">
                {Object.entries(pastiOggi).map(([nome, items], i) => {
                  const tot = items.reduce((s, it) => s + it.kcal, 0);
                  const vuoto = items.length === 0;
                  const espansoPasto = !!pastiEspansi[nome];
                  return (
                    <React.Fragment key={nome}>
                      <div className="kn-meal-row" onClick={() => togglePastoEspanso(nome)}>
                        <span className="kn-meal-icon">{ICONE_PASTO[nome] || "🍴"}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="kn-meal-row-name">{nome}</div>
                          <div className="kn-meal-row-sub">{vuoto ? "Tocca per aggiungere" : `${items.length} ${items.length > 1 ? "alimenti" : "alimento"}`}</div>
                        </div>
                        <div className="kn-meal-row-kcal">{tot > 0 ? `${tot} kcal` : "—"}</div>
                      </div>

                      {espansoPasto && vuoto && (
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
                                    <button
                                      className="kn-ing-del"
                                      onClick={(e) => { e.stopPropagation(); rimuoviAlimento(nome, idx); }}
                                      title="Rimuovi"
                                    >✕</button>
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
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="kn-profile-heading" style={{ marginTop: 4 }}>Stasera</div>
              <div className="kn-entry-row">
                <div className="kn-entry-btn" onClick={() => { setPastoDestinazione("Cena"); resetFoto(); setScreen("foto"); }}>Foto del piatto</div>
                <div className="kn-entry-btn" onClick={() => { setPastoDestinazione("Cena"); resetCerca(); setScreen("cerca"); }}>Cerca alimento</div>
              </div>
              <div className="kn-entry-row">
                <div className="kn-entry-btn" onClick={() => { resetConsiglio(); apriFrigo(); setScreen("consiglio"); }}>Consiglia</div>
                <div className="kn-entry-btn" onClick={() => { apriFrigo(); setScreen("frigo"); }}>Il tuo frigo</div>
              </div>

              {toastDiario && <p className="kn-save-note">{toastDiario}</p>}

              <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onFoto={() => { setPastoDestinazione("Cena"); resetFoto(); setScreen("foto"); }} />
            </>
          );
        })()}

        {screen === "calendario" && (() => {
          const target = (calc && calc.target) || 2100;
          const celle = [];
          for (let i = 0; i < offsetIniziale; i++) celle.push(null);
          for (let d = 1; d <= giorniNelMese; d++) celle.push(d);
          const statoSel = statoGiorno(selectedDay, oggi.getDate());
          const kcalSel = statoSel === "alto" ? target + 320 : statoSel === "basso" ? target - 380 : statoSel === "ok" ? target - 40 : null;
          return (
            <>
              <div className="kn-cal-top">
                <button className="kn-cal-nav">‹</button>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: "0.02em" }}>{MESI[oggi.getMonth()]} {oggi.getFullYear()}</span>
                <button className="kn-cal-nav">›</button>
              </div>
              <div className="kn-cal-grid">
                {GIORNI_SETTIMANA.map((g, i) => (<div className="kn-cal-weekday" key={i}>{g}</div>))}
                {celle.map((d, i) => {
                  if (d === null) return <div className="kn-day-cell empty" key={i} />;
                  const stato = statoGiorno(d, oggi.getDate());
                  return (
                    <div key={i} className={"kn-day-cell" + (d === oggi.getDate() ? " today" : "") + (d === selectedDay ? " sel" : "")} onClick={() => setSelectedDay(d)}>
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
              <div className="kn-day-detail">
                <div className="kn-day-detail-top">
                  <span className="kn-day-detail-date">{selectedDay} {MESI[oggi.getMonth()].toLowerCase()}</span>
                  <span className="kn-day-detail-kcal">{kcalSel ? `${kcalSel} kcal` : "nessun dato"}</span>
                </div>
                {kcalSel ? (
                  <div className="kn-bar-track"><div className={"kn-bar-fill" + (kcalSel > target ? " over" : "")} style={{ width: Math.min(100, Math.round((kcalSel / target) * 100)) + "%" }} /></div>
                ) : (
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", fontStyle: "italic" }}>Nessuna registrazione per questo giorno</div>
                )}
              </div>
              <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onFoto={() => { setPastoDestinazione("Cena"); resetFoto(); setScreen("foto"); }} />
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

            <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onFoto={() => { setPastoDestinazione("Cena"); resetFoto(); setScreen("foto"); }} />
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

            <button className="kn-btn kn-btn-ghost" style={{ marginBottom: 10 }} onClick={() => { apriPesoStorico(); setScreen("peso-storico"); }}>Andamento peso</button>
            <button className="kn-btn kn-btn-ghost" style={{ marginBottom: 10 }} onClick={() => setScreen("statistiche")}>Vedi statistiche</button>
            <button className="kn-btn" onClick={async () => { await salvaProfiloPersistente(); setSalvato(true); }}>Salva modifiche</button>
            {salvato && <p className="kn-save-note">Modifiche salvate</p>}

            <Navbar screen={screen} setScreen={setScreen} onCommunity={apriProposte} onFoto={() => { setPastoDestinazione("Cena"); resetFoto(); setScreen("foto"); }} />
          </>
        )}

        {screen === "foto" && (
          <>
            <button className="kn-back-link" onClick={() => { resetFoto(); setScreen("diario"); }}>‹ torna al diario</button>
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
            <button className="kn-back-link" onClick={() => { resetCerca(); setPastoDestinazione(null); setScreen("diario"); }}>‹ torna al diario</button>
            <h1 className="kn-h1">Cerca alimento</h1>
            <p className="kn-sub">
              {pastoDestinazione ? `Aggiungi a: ${pastoDestinazione}` : "Scegli un pasto"} — cerca, scegli l'unità e la quantità.
            </p>

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

        {screen === "peso-storico" && (
          <>
            <button className="kn-back-link" onClick={() => setScreen("profilo")}>‹ torna al profilo</button>
            <h1 className="kn-h1">Andamento peso</h1>
            <p className="kn-sub">Registra il peso quando vuoi: il tuo fabbisogno calorico si aggiorna automaticamente su quello più recente.</p>

            <div className="kn-fridge-add-row">
              <input className="kn-input" type="number" placeholder="es. 92.5" value={nuovoPesoValore} onChange={(e) => setNuovoPesoValore(e.target.value)} />
              <button className="kn-btn" style={{ flex: 1 }} onClick={registraPeso} disabled={!nuovoPesoValore}>Registra</button>
            </div>

            {caricandoPeso && <div className="kn-loading"><span className="kn-spinner" /> Carico lo storico…</div>}

            {!caricandoPeso && (
              <div className="kn-weight-card">
                <GraficoPeso dati={pesoStorico} pesoObiettivo={pesoObiettivo} />
              </div>
            )}

            {!caricandoPeso && pesoStorico.length === 0 && <div className="kn-empty">Nessuna pesata registrata ancora.</div>}
            {!caricandoPeso && [...pesoStorico].reverse().map((v) => (
              <div className="kn-weight-log-row" key={v.data}>
                <span>{new Date(v.data + "T00:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <b>{v.peso} kg</b>
                  <button className="kn-ing-del" onClick={() => rimuoviPesoVoce(v.data)} title="Rimuovi">✕</button>
                </span>
              </div>
            ))}
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
              <button className="kn-back-link" onClick={() => setScreen("diario")}>‹ torna al diario</button>
              <h1 className="kn-h1">Statistiche</h1>
              <p className="kn-sub">Ultimi 7 giorni</p>

              <div className="kn-chart-card">
                {datiSettimana.map((g, i) => (
                  <div className="kn-chart-bar-wrap" key={i}>
                    <div className={"kn-chart-bar" + (g.oltre ? " over" : "")} style={{ height: Math.max(6, (g.kcal / maxKcal) * 100) + "%" }} />
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
                {giorniInLinea >= 5
                  ? `Stai andando bene: sei rimasto nel tuo obiettivo per ${giorniInLinea} giorni su 7.`
                  : `Questa settimana sei rimasto nel tuo obiettivo per ${giorniInLinea} giorni su 7 — anche un giorno in più fa la differenza.`}
              </div>
            </>
          );
        })()}

        {screen === "assistente" && (
          <>
            <button className="kn-back-link" onClick={() => setScreen("diario")}>‹ torna al diario</button>
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
              <button className="kn-back-link" onClick={() => { resetScansione(); setScreen("diario"); }}>‹ torna al diario</button>
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
          const target = (calc && calc.target) || 2100;
          const kcalResidue = Math.max(0, target - kcalConsumatiOggi());
          return (
            <>
              <button className="kn-back-link" onClick={() => { resetConsiglio(); setScreen("diario"); }}>‹ torna al diario</button>
              <h1 className="kn-h1">Cosa mangio stasera</h1>
              <p className="kn-sub">Ti propongo due cene veloci che rientrano nelle kcal rimaste, con quello che hai in casa.</p>

              <div className="kn-residuo-box">
                <span className="kn-residuo-label">Kcal rimaste oggi</span>
                <span className="kn-residuo-num">{kcalResidue}</span>
              </div>

              {consiglioSub === "input" && (
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

                  <button className="kn-btn" onClick={chiediConsiglio} disabled={!descrizioneFrigo && !fotoFrigoDataUrl}>Proponimi qualcosa</button>
                </>
              )}

              {consiglioSub === "analisi" && (
                <div className="kn-loading"><span className="kn-spinner" /> Sto pensando alla cena migliore…</div>
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
                      <div className="kn-proposta-meta">{p.tempoMinuti} min · {p.dolceIncluso ? "con dolce" : "senza dolce"}</div>
                      <div className="kn-proposta-ing">{(p.ingredienti || []).map((i) => `${i.nome} (${i.grammi}g)`).join(" · ")}</div>
                      {p.passaggi && p.passaggi.length > 0 && (
                        <ol className="kn-proposta-steps">
                          {p.passaggi.map((s, i) => (<li key={i}>{s}</li>))}
                        </ol>
                      )}
                      <div className="kn-proposta-btnrow">
                        <button className="kn-proposta-btn-sm" onClick={() => condividiProposta(p)}>Condividi con la community</button>
                        <button className="kn-proposta-btn-sm principale" onClick={() => registraProposta(p)}>Registra questa cena</button>
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
            <button className="kn-back-link" onClick={() => setScreen("diario")}>‹ torna al diario</button>
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
