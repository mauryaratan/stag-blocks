const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	RangeControl,
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

				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.color,
							onChange: ( color ) => ( setAttributes( { color } ) ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.counterColor,
							onChange: ( counterColor ) => ( setAttributes( { counterColor } ) ),
							label: __( 'Counter Color' ),
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
