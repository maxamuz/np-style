<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package npstyle
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<div id="page" class="site">
		<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'npstyle'); ?></a>

		<header id="masthead" class="site-header">

			<div class="top-header">
				<div class="container">
					<div class="row align-items-center">
						<div class="col">
							<div class="site-branding">
								<?php
								the_custom_logo();
								if (is_front_page() && is_home()):
									?>
									<h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
											rel="home"><?php bloginfo('name'); ?></a></h1>
									<?php
								else:
									?>
									<p class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>"
											rel="home"><?php bloginfo('name'); ?></a></p>
									<?php
								endif;
								$npstyle_description = get_bloginfo('description', 'display');
								if ($npstyle_description || is_customize_preview()):
									?>
									<p class="site-description">
										<?php echo $npstyle_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
									</p>
								<?php endif; ?>
							</div><!-- .site-branding -->
						</div>
						<div class="col">
							<p>г. Минск <br>и Минская область</p>
							<p>Ежедневно с 9.00 до 18.00</p>
						</div>
						<div class="col phone-colum">
							<p>8 (495) 142 86 56 </p>
							<p>8 (977) 715 58 00 </p>
						</div>
						<div class="col social-wrapper">
							<div class="social-item">
								<a href="#">Инстаграм</a>
							</div>
							<div class="social-item">
								<a href="#">Телеграм</a>
							</div>
							<div class="social-item">
								<a href="#">Вайбер</a>
							</div>
							<div class="social-item">
								<a href="#">Ватсап</a>
							</div>
						</div>
						<div class="col button-wrapper">
							<div class="buttom-item">
								<a href="#" class="call-bottom">Вызвать замерщика</a>
							</div>
							<div class="buttom-item">
								<a href="#" class="calc-bottom">Калькулятор</a>
							</div>
						</div>
					</div>

				</div>

			</div>


			<nav id="site-navigation" class="main-navigation">
				<div class="container">
					<button class="menu-toggle" aria-controls="primary-menu"
						aria-expanded="false"><?php esc_html_e('Меню', 'npstyle'); ?></button>
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id' => 'primary-menu',
						)
					);
					?>
				</div>


			</nav><!-- #site-navigation -->
		</header><!-- #masthead -->