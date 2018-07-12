const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	ToggleControl,
} = wp.components;

const {
	InspectorControls,
	PanelColor,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Testimonial Settings' ) }>
					<ToggleControl
						label={ __( 'Show name' ) }
						checked={ !! attributes.showName }
						help={ __( 'Display testimonial author name' ) }
						onChange={ ( showName ) => setAttributes( { showName } ) }
					/>
					<ToggleControl
						label={ __( 'Show company' ) }
						checked={ !! attributes.showCompany }
						help={ __( 'Display testimonial author name' ) }
						onChange={ ( showCompany ) => setAttributes( { showCompany } ) }
					/>
				</PanelBody>

				<PanelColor
					colorValue={ attributes.textColor }
					initialOpen={ false }
					title={ __( 'Text Color' ) }
					onChange={ ( color ) => setAttributes( { color: color } ) }
				/>

				<PanelColor
					colorValue={ attributes.backgroundColor }
					initialOpen={ false }
					title={ __( 'Background Color' ) }
					onChange={ ( color ) => setAttributes( { backgroundColor: color } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
