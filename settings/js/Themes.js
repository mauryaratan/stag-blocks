/* global fetch */
const { Component } = wp.element;
const { Spinner } = wp.components;

class Themes extends Component {
	state = {
		themes: [],
	}
	componentDidMount() {
		fetch( 'https://codestag.com/wp-json/codestag/v1/themes' )
			.then( ( response ) => response.json() )
			.then( ( responseJSON ) => {
				this.setState( {
					themes: responseJSON,
				} );
			} );
	}

	render() {
		const themes = this.state.themes;
		return (
			( themes.length ) ? (
				<section className="codestag-themes">
					{ themes.map( ( theme, index ) => (
						<div className="theme" key={ index }>
							<figure>
								<a href={ theme.link } target="_blank" rel="noopener noreferrer">
									<img src={ theme.featured } alt={ theme.title } />
								</a>
							</figure>
							<h4>{ theme.title }</h4>
							<p>{ theme.subtitle }</p>

							<a href={ theme.link } target="_blank" rel="noopener noreferrer">
								Purchase { theme.title }
							</a>
						</div>
					) ) }
				</section>
			) : (
				<Spinner />
			)
		);
	}
}

export default Themes;
