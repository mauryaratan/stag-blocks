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
	description: __( 'A nice description for website-card block.' ),
	icon: 'admin-links',
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

	customCategory: 'stag-blocks',
	hasSettings: {
		description: sprintf(
			'LinkPreview API is required in order to use this block. If you do not already have one, please make one at <a href="%s" target="_blank" rel="noopener noreferrer">LinkPreview</a>.',
			'https://linkpreview.net'
		),
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
