import edit from './edit';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'sgb/posts-grid', {
	title: __( 'Posts Grid' ),
	category: 'common',
	description: __( 'A nice description for posts-grid block.' ),
	icon: 'info',
	keywords: [
		__( 'posts-grid' ),
		__( 'stag' ),
	],

	edit,

	save() {
		return null;
	},
} );