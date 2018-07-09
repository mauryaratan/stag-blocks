/**
 * Internal dependencies.
 */
import classnames from 'classnames';
import FontAwesome from './../../components/font-awesome/font-awesome';
import Controls from './controls';
import './editor.scss';
import './style.scss';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText } = wp.editor;

registerBlockType( 'sgb/alert', {
	title: __( 'Alert' ),
	category: 'common',
	description: __( 'A nice description for alert block.' ),
	icon: <i className="dashicon fas fa-bell"></i>,
	keywords: [
		__( 'alert' ),
		__( 'notice' ),
		__( 'stag' ),
	],

	// TODO: Supply default values for colors.
	attributes: {
		title: {
			type: 'string',
		},
		content: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
			default: '#646fdf',
		},
		textColor: {
			type: 'string',
			default: '#ffffff',
		},
		fontSize: {
			type: 'number',
		},
		showIcon: {
			type: 'boolean',
			default: true,
		},
		icon: {
			type: 'string',
			default: 'fab fa-wordpress',
		},
		iconSize: {
			type: 'number',
			default: 20,
		},
	},

	supports: {
		align: true,
	},

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<div
					className={ classnames( 'sgb-alert', className ) }
					role="alert"
					style={ {
						backgroundColor: attributes.backgroundColor,
						color: attributes.textColor,
						textAlign: attributes.textAlign,
						fontSize: attributes.fontSize,
					} }
				>
					{ ( !! attributes.showIcon ) && (
						<FontAwesome
							key="font-awesome"
							title={ __( 'Icon Settings' ) }
							icon={ attributes.icon }
							iconSize={ attributes.iconSize }
							onSelect={ ( value ) => setAttributes( { icon: value } ) }
							{ ...props }
						/>
					) }
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
					/>
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;
		const className = 'sgb-alert';

		return (
			<div
				className={ classnames( 'sgb-alert' ) }
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
					textAlign: attributes.textAlign,
					fontSize: attributes.fontSize,
				} }
			>
				{ ( !! attributes.showIcon ) && (
					<i className={ attributes.icon } style={ { fontSize: attributes.iconSize } }></i>
				) }
				<p className={ `${ className }__title` }>{ attributes.title }</p>
				<p className={ `${ className }__content` }>{ attributes.content }</p>
			</div>
		);
	},
} );
