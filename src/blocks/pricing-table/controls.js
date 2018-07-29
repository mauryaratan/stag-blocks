const { __ } = wp.i18n;

const { Fragment } = wp.element;

const {
	InspectorControls,
	PanelColor,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
} = wp.components;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Pricing Table settings' ) }>
					<RangeControl
						label={ __( 'Columns' ) }
						min={ 1 }
						max={ 4 }
						value={ attributes.columns }
						onChange={ ( columns ) => setAttributes( { columns } ) }
					/>
				</PanelBody>

				<PanelColor
					colorValue={ attributes.accent }
					title={ __( 'Accent Color' ) }
					onChange={ ( color ) => setAttributes( { accent: color } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
