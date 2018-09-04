const { __ } = wp.i18n;
const { withState } = wp.compose;
const { Fragment } = wp.element;

const {
	Button,
	TextControl,
	Modal,
} = wp.components;

const IconModal = withState( {
	search: '',
	isOpen: false,
} )( ( { isOpen, search, setState } ) => {
	const iconsList = () => {
		// Access global GT_Icons for icons list.
		const FA = GT_Icons.fontawesome;

		return FA.filter( ( icon ) => {
			const name = icon.i;

			return name.includes( search );
		} );
	};

	console.log( typeof iconsList(), iconsList().length );

	const ICONS = iconsList();

	return (
		<Fragment>
			<Button isDefault onClick={ () => setState( { isOpen: true } ) }>Open Modal</Button>
			{ isOpen &&
				<Modal
					title={ __( 'Icon Selector' ) }
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
							<i key={ index } className={ `${ icon.s } fa-${ icon.i }` }></i>
						) ) : <p className="no-icons">{ __( 'No icons found.' ) }</p> }
					</div>
				</Modal>
			}
		</Fragment>
	);
} );

export default IconModal;
