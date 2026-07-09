@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Syne:wght@700;800&display=swap');

/* ═══════════════════════════════════════════════════════════════
   ProTAS — 3D Landing Page
   Hero 3D Architecture:
     .scene-3d        → perspective(700px) from above (18%)
     .phone-group     → cluster rotateX(22deg) rotateY(-10deg)
     .phone-3d.*      → STATIC 3D position only (no animation)
     .phone-inner     → ONLY floating Y-axis animation
   This separation ensures 3D depth + float never conflict.
═══════════════════════════════════════════════════════════════ */

:root {
  --primary:       #3B3FD8;
  --primary-dark:  #2A2DA0;
  --primary-light: #5A5EF0;
  --accent:        #22C55E;
  --dark:          #06071A;
  --dark-2:        #0B0D26;
  --card-bg:       rgba(18,20,50,.90);
  --card-border:   rgba(91,95,240,.22);
  --text:          #FFFFFF;
  --text-2:        rgba(255,255,255,.62);
  --text-3:        rgba(255,255,255,.36);
  --gp:            linear-gradient(135deg,#3B3FD8,#5A5EF0);
  --gh:            linear-gradient(150deg,#05061A 0%,#090C35 55%,#0E1258 100%);
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box }
html { scroll-behavior:smooth }

body {
  font-family:'Plus Jakarta Sans',sans-serif;
  background:var(--dark); color:var(--text);
  overflow-x:hidden; line-height:1.65;
}
body::before {
  content:''; position:fixed; inset:0; pointer-events:none; z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E");
  opacity:.4;
}

::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--dark)}
::-webkit-scrollbar-thumb{background:var(--primary);border-radius:4px}

