import BlocksContext from './BlocksContext';
import RenderIcon from './RenderIcon';

const { Fragment } = wp.element;
const { Dashicon } = wp.components;

const BlockList = () => {
	return (
		<div className="stag-blocks__list">
			<BlocksContext.Consumer>
				{ context => (
					context.state.isLoading ? (
						<div className="spinner is-active" />
					) : (
						<Fragment>
							{ context.state.blocks.map( ( block ) => (
								<div
									key={ block.name }
									data-category={ block.category }
									className="stag-blocks__block"
								>
									<RenderIcon icon={ block.icon.src } />
									<p>{ block.title }</p>
								</div>
							) ) }
						</Fragment>
					)
				) }
			</BlocksContext.Consumer>
		</div>
	);
};

export default BlockList;
