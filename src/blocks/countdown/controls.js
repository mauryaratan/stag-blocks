const { __ } = wp.i18n;

const {
	PanelBody,
	DateTimePicker,
} = wp.components;

const {
	InspectorControls,
} = wp.editor;

const { getSettings } = wp.date;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;
	const settings = getSettings();

	// To know if the current timezone is a 12 hour time with look for "a" in the time format.
	// We also make sure this a is not escaped by a "/".
	const is12HourTime = /a(?!\\)/i.test(
		settings.formats.time
			.toLowerCase() // Test only the lower case a
			.replace( /\\\\/g, '' ) // Replace "//" with empty strings
			.split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
	);

	return (
		<InspectorControls>
			<PanelBody>
				<DateTimePicker
					currentDate={ attributes.date }
					onChange={ ( date ) => setAttributes( { date } ) }
					locale={ settings.l10n.locale }
					is12Hour={ is12HourTime }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
