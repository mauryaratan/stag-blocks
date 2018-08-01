const { __ } = wp.i18n;

const {
	BlockControls,
} = wp.editor;

const {
	Toolbar,
	IconButton,
} = wp.components;

const Controls = ( { setAttributes } ) => {
	return (
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
	);
};

export default Controls;
