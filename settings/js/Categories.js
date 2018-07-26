import classnames from 'classnames';
import BlocksContext from './BlocksContext';

const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	Dashicon,
	IconButton,
	TextControl,
} = wp.components;

let categories = wp.blocks.getCategories();
categories = [
	{
		slug: 'stag-blocks',
		title: __( 'Stag Blocks' ),
	},
	...categories,
];

export default class Categories extends Component {
	state = {
		searchVisible: false,
	}

	render() {
		return (
			<BlocksContext.Consumer>
				{ context => (
					<ul className="block-categories">
						{
							!! ( categories ) && ( categories.map( ( category ) => (
								<li key={ category.slug }>
									<a
										href={ `#${ category.slug }` }
										onClick={ ( e ) => {
											e.preventDefault();
											let link = new URL( e.target.href );
											link = link.hash.slice( 1 );
											context.setCategory( link );
										} }
										className={ classnames( {
											'is-active': context.state.category === category.slug,
										} ) }
									>
										{ category.title }
									</a>
								</li>
							) ) )
						}
						<IconButton
							label={ __( 'Search' ) }
							onClick={ () => this.setState( { searchVisible: ! this.state.searchVisible } ) }
							icon={ this.state.searchVisible ? 'no' : 'search' }
							className="block-search-button"
							style={ {
								marginLeft: 'auto',
							} }
						/>
						<TextControl
							className={ classnames( 'block-search', {
								'is-visible': !! this.state.searchVisible,
							} ) }
							onChange={ ( value ) => console.log( value ) }
							placeholder={ __( 'Search a block...' ) }
						/>
					</ul>
				) }
			</BlocksContext.Consumer>
		);
	}
}
