import classnames from 'classnames';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { RichText } = wp.editor;

registerBlockType( 'sgb/hero', {
	title: __( 'Hero' ),
	category: 'common',
	description: __( 'Add a full width media block to accompany a call to action.' ),
	icon,
	keywords: [
		__( 'hero' ),
		__( 'cta' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	attributes: {
		alignment: {
			type: 'string',
			default: 'center center',
		},
		imgID: {
			type: 'number',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-hero__title',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-hero__text',
		},
		imgURL: {
			type: 'string',
		},
		backgroundOpacity: {
			type: 'number',
			default: 70,
		},
		backgroundColor: {
			type: 'string',
		},
		color: {
			type: 'string',
		},
		buttonText: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-button__link',
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			selector: '.wp-block-button__link',
			attribute: 'href',
		},
		buttonColor: {
			type: 'string',
		},
		buttonBackground: {
			type: 'string',
		},
	},

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit,

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-sgb-hero';

		return (
			<div
				className={ className }
				style={ {
					backgroundImage: attributes.imgURL ? `url(${ attributes.imgURL })` : 'none',
					color: attributes.color,
				} }
			>
				<div
					className={ `${ className }__background` }
					style={ {
						backgroundColor: attributes.backgroundColor,
						opacity: attributes.backgroundOpacity / 100,
					} }
				></div>

				<div className={ `${ className }__container` }>
					<div className={ classnames( `${ className }__content`, attributes.alignment ) }>
						<RichText.Content tagName="h3" value={ attributes.title } className={ `${ className }__title` } />
						<RichText.Content tagName="div" value={ attributes.content } className={ `${ className }__text` } />

						{ !! attributes.buttonLink && (
							<a
								href={ attributes.buttonLink }
								className={ classnames( 'wp-block-button__link', 'sgb-button', {
									'has-background': attributes.buttonBackground,
									'has-text-color': attributes.buttonColor,
								} ) }
								style={ {
									backgroundColor: attributes.buttonBackground,
									color: attributes.buttonColor,
								} }
							>
								{ attributes.buttonText }
							</a>
						) }
					</div>
				</div>
			</div>
		);
	},
} );
