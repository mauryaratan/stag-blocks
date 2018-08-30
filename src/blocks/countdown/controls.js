import CountdownDatePicker from './datepicker';

const { __ } = wp.i18n;

const {
	PanelBody,
} = wp.components;

const {
	InspectorControls,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	const startCountdown = ( date ) => {
		setTimeout( () => {
			const element = document.getElementById( 'block-' + props.clientId );
			$( element ).find( '.countdown' ).data( 'countdown', date );
			const countdownDate = $( element ).find( '.countdown' ).data( 'countdown' );

			$( element ).find( '.countdown' ).countdown( Date.parse( date ), function( event ) {
				$( this ).text(
					event.strftime( '%Dd %Hh %Mm %Ss' )
				);
			} );
		}, 200 );
	};

	return (
		<InspectorControls>
			<PanelBody>
				<CountdownDatePicker
					setAttributes={ setAttributes }
					startCountdown={ startCountdown }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