/* ─── UTILS ─────────────────────────────────────── */
.container { max-width:1200px; margin:0 auto; padding:0 36px }
.gradient-text {
  background:linear-gradient(135deg,#818CF8,#38BDF8);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}

/* ─── NAVBAR ─────────────────────────────────────── */
.navbar {
  position:fixed; top:0; left:0; right:0; z-index:1000;
  padding:20px 0; transition:all .4s ease;
}
.navbar.scrolled {
  background:rgba(5,6,26,.95); backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(91,95,240,.17); padding:13px 0;
}
.nav-inner {
  max-width:1200px; margin:0 auto; padding:0 36px;
  display:flex; align-items:center; justify-content:space-between;
}
.nav-logo { display:flex; align-items:center; gap:10px; text-decoration:none }
.nav-logo-icon {
  width:40px; height:40px; background:var(--gp); border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  font-family:'Syne',sans-serif; font-weight:800; font-size:13px; color:#fff;
  box-shadow:0 4px 20px rgba(91,95,240,.45);
}
.nav-logo-text { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; color:#fff }
.nav-logo-text span { color:var(--primary-light) }
.nav-links { display:flex; list-style:none; gap:36px }
.nav-links a {
  text-decoration:none; font-size:14px; font-weight:500;
  color:var(--text-2); transition:color .2s;
}
.nav-links a:hover,.nav-links a.active { color:#fff }
.nav-cta  { display:flex; align-items:center; gap:12px }
.hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px }
.hamburger span { width:24px; height:2px; background:#fff; border-radius:2px; transition:all .3s }

/* ─── BUTTONS ────────────────────────────────────── */
.btn {
  display:inline-flex; align-items:center; gap:8px; border:none; cursor:pointer;
  font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; border-radius:12px;
  text-decoration:none; transition:all .25s ease; white-space:nowrap;
}
.btn-ghost { padding:10px 20px; font-size:14px; color:var(--text-2); background:transparent }
.btn-ghost:hover { color:#fff; background:rgba(255,255,255,.06) }
.btn-primary {
  padding:12px 24px; font-size:14px; color:#fff; background:var(--gp);
  position:relative; overflow:hidden; box-shadow:0 4px 20px rgba(59,63,216,.4);
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(59,63,216,.55) }
.btn-primary-lg { padding:16px 34px; font-size:16px; border-radius:14px }
.btn-outline-lg {
  padding:15px 34px; font-size:16px; border-radius:14px;
  border:1.5px solid rgba(255,255,255,.22); color:#fff; background:transparent;
}
.btn-outline-lg:hover { border-color:rgba(255,255,255,.5); background:rgba(255,255,255,.05) }
.ripple {
  position:absolute; width:6px; height:6px; background:rgba(255,255,255,.4); border-radius:50%;
  transform:scale(0); animation:ripple-k .6s ease-out; pointer-events:none; margin:-3px;
}
@keyframes ripple-k { to { transform:scale(60); opacity:0 } }

/* ─── MOBILE MENU ────────────────────────────────── */
.mobile-menu {
  position:fixed; inset:0; background:#06071a; z-index:999;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:32px; opacity:0; pointer-events:none; transition:opacity .3s;
}
.mobile-menu.open { opacity:1; pointer-events:auto }
.mobile-menu a { font-size:24px; font-weight:700; color:#fff; text-decoration:none }
.mobile-close { position:absolute; top:24px; right:28px; font-size:24px; color:#fff; cursor:pointer; background:none; border:none }

/* ─── SCROLL REVEAL ──────────────────────────────── */
.reveal,.reveal-left,.reveal-right {
  opacity:0; transition:opacity .72s ease, transform .72s ease;
}
.reveal       { transform:translateY(26px) }
.reveal-left  { transform:translateX(-26px) }
.reveal-right { transform:translateX(26px) }
.reveal.visible,.reveal-left.visible,.reveal-right.visible { opacity:1; transform:none }
.reveal-delay-1 { transition-delay:.10s }
.reveal-delay-2 { transition-delay:.20s }
.reveal-delay-3 { transition-delay:.30s }
.reveal-delay-4 { transition-delay:.40s }
.reveal-delay-5 { transition-delay:.50s }

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════════ */
.hero {
  min-height:100vh;
  background:var(--gh);
  position:relative; display:flex; align-items:center;
  overflow:hidden; padding:120px 0 80px;
}

/* Background grid */
.hero-bg-grid {
  position:absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(91,95,240,.065) 1px, transparent 1px),
    linear-gradient(90deg,rgba(91,95,240,.065) 1px, transparent 1px);
  background-size:64px 64px;
  mask-image:radial-gradient(ellipse 90% 80% at 68% 50%, black 25%, transparent 100%);
}

/* Big radial glow (follows mouse via JS) */
.hero-bg-glow {
  position:absolute;
  width:700px; height:700px; border-radius:50%;
  background:radial-gradient(circle,rgba(59,63,216,.42) 0%,rgba(59,63,216,.12) 45%,transparent 70%);
  top:50%; right:6%; transform:translateY(-50%);
  filter:blur(55px); pointer-events:none;
  transition:transform .85s cubic-bezier(.16,1,.3,1);
}
/* Cyan orb top */
.hero-bg-orb-1 {
  position:absolute; width:440px; height:440px; border-radius:50%;
  background:radial-gradient(circle,rgba(56,189,248,.13) 0%,transparent 70%);
  top:-90px; right:25%; filter:blur(70px); pointer-events:none;
  animation:orb1 13s ease-in-out infinite;
}
/* Green orb bottom */
.hero-bg-orb-2 {
  position:absolute; width:340px; height:340px; border-radius:50%;
  background:radial-gradient(circle,rgba(34,197,94,.10) 0%,transparent 70%);
  bottom:-70px; right:20%; filter:blur(60px); pointer-events:none;
  animation:orb2 17s ease-in-out infinite;
}
@keyframes orb1 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(22px,-28px)} 70%{transform:translate(-14px,18px)} }
@keyframes orb2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-38px)} }

/* ── HERO GRID ── */
.hero-inner {
  display:grid; grid-template-columns:1fr 1.15fr;
  gap:60px; align-items:center; position:relative; z-index:2;
}

/* ── HERO LEFT ── */
.hero-left { max-width:560px }

.hero-badge {
  display:inline-flex; align-items:center; gap:10px;
  background:rgba(91,95,240,.14); border:1px solid rgba(91,95,240,.32);
  border-radius:100px; padding:8px 18px;
  font-size:13px; font-weight:600; color:rgba(255,255,255,.86);
  margin-bottom:28px; backdrop-filter:blur(10px);
}
.hero-badge-dot {
  width:7px; height:7px; background:#22C55E; border-radius:50%;
  box-shadow:0 0 8px #22C55E; animation:bdot 2s ease-in-out infinite;
}
@keyframes bdot { 0%,100%{box-shadow:0 0 6px #22C55E} 50%{box-shadow:0 0 18px #22C55E,0 0 32px rgba(34,197,94,.3)} }

.hero-title {
  font-family:'Syne',sans-serif; font-weight:800; line-height:1.05;
  letter-spacing:-2px; color:#fff; margin-bottom:12px;
  font-size:clamp(34px,4.2vw,62px);
}
.hero-title .brand-name {
  display:block; font-size:clamp(58px,7.5vw,100px); line-height:.93;
  background:linear-gradient(140deg,#fff 15%,#C7D2FE 60%,#818CF8 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text; margin-bottom:6px;
}
.hero-desc {
  font-size:15.5px; color:var(--text-2); line-height:1.78;
  margin-bottom:32px; max-width:455px;
}

.hero-features-mini { display:flex; flex-direction:column; gap:10px; margin-bottom:36px }
.hero-feature-item  { display:flex; align-items:center; gap:12px; font-size:14px; font-weight:500; color:rgba(255,255,255,.78) }
.hero-feature-icon  {
  width:32px; height:32px; background:rgba(91,95,240,.18); border-radius:9px;
  display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0;
}
.hero-actions { display:flex; gap:16px; align-items:center; margin-bottom:40px; flex-wrap:wrap }

/* Trust bar */
.hero-trust { display:flex; align-items:center; gap:16px; flex-wrap:wrap }
.trust-avatars { display:flex }
.trust-avatar {
  width:32px; height:32px; border-radius:50%; border:2px solid var(--dark);
  margin-left:-10px; font-size:11px; font-weight:700;
  display:flex; align-items:center; justify-content:center;
}
.trust-avatar:first-child { margin-left:0 }
.trust-stars { color:#FBBF24; font-size:13px; letter-spacing:1px }
.trust-text  { font-size:13px; color:var(--text-2) }

/* Stats row */
.hero-stats {
  display:flex; align-items:center; margin-top:32px;
  padding-top:24px; border-top:1px solid rgba(255,255,255,.08);
}
.stat-item { padding:0 28px; text-align:center }
.stat-item:first-child { padding-left:0 }
.stat-number { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:#fff; line-height:1 }
.stat-label  { font-size:12px; color:var(--text-3); margin-top:4px; font-weight:500 }
.stat-divider { width:1px; height:36px; background:rgba(255,255,255,.1) }

/* Hero left stagger entry */
.hero-left > * { opacity:0; transform:translateY(22px); animation:hUp .7s ease forwards }
.hero-left > *:nth-child(1){animation-delay:.08s}
.hero-left > *:nth-child(2){animation-delay:.16s}
.hero-left > *:nth-child(3){animation-delay:.24s}
.hero-left > *:nth-child(4){animation-delay:.32s}
.hero-left > *:nth-child(5){animation-delay:.40s}
.hero-left > *:nth-child(6){animation-delay:.48s}
.hero-left > *:nth-child(7){animation-delay:.56s}
@keyframes hUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }

/* ═══════════════════════════════════════════════════════════════
   3D PHONE SCENE
   
   KEY RULE: Two-element pattern per phone:
   
     <div class="phone-3d phone-main">   ← STATIC position transform
       <div class="phone-inner">          ← FLOAT animation (translateY only)
         <img …>
       </div>
     </div>
   
   Why? CSS `animation` replaces the entire `transform` value on the
   animated element, so you cannot animate float AND keep a static 3D
   position on the same element. Splitting into two layers solves this.
═══════════════════════════════════════════════════════════════ */

/* Container holds the perspective camera */
.hero-visual { position:relative; height:640px; overflow:visible }

.scene-3d {
  position:absolute; inset:0; overflow:visible;
  perspective:700px;          /* < 800px = dramatic depth */
  perspective-origin:50% 18%; /* camera from above */
}

/* The whole cluster — JS rotates this for mouse parallax.
   Base transform MUST match BASE_X / BASE_Y constants in main.js */
.phone-group {
  position:absolute; inset:0;
  transform-style:preserve-3d;
  transform:rotateX(22deg) rotateY(-10deg); /* ← matches JS BASE_X=22, BASE_Y=-10 */
  will-change:transform;
}

/* Purple-blue backlight glow */
.phone-glow-bg {
  position:absolute; width:380px; height:540px;
  left:50%; top:50%; transform:translate(-50%,-50%);
  background:radial-gradient(ellipse,
    rgba(59,63,216,.60) 0%,
    rgba(99,102,241,.22) 38%,
    rgba(56,189,248,.06) 65%,
    transparent 80%);
  filter:blur(52px); border-radius:50%; z-index:1; pointer-events:none;
  animation:gPulse 4.5s ease-in-out infinite;
}
@keyframes gPulse {
  0%,100% { opacity:.72; transform:translate(-50%,-50%) scale(1) }
  50%     { opacity:1;   transform:translate(-50%,-50%) scale(1.14) }
}

/* ── .phone-3d ─────────────────────────────────────
   Holds ONLY the static 3D position.
   Initial opacity:0 — entry animation fades it in.
   After animation (forwards fill), opacity stays at
   the per-phone value defined in each keyframe.
   The `transform` on this element is NEVER animated.
─────────────────────────────────────────────────── */
.phone-3d {
  position:absolute; left:50%; top:50%;
  transform-style:preserve-3d; cursor:pointer;
  opacity:0;
  transition:filter .35s ease;
}
.phone-3d img {
  width:100%; height:auto; display:block;
  border-radius:38px; pointer-events:none; user-select:none;
}

/* ── .phone-inner ─────────────────────────────────
   Holds ONLY the floating Y animation.
   Never put 3D position transforms here.
─────────────────────────────────────────────────── */
.phone-inner {
  transform-style:preserve-3d;
  will-change:transform;
}

/* Hover: pause float, smooth lift */
.phone-3d:hover { z-index:30 !important }
.phone-3d:hover .phone-inner {
  animation-play-state:paused !important;
}

/* ═══════════════════════════════════════
   INDIVIDUAL PHONE POSITIONS
   
   Transform formula (applied left→right):
   1. translateX(-50%) translateY(-50%)
      Centers element on its left:50% top:50% anchor.
   2. translateX(Xpx) translateY(Ypx) translateZ(Zpx)
      Offsets in world-space within the tilted group.
   3. rotateY(Adeg)
      Tilts the phone face (in its own local space).
   
   Depth layers (Z): +100 → -10 → -32 → -90 → -115
═══════════════════════════════════════ */

/* ① MAIN — center, front, biggest */
.phone-main {
  width:232px;
  transform:
    translateX(-50%) translateY(-50%)
    translateZ(100px) translateY(-22px)
    rotateY(-5deg);
  z-index:10;
  filter:
    drop-shadow(0 72px 64px rgba(0,0,0,.82))
    drop-shadow(0 0 64px rgba(59,63,216,.52))
    drop-shadow(0 0 28px rgba(99,102,241,.28));
  animation:eMain .9s cubic-bezier(.16,1,.3,1) .35s forwards;
}
.phone-main .phone-inner { animation:fY1 5.8s ease-in-out 1.28s infinite }
.phone-main:hover {
  filter:
    drop-shadow(0 80px 72px rgba(0,0,0,.88))
    drop-shadow(0 0 88px rgba(91,95,240,.68)) !important;
}

/* ② LEFT — upper-left, right-face tilt */
.phone-left {
  width:195px;
  transform:
    translateX(-50%) translateY(-50%)
    translateX(-215px) translateY(-52px) translateZ(-10px)
    rotateY(28deg);
  z-index:8;
  filter:
    drop-shadow(0 52px 52px rgba(0,0,0,.72))
    drop-shadow(0 0 32px rgba(59,63,216,.26));
  animation:eL .9s cubic-bezier(.16,1,.3,1) .55s forwards;
}
.phone-left .phone-inner { animation:fY2 7.2s ease-in-out 1.45s infinite }

/* ③ RIGHT — upper-right, left-face tilt */
.phone-right {
  width:192px;
  transform:
    translateX(-50%) translateY(-50%)
    translateX(212px) translateY(-38px) translateZ(-32px)
    rotateY(-26deg);
  z-index:7;
  filter:
    drop-shadow(0 48px 48px rgba(0,0,0,.68))
    drop-shadow(0 0 26px rgba(59,63,216,.22));
  animation:eR .9s cubic-bezier(.16,1,.3,1) .70s forwards;
}
.phone-right .phone-inner { animation:fY3 8.0s ease-in-out 1.62s infinite }

/* ④ BOTTOM-LEFT — lower, deeper */
.phone-bl {
  width:172px;
  transform:
    translateX(-50%) translateY(-50%)
    translateX(-124px) translateY(120px) translateZ(-90px)
    rotateY(20deg);
  z-index:5;
  filter:drop-shadow(0 38px 38px rgba(0,0,0,.64));
  animation:eBL .9s cubic-bezier(.16,1,.3,1) .85s forwards;
}
.phone-bl .phone-inner { animation:fY4 9.2s ease-in-out 1.78s infinite }

/* ⑤ BOTTOM-RIGHT — lowest, furthest back */
.phone-br {
  width:166px;
  transform:
    translateX(-50%) translateY(-50%)
    translateX(118px) translateY(130px) translateZ(-115px)
    rotateY(-18deg);
  z-index:4;
  filter:drop-shadow(0 30px 30px rgba(0,0,0,.58));
  animation:eBR .9s cubic-bezier(.16,1,.3,1) 1.00s forwards;
}
.phone-br .phone-inner { animation:fY5 8.6s ease-in-out 1.95s infinite }

/* Entry keyframes — opacity only, one per final-opacity value */
@keyframes eMain { from{opacity:0} to{opacity:1.00} }
@keyframes eL    { from{opacity:0} to{opacity:0.87} }
@keyframes eR    { from{opacity:0} to{opacity:0.81} }
@keyframes eBL   { from{opacity:0} to{opacity:0.66} }
@keyframes eBR   { from{opacity:0} to{opacity:0.58} }

/* Float keyframes — translateY ONLY (never touch X/Z) */
@keyframes fY1 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-22px)} }
@keyframes fY2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-17px)} }
@keyframes fY3 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-19px)} }
@keyframes fY4 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-13px)} }
@keyframes fY5 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-11px)} }

