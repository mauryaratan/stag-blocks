import classnames from 'classnames';

const { __ } = wp.i18n;
const { withState } = wp.compose;
const { Fragment } = wp.element;

const {
	Button,
	TextControl,
	Modal,
	Tooltip,
} = wp.components;

const IconModal = withState( {
	search: '',
	activeIcon: '',
	isOpen: false,
} )( ( { isOpen, search, activeIcon, setState } ) => {
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
					onRequestClose={ () => setState( { isOpen: false } ) }
					style={ {
						width: '100%',
					} }
				>
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
										'is-active': activeIcon === icon.i,
									} ) }
									onClick={ () => {
										setState( { activeIcon: icon.i } );
									} }
									onKeyDown={ () => false }
									role="button"
									tabIndex={ index }
								></i>
							</Tooltip>
						) ) : <p className="no-icons">{ __( 'No icons found.' ) }</p> }
					</div>
				</Modal>
			}
		</Fragment>
	);
} );

export default IconModal;
