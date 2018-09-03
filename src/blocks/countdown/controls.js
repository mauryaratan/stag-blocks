import CountdownDatePicker from './datepicker';

const { __ } = wp.i18n;

const {
	PanelBody,
	SelectControl,
} = wp.components;

const {
	InspectorControls,
	PanelColorSettings,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	const startCountdown = ( date = attributes.date, format = attributes.dateFormat ) => {
		const element = document.getElementById( 'block-' + props.clientId );
		const selector = $( element ).find( '.countdown' );

		setTimeout( () => {
			selector.data( 'countdown', date );
			selector.countdown( 'remove' );

			selector.countdown( Date.parse( date ), function( event ) {
				$( this ).html( event.strftime( format ) );
			} );
		}, 200 );
	};

	return (
		<InspectorControls>
			<PanelBody>
				<SelectControl
					label={ __( 'Date Format' ) }
					value={ attributes.dateFormat }
					onChange={ ( format ) => {
						setAttributes( { dateFormat: format } );
						startCountdown( attributes.date, format );
					} }
					options={ [
						{ label: __( '24d 11h 36m 10s' ), value: '<span><em>%D</em>d</span><span><em>%H</em>h</span><span><em>%M</em>m</span><span><em>%S</em>s</span>' },
						{ label: __( '24 days 11:36:10' ), value: '<span>%D days %H:%M:%S</span>' },
						{ label: __( '24 days' ), value: '<span>%D days</span>' },
					] }
				/>
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
