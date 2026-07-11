:root {
  --admin-bg: #070A18;
  --admin-surface: #101426;
  --admin-surface-2: #151A30;
  --admin-border: rgba(255,255,255,.11);
  --admin-text: #F8FAFC;
  --admin-muted: #A5B0CF;
  --admin-primary: #5A5EF0;
  --admin-danger: #EF4444;
  --admin-radius: 18px;
}
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--admin-text);
  background:
    radial-gradient(circle at top left, rgba(90,94,240,.20), transparent 36%),
    radial-gradient(circle at bottom right, rgba(56,189,248,.12), transparent 32%),
    var(--admin-bg);
}
button, input, textarea, select { font: inherit; }
.admin-shell { min-height: 100vh; display: flex; flex-direction: column; }
.admin-topbar {
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 18px;
  border-bottom: 1px solid var(--admin-border);
  background: rgba(8,11,26,.82);
  backdrop-filter: blur(18px);
  position: sticky;
  top: 0;
  z-index: 20;
}
.admin-brand { display: flex; align-items: center; gap: 12px; min-width: 220px; }
.admin-brand-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg,#5A5EF0,#38BDF8);
  box-shadow: 0 12px 28px rgba(90,94,240,.28);
  font-weight: 900;
  letter-spacing: -.05em;
}
.admin-brand-icon.large { width: 64px; height: 64px; border-radius: 20px; font-size: 22px; margin-bottom: 18px; }
.admin-brand strong { display: block; font-size: 15px; }
.admin-brand span { display: block; color: var(--admin-muted); font-size: 12px; margin-top: 2px; }
.admin-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px; }
.admin-btn {
  border: 0;
  border-radius: 12px;
  padding: 10px 14px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: transform .2s ease, background .2s ease, border-color .2s ease;
}
.admin-btn:hover { transform: translateY(-1px); }
.admin-btn-primary { background: linear-gradient(135deg,#5A5EF0,#3B3FD8); box-shadow: 0 14px 28px rgba(90,94,240,.24); }
.admin-btn-soft { background: rgba(255,255,255,.075); border: 1px solid var(--admin-border); }
.admin-btn-danger { background: rgba(239,68,68,.18); border: 1px solid rgba(239,68,68,.35); color: #FECACA; }
.admin-btn.full { width: 100%; justify-content: center; }
.admin-workspace {
  min-height: calc(100vh - 74px);
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 390px;
  gap: 14px;
  padding: 14px;
}
.admin-sidebar, .editor-panel {
  min-height: 0;
  overflow: auto;
}
.panel-card, .editor-box, .empty-editor {
  border: 1px solid var(--admin-border);
  border-radius: var(--admin-radius);
  background: rgba(16,20,38,.86);
  box-shadow: 0 18px 42px rgba(0,0,0,.22);
}
.panel-card { padding: 18px; margin-bottom: 14px; }
.panel-card h2, .editor-box h2, .empty-editor h2 { margin: 0 0 8px; font-size: 16px; }
.panel-card p, .empty-editor p { margin: 0 0 16px; color: var(--admin-muted); line-height: 1.6; font-size: 13px; }
.help-card ol { margin: 0; padding-left: 20px; color: var(--admin-muted); font-size: 13px; line-height: 1.8; }
.form-grid { display: grid; gap: 14px; }
.form-grid.compact { grid-template-columns: 1fr 1fr; gap: 12px; }
.form-grid label, .field-row label {
  display: grid;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: rgba(255,255,255,.82);
}
.form-grid input, .form-grid textarea, .form-grid select, .field-row input, .field-row textarea {
  width: 100%;
  border: 1px solid var(--admin-border);
  border-radius: 12px;
  background: rgba(255,255,255,.065);
  color: #fff;
  padding: 11px 12px;
  outline: none;
}
.form-grid input[type="color"], .field-row input[type="color"] { height: 42px; padding: 4px; cursor: pointer; }
.form-grid textarea, .field-row textarea { min-height: 86px; resize: vertical; line-height: 1.55; }
.preview-wrap {
  min-width: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--admin-border);
  border-radius: var(--admin-radius);
  overflow: hidden;
  background: rgba(8,11,26,.7);
}
.preview-toolbar {
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border-bottom: 1px solid var(--admin-border);
  color: var(--admin-muted);
  font-size: 13px;
}
.preview-toolbar a { color: #C7D2FE; text-decoration: none; font-weight: 800; }
#landingPreview {
  width: 100%;
  height: calc(100vh - 74px - 46px - 28px);
  border: 0;
  background: #060817;
  margin: 0 auto;
  transition: width .25s ease;
}
.preview-wrap.tablet #landingPreview { width: 820px; max-width: 100%; }
.preview-wrap.mobile #landingPreview { width: 390px; max-width: 100%; }
.editor-panel { display: flex; flex-direction: column; gap: 14px; }
.empty-editor { min-height: 330px; display: grid; place-items: center; align-content: center; text-align: center; padding: 34px; }
.empty-icon { width: 58px; height: 58px; display: grid; place-items: center; margin-bottom: 16px; border-radius: 18px; background: rgba(90,94,240,.18); color: #C7D2FE; font-size: 28px; }
.editor-box { padding: 16px; margin-bottom: 14px; }
.editor-box > p { margin: 0 0 14px; color: var(--admin-muted); font-size: 13px; line-height: 1.6; }
.section-pill {
  display: inline-flex;
  max-width: 100%;
  margin: 0 0 14px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(90,94,240,.16);
  color: #C7D2FE;
  font-size: 12px;
  font-weight: 900;
}
.field-row {
  padding: 13px 0;
  border-top: 1px solid rgba(255,255,255,.08);
}
.field-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  color: rgba(255,255,255,.9);
  font-size: 12px;
  font-weight: 900;
}
.field-head span:last-child { color: var(--admin-muted); font-weight: 700; }
.inline-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.small-btn {
  border: 1px solid var(--admin-border);
  background: rgba(255,255,255,.07);
  color: #fff;
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}
.file-note { display: block; margin-top: 6px; color: var(--admin-muted); font-size: 11px; line-height: 1.5; }
details.editor-box summary { cursor: pointer; font-weight: 900; }
.admin-login-screen {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 22px;
}
.admin-login-card {
  width: min(430px, 100%);
  padding: 34px;
  border-radius: 26px;
  border: 1px solid var(--admin-border);
  background: rgba(16,20,38,.88);
  box-shadow: 0 28px 80px rgba(0,0,0,.38);
}
.login-eyebrow { margin: 0 0 8px; color: #A5B4FC; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .14em; }
.admin-login-card h1 { margin: 0 0 10px; font-size: 30px; letter-spacing: -.05em; }
.admin-login-card p { color: var(--admin-muted); line-height: 1.6; }
.admin-login-card label { display: grid; gap: 8px; margin-top: 14px; color: rgba(255,255,255,.82); font-size: 13px; font-weight: 800; }
.admin-login-card input {
  border: 1px solid var(--admin-border);
  border-radius: 14px;
  background: rgba(255,255,255,.07);
  color: #fff;
  padding: 13px 14px;
  outline: none;
}
.login-error { min-height: 20px; margin: 12px 0; color: #FCA5A5 !important; font-size: 13px; font-weight: 800; }
.back-link { display: block; margin-top: 18px; color: #C7D2FE; text-decoration: none; text-align: center; font-size: 13px; font-weight: 800; }
.admin-toast {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 60;
  transform: translateY(16px);
  opacity: 0;
  pointer-events: none;
  border-radius: 14px;
  border: 1px solid var(--admin-border);
  background: rgba(15,23,42,.96);
  color: #fff;
  padding: 12px 14px;
  box-shadow: 0 20px 45px rgba(0,0,0,.32);
  transition: opacity .22s ease, transform .22s ease;
  font-size: 13px;
  font-weight: 800;
}
.admin-toast.show { opacity: 1; transform: translateY(0); }
@media (max-width: 1180px) {
  .admin-workspace { grid-template-columns: 250px minmax(0,1fr); }
  .editor-panel { grid-column: 1 / -1; max-height: none; }
}
@media (max-width: 820px) {
  .admin-topbar { height: auto; align-items: flex-start; flex-direction: column; }
  .admin-actions { justify-content: flex-start; }
  .admin-workspace { grid-template-columns: 1fr; min-height: auto; }
  #landingPreview { height: 72vh; }
}

.section-list-card { max-height: 340px; overflow: auto; }
.section-list { display: grid; gap: 8px; }
.section-list-btn {
  width: 100%;
  display: grid;
  grid-template-columns: 26px 1fr;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--admin-border);
  border-radius: 13px;
  background: rgba(255,255,255,.055);
  color: rgba(255,255,255,.88);
  padding: 10px;
  text-align: left;
  cursor: pointer;
  transition: border-color .18s ease, background .18s ease, transform .18s ease;
}
.section-list-btn:hover,
.section-list-btn.active {
  border-color: rgba(129,140,248,.74);
  background: rgba(90,94,240,.18);
}
.section-list-btn:hover { transform: translateY(-1px); }
.section-list-btn span {
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: rgba(255,255,255,.08);
  color: #C7D2FE;
  font-size: 11px;
  font-weight: 900;
}
.section-list-btn strong {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.section-list-empty { margin: 0; color: var(--admin-muted); font-size: 12px; line-height: 1.5; }

/* ═══════════════════════════════════════
   PROSPEK / LEADS MODAL
═══════════════════════════════════════ */
.leads-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin-left: 7px;
  border-radius: 999px;
  background: rgba(255,255,255,.22);
  font-size: 11px;
  font-weight: 900;
}
.leads-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(4,7,24,.72);
  backdrop-filter: blur(14px);
}
.leads-modal-backdrop.open { display: flex; }
.leads-modal {
  width: min(760px, 100%);
  max-height: 82vh;
  overflow: auto;
  position: relative;
  padding: 30px;
  border-radius: 26px;
  border: 1px solid var(--admin-border);
  background:
    radial-gradient(circle at 20% 0%, rgba(90,94,240,.20), transparent 34%),
    linear-gradient(180deg, rgba(20,25,55,.97), rgba(10,13,30,.98));
  box-shadow: 0 30px 90px rgba(0,0,0,.55);
  color: #fff;
}
.leads-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  background: rgba(255,255,255,.07);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}
.leads-modal-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding-right: 40px; }
.leads-modal-head h2 { margin: 0; font-size: 22px; letter-spacing: -.03em; }
.leads-modal-desc { color: var(--admin-muted); font-size: 13px; line-height: 1.6; margin: 10px 0 18px; }
.leads-modal-actions { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
.leads-table-wrap { border: 1px solid var(--admin-border); border-radius: 16px; overflow: hidden; }
.leads-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.leads-table th, .leads-table td { padding: 11px 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,.08); vertical-align: top; }
.leads-table th { background: rgba(255,255,255,.05); font-size: 11px; text-transform: uppercase; letter-spacing: .5px; color: var(--admin-muted); }
.leads-table tr:last-child td { border-bottom: 0; }
.leads-table td.leads-msg { color: var(--admin-muted); max-width: 220px; }
.leads-empty { padding: 30px; text-align: center; color: var(--admin-muted); font-size: 13px; }
.leads-del-btn {
  border: 1px solid rgba(239,68,68,.35);
  background: rgba(239,68,68,.14);
  color: #FECACA;
  border-radius: 9px;
  padding: 6px 9px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
}
.leads-del-btn:hover { background: rgba(239,68,68,.24); }
@media (max-width: 640px) {
  .leads-modal { padding: 24px 18px; }
  .leads-table-wrap { overflow-x: auto; }
  .leads-table { min-width: 620px; }
}

/* ── BACKUP / PULIHKAN ── */
.backup-restore-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.backup-status {
  margin: 14px 0 0;
  font-size: 13px;
  color: var(--admin-muted);
  min-height: 18px;
}
.leads-modal-desc code {
  background: rgba(255,255,255,.08);
  padding: 1px 6px;
  border-radius: 6px;
  font-size: 12px;
}
