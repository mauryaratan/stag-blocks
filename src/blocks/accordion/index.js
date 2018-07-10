import classnames from 'classnames';
import Controls from './controls';
import './style.scss';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText } = wp.editor;

registerBlockType( 'sgb/accordion', {
	title: __( 'Accordion' ),
	category: 'common',
	description: __( 'A nice description for accordion block.' ),
	icon: <i className="fas fa-plus dashicon" />,
	keywords: [
		__( 'accordion' ),
		__( 'stag' ),
	],

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

	edit: function( props ) {
		const { attributes, setAttributes } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<div className={ classnames( props.className ) }>
					<RichText
						tagName="h3"
						className={ classnames( `${ props.className }__title`, {
							'has-shadow': attributes.boxShadow,
						} ) }
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
						className="`${props.className}__content`"
						value={ attributes.content }
						onChange={ ( content ) => setAttributes( { content } ) }
						placeholder={ __( 'Accordion content...' ) }
						style={ {
							backgroundColor: attributes.backgroundColor,
							color: attributes.textColor,
						} }
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
				<summary style={ { backgroundColor: attributes.titleBackgroundColor, color: attributes.titleColor } }>{ attributes.title }</summary>
				<div className="wp-block-sgb-accordion__content">
					{ attributes.content }
				</div>
			</details>
		);
	},
} );
