const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	ToggleControl,
} = wp.components;

const {
	InspectorControls,
	PanelColorSettings,
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
						help={ __( 'Display testimonial author company name' ) }
						onChange={ ( showCompany ) => setAttributes( { showCompany } ) }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.textColor,
							onChange: ( color ) => ( setAttributes( { color } ) ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
							label: __( 'Background Color' ),
						},
					] }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
