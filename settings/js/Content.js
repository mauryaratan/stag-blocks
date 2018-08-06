import BlockList from './BlockList';
import BlocksContext from './BlocksContext';
import Categories from './Categories';
import Dashboard from './dashboard/dashboard';
import Themes from './Themes';

const { Fragment } = wp.element;

const renderView = ( view ) => {
	if ( 'themes' === view ) {
		return (
			<Fragment>
				<Themes />
			</Fragment>
		);
	}

	if ( 'settings' === view ) {
		return (
			<Fragment>
				<Categories />
				<BlockList />
			</Fragment>
		);
	}

	return (
		<Fragment>
			<Dashboard />
		</Fragment>
	);
};

const Content = () => {
	return (
		<section className="stag-blocks__content">
			<BlocksContext.Consumer>
				{ context => renderView( context.state.view ) }
			</BlocksContext.Consumer>
		</section>
	);
};

export default Content;
