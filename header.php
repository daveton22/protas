<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Platform digital untuk pemantauan progres tugas akhir dan skripsi mahasiswa." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- ── MOBILE MENU ── -->
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose">✕</button>
  <a href="#fitur">Fitur</a>
  <a href="#cara-kerja">Cara Kerja</a>
  <a href="#pengguna">Pengguna</a>
  <a href="#faq">FAQ</a>
  <a href="#mulai" class="btn btn-primary" style="font-size:18px;padding:14px 32px;border-radius:14px;margin-top:8px;">Mulai Sekarang</a>
</div>

<!-- ── NAVBAR ── -->
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav-logo">
      <div class="nav-logo-icon">PT</div>
      <span class="nav-logo-text">Pro<span>TAS</span></span>
    </a>
    <ul class="nav-links">
      <li><a href="#fitur">Fitur</a></li>
      <li><a href="#cara-kerja">Cara Kerja</a></li>
      <li><a href="#pengguna">Pengguna</a></li>
      <li><a href="#progres">Progres</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <div class="nav-cta">
      <a href="#" class="btn btn-ghost">Masuk</a>
      <a href="#mulai" class="btn btn-primary">Coba Gratis →</a>
    </div>
    <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>
