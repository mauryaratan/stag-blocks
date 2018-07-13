import classnames from 'classnames';
import BlocksContext from './BlocksContext';

const categories = wp.blocks.getCategories();
const { Fragment } = wp.element;

const BlockList = () => {
	const isActive = 'common';

	return (
		<Fragment>
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
										className={ classnames( context.state.category, {
											'is-active': context.state.category === category.slug,
										} ) }
									>
										{ category.title }
									</a>
								</li>
							) ) )
						}
					</ul>
				) }
			</BlocksContext.Consumer>

			<p>BlockList component</p>
		</Fragment>
	);
};

export default BlockList;
