import BlocksContext from './BlocksContext';
import Content from './Content';
import Header from './Header';

class App extends React.Component {
	state = {
		category: 'common',
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
