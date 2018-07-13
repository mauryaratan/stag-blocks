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
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
require_once plugin_dir_path( __FILE__ ) . 'src/class-stag-blocks-api.php';
