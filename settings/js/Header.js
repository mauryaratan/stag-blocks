import BlocksLogo from './logo-stag-blocks';

const Header = () => (
	<header className="stag-blocks__header">
		<div className="stag-blocks-logo">
			<BlocksLogo />
			<code>v{ _stagBlocks.version }</code>
		</div>
	</header>
);

export default Header;
