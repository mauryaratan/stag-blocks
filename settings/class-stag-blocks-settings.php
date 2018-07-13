<?php
/**
 * Stag Blocks settings page.
 *
 * @since 1.0.0
 * @package SGB
 */

/**
 * Stag Blocks settings class.
 */
class Stag_Blocks_Settings {

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function add_menu() {
		add_submenu_page( 'options-general.php', __( 'Stag Blocks', 'sgb' ), __( 'Stag Blocks', 'sgb' ), 'manage_options', 'stag-blocks', array( $this, 'settings' ) );
	}

	public function enqueue_scripts( $hook ) {
		if ( 'settings_page_stag-blocks' !== $hook ) {
			return;
		}

		wp_enqueue_script(
			'stag-blocks-settings',
			plugins_url( 'dist/settings.build.js', dirname( __FILE__ ) ),
			array(
				'wp-blocks',
				'wp-components',
				'react',
				'react-dom',
				'wp-utils',
				'lodash',
			),
			filemtime( plugin_dir_path( __DIR__ ) . 'dist/settings.build.js' ),
			true
		);

		wp_localize_script(
			'stag-blocks-settings', '_stagBlocks', array(
				'root' => esc_url_raw( rest_url() ),
			)
		);
	}

	public function settings() {
		echo '<div id="stag-blocks-settings" class="stag-blocks-settings">
			<div class="stag-blocks-settings__header">

			</div>
			<div class="stag-blocks-settings__content"></div>
		</div>';
	}
}

new Stag_Blocks_Settings();
