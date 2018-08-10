<?php
/**
 * Plugin Name: Stag Blocks
 * Plugin URI: https://github.com/mauryaratan/stag-blocks/
 * Description: Handy WordPress editor blocks.
 * Author: Codestag
 * Author URI: https://codestag.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package SGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Run compatibility check on StagBlocks during activation.
 *
 * @return void
 */
function sgb_compatibility_check() {
	include_once ABSPATH . 'wp-admin/includes/plugin.php';

	if ( ! is_plugin_active( 'gutenberg/gutenberg.php' ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die(
			sprintf(
				/* translators: %1$s: Link to Gutenberg %2$s: Link to Plugins admin page. */
				esc_html__( 'Stag Blocks requires %1$s plugin to be installed and activated. %2$s', 'sgb' ),
				'<a href="https://wordpress.org/plugins/gutenberg/" target="_blank">Gutenberg</a>',
				'<br><br><a href="' . esc_url( admin_url( 'plugins.php' ) ) . '">&larr; Go Back</a>'
			)
		);
	}
}

add_action( 'init', 'sgb_compatibility_check' );

register_activation_hook( __FILE__, 'sgb_compatibility_check' );

/**
 * Get plugin version info.
 *
 * @return String Returns current plugin version.
 */
function sgb_plugin_version() {
	$plugin_data = get_plugin_data( __FILE__ );

	return $plugin_data['Version'];
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
require_once plugin_dir_path( __FILE__ ) . '/settings/class-stag-blocks-api.php';
require_once plugin_dir_path( __FILE__ ) . '/settings/class-stag-blocks-settings.php';
require_once plugin_dir_path( __FILE__ ) . '/languages/js-strings.php';
