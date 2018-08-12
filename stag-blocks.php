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

sgb_compatibility_check();

/**
 * Run compatibility check on StagBlocks during activation.
 *
 * @return void
 */
function sgb_compatibility_check() {
	include_once ABSPATH . 'wp-admin/includes/plugin.php';

	if ( ! is_plugin_active( 'gutenberg/gutenberg.php' ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		add_action( 'admin_notices', 'sgb_activation_notice' );
		return;
	}
}

add_action( 'init', 'sgb_compatibility_check' );

/**
 * Display a error notice if Gutenberg is not active.
 *
 * @return void
 */
function sgb_activation_notice() {
	echo '<div class="error"><p>';
	echo esc_html__( 'Stag Blocks requires Gutenberg plugin to be installed and activated.', 'sgb' );
	echo '</p></div>';
}

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
