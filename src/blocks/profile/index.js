import Controls from './controls';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload } = wp.editor;
const { Button, Dashicon } = wp.components;

registerBlockType( 'sgb/profile', {
	title: __( 'Profile' ),
	category: 'layout',
	description: __( 'Displays a nice author profile info box with social links.' ),
	icon: icon,
	customCategory: 'stag-blocks',
	keywords: [
		__( 'profile' ),
		__( 'author bio' ),
		__( 'stag' ),
	],

	supports: {
		align: [ 'wide' ],
	},

	attributes: {
		salutation: {
			type: 'array',
		},
		title: {
			type: 'array',
		},
		position: {
			type: 'array',
		},
		content: {
			type: 'array',
		},
		imgID: {
			type: 'number',
		},
		imgURL: {
			type: 'string',
		},
		website: {
			type: 'string',
		},
		facebook: {
			type: 'string',
		},
		twitter: {
			type: 'string',
		},
		googleplus: {
			type: 'string',
		},
		instagram: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
			default: '#F2F2F2',
		},
		textColor: {
			type: 'string',
			default: '#4F4F4F',
		},
	},

	edit( props ) {
		const { attributes, setAttributes, className } = props;

		const onSelectImage = ( media ) => {
			if ( ! media || ! media.url ) {
				setAttributes( { imgURL: undefined, imgID: undefined } );
				return;
			}
			setAttributes( { imgURL: media.url, imgID: media.id } );
		};

		return (
			<Fragment>
				<Controls { ...props } />

				<div className={ className } style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
				} }>
					<div className={ `${ className }__details` }>
						<div className={ `${ className }__author-content` }>
							<RichText
								tagName="p"
								className={ `${ className }__salutation` }
								value={ attributes.salutation }
								onChange={ ( value ) => setAttributes( { salutation: value } ) }
								placeholder={ __( 'Mr.' ) }
							/>

							<RichText
								tagName="h2"
								className={ `${ className }__title` }
								value={ attributes.title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								placeholder={ __( 'Matt Mullenweg' ) }
							/>

							<RichText
								tagName="p"
								className={ `${ className }__position` }
								value={ attributes.position }
								onChange={ ( value ) => setAttributes( { position: value } ) }
								placeholder={ __( 'Automattic' ) }
							/>
						</div>

						<div className={ `${ className }__avatar` }>
							<MediaUpload
								onSelect={ onSelectImage }
								type="image"
								value={ attributes.imgID }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ attributes.imgID ?
											<img src={ attributes.imgURL } alt="avatar" /> :
											<Dashicon icon="format-image" />
										}
									</Button>
								) }
							/>
						</div>
					</div>

					<RichText
						tagName="p"
						className={ `${ className }__content` }
						value={ attributes.content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						placeholder={ __( 'Write author bio here...' ) }
					/>

					<div className={ `${ className }__social-links` }>
						{ attributes.website &&
							<a href={ attributes.website } title={ __( 'Website' ) }>
								{ __( 'Visit Website' ) }
							</a>
						}
						{ attributes.facebook &&
							<a href={ attributes.facebook } title={ __( 'Facebook' ) }>
								<i className="fab fa-facebook-f"></i>
							</a>
						}
						{ attributes.twitter &&
							<a href={ attributes.twitter } title={ __( 'Twitter' ) }>
								<i className="fab fa-twitter"></i>
							</a>
						}
						{ attributes.googleplus &&
							<a href={ attributes.googleplus } title={ __( 'Google Plus' ) }>
								<i className="fab fa-google-plus-g"></i>
							</a>
						}
						{ attributes.instagram &&
							<a href={ attributes.instagram } title={ __( 'Instagram' ) }>
								<i className="fab fa-instagram"></i>
							</a>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const className = 'wp-block-sgb-profile';

		return (
			<div className={ className } style={ {
				backgroundColor: attributes.backgroundColor,
				color: attributes.textColor,
			} }>
				<div className={ `${ className }__details` }>
					<div className={ `${ className }__author-content` }>
						<RichText.Content
							tagName="p"
							className={ `${ className }__salutation` }
							value={ attributes.salutation }
						/>

						<RichText.Content
							tagName="h2"
							className={ `${ className }__title` }
							value={ attributes.title }
						/>

						<RichText.Content
							tagName="p"
							className={ `${ className }__position` }
							value={ attributes.position }
						/>
					</div>

					{ attributes.imgID &&
						<div className={ `${ className }__avatar` }>
							<img src={ attributes.imgURL } alt="avatar" />
						</div>
					}
				</div>

				<RichText.Content
					tagName="p"
					className={ `${ className }__content` }
					value={ attributes.content }
				/>

				<div className={ `${ className }__social-links` }>
					{ attributes.website &&
						<a href={ attributes.website } title={ __( 'Website' ) }>
							{ __( 'Visit Website' ) }
						</a>
					}
					{ attributes.facebook &&
						<a href={ attributes.facebook } title={ __( 'Facebook' ) }>
							<i className="fab fa-facebook-f"></i>
						</a>
					}
					{ attributes.twitter &&
						<a href={ attributes.twitter } title={ __( 'Twitter' ) }>
							<i className="fab fa-twitter"></i>
						</a>
					}
					{ attributes.googleplus &&
						<a href={ attributes.googleplus } title={ __( 'Google Plus' ) }>
							<i className="fab fa-google-plus-g"></i>
						</a>
					}
					{ attributes.instagram &&
						<a href={ attributes.instagram } title={ __( 'Instagram' ) }>
							<i className="fab fa-instagram"></i>
						</a>
					}
				</div>
			</div>
		);
	},
} );
