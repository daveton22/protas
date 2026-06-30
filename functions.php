<?php
/**
 * ProTAS Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue dinamis untuk style.css, Google Fonts, dan main.js
 */
function protas_enqueue_assets() {

	// Google Fonts — Plus Jakarta Sans & Syne
	wp_enqueue_style(
		'protas-google-fonts',
		'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap',
		array(),
		null
	);

	// style.css utama tema — dipanggil secara dinamis via get_stylesheet_uri()
	wp_enqueue_style(
		'protas-style',
		get_stylesheet_uri(),
		array( 'protas-google-fonts' ),
		wp_get_theme()->get( 'Version' )
	);

	// main.js — interaksi (navbar scroll, parallax 3D, counter, FAQ, dll), dimuat di footer
	wp_enqueue_script(
		'protas-main',
		get_template_directory_uri() . '/js/main.js',
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'protas_enqueue_assets' );

/**
 * Dukungan tema dasar
 */
function protas_theme_setup() {
	add_theme_support( 'title-tag' );      // wp_head() otomatis cetak <title>
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
}
add_action( 'after_setup_theme', 'protas_theme_setup' );

/**
 * Daftarkan menu navigasi (opsional — untuk dikelola lewat Appearance > Menus)
 */
function protas_register_menus() {
	register_nav_menus( array(
		'primary' => __( 'Menu Utama', 'protas' ),
	) );
}
add_action( 'init', 'protas_register_menus' );
