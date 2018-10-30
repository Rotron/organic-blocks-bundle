<?php
/**
 *
 * @link https://organicthemes.com
 * @since 1.0.0
 * @package OPB
 *
 * Plugin Name: Organic Blocks Bundle
 * Plugin URI: https://organicthemes.com/
 * Description: The Organic Blocks Bundle is a collection of custom blocks for the Gutenberg editor.
 * Author: Organic Themes
 * Author URI: https://organicthemes.com/
 * Version: 1.0.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Define global constants.
 *
 * @since 1.0.0
 */
// Plugin version.
if ( ! defined( 'OBB_VERSION' ) ) {
	define( 'OBB_VERSION', '1.0' );
}

if ( ! defined( 'OBB_NAME' ) ) {
	define( 'OBB_NAME', trim( dirname( plugin_basename( __FILE__ ) ), '/' ) );
}

if ( ! defined( 'OBB_DIR' ) ) {
	define( 'OBB_DIR', WP_PLUGIN_DIR . '/' . OBB_NAME );
}

if ( ! defined( 'OBB_URL' ) ) {
	define( 'OBB_URL', WP_PLUGIN_URL . '/' . OBB_NAME );
}

/**
 * Enqueue the plugin assets.
 *
 * @since 1.0.0
 */
function obb_scripts() {

	// Global Styles.
	wp_enqueue_style(
		'obb-fontawesome', // Handle.
		plugins_url( 'css/font-awesome.css', __FILE__ ) // Font Awesome for social media icons.
	);

}
add_action( 'wp_enqueue_scripts', 'obb_scripts' );

/**
 * BLOCK: Team Member Block.
 */
require_once( OBB_DIR . '/block/team-member/index.php' );

/**
 * BLOCK: Pricing Table Block.
 */
require_once( OBB_DIR . '/block/pricing-table/index.php' );

/**
 * BLOCK: Call To Action Block.
 */
// require_once( OBB_DIR . '/block/call-to-action/index.php' );

/**
 * BLOCK: Split Content Block.
 */
// require_once( OBB_DIR . '/block/split-content/index.php' );

/**
 * BLOCK: Notification Block.
 */
// require_once( OBB_DIR . '/block/notification/index.php' );

/**
 * BLOCK: Testimonial Block.
 */
// require_once( OBB_DIR . '/block/testimonial/index.php' );
