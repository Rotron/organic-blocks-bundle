<?php
/**
 * BLOCK: Pricing Table
 *
 * Gutenberg Custom Pricing Table Block assets.
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
function organic_pricing_table_block() {

	// Scripts.
	wp_register_script(
		'organic-pricing-table-block-script', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-element', 'wp-i18n' ) // Dependencies, defined above.
	);

	// Styles.
	wp_register_style(
		'organic-pricing-table-block-editor-style', // Handle.
		plugins_url( 'css/editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);
	wp_register_style(
		'organic-pricing-table-block-frontend-style', // Handle.
		plugins_url( 'css/style.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);

	// Here we actually register the block with WP, again using our namespacing
	// We also specify the editor script to be used in the Gutenberg interface
	register_block_type( 'organic/pricing-table-block', array(
		'editor_script' => 'organic-pricing-table-block-script',
		'editor_style' => 'organic-pricing-table-block-editor-style',
		'style' => 'organic-pricing-table-block-frontend-style',
	) );

} // End function organic_pricing_table_block().

add_action( 'init', 'organic_pricing_table_block' );
