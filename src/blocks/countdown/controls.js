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
		if ( 'function' === typeof $( '#testtest' ).countdown ) {
			$( `#${ attributes.id }` ).countdown( Date.parse( date ), function( event ) {
				$( this ).text(
					event.strftime( '%Dd %Hh %Mm %Ss' )
				);
			} );
		}
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
