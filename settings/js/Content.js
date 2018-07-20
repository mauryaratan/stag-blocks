import BlockList from './BlockList';
import Categories from './Categories';

const Content = () => {
	return (
		<section className="stag-blocks__content">
			<Categories />

			{ /* <Themes /> */ }

			<BlockList />
		</section>
	);
};

export default Content;
