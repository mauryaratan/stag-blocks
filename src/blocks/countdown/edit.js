import Controls from './controls';
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Spinner } = wp.components;
const {
	RichText,
} = wp.editor;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			loading: true,
		};

		const countdownScript = document.createElement( 'script' );
		countdownScript.setAttribute( 'src', _stagBlocks.countdownSrc );
		document.body.appendChild( countdownScript );

		this.startCountdown = this.startCountdown.bind( this );
	}

	componentDidMount() {
		// Usage of `typeof $( '#testtest' ).countdown` ensures that it returns a function or undefined.
		if ( this.state.loading && 'function' !== typeof $( '#testtest' ).countdown ) {
			const interval = setInterval( () => {
				if ( 'function' === typeof $( '#testtest' ).countdown ) {
					this.setState( { loading: false } );

					this.startCountdown();

					// Clear the interval once the function is found.
					clearInterval( interval );
				}
			}, 100 );
		} else {
			this.setState( { loading: false } );
			setTimeout( () => {
				this.startCountdown();
			}, 100 );
		}
	}

	startCountdown() {
		const element = document.getElementById( 'block-' + this.props.clientId );
		const countdownDate = $( element ).find( '.countdown' ).data( 'countdown' );
		const format = this.props.attributes.dateFormat;

		if ( 'function' === typeof $( '#testtest' ).countdown && $( element ).length ) {
			$( element ).find( '.countdown' ).countdown( countdownDate, function( event ) {
				$( this ).html( event.strftime( format ) );
			} );
		}
	}

	render() {
		const { attributes, setAttributes, className } = this.props;
		const childClass = 'wp-block-sgb-countdown';

		return (
			<Fragment>
				<Controls { ...this.props } />

				<div
					className={ className }
					style={ {
						backgroundColor: attributes.backgroundColor,
						color: attributes.textColor,
						borderColor: attributes.borderColor,
					} }
				>
					<div className="countdown-content">
						<RichText
							tagName="h3"
							className={ `${ childClass }__title` }
							value={ attributes.title }
							onChange={ ( title ) => setAttributes( { title } ) }
							placeholder={ __( 'Countdown title' ) }
						/>
						<RichText
							tagName="p"
							className={ `${ childClass }__content` }
							value={ attributes.content }
							onChange={ ( content ) => setAttributes( { content } ) }
							placeholder={ __( 'Write content...' ) }
						/>
					</div>
					{ this.state.loading ?
						<Spinner /> :
						<div
							className="countdown"
							style={ {
								color: attributes.countdownColor,
							} }
							data-countdown={ Date.parse( this.props.attributes.date ) }
						></div>
					}
				</div>
			</Fragment>
		);
	}
}
