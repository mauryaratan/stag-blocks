<?php
/**
 * Uninstall Stag Blocks.
 *
 * @package SGB
 */

// Exit if accessed directly.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) exit;

delete_option( 'stag-blocks-list' );
delete_option( 'stag-blocks-settings' );
delete_option( 'sgb-blocks-settings' );
