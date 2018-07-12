import classnames from 'classnames';
import Controls from './controls';

const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	BlockControls,
	RichText,
	MediaUpload,
	PanelColor,
} = wp.editor;

const {
	Toolbar,
	IconButton,
} = wp.components;

const edit = ( props ) => {
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
					backgroundColor: attributes.backgroundColor,
					color: attributes.color,
				} }
			>
				<div className={ `${ className }__container` }>
					<div className={ classnames( `${ className }__content`, attributes.alignment ) }>
						<p>This is some dummy copy. You’re not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
						In today’s competitive market environment, the body copy of your entry must lead the reader through a series of disarmingly simple thoughts.</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default edit;
