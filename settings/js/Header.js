import BlocksLogo from './logo-stag-blocks';
import Switcher from './Switcher';

const Header = () => (
	<header className="stag-blocks__header">
		<div className="stag-blocks-logo">
			<BlocksLogo />
			<code>v{ _stagBlocks.version }</code>
		</div>
		<Switcher />
	</header>
);

export default Header;
