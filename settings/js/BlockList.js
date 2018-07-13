import BlocksContext from './BlocksContext';

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
									{ ( typeof block.icon.src === 'string' ) ? (
										<Dashicon className="stag-blocks__block__icon" icon={ block.icon.src } />
									) : (
										console.log( block.icon, wp.svgPainter( block.icon ) )
									) }
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
