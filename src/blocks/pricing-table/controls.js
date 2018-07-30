const { __ } = wp.i18n;

const { Fragment } = wp.element;

const {
	InspectorControls,
	PanelColor,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
	TextControl,
} = wp.components;

const MAX_POSTS_COLUMNS = 4;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;
	const hasTables = Array.isArray( attributes.tables ) && attributes.tables.length;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Pricing Table settings' ) }>
					<TextControl
						label={ __( 'Featured Text' ) }
						help={ __( 'Appears as badge over the featured plan.' ) }
						value={ attributes.featured_text }
						onChange={ ( value ) => setAttributes( { featured_text: value } ) }
					/>
					<RangeControl
						label={ __( 'Columns' ) }
						min={ 1 }
						max={ ! hasTables ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, attributes.tables.length ) }
						value={ attributes.columns }
						onChange={ ( columns ) => setAttributes( { columns } ) }
					/>
				</PanelBody>

				<PanelColor
					colorValue={ attributes.accent }
					title={ __( 'Accent Color' ) }
					initialOpen={ false }
					onChange={ ( color ) => setAttributes( { accent: color } ) }
				/>
				<PanelColor
					colorValue={ attributes.textColor }
					title={ __( 'Text Color' ) }
					initialOpen={ false }
					onChange={ ( color ) => setAttributes( { textColor: color } ) }
				/>
				<PanelColor
					colorValue={ attributes.backgroundColor }
					title={ __( 'Background Color' ) }
					initialOpen={ false }
					onChange={ ( color ) => setAttributes( { backgroundColor: color } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
