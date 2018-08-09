const { __ } = wp.i18n;

const { Fragment } = wp.element;

const {
	BlockControls,
} = wp.editor;

const {
	Toolbar,
	IconButton,
} = wp.components;

const Controls = ( { setAttributes } ) => {
	return (
		<Fragment>
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
