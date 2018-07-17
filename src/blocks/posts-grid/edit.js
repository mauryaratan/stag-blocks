/**
 * External dependencies
 */
import classnames from 'classnames';
import find from 'lodash/find';
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
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	render() {
		const { attributes, categoriesList, setAttributes, authorsList } = this.props;
		const { displayPostDate, align, postLayout, columns, order, orderBy, categories, postsToShow } = attributes;

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
					{ displayPosts.map( ( post, i ) => {
						const currentAuthor = find( authorsList.data, [ 'id', post.author ] );

						return (
							<li key={ i }>
								<p>
									<img src={ currentAuthor.avatar_urls[ 96 ] } alt={ currentAuthor.name } />
									{ __( 'By' ) } { currentAuthor.name }
								</p>
								<a href={ post.link } target="_blank" rel="noopener noreferrer">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }</a>
								{ displayPostDate && post.date_gmt &&
									<time dateTime={ moment( post.date_gmt ).utc().format() } className={ `${ this.props.className }__post-date` }>
										{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
									</time>
								}
							</li>
						);
					}
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
		_fields: [ 'date_gmt', 'link', 'title', 'featured_media', 'author' ],
	}, ( value ) => ! isUndefined( value ) ) );

	const categoriesListQuery = stringify( {
		per_page: 100,
		_fields: [ 'id', 'name', 'parent' ],
	} );

	const authorListQuery = stringify( {
		_fields: [ 'id', 'name', 'avatar_urls' ],
	} );

	return {
		latestPosts: `/wp/v2/posts?${ latestPostsQuery }`,
		categoriesList: `/wp/v2/categories?${ categoriesListQuery }`,
		authorsList: `/wp/v2/users?${ authorListQuery }`,
	};
} )( PostsGridEdit );
