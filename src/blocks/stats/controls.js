const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	ToggleControl,
	TextControl,
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
				<RangeControl
					label={ __( 'Columns' ) }
					min={ 1 }
					initialPosition={ attributes.columns }
					max={ 4 }
					value={ attributes.columns }
					onChange={ ( columns ) => setAttributes( { columns } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
