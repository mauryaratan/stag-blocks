<?php
/**
 * Plugin Name: Stag Blocks
 * Plugin URI: https://github.com/mauryaratan/stag-blocks/
 * Description: Stag Blocks extends Gutenberg editor for WordPress, by adding a number of handy blocks for your website.
 * Author: Codestag
 * Author URI: https://codestag.com/
 * Version: 1.1.6
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

	if ( ! function_exists( 'register_block_type' ) ) {
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
	echo esc_html__( 'Stag Blocks requires WordPress 5.0+ or Gutenberg plugin to be installed and activated.', 'sgb' );
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
 * Add a check for our plugin before redirecting
 */
function sgb_activation() {
	add_option( 'sgb_do_activation_redirect', true );
}
register_activation_hook( __FILE__, 'sgb_activation' );

/**
 * Redirect to the Atomic Blocks Getting Started page on single plugin activation
 */
function sgb_redirect() {
	$blocks_list = get_option( 'stag-blocks-list' );

	if ( get_option( 'sgb_do_activation_redirect', false ) ) {
		delete_option( 'sgb_do_activation_redirect' );
		if ( ! isset( $_GET['activate-multi'] ) ) {
			if ( $blocks_list ) {
				wp_safe_redirect( 'options-general.php?page=stag-blocks' );
			} else {
				wp_safe_redirect( 'admin.php?page=stag-blocks-welcome' );
			}
			exit;
		}
	}
}
add_action( 'admin_init', 'sgb_redirect' );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
require_once plugin_dir_path( __FILE__ ) . '/settings/class-stag-blocks-api.php';
require_once plugin_dir_path( __FILE__ ) . '/settings/class-stag-blocks-settings.php';
require_once plugin_dir_path( __FILE__ ) . '/languages/js-strings.php';
