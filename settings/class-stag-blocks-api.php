<?php

class Stag_Blocks_API {
	const OPTION   = 'stag-blocks-list';
	const SETTINGS = 'stag-blocks-settings';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_endpoint' ) );
	}

	public function register_endpoint() {
		register_rest_route(
			'stag_blocks/v1', '/blocks', array(
				array(
					'methods'  => WP_REST_SERVER::READABLE,
					'callback' => array( $this, 'get_blocks' ),
				),
				array(
					'methods'             => WP_REST_SERVER::CREATABLE,
					'permission_callback' => current_user_can( 'edit_posts' ),
					'callback'            => array( $this, 'set_blocks' ),
				),
			)
		);

		register_rest_route(
			'stag_blocks/v1', '/settings', array(
				array(
					'methods'             => WP_REST_Server::CREATABLE,
					'permission_callback' => function() {
						return current_user_can( 'manage_options' );
					},
					'callback'            => array( $this, 'process_settings' ),
				),
				array(
					'methods'  => WP_REST_Server::READABLE,
					'callback' => array( $this, 'get_settings' ),
				),
			)
		);
	}

	public function get_blocks( WP_REST_Request $request ) {
		$options = get_option( self::OPTION );

		if ( empty( $options ) ) {
			return new WP_Error( 'no_blocks_found', __( 'No blocks found, please initiate the Gutenberg editor by visiting the post edit screen.', 'sgb' ), array( 'status' => 404 ) );
		}

		$data = array(
			'blocks' => $options,
		);

		return new WP_REST_Response( $data, 200 );
	}

	public function set_blocks( WP_REST_Request $request ) {
		$content_type = $request->get_content_type();

		if ( 'application/json' !== $content_type['value'] ) {
			return new WP_Error( 'invalid_request', __( 'Incorrect content type. Provided data must have "application/json" type.', 'sgb' ), array( 'status' => 400 ) );
		}

		$blocks = $request->get_body();

		update_option( self::OPTION, json_decode( $blocks ) );

		wp_send_json_success();
	}

	public function process_settings( $request ) {
		$content_type = $request->get_content_type();

		if ( 'application/json' !== $content_type['value'] ) {
			return new WP_Error( 'invalid_request', __( 'Incorrect content type. Provided data must have "application/json" type.', 'sgb' ), array( 'status' => 400 ) );
		}

		update_option( self::SETTINGS, json_decode( $request->get_body() ) );
		$settings = get_option( self::SETTINGS );

		wp_send_json_success(array(
			'activeBlocks' => $settings,
		));
	}

	public function get_settings( $request ) {
		$settings = get_option( self::SETTINGS );

		if ( empty( $settings ) ) {
			$settings = new stdClass();
		}

		return rest_ensure_response( $settings );
	}
}

new Stag_Blocks_API();
