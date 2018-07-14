/* global fetch */

import BlocksContext from './BlocksContext';
import Content from './Content';
import Header from './Header';

class App extends React.Component {
	state = {
		category: 'stag-blocks',
		isLoading: true,
		blocks: [],
		activeBlocks: {},
	}

	syncSettings() {
		// Sync user settings.
		fetch( `${ _stagBlocks.root }stag_blocks/v1/settings`, {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': _stagBlocks.nonce,
			},
			body: JSON.stringify( this.state.activeBlocks ),
		} );
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

		// Fetch user settings.
		fetch( `${ _stagBlocks.root }stag_blocks/v1/settings`, {
			credentials: 'same-origin',
			headers: {
				'X-WP-Nonce': _stagBlocks.nonce,
			},
		} )
			.then( ( response ) => response.json() )
			.then( ( json ) => {
				this.setState( {
					activeBlocks: json,
				} );
			} );
	}

	getFilteredBlocks() {
		return this.state.blocks.filter( block => {
			return ( block.customCategory ? block.customCategory === this.state.category : block.category === this.state.category );
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
						filteredBlocks: this.getFilteredBlocks(),
						toggleBlock: ( block, status ) => {
							const newBlocks = this.state.activeBlocks;
							newBlocks[ block ] = status;

							this.setState( {
								activeBlocks: newBlocks,
							} );

							this.syncSettings();
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
