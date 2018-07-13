/* global fetch */

import BlocksContext from './BlocksContext';
import Content from './Content';
import Header from './Header';

class App extends React.Component {
	state = {
		category: 'common',
		isLoading: true,
		blocks: [],
	}

	componentDidMount() {
		fetch( `${ _stagBlocks.root }stag_blocks/v1/blocks` )
			.then( ( response ) => response.json() )
			.then( ( responseJSON ) => {
				this.setState( {
					blocks: responseJSON.blocks,
					isLoading: false,
				} );
			} );
	}

	render() {
		return (
			<div className="stag-blocks">
				<BlocksContext.Provider
					value={ {
						state: this.state,
						setCategory: ( category ) => {
							this.setState( {
								category,
							} );
						},
					} }
				>
					<Header />
					<Content />
				</BlocksContext.Provider>
			</div>
		);
	}
}

export default App;