/* ═══════════════════════════════════════════════════════════════
   FLOATING GLASS CARDS
   OUTSIDE .scene-3d — positioned 2D over .hero-visual.
   Two-animation approach: cardEntry (once) + fcFloat* (infinite).
   CSS allows comma-separated animations; last one wins per property.
═══════════════════════════════════════════════════════════════ */
.float-card {
  position:absolute; z-index:50;
  background:rgba(255,255,255,.075);
  backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  border:1px solid rgba(255,255,255,.17);
  border-radius:18px; padding:12px 16px;
  white-space:nowrap; cursor:default;
  box-shadow:0 8px 32px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.13);
  will-change:transform;
  opacity:0; /* cleared by entry animation */
}
.float-card:hover {
  background:rgba(255,255,255,.13);
  box-shadow:0 20px 48px rgba(0,0,0,.38),0 0 28px rgba(91,95,240,.28),
             inset 0 1px 0 rgba(255,255,255,.18);
  transform:translateY(-6px) scale(1.04) !important;
}
@keyframes cEntry { from{opacity:0;transform:translateY(14px) scale(.88)} to{opacity:1;transform:none} }

.float-card-inner { display:flex; align-items:center; gap:10px }
.float-card-icon  {
  width:36px; height:36px; border-radius:10px;
  display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0;
}
.float-card-text  { display:flex; flex-direction:column }
.float-card-label { font-size:11px; color:rgba(255,255,255,.5); font-weight:500; line-height:1; margin-bottom:2px }
.float-card-value { font-size:15px; font-weight:700; color:#fff; line-height:1.1 }
.float-card-dot   { width:7px; height:7px; border-radius:50%; margin-left:4px; flex-shrink:0 }

/* Positions + combined animations */
.fc-progress {
  top:6%; left:-2%;
  animation:cEntry .65s cubic-bezier(.16,1,.3,1) .80s forwards,
            cfY1 5.5s ease-in-out 1.50s infinite;
}
.fc-jadwal {
  top:34%; left:-5%;
  animation:cEntry .65s cubic-bezier(.16,1,.3,1) .95s forwards,
            cfY2 6.8s ease-in-out 1.65s infinite;
}
.fc-cloud {
  top:4%; right:-1%;
  animation:cEntry .65s cubic-bezier(.16,1,.3,1) .85s forwards,
            cfY3 7.2s ease-in-out 1.55s infinite;
}
.fc-realtime {
  bottom:22%; left:18%;
  animation:cEntry .65s cubic-bezier(.16,1,.3,1) 1.10s forwards,
            cfY4 6.0s ease-in-out 2.05s infinite;
}
.fc-analytics {
  bottom:8%; right:-2%;
  animation:cEntry .65s cubic-bezier(.16,1,.3,1) 1.20s forwards,
            cfY5 6.4s ease-in-out 2.25s infinite;
}

@keyframes cfY1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
@keyframes cfY2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes cfY3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@keyframes cfY4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes cfY5 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }

