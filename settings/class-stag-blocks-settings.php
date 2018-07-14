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
	private $nonce = '';

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

		// Styles.
		wp_enqueue_style(
			'stag-blocks-settings',
			plugins_url( 'dist/settings/settings.style.css', dirname( __FILE__ ) ),
			array( 'wp-components' ),
			filemtime( plugin_dir_path( __DIR__ ) . 'dist/settings/settings.style.css' )
		);

		wp_enqueue_script(
			'stag-blocks-settings',
			plugins_url( 'dist/settings/settings.build.js', dirname( __FILE__ ) ),
			array(
				'wp-blocks',
				'wp-components',
				'react',
				'react-dom',
				'wp-utils',
				'lodash',
			),
			filemtime( plugin_dir_path( __DIR__ ) . 'dist/settings/settings.build.js' ),
			true
		);

		wp_localize_script(
			'stag-blocks-settings', '_stagBlocks', array(
				'root'  => esc_url_raw( rest_url() ),
				'nonce' => wp_create_nonce( 'wp_rest' ),
			)
		);
	}

	public function settings() {
		echo '<div id="stag-blocks-settings" class="stag-blocks-settings"></div>';
	}
}

new Stag_Blocks_Settings();
