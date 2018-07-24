const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	Placeholder,
	Spinner,
	PanelBody,
} = wp.components;

const {
	InspectorControls,
	PanelColor,
} = wp.editor;

const Controls = ( props ) => {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Website Card Settings' ) }>
			</PanelBody>
		</InspectorControls>
	);
};

export default Controls;
