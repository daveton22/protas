'use strict';
/* ═══════════════════════════════════════════════════════
   ProTAS — main.js  (Complete)
   
   3D Scene Base: rotateX(22deg) rotateY(-10deg)
   — matches CSS .phone-group transform exactly
   
   Parallax: ±5deg X, ±8deg Y  (lerp smoothed)
   Phone hover: pause float → lift via inline style
═══════════════════════════════════════════════════════ */

/* ── SINKRONISASI KONTEN DARI SERVER (GET /api/content) ──
   Begitu halaman ini dibuka, ambil versi konten terbaru dari data.json
   lewat server.js — supaya pengunjung selalu melihat hasil edit admin
   yang paling baru, bukan cuma yang kebetulan tersimpan di localStorage
   browser ini. fetch() sesungguhnya ada di js/cms.js (syncContentFromServer),
   di sini kita cukup memanggilnya. Tidak di-await supaya halaman tetap
   langsung tampil (data lokal dulu), lalu diperbarui begitu server menjawab. */
window.ProTASCMS?.syncContentFromServer();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE MENU ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
function closeMobile() {
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
}
mobileClose?.addEventListener('click', closeMobile);
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => revealObs.observe(el));

/* ── ROLE TABS ── */
document.querySelectorAll('.role-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const role = tab.dataset.role;
    document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.role-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`.role-content[data-role="${role}"]`)?.classList.add('active');
  });
});

/* ── ANIMATED COUNTERS ── */
function animateCounter(el, target, dur = 1800) {
  let start = null;
  const tick = ts => {
    if (!start) start = ts;
    const p    = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target).toLocaleString('id-ID') + (el.dataset.suffix || '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, +e.target.dataset.target);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => cntObs.observe(el));

/* ── PROGRESS CARD (donut + bars) ── */
const progressCard = document.getElementById('progressCard');
const donutFill    = document.getElementById('donutFill');
const donutPct     = document.getElementById('donutPct');
const progressPct  = document.getElementById('progressPct');

const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    /* Animate bars */
    e.target.querySelectorAll('.chapter-bar').forEach(b => {
      b.style.width = (b.dataset.width || 0) + '%';
    });
    /* Animate donut */
    const TARGET = 88;
    const circ   = 2 * Math.PI * 54; // r=54
    if (donutFill) donutFill.style.strokeDashoffset = circ - (TARGET / 100) * circ;
    /* Animate percentage text */
    let cur = 0;
    const iv = setInterval(() => {
      cur++;
      if (donutPct)    donutPct.textContent    = cur + '%';
      if (progressPct) progressPct.textContent = cur + '%';
      if (cur >= TARGET) clearInterval(iv);
    }, 18);
    progObs.unobserve(e.target);
  });
}, { threshold: 0.3 });
if (progressCard) progObs.observe(progressCard);

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
});

/* ═══════════════════════════════════════════════════════
   3D PARALLAX MOUSE TRACKING
   
   The phone-group starts at rotateX(22) rotateY(-10).
   Mouse movement adds a small delta (±5° X, ±8° Y).
   lerp() ensures silky-smooth interpolation each frame.
   
   BASE_X / BASE_Y MUST match CSS .phone-group transform.
═══════════════════════════════════════════════════════ */
const phoneGroup  = document.getElementById('phoneGroup');
const heroGlow    = document.getElementById('heroGlow');
const heroSection = document.querySelector('.hero');

const BASE_X = 22;   /* ← sync with CSS rotateX value */
const BASE_Y = -10;  /* ← sync with CSS rotateY value */

let targetX  = BASE_X, targetY  = BASE_Y;
let currentX = BASE_X, currentY = BASE_Y;
let rafId;

const lerp = (a, b, t) => a + (b - a) * t;

function runParallax() {
  currentX = lerp(currentX, targetX, 0.055);
  currentY = lerp(currentY, targetY, 0.055);
  if (phoneGroup) {
    phoneGroup.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
  }
  rafId = requestAnimationFrame(runParallax);
}
runParallax();

window.addEventListener('mousemove', e => {
  /* Desktop only, only when in/near hero */
  if (window.innerWidth < 768) return;
  const bottom = heroSection?.getBoundingClientRect().bottom ?? 0;
  if (e.clientY > bottom + 100) return;

  /* Normalize to -1…+1 */
  const nx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2);
  const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

  targetX = BASE_X + ny * -5;   /* up/down   ±5° */
  targetY = BASE_Y + nx *  8;   /* left/right ±8° */

  /* Subtle glow shift */
  if (heroGlow) {
    heroGlow.style.transform = `translateY(-50%) translateX(${nx * 30}px)`;
  }
}, { passive: true });

