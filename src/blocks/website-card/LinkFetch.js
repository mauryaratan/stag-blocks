/* global fetch */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	Placeholder,
	Spinner,
	TextControl,
} = wp.components;

const timeout = ( ms ) => {
	return new Promise( resolve => setTimeout( resolve, ms ) );
};

export default class LinkFetch extends Component {
	state = {
		result: '',
		loading: false,
	}

	async handleChange( url ) {
		if ( url.length < 10 ) {
			return false;
		}

		this.setState( { loading: true } );

		await timeout( 300 );

		const key = ''; // TODO: Add setting to fill in key dynamically.
		if ( ! key ) {
			this.setState( {
				result: {
					error: 'no-key',
					description: 'Please add an API key',
				},
				loading: false,
			} );
			return false;
		}
		const result = await( await fetch( `http://api.linkpreview.net/?key=${ key }&q=${ url }` ) ).json();

		this.setState( {
			result,
			loading: false,
		} );

		if ( ! result.error ) {
			this.props.onChange( result );
		}
	}

	render() {
		return (
			<Placeholder
				icon="admin-site"
				label={ __( 'Website Card' ) }
				className="wp-block-sgb-website-card__placeholder"
			>
				<TextControl
					type="url"
					onChange={ ( value ) => this.handleChange( value ) }
					placeholder={ __( 'Paste URL or type' ) }
				/>

				{ ( this.state.loading ) && (
					<Spinner />
				) }

				{ ( this.state.result.error ) && (
					<p>Error Code: { this.state.result.error }, { this.state.result.description }</p>
				) }

			</Placeholder>
		);
	}
}
