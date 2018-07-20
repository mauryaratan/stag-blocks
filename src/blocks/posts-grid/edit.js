/**
 * External dependencies
 */
import classnames from 'classnames';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import { stringify } from 'querystringify';

/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	TextControl,
	Spinner,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;

const { __ } = wp.i18n;

const { decodeEntities } = wp.utils;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;

const MAX_POSTS_COLUMNS = 6;

class PostsGridEdit extends Component {
	constructor() {
		super( ...arguments );

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
		this.toggleDisplayPostExcerpt = this.toggleDisplayPostExcerpt.bind( this );
		this.toggleDisplayReadMore = this.toggleDisplayReadMore.bind( this );
		this.handleReadMoreText = this.handleReadMoreText.bind( this );
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	toggleDisplayPostExcerpt() {
		const { displayPostExcerpt } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostExcerpt: ! displayPostExcerpt } );
	}

	toggleDisplayReadMore() {
		const { displayReadMore } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayReadMore: ! displayReadMore } );
	}

	handleReadMoreText( value ) {
		const { setAttributes } = this.props;

		setAttributes( { readMoreText: value } );
	}

	render() {
		const { attributes, categoriesList, setAttributes } = this.props;
		const {
			displayPostDate,
			displayPostExcerpt,
			displayReadMore,
			readMoreText,
			align,
			postLayout,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
		} = attributes;

		const latestPosts = this.props.latestPosts.data;
		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Latest Posts Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ get( categoriesList, [ 'data' ], {} ) }
						selectedCategoryId={ categories }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					<ToggleControl
						label={ __( 'Display post excerpt' ) }
						checked={ displayPostExcerpt }
						onChange={ this.toggleDisplayPostExcerpt }
					/>
					<ToggleControl
						label={ __( 'Display Read More Link' ) }
						checked={ displayReadMore }
						onChange={ this.toggleDisplayReadMore }
					/>
					{ displayReadMore &&
						<TextControl
							label={ __( 'Read More text' ) }
							value={ readMoreText || '' }
							onChange={ ( nextValue ) => this.handleReadMoreText( nextValue ) }
						/>
					}
					{ postLayout === 'grid' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
						/>
					}
				</PanelBody>
			</InspectorControls>
		);

		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ __( 'Loading Posts...' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		const layoutControls = [
			{
				icon: 'list-view',
				title: __( 'List View' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
		];

		return (
			<Fragment>
				{ inspectorControls }

				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>

				<ul
					className={ classnames( this.props.className, {
						'is-grid': postLayout === 'grid',
						[ `columns-${ columns }` ]: postLayout === 'grid',
					} ) }
				>
					{ displayPosts.map( ( post, i ) => (
						<li key={ i }>
							{ ( post[ 'sgb/featured_image_src' ] ) && (
								<figure className={ `${ this.props.className }__thumbnail` }>
									<img src={ post[ 'sgb/featured_image_src' ] } alt={ decodeEntities( post.title.rendered.trim() ) } />
								</figure>
							) }

							<h3 className={ `${ this.props.className }__title` }>
								<a href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
							</h3>

							<div className={ `${ this.props.className }__meta` }>
								{ displayPostDate && post.date_gmt &&
								<time dateTime={ moment( post.date_gmt ).utc().format() } className={ `${ this.props.className }__post-date` }>
									{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
								</time>
								}
								<a
									href={ post[ 'sgb/author_data' ].author_link }
									className={ `${ this.props.className }__author` }
									target="_blank" rel="noopener noreferrer"
								>
									<img src={ post[ 'sgb/author_data' ].avatar } alt={ post[ 'sgb/author_data' ].display_name } />
									<span>{ post[ 'sgb/author_data' ].display_name }</span>
								</a>
							</div>

							{ displayPostExcerpt && post.excerpt.rendered &&
							<div className={ `${ this.props.className }__excerpt` } dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } />
							}

							{ displayReadMore &&
								<p className={ `${ this.props.className }__read-more` }>
									<a href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( readMoreText ) || __( 'Continue Reading →' ) }</a>
								</p>
							}
						</li>
					)
					) }
				</ul>

			</Fragment>
		);
	}
}

export default withAPIData( ( props ) => {
	const { postsToShow, order, orderBy, categories } = props.attributes;

	const latestPostsQuery = stringify( pickBy( {
		categories,
		order,
		orderby: orderBy,
		per_page: postsToShow,
		_fields: [
			'date_gmt',
			'link',
			'title',
			'excerpt',
			'featured_media',
			'author',
			'sgb/featured_image_src',
			'sgb/author_data',
		],
	}, ( value ) => ! isUndefined( value ) ) );

	const categoriesListQuery = stringify( {
		per_page: 100,
		_fields: [ 'id', 'name', 'parent' ],
	} );

	return {
		latestPosts: `/wp/v2/posts?${ latestPostsQuery }`,
		categoriesList: `/wp/v2/categories?${ categoriesListQuery }`,
	};
} )( PostsGridEdit );