/* ═══════════════════════════════════════
   TRUSTED
═══════════════════════════════════════ */
.trusted {
  background:var(--dark-2); padding:38px 0;
  border-top:1px solid rgba(255,255,255,.05);
  border-bottom:1px solid rgba(255,255,255,.05);
}
.trusted-inner {
  max-width:1200px; margin:0 auto; padding:0 36px;
  display:flex; align-items:center; gap:48px; flex-wrap:wrap;
}
.trusted-label { font-size:12px; font-weight:600; color:var(--text-3); letter-spacing:1px; text-transform:uppercase; white-space:nowrap }
.trusted-logos { display:flex; align-items:center; gap:40px; flex-wrap:wrap }
.trusted-logo  { font-family:'Syne',sans-serif; font-size:15px; font-weight:800; color:var(--text-3); letter-spacing:-.5px; transition:color .2s }
.trusted-logo:hover { color:var(--text-2) }

/* ═══════════════════════════════════════
   SHARED SECTION STYLES
═══════════════════════════════════════ */
.section-label {
  display:inline-flex; align-items:center; gap:8px;
  font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase;
  color:var(--primary-light); margin-bottom:14px;
}
.section-label::before { content:''; width:20px; height:2px; background:var(--primary-light); border-radius:1px }
.section-title {
  font-family:'Syne',sans-serif; font-size:clamp(28px,4vw,46px);
  font-weight:800; line-height:1.1; letter-spacing:-1px; margin-bottom:16px;
}
.section-desc  { font-size:16px; color:var(--text-2); line-height:1.7; max-width:520px }
.divider { height:1px; background:linear-gradient(90deg,transparent,rgba(91,95,240,.3),transparent) }

