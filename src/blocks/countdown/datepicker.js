const { withState } = wp.compose;
const { DateTimePicker } = wp.components;
const { getSettings } = wp.date;

const CountdownDatePicker = withState( {
	date: new Date(),
} )( ( props ) => {
	const { date, setState, attributes, setAttributes, startCountdown } = props;
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
		<DateTimePicker
			currentDate={ attributes.date || date }
			onChange={ ( newDate ) => {
				setState( { date: newDate } );
				setAttributes( { date: newDate } );

				setTimeout( () => {
					startCountdown( newDate );
				}, 100 );
			} }
			locale={ settings.l10n.locale }
			is12Hour={ is12HourTime }
		/>
	);
} );

export default CountdownDatePicker;
