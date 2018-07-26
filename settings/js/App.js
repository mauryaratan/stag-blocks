/* global fetch */

import BlocksContext from './BlocksContext';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

class App extends React.Component {
	state = {
		category: 'stag-blocks',
		isLoading: true,
		blocks: [],
		activeBlocks: {},
		view: 'dashboard',
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
		// Set active tab based on URL hash
		// e.g.: /options-general.php?page=stag-blocks#settings
		const currentURL = new URL( window.location.href );
		const hash = currentURL.hash.slice( 1 );

		if ( hash ) {
			this.setState( {
				view: hash,
			} );
		}

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
						setView: ( view ) => {
							this.setState( {
								view,
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
					<Footer />
				</BlocksContext.Provider>
			</div>
		);
	}
}

export default App;
