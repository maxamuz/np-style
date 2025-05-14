<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'np-style' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'MySQL-5.7' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'DxWsDM|3-*<Ul;4{$$9eH[k,tA4>HG<]a;P}x{<h#h=F!JzWk)b^YpB$Po;T,PXM' );
define( 'SECURE_AUTH_KEY',  'rG,O4qm0GD:;cATj0Uq:Fgp%(.?q!OK3:T1@jdA[-p#cKUQ~JV-nl+F;a)3m:CU,' );
define( 'LOGGED_IN_KEY',    '*0+^cz03O:81|5Lub@8G(|0W{v{|{nG*$#SLA)2,_5UQ[Fbz$i7ix>l=VO>-qP|%' );
define( 'NONCE_KEY',        'ARQ)wY=@{}@~]uy&8]Y{*wp^ach=3Fgtc!U%Gi`/]Rg18YO#+urt>M0/<z_Wvc;G' );
define( 'AUTH_SALT',        'UG3>/x]i#^iYdiUQDi|7:_m2u!OlpZ;`-Py,1sz9/,6MC.G[qt-.6snc3j9|0L*q' );
define( 'SECURE_AUTH_SALT', 'G}xs-y_g5ypQ,z.RWqG?,|FE4+0&B?Skcs%uuk`We_#,$3{.+:h)4I41!XiWP4]B' );
define( 'LOGGED_IN_SALT',   '{*xjM{P{a2HDydBWH 0N1UBF{JF&#EPCh9aUW.TgR]p$?h]zU-Ln_r9nhc4ebjf8' );
define( 'NONCE_SALT',       'fDvAu-0Ed:-@8.byd`#Z#x(.tcu)A|!9,XnLn821Tp;%7SaWMWD)s&rm$X~B!]@#' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
