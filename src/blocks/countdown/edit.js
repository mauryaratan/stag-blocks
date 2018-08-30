import Controls from './controls';
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Spinner } = wp.components;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			loading: true,
		};

		const countdownScript = document.createElement( 'script' );
		countdownScript.setAttribute( 'src', _stagBlocks.countdownSrc );
		document.body.appendChild( countdownScript );
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

		if ( 'function' === typeof $( '#testtest' ).countdown && $( element ).length ) {
			$( element ).find( '.countdown' ).countdown( countdownDate, function( event ) {
				$( this ).text(
					event.strftime( '%Dd %Hh %Mm %Ss' )
				);
			} );
		}
	}

	render() {
		return (
			<Fragment>
				<Controls { ...this.props } />

				<div>

					<p>LOLOLOL</p>
					{ this.state.loading ?
						<Spinner /> :
						<div className="countdown" data-countdown={ Date.parse( this.props.attributes.date ) }></div>
					}
				</div>
			</Fragment>
		);
	}
}
