<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package SGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function stag_blocks_assets() {
	// Styles.
	wp_enqueue_style(
		'sgb-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_style( 'font-awesome-5', plugin_dir_url( __FILE__ ) . 'assets/css/all.css', array(), '5.1.0' );
} // End function stag_blocks_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'stag_blocks_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function stag_blocks_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'sgb-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	wp_localize_script(
		'sgb-js', '_stagBlocks', array(
			'root'  => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' ),
		)
	);

	// Styles.
	wp_enqueue_style(
		'sgb-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_script(
		'sgb-fontawesome-json',
		plugins_url( 'dist/fa-icons-raw.js', dirname( __FILE__ ) ),
		array(),
		'5.1.0'
	);
} // End function stag_blocks_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'stag_blocks_editor_assets' );

// Register server-side code for individual blocks.
foreach ( glob( dirname( dirname( __FILE__ ) ) . '/src/blocks/*/index.php' ) as $block_logic ) {
	require_once $block_logic;
}
