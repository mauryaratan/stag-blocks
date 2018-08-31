import Controls from './controls';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InnerBlocks } = wp.editor;

registerBlockType( 'sgb/container', {
	title: __( 'Container' ),
	category: 'layout',
	description: __( 'Add a container block which can be used to fit multiple blocks inside it.' ),
	icon,
	keywords: [
		__( 'container' ),
		__( 'section' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		marginTop: {
			type: 'number',
			default: 0,
		},
		marginBottom: {
			type: 'number',
			default: 0,
		},
		paddingTop: {
			type: 'number',
			default: 0,
		},
		paddingBottom: {
			type: 'number',
			default: 0,
		},
		paddingLeft: {
			type: 'number',
			default: 0,
		},
		paddingRight: {
			type: 'number',
			default: 0,
		},
		borderRadius: {
			type: 'number',
			default: 0,
		},
		containerWidth: {
			type: 'number',
		},
		backgroundColor: {
			type: 'string',
		},
		backgroundImageID: {
			type: 'number',
		},
		backgroundImage: {
			type: 'string',
		},
		backgroundOpacity: {
			type: 'number',
			default: 50,
		},
	},

	edit( props ) {
		const { attributes, className } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<section
					className={ className }
					style={ {
						marginTop: `${ attributes.marginTop }%`,
						marginBottom: `${ attributes.marginBottom }%`,
						paddingTop: `${ attributes.paddingTop }%`,
						paddingBottom: `${ attributes.paddingBottom }%`,
						paddingLeft: `${ attributes.paddingLeft }%`,
						paddingRight: `${ attributes.paddingRight }%`,
						backgroundColor: attributes.backgroundColor,
						borderRadius: `${ attributes.borderRadius }px`,
					} }
				>
					{ attributes.backgroundImage &&
						<img
							src={ attributes.backgroundImage }
							alt=""
							className={ `${ className }__background` }
							style={ {
								opacity: attributes.backgroundOpacity / 100,
							} }
						/>
					}
					<div className={ `${ className }__inner` } style={ { maxWidth: attributes.containerWidth } }>
						<InnerBlocks />
					</div>
				</section>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const className = 'wp-block-sgb-container';

		return (
			<section
				className="wp-block-sgb-container"
				style={ {
					marginTop: `${ attributes.marginTop }%`,
					marginBottom: `${ attributes.marginBottom }%`,
					paddingTop: `${ attributes.paddingTop }%`,
					paddingBottom: `${ attributes.paddingBottom }%`,
					paddingLeft: `${ attributes.paddingLeft }%`,
					paddingRight: `${ attributes.paddingRight }%`,
					backgroundColor: attributes.backgroundColor,
					borderRadius: `${ attributes.borderRadius }px`,
				} }
			>
				{ attributes.backgroundImage &&
				<img
					src={ attributes.backgroundImage }
					alt=""
					className={ `${ className }__background` }
					style={ {
						opacity: attributes.backgroundOpacity / 100,
					} }
				/>
				}
				<div className={ `${ className }__inner` } style={ { maxWidth: attributes.containerWidth } }>
					<InnerBlocks.Content />
				</div>
			</section>
		);
	},
} );
