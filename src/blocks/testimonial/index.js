import classnames from 'classnames';
import Controls from './controls';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

const {
	RichText,
	MediaUpload,
} = wp.editor;

const {
	Fragment,
} = wp.element;

const {
	Button,
	Dashicon,
} = wp.components;

registerBlockType( 'sgb/testimonial', {
	title: __( 'Testimonial' ),
	category: 'common',
	description: __( 'Add a user testimonial with name, company, text, and picture.' ),
	icon,
	keywords: [
		__( 'testimonial' ),
		__( 'quote' ),
		__( 'stag' ),
	],

	customCategory: 'stag-blocks',

	attributes: {
		imageURL: {
			type: 'string',
		},
		imageID: {
			type: 'number',
		},
		showImage: {
			type: 'boolean',
			default: true,
		},
		content: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-testimonial__content',
		},
		name: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-testimonial__name',
		},
		company: {
			type: 'array',
			source: 'children',
			selector: '.wp-block-sgb-testimonial__company',
		},
		backgroundColor: {
			type: 'string',
			default: '#4F4F4F',
		},
		color: {
			type: 'string',
			default: '#ffffff',
		},
		showName: {
			type: 'boolean',
			default: true,
		},
		showCompany: {
			type: 'boolean',
			default: true,
		},
	},

	supports: {
		align: [ 'wide' ],
	},

	styles: [
		{ name: 'default', label: __( 'Default' ) },
		{ name: 'flip', label: __( 'Flipped' ) },
	],

	edit( props ) {
		const { attributes, setAttributes, className } = props;
		const containerClass = 'wp-block-sgb-testimonial';

		return (
			<Fragment>
				<Controls { ...props } />

				<div
					style={ {
						backgroundColor: attributes.backgroundColor,
						color: attributes.color,
					} }
					className={ classnames( className ) }
				>
					<div className={ `${ containerClass }__details` }>
						<RichText
							tagName="div"
							multiline="p"
							className={ `${ containerClass }__content` }
							value={ attributes.content }
							onChange={ ( content ) => setAttributes( { content } ) }
							placeholder={ __( 'Write testimonial...' ) }
							keepPlaceholderOnFocus
						/>

						<div className={ `${ containerClass }__author` }>
							{ ( !! attributes.showName ) && (
								<RichText
									tagName="p"
									className={ `${ containerClass }__name` }
									value={ attributes.name }
									onChange={ ( name ) => setAttributes( { name } ) }
									placeholder="Matt Mullenweg"
									keepPlaceholderOnFocus
								/>
							) }
							{ ( !! attributes.showCompany ) && (
								<RichText
									tagName="p"
									className={ `${ containerClass }__company` }
									value={ attributes.company }
									onChange={ ( company ) => setAttributes( { company } ) }
									placeholder="Automattic"
									keepPlaceholderOnFocus
								/>
							) }
						</div>
					</div>
					<div className={ `${ containerClass }__image` } style={ {
						backgroundImage: `url(${ attributes.imageURL })`,
					} }>
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( {
									imageID: media.id,
									imageURL: media.url,
								} );
							} }
							type="image"
							value={ attributes.imageID }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									{ ! attributes.imageID ? <Dashicon icon="format-image" /> : <Dashicon icon="edit" /> }
								</Button>
							) }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( props ) {
		const { attributes } = props;
		const containerClass = 'wp-block-sgb-testimonial';

		return (
			<div
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.color,
				} }
			>
				<div className={ `${ containerClass }__details` }>
					<div className={ `${ containerClass }__content` }>
						{ attributes.content }
					</div>
					<div className={ `${ containerClass }__author` }>
						{ ( !! attributes.showName && attributes.name ) && (
							<p className={ `${ containerClass }__name` }>{ attributes.name }</p>
						) }
						{ ( !! attributes.showCompany && attributes.company ) && (
							<p className={ `${ containerClass }__company` }>{ attributes.company }</p>
						) }
					</div>
				</div>
				{ attributes.imageURL &&
					<div className={ `${ containerClass }__image` }>
						<img src={ attributes.imageURL } alt="avatar" />
					</div>
				}
			</div>
		);
	},
} );
