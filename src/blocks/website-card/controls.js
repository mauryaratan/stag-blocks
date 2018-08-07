const { __ } = wp.i18n;

const { Fragment } = wp.element;

const {
	BlockControls,
	InspectorControls,
} = wp.editor;

const {
	Toolbar,
	PanelBody,
	ToggleControl,
	IconButton,
} = wp.components;

const Controls = ( { attributes, setAttributes } ) => {
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Website Card Settings' ) }>
					<ToggleControl
						label={ __( 'Open link in new tab' ) }
						checked={ !! attributes.new_tab }
						onChange={ () => setAttributes( { new_tab: ! attributes.new_tab } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<Toolbar>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Edit URL' ) }
						icon="edit"
						onClick={ () => setAttributes( { title: undefined } ) }
					/>
				</Toolbar>
			</BlockControls>
		</Fragment>
	);
};

export default Controls;
