import edit from './edit';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'sgb/posts-grid', {
	title: __( 'Posts Grid' ),
	category: 'common',
	description: __( 'Display a grid or list of customizable posts.' ),
	icon: <i className="dashicon fas fa-th-large" />,
	keywords: [
		__( 'post' ),
		__( 'grid' ),
		__( 'stag' ),
	],
	customCategory: 'stag-blocks',

	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( 'left' === align || 'right' === align || 'wide' === align || 'full' === align ) {
			return { 'data-align': align };
		}
	},

	edit,

	save() {
		return null;
	},
} );
