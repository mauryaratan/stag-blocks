const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	PanelBody,
	ToggleControl,
	Toolbar,
	DropdownMenu,
	RangeControl,
} = wp.components;

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColor,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Alert Settings' ) }>
					<RangeControl
						label={ __( 'Font size' ) }
						beforeIcon="editor-textcolor"
						afterIcon="editor-textcolor"
						min={ 12 }
						max={ 50 }
						allowReset
						initialPosition={ attributes.fontSize }
						value={ attributes.fontSize }
						onChange={ ( size ) => setAttributes( { fontSize: size } ) }
					/>

					<ToggleControl
						label={ __( 'Show Icon' ) }
						checked={ !! attributes.showIcon }
						onChange={ ( value ) => setAttributes( { showIcon: value } ) }
					/>
				</PanelBody>

				<PanelColor
					colorValue={ attributes.accentColor }
					initialOpen={ false }
					title={ __( 'Accent Color' ) }
					onChange={ ( color ) => setAttributes( { accentColor: color } ) }
				/>
				<PanelColor
					colorValue={ attributes.textColor }
					initialOpen={ false }
					title={ __( 'Text Color' ) }
					onChange={ ( color ) => setAttributes( { textColor: color } ) }
				/>
			</InspectorControls>

			<BlockControls>
				<Toolbar>
					<DropdownMenu
						label={ __( 'Alert Style' ) }
						icon="art"
						controls={ [
							{
								title: __( 'Warning' ),
								icon: <i className="fas fa-exclamation dashicon"></i>,
								onClick: () => setAttributes( { accentColor: '#EC7063' } ),
							},
							{
								title: __( 'Success' ),
								icon: <i className="fas fa-check dashicon"></i>,
								onClick: () => setAttributes( { accentColor: '#58D68D' } ),
							},
							{
								title: __( 'Note' ),
								icon: <i className="fas fa-question dashicon"></i>,
								onClick: () => setAttributes( { accentColor: '#F5B041' } ),
							},
							{
								title: __( 'Information' ),
								icon: <i className="fas fa-info dashicon"></i>,
								onClick: () => setAttributes( { accentColor: '#5DADE2' } ),
							},
						] }
					/>
				</Toolbar>
				<AlignmentToolbar
					value={ attributes.textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
		</Fragment>
	);
};

export default Controls;