/* Reset on mouse exit */
document.addEventListener('mouseleave', () => {
  targetX = BASE_X;
  targetY = BASE_Y;
});

/* Pause rAF when tab is hidden (saves CPU) */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelAnimationFrame(rafId);
  else runParallax();
});

/* ── PHONE HOVER — lift + glow, pause float ── */
document.querySelectorAll('.phone-3d').forEach(phone => {
  const inner = phone.querySelector('.phone-inner');

  phone.addEventListener('mouseenter', () => {
    if (!inner) return;
    inner.style.animationPlayState = 'paused';
    inner.style.transition = 'transform .38s cubic-bezier(.16,1,.3,1), filter .3s ease';
    inner.style.transform  = 'translateY(-16px) scale(1.045)';
    inner.style.filter     = 'brightness(1.14) drop-shadow(0 0 28px rgba(91,95,240,.55))';
  });

  phone.addEventListener('mouseleave', () => {
    if (!inner) return;
    inner.style.transform = '';
    inner.style.filter    = '';
    setTimeout(() => {
      inner.style.transition         = '';
      inner.style.animationPlayState = 'running';
    }, 380);
  });
});

/* ── FLOAT CARD HOVER ── */
document.querySelectorAll('.float-card').forEach(card => {
  card.addEventListener('mouseenter', () => { card.style.animationPlayState = 'paused' });
  card.addEventListener('mouseleave', () => { card.style.animationPlayState = 'running' });
});

/* ── FEATURE CARD TILT ── */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all .45s ease';
    card.style.transform  = '';
    setTimeout(() => { card.style.transition = '' }, 450);
  });
});

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question')?.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

/* ── BUTTON RIPPLE ── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r  = document.createElement('span');
    const rc = this.getBoundingClientRect();
    r.className = 'ripple';
    r.style.left = `${e.clientX - rc.left}px`;
    r.style.top  = `${e.clientY - rc.top}px`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 620);
  });
});

/* ── SCROLL TO TOP ── */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn?.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
scrollTopBtn?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── TOAST NOTIFICATIONS (demo) ── */
function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '🔔'}</span><span>${msg}</span>`;
  c.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 320);
  }, 4500);
}

/* ── CONTACT FORM ── */
const contactForm      = document.getElementById('contactForm');
const contactFormError = document.getElementById('contactFormError');

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm?.addEventListener('submit', e => {
  e.preventDefault();

  const nameEl    = document.getElementById('contactName');
  const emailEl   = document.getElementById('contactEmail');
  const roleEl    = document.getElementById('contactRole');
  const messageEl = document.getElementById('contactMessage');

  const name    = nameEl?.value.trim()    || '';
  const email   = emailEl?.value.trim()   || '';
  const role    = roleEl?.value           || '';
  const message = messageEl?.value.trim() || '';

  if (!name || !email) {
    if (contactFormError) contactFormError.textContent = 'Nama dan email wajib diisi.';
    (!name ? nameEl : emailEl)?.focus();
    return;
  }
  if (!isValidEmail(email)) {
    if (contactFormError) contactFormError.textContent = 'Format email belum valid.';
    emailEl?.focus();
    return;
  }
  if (contactFormError) contactFormError.textContent = '';

  /* Situs ini statis (tanpa server/database), jadi data prospek disimpan
     lewat ProTASCMS.addLead() → localStorage, dan bisa dilihat admin di
     admin.html lewat tombol "📋 Prospek". Untuk produksi nyata, sambungkan
     baris di bawah ini juga ke API/backend/email service sungguhan. */
  window.ProTASCMS?.addLead?.({ name, email, role, message });

  contactForm.reset();
  showToast('Pesan terkirim! Tim ProTAS akan segera menghubungi kamu.', 'success');
});

setTimeout(() => showToast('Dosen memberi catatan revisi BAB 5', 'info'),    2800);
setTimeout(() => showToast('Jadwal bimbingan dikonfirmasi: Senin 14:00', 'success'), 7000);
setTimeout(() => showToast('Progress BAB 4 berhasil diperbarui!', 'success'), 12000);
