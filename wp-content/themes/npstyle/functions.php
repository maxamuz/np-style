<?php
/**
 * npstyle functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package npstyle
 */

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function npstyle_setup()
{
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on npstyle, use a find and replace
	 * to change 'npstyle' to the name of your theme in all the template files.
	 */
	load_theme_textdomain('npstyle', get_template_directory() . '/languages');

	// Add default posts and comments RSS feed links to head.
	add_theme_support('automatic-feed-links');

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support('title-tag');

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support('post-thumbnails');

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__('Primary', 'npstyle'),
			'ceilings-menu' => esc_html__('Виды потолков', 'npstyle'),

		)
	);

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'npstyle_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support('customize-selective-refresh-widgets');

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height' => 150,
			'width' => 150,
			'flex-width' => true,
			'flex-height' => true,
		)
	);
}
add_action('after_setup_theme', 'npstyle_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function npstyle_content_width()
{
	$GLOBALS['content_width'] = apply_filters('npstyle_content_width', 640);
}
add_action('after_setup_theme', 'npstyle_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function npstyle_widgets_init()
{
	register_sidebar(
		array(
			'name' => esc_html__('Sidebar', 'npstyle'),
			'id' => 'sidebar-1',
			'description' => esc_html__('Add widgets here.', 'npstyle'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget' => '</section>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		)
	);
}
add_action('widgets_init', 'npstyle_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function npstyle_scripts()
{
	wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	wp_enqueue_style('npstyle-style-bootstrap5', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css', array(), _S_VERSION);
	wp_enqueue_style('npstyle-style', get_stylesheet_uri(), array(), _S_VERSION);
	wp_enqueue_style('npstyle-style-main', get_template_directory_uri() . '/main.css', array(), _S_VERSION);
	wp_style_add_data('npstyle-style', 'rtl', 'replace');

	wp_enqueue_script('npstyle-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);
	wp_enqueue_script('bootatrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js', array(), _S_VERSION, true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'npstyle_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Load WooCommerce compatibility file.
 */
if (class_exists('WooCommerce')) {
	require get_template_directory() . '/inc/woocommerce.php';
}

function enqueue_custom_scripts()
{
	wp_enqueue_script(
		'custom-menu-script',
		get_template_directory_uri() . '/js/custom-menu.js',
		array('jquery'),
		'1.0',
		true
	);

	wp_localize_script('custom-menu-script', 'ajax_object', array(
		'ajax_url' => admin_url('admin-ajax.php')
	));
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');

function load_menu_content_callback()
{
	$page_id = intval($_POST['page_id']);

	if ($page_id) {
		$page = get_post($page_id);

		if ($page) {
			$excerpt = has_excerpt($page_id)
				? get_the_excerpt($page_id)
				: wp_trim_words($page->post_content, 30);

			$thumbnail = has_post_thumbnail($page_id)
				? get_the_post_thumbnail($page_id, 'medium')
				: '<img src="' . get_template_directory_uri() . '/img/default-thumbnail.png" alt="Default Image">';

			echo '<div class="menu-content">';
			echo $thumbnail;
			echo '<div class="content-text">';
			echo '<h3>' . get_the_title($page_id) . '</h3>';
			echo '<div class="excerpt">' . $excerpt . '</div>';
			echo '<a href="' . get_permalink($page_id) . '" class="read-more">Подробнее</a>';
			echo '</div></div>';
		}
	}

	wp_die();
}
add_action('wp_ajax_load_menu_content', 'load_menu_content_callback');
add_action('wp_ajax_nopriv_load_menu_content', 'load_menu_content_callback');

// Получение ID страницы по её URL
function get_page_id_by_path_callback()
{
	$path = isset($_POST['path']) ? sanitize_text_field($_POST['path']) : '';

	if (empty($path)) {
		wp_send_json_error(['message' => 'Path is empty']);
	}

	$page = get_page_by_path($path);

	if ($page) {
		wp_send_json_success(['page_id' => $page->ID]);
	} else {
		wp_send_json_error(['message' => 'Page not found']);
	}
}
add_action('wp_ajax_get_page_id_by_path', 'get_page_id_by_path_callback');
add_action('wp_ajax_nopriv_get_page_id_by_path', 'get_page_id_by_path_callback');

// Получение ID страницы по её URL
function get_page_id_by_url_callback()
{
	$page_url = isset($_POST['page_url']) ? esc_url_raw($_POST['page_url']) : '';

	if (empty($page_url)) {
		wp_send_json_error(['message' => 'URL is empty']);
	}

	// Удаляем домен из URL
	$site_url = site_url();
	$path = str_replace($site_url, '', $page_url);
	$path = trim($path, '/');

	// Пытаемся найти страницу
	$page = get_page_by_path($path);

	if ($page) {
		wp_send_json_success(['page_id' => $page->ID]);
	} else {
		// Альтернативный метод для случаев, когда get_page_by_path не работает
		$post_id = url_to_postid($page_url);
		if ($post_id) {
			wp_send_json_success(['page_id' => $post_id]);
		} else {
			wp_send_json_error(['message' => 'Page not found']);
		}
	}
}
add_action('wp_ajax_get_page_id_by_url', 'get_page_id_by_url_callback');
add_action('wp_ajax_nopriv_get_page_id_by_url', 'get_page_id_by_url_callback');