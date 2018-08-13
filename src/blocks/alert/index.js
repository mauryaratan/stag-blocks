/**
 * Internal dependencies.
 */
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

registerBlockType( 'sgb/alert', {
	title: __( 'Alert' ),
	category: 'common',
	description: __( 'Display a notice with customizable icon, title, and description.' ),
	icon,
	keywords: [
		__( 'notice' ),
		__( 'alert' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-alert__title',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-alert__content',
		},
		accentColor: {
			type: 'string',
			default: '#EC7063',
		},
		fontSize: {
			type: 'number',
		},
	},

	supports: {
		align: true,
	},

	styles: [
		{ name: 'default', label: __( 'Default' ) },
		{ name: 'bordered', label: __( 'Bordered' ) },
	],

	edit( props ) {
		const { attributes, setAttributes } = props;
		const className = 'wp-block-sgb-alert';

		const border = props.className.includes( 'is-style-bordered' ) ? `2px solid ${ attributes.accentColor }` : null;

		return (
			<Fragment>
				<Controls { ...props } />

				<div
					className={ classnames( 'sgb-alert', className ) }
					role="alert"
					style={ {
						color: attributes.accentColor,
						textAlign: attributes.textAlign,
						fontSize: attributes.fontSize,
						border,
					} }
				>
					<div
						className={ `${ className }__background` }
						style={ {
							backgroundColor: attributes.accentColor,
						} }
					/>

					<div className={ `${ className }__container` }>
						<RichText
							tagName="p"
							value={ attributes.title }
							className={ `${ className }__title` }
							onChange={ ( nextContent ) => {
								setAttributes( {
									title: nextContent,
								} );
							} }
							placeholder={ __( 'Add title...' ) }
						/>
						<RichText
							tagName="p"
							value={ attributes.content }
							className={ `${ className }__content` }
							onChange={ ( nextContent ) => {
								setAttributes( {
									content: nextContent,
								} );
							} }
							placeholder={ __( 'Enter Alert description text...' ) }
						/></div>
				</div>
			</Fragment>
		);
	},

	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'sgb/alert', {
						content,
						accentColor: '#5DADE2',
					} );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content } ) => {
					return createBlock( 'core/paragraph', {
						content,
					} );
				},
			},
		],
	},

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-sgb-alert';

		return (
			<div
				className={ className }
				style={ {
					color: attributes.accentColor,
					textAlign: attributes.textAlign,
					fontSize: attributes.fontSize,
					'--alert-accent': attributes.accentColor,
				} }
			>
				<div
					className={ `${ className }__background` }
					style={ {
						backgroundColor: attributes.accentColor,
					} }
				/>
				<RichText.Content tagName="p" value={ attributes.title } className={ `${ className }__title` } />
				<RichText.Content tagName="p" value={ attributes.content } className={ `${ className }__content` } />
			</div>
		);
	},
} );
