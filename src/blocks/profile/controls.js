const { __ } = wp.i18n;

const {
	PanelBody,
	TextControl,
} = wp.components;

const {
	InspectorControls,
	PanelColorSettings,
} = wp.editor;

const Controls = ( { attributes, setAttributes } ) => (
	<InspectorControls>
		<PanelColorSettings
			title={ __( 'Color Settings' ) }
			initialOpen={ true }
			colorSettings={ [
				{
					value: attributes.backgroundColor,
					onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
					label: __( 'Background Color' ),
				},
				{
					value: attributes.textColor,
					onChange: ( textColor ) => ( setAttributes( { textColor } ) ),
					label: __( 'Text Color' ),
				},
			] }
		/>
		<PanelBody title={ __( 'Social Links' ) } initialOpen={ false }>
			<TextControl
				type="url"
				label={ __( 'Website Link' ) }
				value={ attributes.website }
				onChange={ ( website ) => setAttributes( { website } ) }
			/>
			<TextControl
				type="url"
				label={ __( 'Facebook' ) }
				value={ attributes.facebook }
				onChange={ ( facebook ) => setAttributes( { facebook } ) }
			/>
			<TextControl
				type="url"
				label={ __( 'Twitter' ) }
				value={ attributes.twitter }
				onChange={ ( twitter ) => setAttributes( { twitter } ) }
			/>
			<TextControl
				type="url"
				label={ __( 'Google Plus' ) }
				value={ attributes.googleplus }
				onChange={ ( googleplus ) => setAttributes( { googleplus } ) }
			/>
			<TextControl
				type="url"
				label={ __( 'Instagram' ) }
				value={ attributes.instagram }
				onChange={ ( instagram ) => setAttributes( { instagram } ) }
			/>
		</PanelBody>
	</InspectorControls>
);

export default Controls;
