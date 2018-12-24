import classnames from 'classnames';
import Controls from './controls';

const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	BlockControls,
	RichText,
	MediaUpload,
	URLInput,
} = wp.editor;

const {
	Toolbar,
	IconButton,
	Dashicon,
} = wp.components;

const edit = ( props ) => {
	const { attributes, setAttributes, className, isSelected } = props;

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

			<BlockControls>
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ attributes.imgID }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit background' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			</BlockControls>

			<div
				className={ className }
				style={ {
					backgroundImage: attributes.imgURL ? `url(${ attributes.imgURL })` : 'none',
					color: attributes.color,
				} }
			>
				<div
					className={ `${ className }__background` }
					style={ {
						backgroundColor: attributes.backgroundColor,
						opacity: attributes.backgroundOpacity / 100,
					} }
				></div>
				<div className={ `${ className }__container` }>
					<div className={ classnames( `${ className }__content`, attributes.alignment ) }>
						<RichText
							tagName="h3"
							className={ `${ className }__title` }
							placeholder={ __( 'Write title' ) }
							value={ attributes.title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<RichText
							tagName="div"
							className={ `${ className }__text` }
							placeholder={ __( 'Write content...' ) }
							value={ attributes.content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
						/>

						<RichText
							tagName="span"
							placeholder={ __( 'Add text…' ) }
							value={ attributes.buttonText }
							onChange={ ( value ) => setAttributes( { buttonText: value } ) }
							style={ {
								backgroundColor: attributes.buttonBackground,
								color: attributes.buttonColor,
							} }
							keepPlaceholderOnFocus
							className={ classnames( 'wp-block-button__link', 'sgb-button', {
								'has-background': attributes.buttonBackground,
								'has-text-color': attributes.buttonColor,
							} ) }
						/>
						{ isSelected && (
							<form
								className="block-library-button__inline-link"
								onSubmit={ ( event ) => event.preventDefault() }>
								<Dashicon icon="admin-links" />
								<URLInput
									value={ attributes.buttonLink }
									onChange={ ( value ) => setAttributes( { buttonLink: value } ) }
								/>
								<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
							</form>
						) }
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default edit;
