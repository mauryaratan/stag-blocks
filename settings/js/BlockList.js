import BlocksContext from './BlocksContext';
import RenderBlockSettings from './BlockSettings';
import ErrorCard from './ErrorCard';
import RenderIcon from './RenderIcon';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;

const BlockList = () => {
	return (
		<div className="stag-blocks__list">
			<BlocksContext.Consumer>
				{ context => (
					context.state.isLoading ? (
						<div className="spinner is-active" />
					) : (
						<Fragment>
							{ context.state.blocks.length ? context.filteredBlocks.map( ( block ) => (
								<div
									key={ block.name }
									className="stag-blocks__block"
								>
									<RenderIcon icon={ block.icon.src } />
									<p>{ block.title }</p>
									<p className="stag-blocks__block__description">{ block.description }</p>

									<ToggleControl
										label={ __( 'Toggle block' ) }
										checked={ ( block.name in context.state.activeBlocks ) ? context.state.activeBlocks[ block.name ] : true }
										onChange={ ( status ) => {
											context.toggleBlock( block.name, status );
										} }
									/>

									{ block.hasSettings && (
										<RenderBlockSettings
											initialOpen={ ( block.name in context.state.activeBlocks ) ? context.state.activeBlocks[ block.name ] : true }
											{ ...block }
										/>
									) }
								</div>
							) ) : (
								<ErrorCard />
							) }
						</Fragment>
					)
				) }
			</BlocksContext.Consumer>
		</div>
	);
};

export default BlockList;
