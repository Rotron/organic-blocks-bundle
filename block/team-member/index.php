<?php
/**
 * BLOCK: Profile
 *
 * Gutenberg Custom Profile Block assets.
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
function organic_team_member_block() {

	// Scripts.
	wp_register_script(
		'organic-team-member-block-script', // Handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-element', 'wp-i18n' ) // Dependencies, defined above.
	);

	// Styles.
	wp_register_style(
		'organic-team-member-block-editor-style', // Handle.
		plugins_url( 'css/editor.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);
	wp_register_style(
		'organic-team-member-block-frontend-style', // Handle.
		plugins_url( 'css/style.css', __FILE__ ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
	);

	// Here we actually register the block with WP, again using our namespacing
	// We also specify the editor script to be used in the Gutenberg interface
	register_block_type( 'organic/team-member-block', array(
		'editor_script' => 'organic-team-member-block-script',
		'editor_style' => 'organic-team-member-block-editor-style',
		'style' => 'organic-team-member-block-frontend-style',
	) );

} // End function organic_team_member_block().

add_action( 'init', 'organic_team_member_block' );
