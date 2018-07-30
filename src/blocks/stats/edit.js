import classnames from 'classnames';
import Controls from './controls';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { Fragment } = wp.element;
const { RichText } = wp.editor;

const {
	Button,
	TextControl,
	Dashicon,
	IconButton,
} = wp.components;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedStat: null,
		};
	}
	render() {
		const { attributes, setAttributes, className, isSelected } = this.props;
		return (
			<Fragment>
				<Controls { ...this.props } />

				<div className={ classnames( className, `columns-${ attributes.columns }` ) }>
					{
						( attributes.content.length ) ? ( attributes.content.map( ( v, i ) => (
							<div
								key={ i }
								className={ classnames( `${ className }__counter`, {
									'is-selected': ( isSelected && this.state.selectedStat === i ),
								} ) }
								style={ {
									backgroundColor: attributes.backgroundColor,
									color: attributes.color,
								} }
								onClick={ () => this.setState( { selectedStat: i } ) }
								onKeyDown={ () => false }
								role="textbox"
								tabIndex="-1"
							>
								{ ( isSelected && this.state.selectedStat === i ) &&
									<div className="core-blocks-gallery-item__inline-menu">
										<IconButton
											icon="no-alt"
											onClick={ () => {
												const content = [ ...attributes.content ];
												setAttributes( { content: content.filter( ( el, index ) => ! ( index === i ) ) } );
											} }
											className="blocks-gallery-item__remove"
											label={ __( 'Remove Table' ) }
										/>
									</div>
								}

								<TextControl
									type="text"
									placeholder="1000"
									className={ `${ className }__count` }
									value={ attributes.content[ i ].count }
									onChange={ ( value ) => {
										const content = [ ...attributes.content ];
										content[ i ].count = value;
										setAttributes( { content } );
									} }
									style={ {
										color: attributes.counterColor,
									} }
								/>

								<RichText
									tagName="p"
									placeholder={ __( 'Enter stats text...' ) }
									className={ `${ className }__text` }
									value={ attributes.content[ i ].text }
									onChange={ ( value ) => {
										const content = [ ...attributes.content ];
										content[ i ].text = value;
										setAttributes( { content } );
									} }
								/>
							</div>
						) ) ) : null
					}
				</div>

				{ isSelected &&
					<div className="blocks-gallery-item">
						<IconButton
							icon="insert"
							isDefault
							isLarge
							className="core-blocks-gallery-add-item-button"
							onClick={ () => {
								const content = [ ...attributes.content ];

								content.push( { count: '', text: '' } );

								setAttributes( { content } );
							} }
						>
							{ __( 'Add new stat' ) }
						</IconButton>
					</div>
				}
			</Fragment>
		);
	}
}
