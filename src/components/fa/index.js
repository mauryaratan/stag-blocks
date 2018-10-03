import './editor.scss';
import IconModal from './modal';

const { __ } = wp.i18n;
const { withState } = wp.compose;
const { Fragment } = wp.element;

const Icon = withState( {
	icon: 'info',
	isSelected: false,
} )( ( props ) => (
	<Fragment>
		<IconModal />
		<i className="fas" />
	</Fragment>
) );

Icon.Content = ( props ) => (
	<Fragment>
		{ console.log( props ) }
		<i>Poop</i>
	</Fragment>
);

export default Icon;