/* ═══════════════════════════════════════
   UVP — KENAPA PROTAS (Unique Value Prop)
═══════════════════════════════════════ */
.uvp { padding:110px 0; background:var(--dark-2) }
.uvp-header { text-align:center; max-width:640px; margin:0 auto 56px }
.uvp-header .section-desc { margin:0 auto }
.uvp-compare { display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:stretch }
.uvp-col {
  position:relative; border-radius:24px; padding:36px 32px;
  border:1px solid var(--card-border); backdrop-filter:blur(12px);
}
.uvp-col-old { background:rgba(255,255,255,.03) }
.uvp-col-new {
  background:linear-gradient(135deg,#181A58,#202280);
  border-color:rgba(91,95,240,.5);
  box-shadow:0 24px 52px rgba(0,0,0,.32),0 0 40px rgba(91,95,240,.12);
}
.uvp-col-badge {
  position:absolute; top:-13px; right:28px;
  background:var(--gp); color:#fff; font-size:11px; font-weight:800;
  padding:7px 16px; border-radius:100px; letter-spacing:.4px;
  box-shadow:0 6px 18px rgba(59,63,216,.45);
}
.uvp-col-head { display:flex; flex-direction:column; gap:4px; margin-bottom:26px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,.08) }
.uvp-col-icon { font-size:28px; margin-bottom:6px }
.uvp-col-head h3 { font-family:'Syne',sans-serif; font-size:19px; font-weight:800; letter-spacing:-.3px }
.uvp-col-head p { font-size:13px; color:var(--text-3) }
.uvp-list { display:flex; flex-direction:column; gap:16px }
.uvp-item { position:relative; padding-left:32px; font-size:14px; line-height:1.55; color:var(--text-2); list-style:none }
.uvp-item::before {
  content:''; position:absolute; left:0; top:0; width:21px; height:21px;
  border-radius:7px; display:flex; align-items:center; justify-content:center;
  font-size:11px; font-weight:800;
}
.uvp-item.is-no::before  { content:'✕'; background:rgba(239,68,68,.14); color:#F87171 }
.uvp-item.is-yes         { color:rgba(255,255,255,.9) }
.uvp-item.is-yes::before { content:'✓'; background:rgba(34,197,94,.2); color:#4ADE80 }

/* ═══════════════════════════════════════
   FEATURES
═══════════════════════════════════════ */
.features { padding:120px 0; background:var(--dark) }
.features-header { text-align:center; margin-bottom:72px }
.features-header .section-desc { margin:0 auto }
.features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px }
.feature-card {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:24px; padding:32px; transition:all .35s ease;
  position:relative; overflow:hidden; backdrop-filter:blur(12px);
}
.feature-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg,transparent,rgba(91,95,240,.5),transparent);
  opacity:0; transition:opacity .3s;
}
.feature-card:hover { transform:translateY(-7px); border-color:rgba(91,95,240,.5); box-shadow:0 24px 52px rgba(0,0,0,.3),0 0 40px rgba(91,95,240,.1) }
.feature-card:hover::before { opacity:1 }
.feature-card.highlight { background:linear-gradient(135deg,#181A58,#202280); border-color:rgba(91,95,240,.5) }
.feature-icon  { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:20px }
.icon-blue    { background:rgba(91,95,240,.2) }
.icon-green   { background:rgba(34,197,94,.15) }
.icon-orange  { background:rgba(249,115,22,.15) }
.icon-purple  { background:rgba(167,139,250,.15) }
.icon-cyan    { background:rgba(6,182,212,.15) }
.icon-red     { background:rgba(239,68,68,.15) }
.feature-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; margin-bottom:10px; letter-spacing:-.3px }
.feature-desc  { font-size:14px; color:var(--text-2); line-height:1.65 }

/* ═══════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════ */
.how-it-works { padding:100px 0; background:var(--dark-2) }
.hiw-inner { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center }
.steps { display:flex; flex-direction:column }
.step { display:flex; gap:24px; padding-bottom:40px }
.step:last-child { padding-bottom:0 }
.step-left { display:flex; flex-direction:column; align-items:center; flex-shrink:0 }
.step-number {
  width:44px; height:44px; background:var(--gp); border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  font-family:'Syne',sans-serif; font-size:16px; font-weight:800; color:#fff;
  box-shadow:0 4px 20px rgba(91,95,240,.35); flex-shrink:0; z-index:1;
}
.step-line { width:2px; flex:1; margin-top:8px; background:linear-gradient(180deg,rgba(91,95,240,.5),transparent); min-height:40px }
.step:last-child .step-line { display:none }
.step-content { padding-top:8px }
.step-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; margin-bottom:8px; letter-spacing:-.3px }
.step-desc  { font-size:14px; color:var(--text-2); line-height:1.65 }

