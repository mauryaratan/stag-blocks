<?php

class Stag_Blocks_API {
	const OPTION = 'stag-blocks-list';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_endpoint' ) );
	}

	public function register_endpoint() {
		register_rest_route(
			'stag_blocks/v1', 'blocks', array(
				array(
					'methods'  => WP_REST_SERVER::READABLE,
					'callback' => array( $this, 'get_blocks' ),
				),
				array(
					'methods'  => WP_REST_SERVER::CREATABLE,
					'callback' => array( $this, 'set_blocks' ),
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
}

new Stag_Blocks_API();
