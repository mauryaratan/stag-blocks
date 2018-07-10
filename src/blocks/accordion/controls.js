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

const Control = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings' ) }>
					<ToggleControl
						label={ __( 'Open' ) }
						checked={ !! attributes.initialOpen }
						help={ ( checked ) => checked ? __( 'Showing accordion expanded by default.' ) : __( 'Show accordion collapsed by default.' ) }
						onChange={ () => setAttributes( { initialOpen: ! attributes.initialOpen } ) }
					/>
				</PanelBody>
				<PanelColor
					colorValue={ attributes.textColor }
					initialOpen={ false }
					title={ __( 'Text Color' ) }
					onChange={ ( color ) => setAttributes( { textColor: color } ) }
				/>
				<PanelColor
					colorValue={ attributes.backgroundColor }
					initialOpen={ false }
					title={ __( 'Background Color' ) }
					onChange={ ( color ) => setAttributes( { backgroundColor: color } ) }
				/>
				<PanelColor
					colorValue={ attributes.titleColor }
					initialOpen={ false }
					title={ __( 'Title Color' ) }
					onChange={ ( color ) => setAttributes( { titleColor: color } ) }
				/>
				<PanelColor
					colorValue={ attributes.titleBackgroundColor }
					initialOpen={ false }
					title={ __( 'Title Background Color' ) }
					onChange={ ( color ) => setAttributes( { titleBackgroundColor: color } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Control;
