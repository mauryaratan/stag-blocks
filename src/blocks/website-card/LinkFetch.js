/* global fetch */
import { parse } from 'querystring';

const { __, sprintf } = wp.i18n;

const { Component } = wp.element;

const {
	Placeholder,
	Spinner,
	Button,
	Dashicon,
} = wp.components;

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
		const result = await( await fetch( `https://api.linkpreview.net/?key=${ key }&q=${ url }` ) ).json();

		this.setState( {
			result,
			loading: false,
		} );

		if ( ! result.error ) {
			this.props.onChange( result );
		}
	}

	stopKeyPropagation = ( event ) => ( event.stopPropagation() )

	render() {
		return (
			<Placeholder
				icon="admin-site"
				label={ __( 'Website Card' ) }
				className="wp-block-sgb-website-card__placeholder"
			>
				<form onSubmit={ this.stopKeyPropagation }>
					<input
						type="url"
						value={ this.props.attributes.url || '' }
						className="components-placeholder__input"
						aria-label={ __( 'Paste URL or type' ) }
						placeholder={ __( 'Paste URL or type' ) }
						onChange={ ( event ) => this.props.setAttributes( { url: event.target.value } ) } />
					<Button
						isLarge
						type="submit"
						onClick={ ( event ) => {
							event.preventDefault();
							this.handleChange( this.props.attributes.url );
						} }
					>
						<Dashicon icon="arrow-right-alt" />
					</Button>

					{ ( this.state.loading ) && (
						<Spinner />
					) }

					{ ( this.state.result.error ) && (
						<p dangerouslySetInnerHTML={ { __html: this.state.result.description } }></p>
					) }
				</form>
			</Placeholder>
		);
	}
}
