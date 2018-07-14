import BlocksContext from './BlocksContext';
import RenderIcon from './RenderIcon';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;

const BlockList = () => {
	let status = false;
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
									<p className="stag-blocks__block__description">{ block.description }</p>

									<ToggleControl
										label={ __( 'Toggle block' ) }
										checked={ status }
										onChange={ () => {
											status = ! status;
										} }
									/>
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
