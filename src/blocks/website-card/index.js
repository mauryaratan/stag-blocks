import Controls from './controls';
import './editor.scss';
import LinkFetch from './LinkFetch';
import LinkPreview from './LinkPreview';
import './style.scss';

const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'sgb/website-card', {
	title: __( 'Website Card' ),
	category: 'embed',
	description: __( 'Turn a URL into a pretty card style preview.' ),
	icon: 'admin-links',
	customCategory: 'stag-blocks',
	hasSettings: true,
	keywords: [
		__( 'website-card' ),
		__( 'preview' ),
		__( 'stag' ),
	],

	attributes: {
		title: {
			source: 'text',
			selector: '.wp-block-sgb-website-card__title',
		},
		description: {
			source: 'text',
			selector: '.wp-block-sgb-website-card__description',
		},
		image: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
	},

	edit: function( props ) {
		const { attributes, setAttributes } = props;

		const handleChange = ( result ) => {
			setAttributes( {
				title: result.title,
				description: result.description,
				image: result.image,
				url: result.url,
			} );
		};

		return (
			<Fragment>
				<Controls { ...props } />

				{ ( attributes.title ) ? (
					<LinkPreview { ...props } />
				) : (
					<LinkFetch onChange={ handleChange } { ...props } />
				) }
			</Fragment>
		);
	},

	save: function( props ) {
		return (
			<LinkPreview { ...props } />
		);
	},
} );
