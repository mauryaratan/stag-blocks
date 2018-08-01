/* global fetch */
import { parse } from 'querystring';

const { __, sprintf } = wp.i18n;

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
		const blockSettings = parse( _stagBlocks.blockSettings );

		if ( url.length < 10 || ! blockSettings ) {
			return false;
		}

		this.setState( { loading: true } );

		await timeout( 300 );

		const key = blockSettings[ 'api-key' ];
		if ( ! key ) {
			this.setState( {
				result: {
					error: 'no-key',
					description: sprintf(
						__( 'Please set an API key to use this block under <a href="%s">Stag Blocks</a> > Settings > Website Card.' ),
						_stagBlocks.settingsURL
					),
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
					value={ this.props.attributes.url }
					onChange={ ( value ) => {
						this.props.setAttributes( { url: value } );
						this.handleChange( value );
					} }
					placeholder={ __( 'Paste URL or type' ) }
				/>

				{ ( this.state.loading ) && (
					<Spinner />
				) }

				{ ( this.state.result.error ) && (
					<p dangerouslySetInnerHTML={ { __html: this.state.result.description } }></p>
				) }

			</Placeholder>
		);
	}
}
