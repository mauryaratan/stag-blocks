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
const { RichText } = wp.editor;

registerBlockType( 'sgb/accordion', {
	title: __( 'Accordion' ),
	category: 'common',
	description: __( 'Display a togglable field that can be expanded and collapsed.' ),
	icon,
	keywords: [
		__( 'accordion' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	attributes: {
		title: {
			type: 'string',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-accordion__content',
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
		textColor: {
			type: 'string',
			default: '#000000',
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

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'sgb/alert' ],
				transform: ( { title, content } ) => (
					createBlock( 'sgb/accordion', {
						title,
						content,
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'sgb/accordion', {
						content,
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'sgb/alert' ],
				transform: ( { title, content } ) => (
					createBlock( 'sgb/alert', {
						title,
						content,
					} )
				),
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => (
					createBlock( 'core/paragraph', {
						content,
					} )
				),
			},
		],
	},

	edit: function( props ) {
		const { attributes, setAttributes } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<div
					className={ classnames( props.className, {
						'has-shadow': attributes.boxShadow,
					} ) }
					style={ {
						backgroundColor: attributes.backgroundColor,
						color: attributes.textColor,
					} }
				>
					<RichText
						tagName="p"
						className={ classnames( 'wp-block-sgb-accordion__title' ) }
						value={ attributes.title }
						onChange={ ( content ) => setAttributes( { title: content } ) }
						placeholder={ __( 'Accordion Title' ) }
						style={ {
							backgroundColor: attributes.titleBackgroundColor,
							color: attributes.titleColor,
						} }
						keepPlaceholderOnFocus
					/>
					<RichText
						tagName="div"
						multiline="p"
						className={ classnames( 'wp-block-sgb-accordion__content' ) }
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Accordion content...' ) }
						keepPlaceholderOnFocus
					/>
				</div>
			</Fragment>
		);
	},

	save: function( { attributes } ) {
		return (
			<details
				open={ attributes.initialOpen }
				className={ classnames( {
					'has-shadow': attributes.boxShadow,
				} ) }
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
				} }
			>
				<summary style={ { backgroundColor: attributes.titleBackgroundColor, color: attributes.titleColor } }>
					{ attributes.title }
				</summary>
				<div className="wp-block-sgb-accordion__content">
					{ attributes.content }
				</div>
			</details>
		);
	},
} );

