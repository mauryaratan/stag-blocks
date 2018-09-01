import uuid from 'uuid/v4';
import edit from './edit';
import icon from './icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText } = wp.editor;
const { now, add } = moment;

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
		id: {
			type: 'string',
			default: uuid(),
		},
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
