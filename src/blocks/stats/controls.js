const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	RangeControl,
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
				<PanelBody>
					<RangeControl
						label={ __( 'Columns' ) }
						min={ 1 }
						initialPosition={ attributes.columns }
						max={ Math.min( 4, ( attributes.content ? attributes.content.length : 2 ) ) }
						value={ attributes.columns }
						onChange={ ( columns ) => setAttributes( { columns } ) }
					/>
				</PanelBody>

				<PanelColor
					title={ __( 'Text Color' ) }
					initialOpen={ false }
					colorValue={ attributes.color }
					onChange={ ( color ) => setAttributes( { color } ) }
				/>
				<PanelColor
					title={ __( 'Counter Color' ) }
					initialOpen={ false }
					colorValue={ attributes.counterColor }
					onChange={ ( counterColor ) => setAttributes( { counterColor } ) }
				/>
				<PanelColor
					title={ __( 'Background Color' ) }
					initialOpen={ false }
					colorValue={ attributes.backgroundColor }
					onChange={ ( backgroundColor ) => setAttributes( { backgroundColor } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
