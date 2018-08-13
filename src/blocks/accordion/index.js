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

	edit( props ) {
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

	save( { attributes } ) {
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
				<RichText.Content
					tagName="summary"
					style={ { backgroundColor: attributes.titleBackgroundColor, color: attributes.titleColor } }
					value={ attributes.title }
				/>
				<RichText.Content tagName="div" value={ attributes.content } className="wp-block-sgb-accordion__content" />
			</details>
		);
	},
} );

