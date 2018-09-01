import CountdownDatePicker from './datepicker';

const { __ } = wp.i18n;

const {
	PanelBody,
} = wp.components;

const {
	InspectorControls,
	PanelColorSettings,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	const startCountdown = ( date ) => {
		setTimeout( () => {
			const element = document.getElementById( 'block-' + props.clientId );
			$( element ).find( '.countdown' ).data( 'countdown', date );

			$( element ).find( '.countdown' ).countdown( Date.parse( date ), function( event ) {
				$( this ).html( event.strftime( attributes.dateFormat ) );
			} );
		}, 200 );
	};

	return (
		<InspectorControls>
			<PanelBody>
				<CountdownDatePicker
					attributes={ attributes }
					setAttributes={ setAttributes }
					startCountdown={ startCountdown }
				/>
			</PanelBody>

			<PanelColorSettings
				title={ __( 'Color Settings' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.textColor,
						onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
						label: __( 'Text Color' ),
					},
					{
						value: attributes.backgroundColor,
						onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
						label: __( 'Background Color' ),
					},
					{
						value: attributes.borderColor,
						onChange: ( borderColor ) => ( setAttributes( { borderColor } ) ),
						label: __( 'Border Color' ),
					},
					{
						value: attributes.countdownColor,
						onChange: ( countdownColor ) => ( setAttributes( { countdownColor } ) ),
						label: __( 'Countdown Color' ),
					},
				] }
			/>
		</InspectorControls>
	);
};

export default Controls;
