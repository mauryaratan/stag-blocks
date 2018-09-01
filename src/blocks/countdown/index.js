import edit from './edit';
import icon from './icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const currentDate = moment.now();
const oneYearAhead = moment( currentDate ).add( 1, 'Y' );

registerBlockType( 'sgb/countdown', {
	title: __( 'Countdown' ),
	category: 'common',
	description: __( 'A nice description for countdown block.' ),
	icon,
	customCategory: 'stag-blocks',
	keywords: [
		__( 'countdown' ),
		__( 'timer' ),
		__( 'stag' ),
	],

	attributes: {
		date: {
			type: 'string',
			default: oneYearAhead,
		},
	},

	edit,

	save( { attributes } ) {
		return (
			<p>You suck</p>
		);
	},
} );
