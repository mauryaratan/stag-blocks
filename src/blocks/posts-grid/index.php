<?php
/**
 * Server-side rendering of the `sgb/posts-grid` block.
 *
 * @package SGB
 */

/**
 * Registers the `sgb/posts-grid` block on server.
 */
function register_block_sgb_posts_grid() {
	register_block_type( 'sgb/posts-grid', array(
		'attributes' => array(
			'categories'      => array(
				'type' => 'string',
			),
			'className'       => array(
				'type' => 'string',
			),
			'postsToShow'     => array(
				'type'    => 'number',
				'default' => 5,
			),
			'displayPostDate' => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'postLayout'      => array(
				'type'    => 'string',
				'default' => 'list',
			),
			'columns'         => array(
				'type'    => 'number',
				'default' => 3,
			),
			'align'           => array(
				'type'    => 'string',
				'default' => 'center',
			),
			'order'           => array(
				'type'    => 'string',
				'default' => 'desc',
			),
			'orderBy'         => array(
				'type'    => 'string',
				'default' => 'date',
			),
		),
		'render_callback' => 'render_block_sgb_posts_grid',
	) );
}

add_action( 'init', 'register_block_sgb_posts_grid' );

/**
 * Renders the `sgb/posts-grid` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_sgb_posts_grid( $attributes ) {
	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order'       => $attributes['order'],
		'orderby'     => $attributes['orderBy'],
		'category'    => $attributes['categories'],
	) );

	$block_content = 'block content goes here…';

	return $block_content;
}

/**
 * Register REST fields related to 'sgb/posts-grid' block.
 *
 * @return void
 */
function block_sgb_posts_grid_rest_fields() {
	register_rest_field(
		'post',
		'sgb/featured_image_src',
		array(
			'get_callback' => function( $object ) {
				$image_array = wp_get_attachment_image_src(
					$object['featured_media'],
					'large',
					false
				);
				return $image_array[0];
			},
		)
	);

	register_rest_field(
		'post',
		'sgb/author_data',
		array(
			'get_callback' => function( $object ) {
				$author_data['display_name'] = get_the_author_meta( 'display_name', $object['author'] );
				$author_data['avatar']       = get_avatar_url( $object['author'] );

				return $author_data;
			},
		)
	);
}

add_action( 'rest_api_init', 'block_sgb_posts_grid_rest_fields' );
