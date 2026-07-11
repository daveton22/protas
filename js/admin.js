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
  const leadsModalBackdrop = document.getElementById('leadsModalBackdrop');
  const leadsModalClose = document.getElementById('leadsModalClose');
  const openLeadsBtn = document.getElementById('openLeads');
  const leadsBadge = document.getElementById('leadsBadge');
  const leadsTableWrap = document.getElementById('leadsTableWrap');
  const exportLeadsCsvBtn = document.getElementById('exportLeadsCsv');
  const clearLeadsBtn = document.getElementById('clearLeadsBtn');
  const backupModalBackdrop = document.getElementById('backupModalBackdrop');
  const backupModalClose = document.getElementById('backupModalClose');
  const openBackupBtn = document.getElementById('openBackup');
  const downloadBackupBtn = document.getElementById('downloadBackupBtn');
  const restoreBackupInput = document.getElementById('restoreBackupInput');
  const backupStatus = document.getElementById('backupStatus');

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

  document.getElementById('saveState')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const originalLabel = btn.textContent;
    btn.textContent = 'Menyimpan...';
    btn.disabled = true;
    try {
      /* Kirim (POST) isi state saat ini ke server.js, yang menuliskannya
         ke data.json. setState() di setiap aksi edit sebenarnya SUDAH
         mengirim otomatis (lihat js/cms.js), tombol ini memberi konfirmasi
         eksplisit + menangani kalau ternyata server-nya belum menyala. */
      await cms.pushContentToServer(cms.getState());
      showToast('Tersimpan ke server (data.json). ✓');
    } catch (err) {
      showToast('Server tidak terjangkau — tersimpan di browser ini saja.');
    } finally {
      btn.textContent = originalLabel;
      btn.disabled = false;
    }
  });
  document.getElementById('resetState')?.addEventListener('click', () => {
    const ok = confirm('Reset semua perubahan editor dan kembalikan landing page ke versi awal?');
    if (!ok) return;
    cms.reset();
    loadPreview();
    showToast('Perubahan berhasil direset.');
  });

  /* ── PROSPEK / LEADS (data dari formulir kontak) ── */
  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function formatLeadDate(iso) {
    try { return new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }); }
    catch (_) { return iso || '-'; }
  }

  function getLeads() { return cms.getLeads ? cms.getLeads() : []; }

  function renderLeads() {
    const leads = getLeads();
    if (leadsBadge) leadsBadge.textContent = String(leads.length);
    if (!leadsTableWrap) return;

    if (!leads.length) {
      leadsTableWrap.innerHTML = '<p class="leads-empty">Belum ada prospek masuk. Data akan muncul di sini saat pengunjung mengisi formulir kontak pada landing page.</p>';
      return;
    }

    const rows = leads.map(lead => `
      <tr>
        <td>${escapeHtml(lead.name)}</td>
        <td>${escapeHtml(lead.email)}</td>
        <td>${escapeHtml(lead.role || '-')}</td>
        <td class="leads-msg">${escapeHtml(lead.message || '-')}</td>
        <td>${escapeHtml(formatLeadDate(lead.createdAt))}</td>
        <td><button class="leads-del-btn" data-lead-id="${escapeHtml(lead.id)}" type="button">Hapus</button></td>
      </tr>
    `).join('');

    leadsTableWrap.innerHTML = `
      <table class="leads-table">
        <thead><tr><th>Nama</th><th>Email</th><th>Peran</th><th>Pesan</th><th>Waktu</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    leadsTableWrap.querySelectorAll('.leads-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        cms.deleteLead?.(btn.dataset.leadId);
        renderLeads();
        showToast('Prospek dihapus.');
      });
    });
  }

  function openLeadsModal() {
    renderLeads();
    leadsModalBackdrop?.classList.add('open');
    leadsModalBackdrop?.setAttribute('aria-hidden', 'false');
  }
  function closeLeadsModal() {
    leadsModalBackdrop?.classList.remove('open');
    leadsModalBackdrop?.setAttribute('aria-hidden', 'true');
  }

  openLeadsBtn?.addEventListener('click', openLeadsModal);
  leadsModalClose?.addEventListener('click', closeLeadsModal);
  leadsModalBackdrop?.addEventListener('click', e => { if (e.target === leadsModalBackdrop) closeLeadsModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && leadsModalBackdrop?.classList.contains('open')) closeLeadsModal();
  });

  clearLeadsBtn?.addEventListener('click', () => {
    if (!getLeads().length) { showToast('Belum ada data prospek.'); return; }
    const ok = confirm('Hapus semua data prospek? Tindakan ini tidak bisa dibatalkan.');
    if (!ok) return;
    cms.clearLeads?.();
    renderLeads();
    showToast('Semua prospek berhasil dihapus.');
  });

  exportLeadsCsvBtn?.addEventListener('click', () => {
    const leads = getLeads();
    if (!leads.length) { showToast('Belum ada data untuk diunduh.'); return; }
    const header = ['Nama', 'Email', 'Peran', 'Pesan', 'Waktu'];
    const csvRows = [header.join(',')];
    leads.forEach(l => {
      const row = [l.name, l.email, l.role || '', (l.message || '').replace(/\r?\n/g, ' '), formatLeadDate(l.createdAt)]
        .map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
      csvRows.push(row);
    });
    const blob = new Blob(['\uFEFF' + csvRows.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `protas-prospek-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('CSV prospek berhasil diunduh.');
  });

  /* Badge ikut update kalau ada lead baru masuk lewat form di preview iframe
     (iframe = window terpisah tapi origin sama, jadi event 'storage' nyampe ke sini) */
  window.addEventListener('storage', e => {
    if (e.key === cms.LEADS_KEY) renderLeads();
  });

  /* ── BACKUP / PULIHKAN (mitigasi hosting gratis yang bisa mereset data.json) ── */
  function openBackupModal() {
    if (backupStatus) backupStatus.textContent = '';
    backupModalBackdrop?.classList.add('open');
    backupModalBackdrop?.setAttribute('aria-hidden', 'false');
  }
  function closeBackupModal() {
    backupModalBackdrop?.classList.remove('open');
    backupModalBackdrop?.setAttribute('aria-hidden', 'true');
  }
  openBackupBtn?.addEventListener('click', openBackupModal);
  backupModalClose?.addEventListener('click', closeBackupModal);
  backupModalBackdrop?.addEventListener('click', e => { if (e.target === backupModalBackdrop) closeBackupModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backupModalBackdrop?.classList.contains('open')) closeBackupModal();
  });

  downloadBackupBtn?.addEventListener('click', async () => {
    try {
      // Ambil versi TERBARU dari server dulu (bukan cuma localStorage), supaya
      // backup yang diunduh benar-benar mencerminkan apa yang tersimpan di server.
      const state = await cms.fetchContentFromServer().catch(() => getState());
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protas-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      if (backupStatus) backupStatus.textContent = 'Backup berhasil diunduh ke perangkatmu.';
    } catch (err) {
      if (backupStatus) backupStatus.textContent = 'Gagal membuat file backup: ' + err.message;
    }
  });

  restoreBackupInput?.addEventListener('change', async () => {
    const file = restoreBackupInput.files?.[0];
    if (!file) return;

    const ok = confirm('Timpa konten yang sedang aktif dengan isi file backup ini?');
    if (!ok) { restoreBackupInput.value = ''; return; }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('isi file bukan objek JSON yang valid');
      }
      setState(parsed);                          // localStorage (instan)
      await cms.pushContentToServer(parsed);      // pastikan tersimpan ke data.json server
      loadPreview();                              // segarkan preview dengan data hasil pulihkan
      if (backupStatus) backupStatus.textContent = 'Data berhasil dipulihkan & dikirim ke server. ✓';
      showToast('Data berhasil dipulihkan dari file backup.');
    } catch (err) {
      if (backupStatus) backupStatus.textContent = 'Gagal memulihkan: ' + err.message;
      showToast('Gagal memulihkan dari file backup.');
    } finally {
      restoreBackupInput.value = '';
    }
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
  renderLeads();

  /* Ambil data terbaru dari server (GET /api/content) SEBELUM preview pertama
     kali dibangun, supaya iframe & panel editor langsung menampilkan isi
     data.json yang sesungguhnya — bukan localStorage lama yang kebetulan
     masih tersisa di browser ini. Kalau server belum dijalankan lewat
     "node server.js", ini gagal dengan tenang dan requireAuth() tetap
     lanjut memakai data lokal seperti biasa. */
  cms.syncContentFromServer().finally(requireAuth);
})();
