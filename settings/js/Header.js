import BlocksLogo from './logo-stag-blocks';

const { __ } = wp.i18n;

const Header = () => (
	<header className="stag-blocks__header">
		<div className="stag-blocks-logo">
			<BlocksLogo />
			<h2>Stag Blocks</h2>
		</div>
	</header>
);

export default Header;
