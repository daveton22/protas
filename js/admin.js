'use strict';

(function () {
  const cms = window.ProTASCMS;
  const shell = document.getElementById('adminShell');
  const loginScreen = document.getElementById('adminLoginScreen');
  const loginForm = document.getElementById('adminLoginForm');
  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const iframe = document.getElementById('landingPreview');
  const editorPanel = document.getElementById('editorPanel');
  const editorContent = document.getElementById('editorContent');
  const emptyEditor = document.getElementById('emptyEditor');
  const currentSectionLabel = document.getElementById('currentSectionLabel');
  const previewWrap = document.getElementById('previewWrap');
  const toast = document.getElementById('adminToast');
  const landingTemplate = document.getElementById('landingTemplate');
  const sectionList = document.getElementById('sectionList');

  let frameDoc = null;
  let selectedSection = null;
  let toastTimer = null;
  let previewLoaded = false;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function buildPreviewHtml() {
    if (!landingTemplate) return '';
    const baseHref = new URL('.', window.location.href).href;
    let html = landingTemplate.innerHTML.trim();
    const baseTag = `<base href="${baseHref}">`;
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>\n  ${baseTag}`);
    } else {
      html = `${baseTag}\n${html}`;
    }
    return html;
  }

  function clearEditorState() {
    selectedSection?.classList.remove('admin-selected-section');
    selectedSection = null;
    currentSectionLabel.textContent = 'Pilih section pada preview';
    editorContent.hidden = true;
    emptyEditor.hidden = false;
    editorContent.innerHTML = '';
    if (sectionList) sectionList.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  }

  function loadPreview() {
    if (!iframe || !landingTemplate) return;
    clearEditorState();
    previewLoaded = true;
    iframe.srcdoc = buildPreviewHtml();
  }

  function requireAuth() {
    if (cms.isAuthed()) {
      loginScreen.hidden = true;
      shell.hidden = false;
      if (!previewLoaded) loadPreview();
      return true;
    }
    loginScreen.hidden = false;
    shell.hidden = true;
    setTimeout(() => loginUsername?.focus(), 50);
    return false;
  }

  loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (cms.login(loginUsername.value.trim(), loginPassword.value)) {
      loginError.textContent = '';
      loginForm.reset();
      requireAuth();
      loadPreview();
      return;
    }
    loginError.textContent = 'Username atau password salah.';
    loginPassword.value = '';
    loginPassword.focus();
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    cms.logout();
    requireAuth();
  });

  document.getElementById('previewDesktop')?.addEventListener('click', () => {
    previewWrap.classList.remove('tablet', 'mobile');
    showToast('Preview desktop aktif.');
  });
  document.getElementById('previewTablet')?.addEventListener('click', () => {
    previewWrap.classList.remove('mobile');
    previewWrap.classList.add('tablet');
    showToast('Preview tablet aktif.');
  });
  document.getElementById('previewMobile')?.addEventListener('click', () => {
    previewWrap.classList.remove('tablet');
    previewWrap.classList.add('mobile');
    showToast('Preview mobile aktif.');
  });

  document.getElementById('saveState')?.addEventListener('click', () => showToast('Perubahan sudah tersimpan.'));
  document.getElementById('resetState')?.addEventListener('click', () => {
    const ok = confirm('Reset semua perubahan editor dan kembalikan landing page ke versi awal?');
    if (!ok) return;
    cms.reset();
    loadPreview();
    showToast('Perubahan berhasil direset.');
  });

  function rgbToHex(value) {
    if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') return '#000000';
    const m = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return value.startsWith('#') ? value : '#000000';
    return '#' + [m[1], m[2], m[3]].map(n => Number(n).toString(16).padStart(2, '0')).join('');
  }

  function getState() { return cms.getState(); }
  function setState(next) { cms.setState(next); }

  function writeText(el, value, asHtml = false) {
    const state = getState();
    const key = cms.elementKey(el);
    if (!key) return;
    if (asHtml) {
      el.innerHTML = value;
      state.html[key] = value;
      delete state.text[key];
    } else {
      el.textContent = value;
      state.text[key] = value;
      delete state.html[key];
    }
    setState(state);
  }

  function writeAttr(el, attr, value) {
    const state = getState();
    const key = cms.elementKey(el);
    if (!key) return;
    state.attrs[key] = state.attrs[key] || {};
    state.attrs[key][attr] = value;
    if (value === '') el.removeAttribute(attr);
    else el.setAttribute(attr, value);
    setState(state);
  }

  function writeStyle(el, prop, value) {
    const state = getState();
    const key = cms.elementKey(el);
    if (!key) return;
    state.inlineStyle[key] = state.inlineStyle[key] || {};
    state.inlineStyle[key][prop] = value;
    el.style[prop] = value || '';
    setState(state);
  }

  function writeCssVar(name, value) {
    const state = getState();
    state.cssVars[name] = value;
    if (frameDoc) frameDoc.documentElement.style.setProperty(name, value);
    setState(state);
  }

  function getLabelForElement(el) {
    if (!el) return 'Section';
    if (el.classList.contains('navbar')) return 'Navbar';
    if (el.classList.contains('trusted')) return 'Trusted Logos';
    if (el.classList.contains('footer')) return 'Footer';
    if (el.id) return el.id.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const heading = el.querySelector('h1,h2,h3,.section-label');
    if (heading?.textContent.trim()) return heading.textContent.trim().slice(0, 60);
    return el.tagName.toLowerCase();
  }

  function isHiddenByAdmin(el) {
    return el.closest('.admin-login-backdrop, script, style, noscript');
  }

  function editableTextElements(section) {
    const selectors = [
      'h1','h2','h3','h4','h5','h6','p','a','button','span','li',
      '.section-label','.section-title','.section-desc','.feature-title','.feature-desc',
      '.step-title','.step-desc','.role-feature','.faq-question','.faq-answer p',
      '.testimonial-text','.testimonial-name','.testimonial-role','.cta-title','.cta-desc',
      '.trusted-logo','.trusted-label','.stat-label','.stat-number','.float-card-label','.float-card-value'
    ].join(',');
    const seen = new Set();
    return Array.from(section.querySelectorAll(selectors)).filter(el => {
      if (seen.has(el) || isHiddenByAdmin(el)) return false;
      seen.add(el);
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return false;
      if (text.length > 260 && !['P','H1','H2','H3','H4','A','BUTTON'].includes(el.tagName)) return false;
      if (el.children.length > 6) return false;
      return true;
    }).slice(0, 80);
  }

  function editableImages(section) {
    return Array.from(section.querySelectorAll('img')).filter(img => !isHiddenByAdmin(img)).slice(0, 30);
  }

  function editableButtons(section) {
    return Array.from(section.querySelectorAll('a.btn, button, .btn')).filter(btn => !isHiddenByAdmin(btn)).slice(0, 30);
  }

  function makeBox(title, desc) {
    const box = document.createElement('div');
    box.className = 'editor-box';
    box.innerHTML = `<h2>${title}</h2>${desc ? `<p>${desc}</p>` : ''}`;
    return box;
  }

  function addField(container, label, control, meta = '') {
    const row = document.createElement('div');
    row.className = 'field-row';
    const head = document.createElement('div');
    head.className = 'field-head';
    head.innerHTML = `<span>${label}</span><span>${meta}</span>`;
    row.appendChild(head);
    row.appendChild(control);
    container.appendChild(row);
    return row;
  }

  function renderStylePanel(section) {
    const box = makeBox('Warna Section', 'Atur background dan warna teks untuk section yang sedang dipilih.');
    const form = document.createElement('div');
    form.className = 'form-grid compact';
    const bg = document.createElement('input');
    bg.type = 'color';
    bg.value = rgbToHex(getComputedStyle(section).backgroundColor);
    bg.addEventListener('input', () => writeStyle(section, 'backgroundColor', bg.value));
    const color = document.createElement('input');
    color.type = 'color';
    color.value = rgbToHex(getComputedStyle(section).color);
    color.addEventListener('input', () => writeStyle(section, 'color', color.value));
    const bgLabel = document.createElement('label');
    bgLabel.textContent = 'Background';
    bgLabel.appendChild(bg);
    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Warna teks';
    colorLabel.appendChild(color);
    form.append(bgLabel, colorLabel);
    box.appendChild(form);
    return box;
  }

  function renderTextPanel(section) {
    const box = makeBox('Teks, Judul, dan Deskripsi', 'Edit teks yang muncul pada section ini. Untuk elemen yang memiliki gaya khusus, editor memakai mode HTML sederhana agar styling tidak hilang.');
    const items = editableTextElements(section);
    if (!items.length) {
      const p = document.createElement('p');
      p.textContent = 'Tidak ada teks langsung yang dapat diedit pada section ini.';
      box.appendChild(p);
      return box;
    }
    items.forEach((el, idx) => {
      const hasNestedStyle = el.children.length > 0 && ['H1','H2','H3','P','DIV'].includes(el.tagName);
      const control = document.createElement('textarea');
      control.value = hasNestedStyle ? el.innerHTML.trim() : el.textContent.trim();
      control.rows = Math.min(6, Math.max(2, Math.ceil(control.value.length / 56)));
      control.addEventListener('input', () => writeText(el, control.value, hasNestedStyle));
      const labelText = el.tagName.toLowerCase();
      const sample = el.textContent.replace(/\s+/g, ' ').trim().slice(0, 32);
      addField(box, `${idx + 1}. ${labelText}`, control, sample);
    });
    return box;
  }

  function renderImagePanel(section) {
    const box = makeBox('Gambar', 'Ganti gambar memakai URL/path aset atau unggah gambar dari perangkat. Gambar unggahan disimpan di browser sebagai data lokal.');
    const imgs = editableImages(section);
    if (!imgs.length) {
      const p = document.createElement('p');
      p.textContent = 'Tidak ada gambar pada section ini.';
      box.appendChild(p);
      return box;
    }
    imgs.forEach((img, idx) => {
      const srcInput = document.createElement('input');
      srcInput.type = 'text';
      srcInput.value = img.getAttribute('src') || '';
      srcInput.placeholder = 'assets/images/nama-file.png';
      srcInput.addEventListener('input', () => writeAttr(img, 'src', srcInput.value));
      addField(box, `${idx + 1}. Path gambar`, srcInput, img.getAttribute('alt') || 'img');

      const altInput = document.createElement('input');
      altInput.type = 'text';
      altInput.value = img.getAttribute('alt') || '';
      altInput.placeholder = 'Deskripsi gambar';
      altInput.addEventListener('input', () => writeAttr(img, 'alt', altInput.value));
      addField(box, 'Alt text', altInput, 'aksesibilitas');

      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          srcInput.value = reader.result;
          writeAttr(img, 'src', reader.result);
          showToast('Gambar berhasil diganti.');
        };
        reader.readAsDataURL(file);
      });
      const row = addField(box, 'Upload gambar', fileInput, 'opsional');
      const note = document.createElement('small');
      note.className = 'file-note';
      note.textContent = 'Untuk produksi, letakkan file gambar di folder assets/images lalu isi path-nya agar ukuran localStorage tidak besar.';
      row.appendChild(note);
    });
    return box;
  }

  function renderButtonPanel(section) {
    const box = makeBox('Tombol dan Link', 'Atur teks tombol, arah link, warna tombol, dan warna teks tombol.');
    const buttons = editableButtons(section);
    if (!buttons.length) {
      const p = document.createElement('p');
      p.textContent = 'Tidak ada tombol/link tombol pada section ini.';
      box.appendChild(p);
      return box;
    }
    buttons.forEach((btn, idx) => {
      const text = document.createElement('input');
      text.type = 'text';
      text.value = btn.textContent.trim();
      text.addEventListener('input', () => writeText(btn, text.value, false));
      addField(box, `${idx + 1}. Teks tombol`, text, btn.tagName.toLowerCase());

      if (btn.tagName === 'A') {
        const href = document.createElement('input');
        href.type = 'text';
        href.value = btn.getAttribute('href') || '';
        href.placeholder = '#mulai atau https://...';
        href.addEventListener('input', () => writeAttr(btn, 'href', href.value));
        addField(box, 'Link tujuan', href, 'href');
      }

      const bg = document.createElement('input');
      bg.type = 'color';
      bg.value = rgbToHex(getComputedStyle(btn).backgroundColor);
      bg.addEventListener('input', () => writeStyle(btn, 'backgroundColor', bg.value));
      addField(box, 'Warna tombol', bg, 'background');

      const color = document.createElement('input');
      color.type = 'color';
      color.value = rgbToHex(getComputedStyle(btn).color);
      color.addEventListener('input', () => writeStyle(btn, 'color', color.value));
      addField(box, 'Warna teks tombol', color, 'color');
    });
    return box;
  }

  function renderAdvancedPanel(section) {
    const details = document.createElement('details');
    details.className = 'editor-box';
    details.innerHTML = '<summary>Editor HTML Section Lanjutan</summary><p>Gunakan hanya jika perlu mengubah struktur konten. Kesalahan HTML bisa mengubah layout section.</p>';
    const textarea = document.createElement('textarea');
    textarea.value = section.innerHTML.trim();
    textarea.rows = 12;
    textarea.addEventListener('change', () => {
      const state = getState();
      const key = cms.elementKey(section);
      section.innerHTML = textarea.value;
      state.html[key] = textarea.value;
      setState(state);
      bindPreviewEvents();
      renderSectionList(frameDoc);
      selectSection(section);
      showToast('HTML section diperbarui.');
    });
    details.appendChild(textarea);
    return details;
  }

  function selectSection(section) {
    if (!section) return;
    selectedSection?.classList.remove('admin-selected-section');
    selectedSection = section;
    selectedSection.classList.add('admin-selected-section');
    if (sectionList) {
      const key = cms.elementKey(section);
      sectionList.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn.dataset.targetKey === key));
    }

    const label = getLabelForElement(section);
    currentSectionLabel.textContent = `Section aktif: ${label}`;
    emptyEditor.hidden = true;
    editorContent.hidden = false;
    editorContent.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'editor-box';
    header.innerHTML = `<span class="section-pill">${label}</span><h2>Editor Section</h2><p>Panel ini hanya mengubah section yang sedang dipilih. Semua perubahan tersimpan otomatis di browser dan terlihat langsung di preview.</p>`;
    editorContent.appendChild(header);
    editorContent.appendChild(renderStylePanel(section));
    editorContent.appendChild(renderTextPanel(section));
    editorContent.appendChild(renderImagePanel(section));
    editorContent.appendChild(renderButtonPanel(section));
    editorContent.appendChild(renderAdvancedPanel(section));
  }

  function candidateSections(doc) {
    const base = Array.from(doc.querySelectorAll('nav.navbar, .trusted, section, footer.footer'));
    return base.filter(el => !isHiddenByAdmin(el));
  }

  function renderSectionList(doc) {
    if (!sectionList) return;
    sectionList.innerHTML = '';
    const sections = candidateSections(doc);
    sections.forEach((section, index) => {
      const key = cms.elementKey(section);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'section-list-btn';
      btn.dataset.targetKey = key;
      btn.innerHTML = `<span>${index + 1}</span><strong>${getLabelForElement(section)}</strong>`;
      btn.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        selectSection(section);
      });
      sectionList.appendChild(btn);
    });
    if (!sections.length) {
      const empty = document.createElement('p');
      empty.className = 'section-list-empty';
      empty.textContent = 'Section belum terbaca. Muat ulang halaman admin atau jalankan melalui server lokal.';
      sectionList.appendChild(empty);
    }
  }

  function bindPreviewEvents() {
    if (!frameDoc) return;
    const doc = frameDoc;
    candidateSections(doc).forEach(section => {
      if (section.dataset.adminBound === '1') return;
      section.dataset.adminBound = '1';
      section.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        selectSection(section);
      }, true);
      section.addEventListener('mouseenter', () => section.classList.add('admin-hover-section'));
      section.addEventListener('mouseleave', () => section.classList.remove('admin-hover-section'));
    });

    doc.querySelectorAll('a').forEach(a => {
      if (a.dataset.adminLinkBound === '1') return;
      a.dataset.adminLinkBound = '1';
      a.addEventListener('click', e => e.preventDefault(), true);
    });
  }

  function injectPreviewStyles(doc) {
    if (doc.getElementById('adminPreviewStyle')) return;
    const style = doc.createElement('style');
    style.id = 'adminPreviewStyle';
    style.textContent = `
      .admin-hover-section {
        outline: 2px dashed rgba(56,189,248,.9) !important;
        outline-offset: -6px !important;
        cursor: pointer !important;
      }
      .admin-selected-section {
        outline: 3px solid rgba(90,94,240,.98) !important;
        outline-offset: -7px !important;
        box-shadow: inset 0 0 0 9999px rgba(90,94,240,.035) !important;
      }
      .admin-selected-section::after,
      .admin-hover-section::after { pointer-events:none !important; }
      body { cursor: default; }
    `;
    doc.head.appendChild(style);
  }

  function initGlobalControls() {
    document.querySelectorAll('[data-css-var]').forEach(input => {
      const name = input.dataset.cssVar;
      const state = getState();
      if (state.cssVars?.[name]) input.value = state.cssVars[name];
      input.addEventListener('input', () => {
        writeCssVar(name, input.value);
        if (name === '--primary' || name === '--primary-light') {
          const s = getState();
          const primary = s.cssVars['--primary'] || '#3B3FD8';
          const highlight = s.cssVars['--primary-light'] || '#5A5EF0';
          s.cssVars['--gp'] = `linear-gradient(135deg,${primary},${highlight})`;
          setState(s);
          if (frameDoc) frameDoc.documentElement.style.setProperty('--gp', s.cssVars['--gp']);
        }
      });
    });
  }

  iframe?.addEventListener('load', () => {
    try {
      frameDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (!frameDoc || !frameDoc.body || frameDoc.body.children.length === 0) return;
      iframe.contentWindow.ProTASCMS?.applyCmsState(frameDoc);
      injectPreviewStyles(frameDoc);
      bindPreviewEvents();
      renderSectionList(frameDoc);
      currentSectionLabel.textContent = 'Pilih section pada preview';
    } catch (err) {
      console.error(err);
      showToast('Preview tidak bisa diakses. Coba buka admin.html melalui Live Server/local server.');
    }
  });

  initGlobalControls();
  requireAuth();
})();
