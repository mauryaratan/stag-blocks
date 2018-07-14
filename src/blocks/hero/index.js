import edit from './edit';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText } = wp.editor;

registerBlockType( 'sgb/hero', {
	title: __( 'Hero' ),
	category: 'common',
	description: __( 'A nice description for hero block.' ),
	icon: 'cover-image',
	keywords: [
		__( 'hero' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	attributes: {
		alignment: {
			type: 'string',
			default: 'top-left',
		},
		imgID: {
			type: 'number',
		},
		imgURL: {
			type: 'string',
		},
		backgroundOpacity: {
			type: 'number',
			default: 100,
		},
		backgroundColor: {
			type: 'string',
		},
		color: {
			type: 'string',
		},
	},

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit,

	save: function( props ) {
		const { attributes, setAttributes } = props;

		return (
			<p>You suck</p>
		);
	},
} );
