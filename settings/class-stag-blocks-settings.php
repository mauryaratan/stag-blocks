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
	/**
	 * Plugin contrusctor function.
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Add Stag Blocks menu under Settings.
	 *
	 * @return void
	 */
	public function add_menu() {
		add_submenu_page( 'options-general.php', __( 'Stag Blocks', 'sgb' ), __( 'Stag Blocks', 'sgb' ), 'manage_options', 'stag-blocks', array( $this, 'settings' ) );
	}

	/**
	 * Add plugin admin scripts and styles.
	 *
	 * @param string $hook Current page ID.
	 * @return void
	 */
	public function enqueue_scripts( $hook ) {
		if ( 'settings_page_stag-blocks' !== $hook ) {
			return;
		}

		wp_register_style(
			'font-awesome-5',
			plugins_url( 'src/assets/css/all.min.css', dirname( __FILE__ ) ),
			array(),
			'5.2.0'
		);

		// Styles.
		wp_enqueue_style(
			'stag-blocks-settings',
			plugins_url( 'dist/settings/settings.style.css', dirname( __FILE__ ) ),
			array( 'wp-components', 'font-awesome-5' ),
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
				'root'          => esc_url_raw( rest_url() ),
				'nonce'         => wp_create_nonce( 'wp_rest' ),
				'version'       => sgb_plugin_version(),
				'blockSettings' => get_option( 'sgb-block-settings' ),
			)
		);
	}

	/**
	 * Add settings screen.
	 *
	 * @return void
	 */
	public function settings() {
		echo '<div id="stag-blocks-settings" class="stag-blocks-settings"></div>';
	}
}

new Stag_Blocks_Settings();
