import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText } = wp.editor;
const { now } = moment;

registerBlockType( 'sgb/countdown', {
	title: __( 'Countdown' ),
	category: 'common',
	description: __( 'A nice description for countdown block.' ),
	icon: 'info',
	customCategory: 'stag-blocks',
	keywords: [
		__( 'countdown' ),
		__( 'timer' ),
		__( 'stag' ),
	],

	attributes: {
		date: {
			type: 'string',
			default: moment.now(),
		},
	},

	edit,

	save( { attributes } ) {
		return (
			<p>You suck</p>
		);
	},
} );
