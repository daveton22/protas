'use strict';

(function () {
  const STORAGE_KEY = 'protas_cms_state_v1';
  const AUTH_KEY = 'protas_admin_auth';
  const LEADS_KEY = 'protas_cms_leads_v1';
  const ADMIN_USERNAME = 'viki123';
  const ADMIN_PASSWORD = 'amikom123';

  function safeParse(json, fallback) {
    try { return JSON.parse(json) || fallback; } catch (_) { return fallback; }
  }

  function getState() {
    return safeParse(localStorage.getItem(STORAGE_KEY), {
      text: {},
      html: {},
      attrs: {},
      inlineStyle: {},
      cssVars: {}
    });
  }

  function setState(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function elementKey(el) {
    if (!el || el.nodeType !== 1) return '';
    if (el.id) return `#${el.id}`;
    const path = [];
    let cur = el;
    const rootDoc = el.ownerDocument || document;
    while (cur && cur.nodeType === 1 && cur !== rootDoc.documentElement) {
      const parent = cur.parentElement;
      if (!parent) break;
      const siblings = Array.from(parent.children).filter(child => child.tagName === cur.tagName);
      const index = siblings.indexOf(cur) + 1;
      path.unshift(`${cur.tagName.toLowerCase()}:nth-of-type(${index})`);
      cur = parent;
    }
    return path.join('>');
  }

  function applyCmsState(rootDocument) {
    const doc = rootDocument || document;
    const state = getState();
    const root = doc.documentElement;

    Object.entries(state.cssVars || {}).forEach(([name, value]) => {
      if (value) root.style.setProperty(name, value);
    });

    Object.entries(state.text || {}).forEach(([key, value]) => {
      const el = doc.querySelector(key);
      if (el !== null && typeof value === 'string') el.textContent = value;
    });

    Object.entries(state.html || {}).forEach(([key, value]) => {
      const el = doc.querySelector(key);
      if (el !== null && typeof value === 'string') el.innerHTML = value;
    });

    Object.entries(state.attrs || {}).forEach(([key, attrs]) => {
      const el = doc.querySelector(key);
      if (!el || !attrs) return;
      Object.entries(attrs).forEach(([name, value]) => {
        if (value === null || value === undefined || value === '') el.removeAttribute(name);
        else el.setAttribute(name, value);
      });
    });

    Object.entries(state.inlineStyle || {}).forEach(([key, styles]) => {
      const el = doc.querySelector(key);
      if (!el || !styles) return;
      Object.entries(styles).forEach(([prop, value]) => {
        el.style[prop] = value || '';
      });
    });
  }

  /* ── PROSPEK / LEADS (data formulir kontak) ──
     Situs ini statis (tanpa server/database sungguhan), jadi data yang
     dikirim lewat form #kontak disimpan di localStorage browser ini.
     Admin dapat melihat & mengekspornya lewat tombol "Prospek" di admin.html.
     Untuk produksi nyata, ganti addLead() di bawah agar juga mengirim
     data ke backend/API sungguhan (mis. Formspree, EmailJS, atau server sendiri). */
  function getLeads() {
    return safeParse(localStorage.getItem(LEADS_KEY), []);
  }

  function setLeads(list) {
    localStorage.setItem(LEADS_KEY, JSON.stringify(list));
  }

  function addLead(lead) {
    const list = getLeads();
    const entry = {
      id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: (lead?.name || '').slice(0, 120),
      email: (lead?.email || '').slice(0, 160),
      role: (lead?.role || '').slice(0, 60),
      message: (lead?.message || '').slice(0, 1000),
      createdAt: new Date().toISOString()
    };
    list.unshift(entry);
    setLeads(list);
    return entry;
  }

  function deleteLead(id) {
    setLeads(getLeads().filter(l => l.id !== id));
  }

  function clearLeads() {
    localStorage.removeItem(LEADS_KEY);
  }

  function initLandingLogin() {
    const backdrop = document.getElementById('adminLoginBackdrop');
    const form = document.getElementById('adminLoginForm');
    const closeBtn = document.getElementById('adminLoginClose');
    const error = document.getElementById('adminLoginError');
    const username = document.getElementById('adminUsername');
    const password = document.getElementById('adminPassword');
    const triggers = document.querySelectorAll('.admin-login-trigger');

    if (!backdrop || !form || !triggers.length) return;

    function openLogin(e) {
      e?.preventDefault();
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      error.textContent = '';
      setTimeout(() => username?.focus(), 50);
    }

    function closeLogin() {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      form.reset();
      error.textContent = '';
    }

    triggers.forEach(trigger => trigger.addEventListener('click', openLogin));
    closeBtn?.addEventListener('click', closeLogin);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeLogin(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) closeLogin();
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const u = username.value.trim();
      const p = password.value;
      if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, '1');
        window.location.href = 'admin.html';
        return;
      }
      error.textContent = 'Username atau password salah.';
      password.value = '';
      password.focus();
    });
  }

  window.ProTASCMS = {
    STORAGE_KEY,
    AUTH_KEY,
    LEADS_KEY,
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    getState,
    setState,
    elementKey,
    applyCmsState,
    getLeads,
    addLead,
    deleteLead,
    clearLeads,
    reset() { localStorage.removeItem(STORAGE_KEY); },
    isAuthed() { return sessionStorage.getItem(AUTH_KEY) === '1'; },
    login(username, password) {
      const ok = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
      if (ok) sessionStorage.setItem(AUTH_KEY, '1');
      return ok;
    },
    logout() { sessionStorage.removeItem(AUTH_KEY); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyCmsState(document);
      initLandingLogin();
    });
  } else {
    applyCmsState(document);
    initLandingLogin();
  }
})();
