import classnames from 'classnames';
import Controls from './controls';

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
	icon: 'info',
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
			selector: '.wp-block-sgb-accordion__content',
			source: 'children',
		},
		initialOpen: {
			type: 'boolean',
			default: false,
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
		console.log( attributes );
		return (
			<Fragment>
				<Controls { ...props } />

				<div className={ classnames( props.className ) }>
					<RichText
						tagName="h3"
						className="`${props.className}__title`"
						value={ attributes.title }
						onChange={ ( content ) => setAttributes( { title: content } ) }
						placeholder={ __( 'Accordion Title' ) }
						style={ {
							backgroundColor: attributes.titleBackgroundColor,
							color: attributes.titleColor,
						} }
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
					/>
				</div>
			</Fragment>
		);
	},

	save: function( { attributes } ) {
		return (
			<details
				open={ attributes.initialOpen }
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
				} }
			>
				<summary
					style={ {
						backgroundColor: attributes.titleBackgroundColor,
						color: attributes.titleColor,
					} }
				>
					{ attributes.title }
				</summary>
				{ attributes.content }
			</details>
		);
	},
} );

