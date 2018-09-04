import classnames from 'classnames';

const { __ } = wp.i18n;
const { withState } = wp.compose;
const { Fragment } = wp.element;

const {
	PanelColorSettings,
} = wp.editor;

const {
	Button,
	TextControl,
	Modal,
	Tooltip,
	IconButton,
	RangeControl,
	PanelBody,
	SelectControl,
} = wp.components;

const IconModal = withState( {
	search: '',
	activeIcon: '',
	isOpen: false,
	isSelected: false,
	iconSize: '25',
	color: '',
	backgroundColor: '',
	style: 'default',
} )( ( { isOpen, search, activeIcon, isSelected, setState, iconSize, color, backgroundColor, style } ) => {
	const iconsList = () => {
		// Access global GT_Icons for icons list.
		const FA = GT_Icons.fontawesome;

		return FA.filter( ( icon ) => {
			const name = icon.i;

			return name.includes( search );
		} );
	};

	const ICONS = iconsList();

	return (
		<Fragment>
			<Button isDefault onClick={ () => setState( { isOpen: true } ) }>Open Modal</Button>
			{ isOpen &&
				<Modal
					title={ __( 'Select an icon' ) }
					focusOnMount={ false }
					onRequestClose={ () => setState( { isOpen: false, isSelected: false } ) }
					className="icon-selector-container"
					shouldCloseOnClickOutside={ false }
					style={ {
						width: '100%',
						height: '80%',
					} }
				>
					<div className={ classnames( {
						'is-selected': isSelected,
					} ) }>
						<TextControl
							title=""
							value={ search }
							onChange={ value => setState( { search: value } ) }
							placeholder={ __( 'Filter icons' ) }
						/>

						<div className="icon-selector">
							{ ICONS.length > 0 ? ICONS.map( ( icon, index ) => (
								<Tooltip key={ index } text={ icon.i }>
									<i
										className={ classnames( `${ icon.s } fa-${ icon.i }`, {
											'is-active': activeIcon === `${ icon.s } fa-${ icon.i }`,
										} ) }
										onClick={ () => {
											setState( {
												activeIcon: `${ icon.s } fa-${ icon.i }`,
												isSelected: true,
											} );
										} }
										onKeyDown={ () => false }
										role="button"
										tabIndex={ index }
									></i>
								</Tooltip>
							) ) : <p className="no-icons">{ __( 'No icons found.' ) }</p> }
						</div>

						{ activeIcon && isSelected &&
						<div className="overlay">
							<div className="overlay-heading">
								<h3>{ __( 'Icon Preview' ) }</h3>
								<IconButton
									onClick={ () => setState( { isSelected: false } ) }
									icon="no-alt"
									label={ __( 'Close preview' ) }
								/>
							</div>
							<div className="icon-preview">
								<i
									className={ classnames( activeIcon, {
										'has-background': backgroundColor,
										[ `has-style-${ style }` ]: style !== 'default',
									} ) }
									style={ {
										fontSize: `${ iconSize }px`,
										width: style !== 'default' ? `${ iconSize }px` : false,
										height: style !== 'default' ? `${ iconSize }px` : false,
										color,
										backgroundColor: style !== 'default' ? backgroundColor : false,
									} }
								></i>
							</div>

							<PanelBody>
								<RangeControl
									label={ __( 'Size' ) }
									value={ iconSize }
									onChange={ size => setState( { iconSize: size } ) }
									min={ 16 }
									max={ 80 }
									initialPosition={ iconSize }
								/>
								<SelectControl
									label={ __( 'Style' ) }
									value={ style }
									onChange={ value => setState( { style: value } ) }
									options={ [
										{ value: 'default', label: __( 'Default' ) },
										{ value: 'recentangle', label: __( 'Recentangle' ) },
										{ value: 'circle', label: __( 'Circle' ) },
									] }
								/>
							</PanelBody>

							<PanelColorSettings
								title={ __( 'Color Settings' ) }
								initialOpen={ false }
								colorSettings={ [
									{
										label: __( 'Icon Color' ),
										value: color,
										onChange: ( value ) => setState( { color: value } ),
									},
									{
										label: __( 'Background Color' ),
										value: backgroundColor,
										onChange: ( value ) => setState( { backgroundColor: value } ),
									},
								] }
							/>
						</div>
						}
					</div>
				</Modal>
			}
		</Fragment>
	);
} );

export default IconModal;
