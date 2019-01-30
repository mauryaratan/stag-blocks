import classnames from 'classnames';
import Controls from './controls';
import './editor.scss';
import icon from './icon';
import './style.scss';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, InnerBlocks } = wp.editor;

registerBlockType( 'sgb/accordion', {
	title: __( 'Accordion' ),
	category: 'common',
	description: __( 'Display a togglable field that can be expanded and collapsed.' ),
	icon,
	keywords: [
		__( 'accordion' ),
		__( 'list' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'summary',
		},
		initialOpen: {
			type: 'boolean',
			default: false,
		},
		boxShadow: {
			type: 'boolean',
			default: true,
		},
		backgroundColor: {
			type: 'string',
			default: '#ffffff',
		},
		titleColor: {
			type: 'string',
			default: '#000000',
		},
		titleBackgroundColor: {
			type: 'string',
			default: '#ffffff',
		},
	},

	supports: {
		align: [ 'wide' ],
	},

	edit( props ) {
		const { attributes, setAttributes, className } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<div
					className={ classnames( className, {
						'has-shadow': attributes.boxShadow,
					} ) }
					style={ {
						backgroundColor: attributes.backgroundColor,
					} }
				>
					<RichText
						tagName="p"
						className={ `${ className }__title` }
						value={ attributes.title }
						onChange={ ( content ) => setAttributes( { title: content } ) }
						placeholder={ __( 'Accordion Title' ) }
						style={ {
							backgroundColor: attributes.titleBackgroundColor,
							color: attributes.titleColor,
						} }
						keepPlaceholderOnFocus
					/>
					<div className={ `${ className }__content` }>
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		return (
			<details
				open={ attributes.initialOpen }
				className={ classnames( {
					'has-shadow': attributes.boxShadow,
				} ) }
				style={ {
					backgroundColor: attributes.backgroundColor,
				} }
			>
				<RichText.Content
					tagName="summary"
					style={ { backgroundColor: attributes.titleBackgroundColor, color: attributes.titleColor } }
					value={ attributes.title }
				/>
				<div className="wp-block-sgb-accordion__content">
					<InnerBlocks.Content />
				</div>
			</details>
		);
	},
} );

