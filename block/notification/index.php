<?php
/**
 * BLOCK: Call To Action
 *
 * Gutenberg Custom Calling To Action Block assets.
 *
 * @since   1.0.0
 * @package OPB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the block's assets for the editor.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function organic_notification_block_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'organic-notification-block', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // filemtime — Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'organic-notification-block-editor', // Handle.
		plugins_url( 'css/editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'css/editor.css' ) // filemtime — Gets file modification time.
	);
} // End function organic_notification_block_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'organic_notification_block_editor_assets' );

/**
 * Enqueue the block's assets for the frontend.
 *
 * @since 1.0.0
 */
function organic_notification_block_assets() {
	// Styles.
	wp_enqueue_style(
		'organic-notification-block-frontend', // Handle.
		plugins_url( 'css/style.css', __FILE__ ), // Block frontend CSS.
		array( 'wp-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __FILE__ ) . 'css/style.css' ) // filemtime — Gets file modification time.
	);

	// Scripts.
	wp_enqueue_script(
		'organic-notification-block-frontend-js', // Handle.
		plugins_url( 'js/custom.js', __FILE__ ), // Custom.js: Our custom jquery for frontend.
		array( 'wp-blocks' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'js/custom.js' ) // filemtime — Gets file modification time.
	);
} // End function organic_notification_block_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'organic_notification_block_assets' );