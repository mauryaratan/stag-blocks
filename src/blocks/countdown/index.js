import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const currentDate = moment.now();
const oneMonthAhead = moment( currentDate ).add( 1, 'M' );

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

	supports: {
		multiple: false,
	},

	attributes: {
		title: {
			type: 'array',
		},
		content: {
			type: 'array',
		},
		date: {
			type: 'string',
			default: oneMonthAhead,
		},
		dateFormat: {
			type: 'string',
			default: '<span><em>%D</em>d</span> <span><em>%H</em>h</span> <span><em>%M</em>m</span> <span><em>%S</em>s</span>',
		},
		textColor: {
			type: 'string',
			default: '#4f4f4f',
		},
		backgroundColor: {
			type: 'string',
			default: '#f2f2f2',
		},
		borderColor: {
			type: 'string',
		},
		countdownColor: {
			type: 'string',
		},
	},

	edit,

	save( { attributes } ) {
		return (
			<p>You suck</p>
		);
	},
} );
