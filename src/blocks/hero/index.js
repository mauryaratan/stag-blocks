import classnames from 'classnames';
import edit from './edit';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'sgb/hero', {
	title: __( 'Hero' ),
	category: 'common',
	description: __( 'Add a full width media block to accompany a call to action.' ),
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
		title: {
			type: 'string',
		},
		content: {
			type: 'array',
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
			type: 'string',
		},
		buttonLink: {
			type: 'string',
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

	save: function( props ) {
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
						<h3 className={ `${ className }__title` }>{ attributes.title }</h3>
						<div className={ `${ className }__text` }>
							{ attributes.content }
						</div>

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
