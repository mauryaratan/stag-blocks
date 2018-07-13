import Logo from './logo-codestag';
import BlocksLogo from './logo-stag-blocks';

const { __ } = wp.i18n;

const Header = () => (
	<header className="stag-blocks__header">
		<div className="stag-blocks-logo">
			<BlocksLogo />
			<h2>Stag Blocks</h2>
		</div>
		<div className="codestag-logo">
			<p>{ __( 'A plugin by' ) }</p>
			<a href="https://codestag.com" title="Codestag">
				<Logo />
			</a>
		</div>
	</header>
);

export default Header;
