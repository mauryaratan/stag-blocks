const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	InspectorControls,
	PanelColor,
	BlockControls,
	MediaUpload,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
	Toolbar,
	IconButton,
} = wp.components;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;
	const MIN_GAP = 0;
	const MAX_GAP = 25;

	const onSelectImage = ( media ) => {
		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: undefined, backgroundImageID: undefined } );
			return;
		}
		setAttributes( { backgroundImage: media.url, backgroundImageID: media.id } );
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Container Settings' ) }>
					<RangeControl
						label={ __( 'Margin Top (%)' ) }
						value={ attributes.marginTop }
						min={ MIN_GAP }
						max={ MAX_GAP }
						initialPosition={ attributes.marginTop || 0 }
						onChange={ ( value ) => setAttributes( { marginTop: value } ) }
					/>
					<RangeControl
						label={ __( 'Margin Bottom (%)' ) }
						value={ attributes.marginBottom }
						min={ MIN_GAP }
						max={ MAX_GAP }
						initialPosition={ attributes.marginBottom || 0 }
						onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
					/>
					<RangeControl
						label={ __( 'Padding Top (%)' ) }
						value={ attributes.paddingTop }
						min={ MIN_GAP }
						max={ MAX_GAP }
						initialPosition={ attributes.paddingTop || 0 }
						onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
					/>
					<RangeControl
						label={ __( 'Padding Bottom (%)' ) }
						value={ attributes.paddingBottom }
						min={ MIN_GAP }
						max={ MAX_GAP }
						initialPosition={ attributes.paddingBottom || 0 }
						onChange={ ( value ) => setAttributes( { paddingBottom: value } ) }
					/>
					<RangeControl
						label={ __( 'Padding Left (%)' ) }
						value={ attributes.paddingLeft }
						min={ MIN_GAP }
						max={ MAX_GAP }
						initialPosition={ attributes.paddingLeft || 0 }
						onChange={ ( value ) => setAttributes( { paddingLeft: value } ) }
					/>
					<RangeControl
						label={ __( 'Padding Right (%)' ) }
						value={ attributes.paddingRight }
						min={ MIN_GAP }
						max={ MAX_GAP }
						initialPosition={ attributes.paddingRight || 0 }
						onChange={ ( value ) => setAttributes( { paddingRight: value } ) }
					/>
					<RangeControl
						label={ __( 'Content Max Width (px)' ) }
						value={ attributes.containerWidth }
						min={ 500 }
						max={ 1600 }
						step={ 10 }
						initialPosition={ attributes.containerWidth || 500 }
						onChange={ ( value ) => setAttributes( { containerWidth: value } ) }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)' ) }
						value={ attributes.borderRadius }
						min={ 0 }
						max={ 50 }
						initialPosition={ attributes.borderRadius || 0 }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Background Options' ) }>
					<RangeControl
						label={ __( 'Background Opacity' ) }
						value={ attributes.backgroundOpacity }
						min={ 0 }
						max={ 100 }
						initialPosition={ attributes.backgroundOpacity || 0 }
						onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
					/>
					<PanelColor
						title={ __( 'Background Color' ) }
						value={ attributes.backgroundColor }
						onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
						initialOpen={ false }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<Toolbar>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ attributes.backgroundImageID }
						render={ ( { open } ) => (
							<IconButton
								className="components-toolbar__control"
								label={ __( 'Edit image' ) }
								icon="edit"
								onClick={ open }
							/>
						) }
					/>
				</Toolbar>
			</BlockControls>
		</Fragment>
	);
};

export default Controls;
