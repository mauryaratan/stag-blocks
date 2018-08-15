const { __ } = wp.i18n;

const {
	InspectorControls,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
} = wp.components;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<InspectorControls>
			<PanelBody>
				<RangeControl
					label={ __( 'Progress' ) }
					min={ 0 }
					max={ 100 }
					step={ 1 }
					value={ attributes.progress }
					onChange={ ( progress ) => setAttributes( { progress } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
