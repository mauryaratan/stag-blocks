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
		}
	}

	startCountdown() {
		if ( 'function' === typeof $( '#testtest' ).countdown ) {
			$( '#getting-started' )
				.countdown( Date.parse( this.props.attributes.date ), function( event ) {
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
						<div id="getting-started"></div>
					}
				</div>
			</Fragment>
		);
	}
}