.dashboard-preview {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:24px; overflow:hidden;
  box-shadow:0 40px 80px rgba(0,0,0,.42); backdrop-filter:blur(12px);
}
.dp-topbar  { background:var(--primary); padding:16px 20px; display:flex; justify-content:space-between; align-items:center }
.dp-greeting h4 { font-size:13px; font-weight:700; color:#fff }
.dp-greeting p  { font-size:10px; color:rgba(255,255,255,.6) }
.dp-icon { width:36px; height:36px; background:rgba(255,255,255,.15); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:16px }
.dp-body { padding:20px }
.dp-section-title { font-size:11px; font-weight:700; margin-bottom:12px; letter-spacing:.5px; text-transform:uppercase }
.dp-table { background:rgba(255,255,255,.04); border-radius:14px; overflow:hidden; margin-bottom:20px }
.dp-table-header { display:grid; grid-template-columns:2fr 1fr 1fr; padding:10px 14px; background:rgba(91,95,240,.1) }
.dp-table-header span { font-size:9px; font-weight:600; color:var(--text-3); text-transform:uppercase; letter-spacing:.5px }
.dp-table-row { display:grid; grid-template-columns:2fr 1fr 1fr; padding:10px 14px; border-top:1px solid rgba(255,255,255,.04); align-items:center }
.dp-table-row:hover { background:rgba(255,255,255,.02) }
.dp-student-name { font-size:12px; font-weight:600 }
.dp-student-id   { font-size:10px; color:var(--text-3); margin-top:1px }
.dp-bab { font-size:11px; color:var(--text-2) }
.badge { display:inline-flex; align-items:center; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:600 }
.badge-green  { background:rgba(34,197,94,.15);  color:#22C55E }
.badge-orange { background:rgba(249,115,22,.15); color:#F97316 }
.badge-blue   { background:rgba(91,95,240,.15);  color:#818CF8 }

/* ═══════════════════════════════════════
   USERS / ROLES
═══════════════════════════════════════ */
.users-section { padding:100px 0; background:var(--dark) }
.users-inner   { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center }
.users-text    { max-width:460px }
.role-tabs  { display:flex; gap:8px; margin-bottom:32px; flex-wrap:wrap }
.role-tab {
  padding:10px 20px; border-radius:10px; border:1px solid rgba(255,255,255,.12);
  background:transparent; color:var(--text-2); font-size:13px; font-weight:600;
  cursor:pointer; transition:all .2s; font-family:'Plus Jakarta Sans',sans-serif;
}
.role-tab.active,.role-tab:hover { background:var(--primary); border-color:var(--primary); color:#fff; box-shadow:0 4px 16px rgba(59,63,216,.35) }
.role-content { display:none }
.role-content.active { display:block }
.role-content h3 { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; margin-bottom:12px }
.role-content p  { font-size:14px; color:var(--text-2); line-height:1.7; margin-bottom:20px }
.role-features   { display:flex; flex-direction:column; gap:10px; margin-bottom:24px }
.role-feature    { display:flex; align-items:center; gap:10px; font-size:14px; color:var(--text-2) }
.role-feature::before { content:'✓'; color:#22C55E; font-weight:700; flex-shrink:0 }
.users-visual { display:flex; flex-direction:column; gap:16px }
.user-card {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:20px; padding:20px; display:flex; align-items:center; gap:16px;
  transition:all .3s; backdrop-filter:blur(8px);
}
.user-card:hover { transform:translateX(6px); border-color:rgba(91,95,240,.5) }
.user-card-avatar { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0 }
.user-card-name   { font-size:15px; font-weight:700; margin-bottom:4px }
.user-card-role   { font-size:12px; color:var(--text-3) }
.user-card-stats  { margin-left:auto; text-align:right }
.user-card-stat-val   { font-family:'Syne',sans-serif; font-size:18px; font-weight:800 }
.user-card-stat-label { font-size:10px; color:var(--text-3); margin-top:1px }

/* ═══════════════════════════════════════
   PROGRESS DEMO
═══════════════════════════════════════ */
.progress-demo { padding:100px 0; background:var(--dark-2) }
.progress-demo-inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center }
.progress-card {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:24px; padding:32px; backdrop-filter:blur(12px);
}
.progress-card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px }
.progress-card-header h3 { font-family:'Syne',sans-serif; font-size:16px; font-weight:800 }
.progress-percentage   { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:var(--accent) }
.chapter-row    { display:flex; align-items:center; gap:12px; margin-bottom:14px }
.chapter-row:last-child { margin-bottom:0 }
.chapter-label  { font-size:12px; font-weight:700; color:var(--text-2); width:44px; flex-shrink:0 }
.chapter-bar-bg { flex:1; height:8px; background:rgba(255,255,255,.07); border-radius:4px; overflow:hidden }
.chapter-bar    { height:100%; border-radius:4px; width:0; transition:width 1.4s cubic-bezier(.4,0,.2,1) }
.chapter-bar.done { background:linear-gradient(90deg,#22C55E,#16A34A) }
.chapter-bar.wip  { background:linear-gradient(90deg,#F97316,#EA580C) }
.chapter-pct    { font-size:11px; font-weight:700; color:var(--text-3); width:36px; text-align:right; flex-shrink:0 }
.donut-outer    { display:flex; justify-content:center; margin:24px 0 8px }
.donut-svg      { width:140px; height:140px }
.donut-bg-c     { fill:none; stroke:rgba(255,255,255,.07); stroke-width:16 }
.donut-fill     {
  fill:none; stroke:#22C55E; stroke-width:16; stroke-linecap:round;
  stroke-dasharray:339.3; stroke-dashoffset:339.3;
  transform:rotate(-90deg); transform-origin:50% 50%;
  transition:stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1);
}
.donut-center-text { text-anchor:middle }
.donut-pct { font-size:22px; font-weight:800; fill:#22C55E; font-family:'Syne',sans-serif }
.donut-sub { font-size:9px; fill:rgba(255,255,255,.44); font-family:'Plus Jakarta Sans',sans-serif }
.progress-legend { display:flex; justify-content:center; gap:20px; margin-top:4px }
.legend-item { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--text-3) }
.legend-dot  { width:8px; height:8px; border-radius:50%; flex-shrink:0 }

.notif-list { display:flex; flex-direction:column; gap:12px }
.notif-item {
  display:flex; align-items:flex-start; gap:14px;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07);
  border-radius:14px; padding:14px 16px; transition:all .3s;
}
.notif-item:hover { background:rgba(91,95,240,.08); border-color:rgba(91,95,240,.25) }
.notif-icon { width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0 }
.notif-icon.blue   { background:rgba(91,95,240,.18) }
.notif-icon.green  { background:rgba(34,197,94,.15) }
.notif-icon.orange { background:rgba(249,115,22,.15) }
.notif-title { font-size:13px; font-weight:700; margin-bottom:2px }
.notif-body  { font-size:12px; color:var(--text-2); line-height:1.5 }
.notif-time  { font-size:10px; color:var(--text-3); margin-top:4px }
.notif-dot   { width:8px; height:8px; background:var(--primary-light); border-radius:50%; margin-top:5px; flex-shrink:0 }

/* ═══════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════ */
.testimonials { padding:100px 0; background:var(--dark) }
.testimonials-header { text-align:center; margin-bottom:56px }
.testimonials-header .section-desc { margin:0 auto }
.testimonials-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px }
.testimonial-card {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:24px; padding:28px; transition:all .3s; backdrop-filter:blur(8px);
}
.testimonial-card:hover { transform:translateY(-5px); border-color:rgba(91,95,240,.45); box-shadow:0 20px 40px rgba(0,0,0,.3) }
.testimonial-stars { color:#FBBF24; font-size:14px; margin-bottom:16px; letter-spacing:2px }
.testimonial-text  { font-size:14px; color:var(--text-2); line-height:1.75; margin-bottom:20px; font-style:italic }
.testimonial-author { display:flex; align-items:center; gap:12px }
.testimonial-avatar { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#fff; flex-shrink:0 }
.testimonial-name { font-size:14px; font-weight:700 }
.testimonial-role { font-size:12px; color:var(--text-3); margin-top:2px }

/* ═══════════════════════════════════════
   FAQ
═══════════════════════════════════════ */
.faq { padding:100px 0; background:var(--dark) }
.faq-header { text-align:center; margin-bottom:56px }
.faq-header .section-desc { margin:0 auto }
.faq-list { max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:12px }
.faq-item {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:16px; overflow:hidden; transition:border-color .2s; backdrop-filter:blur(8px);
}
.faq-item.open { border-color:rgba(91,95,240,.5) }
.faq-question {
  padding:20px 24px; display:flex; justify-content:space-between; align-items:center;
  cursor:pointer; font-weight:600; font-size:15px; color:var(--text); user-select:none; gap:16px;
}
.faq-icon {
  width:28px; height:28px; background:rgba(91,95,240,.15); border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  font-size:14px; color:var(--primary-light); flex-shrink:0; transition:all .3s;
}
.faq-item.open .faq-icon { background:var(--primary); color:#fff; transform:rotate(45deg) }
.faq-answer { max-height:0; overflow:hidden; transition:max-height .4s ease,padding .3s; padding:0 24px }
.faq-item.open .faq-answer { max-height:200px; padding:0 24px 20px }
.faq-answer p { font-size:14px; color:var(--text-2); line-height:1.7 }

/* ═══════════════════════════════════════
   GARANSI / RISK REDUCER
═══════════════════════════════════════ */
.guarantee { padding:100px 0; background:var(--dark) }
.guarantee-card {
  position:relative; background:var(--card-bg); border:1px dashed rgba(91,95,240,.4);
  border-radius:32px; padding:56px 48px; backdrop-filter:blur(12px);
  box-shadow:0 30px 70px rgba(0,0,0,.28);
}
.guarantee-ribbon {
  position:absolute; top:-16px; left:50%; transform:translateX(-50%);
  background:linear-gradient(135deg,#22C55E,#16A34A); color:#fff;
  font-size:12px; font-weight:800; padding:9px 22px;
  border-radius:100px; box-shadow:0 10px 24px rgba(34,197,94,.4);
  white-space:nowrap;
}
.guarantee-header { text-align:center; max-width:560px; margin:0 auto 48px }
.guarantee-header .section-desc { margin:0 auto }
.guarantee-header .section-label { justify-content:center }
.guarantee-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px }
.guarantee-item { text-align:center }
.guarantee-icon {
  width:56px; height:56px; margin:0 auto 16px; border-radius:16px;
  background:rgba(91,95,240,.14); display:flex; align-items:center; justify-content:center;
  font-size:24px;
}
.guarantee-item h3 { font-family:'Syne',sans-serif; font-size:15px; font-weight:800; margin-bottom:8px; letter-spacing:-.2px }
.guarantee-item p  { font-size:13px; color:var(--text-2); line-height:1.6 }

/* ═══════════════════════════════════════
   CTA
═══════════════════════════════════════ */
.cta-section { padding:100px 0; position:relative; background:var(--dark-2) }
.cta-bg-glow {
  position:absolute; width:800px; height:400px;
  background:radial-gradient(ellipse,rgba(59,63,216,.22),transparent 70%);
  top:50%; left:50%; transform:translate(-50%,-50%);
  filter:blur(60px); pointer-events:none;
}
.cta-inner { display:flex; justify-content:center }
.cta-card  {
  max-width:680px; text-align:center;
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:32px; padding:60px 48px; backdrop-filter:blur(16px);
  box-shadow:0 40px 80px rgba(0,0,0,.3);
}
.cta-title { font-family:'Syne',sans-serif; font-size:clamp(28px,4vw,44px); font-weight:800; line-height:1.1; letter-spacing:-1px; margin-bottom:16px }
.cta-desc  { font-size:16px; color:var(--text-2); line-height:1.7; margin-bottom:36px }
.cta-actions { display:flex; justify-content:center; gap:16px; flex-wrap:wrap }
.cta-note    { font-size:13px; color:var(--text-3); margin-top:20px }

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
.contact { padding:100px 0; background:var(--dark) }
.contact-inner { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center }
.contact-text  { max-width:460px }
.contact-direct {
  margin-top:28px; padding:14px 18px; border-radius:16px;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
  display:flex; align-items:center; gap:12px; width:fit-content;
}
.contact-form {
  background:var(--card-bg); border:1px solid var(--card-border);
  border-radius:24px; padding:36px; backdrop-filter:blur(12px);
  display:flex; flex-direction:column; gap:18px;
  box-shadow:0 30px 60px rgba(0,0,0,.3);
}
.form-field { display:flex; flex-direction:column; gap:8px }
.form-field label { display:block }
.form-field label span { font-size:13px; font-weight:700; color:rgba(255,255,255,.82) }
.form-field input, .form-field select, .form-field textarea {
  width:100%; border:1px solid rgba(255,255,255,.14); border-radius:12px;
  background:rgba(255,255,255,.05); color:#fff; padding:13px 14px;
  font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.form-field input::placeholder, .form-field textarea::placeholder { color:rgba(255,255,255,.32) }
.form-field input:focus, .form-field select:focus, .form-field textarea:focus {
  border-color:rgba(90,94,240,.85); box-shadow:0 0 0 4px rgba(90,94,240,.16);
}
.form-field select { cursor:pointer }
.form-field select option { background:#12143A; color:#fff }
.form-field textarea { resize:vertical; min-height:80px; line-height:1.6; font-family:'Plus Jakarta Sans',sans-serif }
.form-error { min-height:18px; margin:0; font-size:13px; font-weight:700; color:#FCA5A5 }
.contact-submit { justify-content:center; width:100%; padding:15px 24px; font-size:15px }
.contact-form-note { font-size:12px; color:var(--text-3); text-align:center; line-height:1.6; margin-top:-4px }

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
.footer { background:#040511; border-top:1px solid rgba(255,255,255,.06) }
.footer-inner { max-width:1200px; margin:0 auto; padding:64px 36px 32px }
.footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:48px }
.footer-brand p { font-size:14px; color:var(--text-2); line-height:1.7; margin-top:16px; max-width:280px }
.footer-col h4  { font-family:'Syne',sans-serif; font-size:14px; font-weight:800; margin-bottom:16px }
.footer-col ul  { list-style:none; display:flex; flex-direction:column; gap:10px }
.footer-col a   { font-size:13px; color:var(--text-3); text-decoration:none; transition:color .2s }
.footer-col a:hover { color:#fff }
.footer-bottom {
  display:flex; justify-content:space-between; align-items:center;
  padding-top:24px; border-top:1px solid rgba(255,255,255,.06); flex-wrap:wrap; gap:12px;
}
.footer-bottom p { font-size:13px; color:var(--text-3) }
.footer-bottom span { color:var(--primary-light) }
.footer-badge { font-size:13px; color:var(--text-3) }

/* ─── SCROLL TOP + TOAST ─────────────────────────── */
#scroll-top {
  position:fixed; bottom:28px; left:28px; width:44px; height:44px;
  background:var(--gp); border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; opacity:0; pointer-events:none;
  transition:all .3s; z-index:999; font-size:18px; color:#fff;
  box-shadow:0 4px 20px rgba(91,95,240,.4);
}
#scroll-top.show { opacity:1; pointer-events:auto }
#scroll-top:hover { transform:translateY(-3px) }

#toast-container {
  position:fixed; bottom:28px; right:28px; z-index:9999;
  display:flex; flex-direction:column; gap:10px; pointer-events:none;
}
.toast {
  display:flex; align-items:center; gap:10px;
  background:#12143A; border:1px solid rgba(91,95,240,.35);
  border-radius:14px; padding:14px 18px;
  font-size:13px; font-weight:500; color:#fff;
  font-family:'Plus Jakarta Sans',sans-serif;
  box-shadow:0 8px 32px rgba(0,0,0,.42);
  opacity:0; transform:translateX(30px);
  transition:all .3s ease; max-width:300px; pointer-events:auto;
}
.toast.show { opacity:1; transform:none }
.toast-icon { font-size:16px }
.toast-success { border-color:rgba(34,197,94,.4) }
.toast-success .toast-icon { color:#22C55E }

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media(max-width:1200px){
  .hero-inner{grid-template-columns:1fr 1fr;gap:40px}
  .phone-main{width:210px}.phone-left{width:175px}
  .phone-right{width:172px}.phone-bl{width:154px}.phone-br{width:148px}
}

@media(max-width:1024px){
  .hero-inner{grid-template-columns:1fr;text-align:center}
  .hero-left{max-width:100%;margin:0 auto}
  .hero-desc{margin:0 auto 32px}
  .hero-actions{justify-content:center}
  .hero-stats{justify-content:center}
  .hero-visual{height:520px;margin-top:40px}
  .features-grid{grid-template-columns:repeat(2,1fr)}
  .hiw-inner,.progress-demo-inner,.users-inner,.contact-inner{grid-template-columns:1fr}
  .testimonials-grid{grid-template-columns:1fr 1fr}
  .footer-top{grid-template-columns:1fr 1fr;gap:32px}
  .phone-main{width:192px}.phone-left{width:160px}
  .phone-right{width:158px}.phone-bl{width:142px}.phone-br{width:136px}
  .fc-jadwal,.fc-realtime,.fc-analytics{display:none}
  .uvp-compare{grid-template-columns:1fr;gap:40px 24px;max-width:520px;margin:0 auto}
  .guarantee-grid{grid-template-columns:repeat(2,1fr);gap:28px}
  .guarantee-card{padding:44px 32px}
  .contact-text{max-width:100%}
}

@media(max-width:768px){
  .container{padding:0 20px}
  .hero-title{font-size:clamp(30px,8vw,50px)}
  .hero-title .brand-name{font-size:clamp(44px,11vw,74px)}
  .features-grid,.testimonials-grid{grid-template-columns:1fr}
  .footer-top{grid-template-columns:1fr}
  .nav-links,.nav-cta{display:none}
  .hamburger{display:flex}
  .hero-visual{height:460px}
  .phone-main{width:178px}.phone-left{width:142px}
  .phone-right{width:140px}
  .phone-bl,.phone-br{display:none}
  .fc-progress,.fc-cloud{display:none}
  .stat-item{padding:0 16px}
  .cta-card{padding:40px 28px}
  .phone-group{transform:rotateX(18deg) rotateY(-8deg)}
  .uvp-col{padding:28px 24px}
  .guarantee-grid{grid-template-columns:1fr;gap:32px}
  .guarantee-card{padding:36px 22px}
  .guarantee-ribbon{font-size:11px;padding:8px 18px}
  .contact-form{padding:26px 22px}
}

@media(max-width:480px){
  .hero-visual{height:400px}
  .phone-group{transform:rotateX(15deg) rotateY(-6deg)}
  .phone-main{width:162px}
  .phone-left{width:125px}
  .phone-right{width:122px}
  .phone-left{
    transform:translateX(-50%) translateY(-50%)
    translateX(-148px) translateY(-38px) translateZ(-10px)
    rotateY(22deg);
  }
  .phone-right{
    transform:translateX(-50%) translateY(-50%)
    translateX(144px) translateY(-28px) translateZ(-32px)
    rotateY(-20deg);
  }
  .hero-actions{flex-direction:column;align-items:center}
  .float-card{display:none!important}
}
