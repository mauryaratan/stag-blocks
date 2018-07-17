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
