import classnames from 'classnames';

const { __ } = wp.i18n;

const {
	Fragment,
	Component,
} = wp.element;

const {
	IconButton,
	Button,
	Dashicon,
	SelectControl,
	withFocusOutside,
} = wp.components;

const {
	RichText,
	URLInput,
} = wp.editor;

const EnhancedComponent = withFocusOutside(
	class Edit extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				focusedIndex: false,
			};
		}

		handleFocusOutside() {
			this.setState( { focusedIndex: false } );
		}

		stopKeyPropagation = ( event ) => event.stopPropagation();

		render() {
			const { attributes, setAttributes, className } = this.props;

			return (
				<Fragment>
					<div className={ classnames( className, `columns-${ attributes.columns }` ) }>
						{
							( attributes.tables.length ) ? ( attributes.tables.map( ( table, i ) => (
								<div
									key={ i }
									className={ classnames( `${ className }__table` ) }
									style={ {
										backgroundColor: attributes.backgroundColor,
										color: attributes.textColor,
									} }
								>
									<IconButton
										isLarge
										tooltip={ __( 'Remove table' ) }
										className={ `${ className }__remove` }
										onClick={ () => {
											const tables = [ ...attributes.tables ];

											setAttributes( { tables: tables.filter( ( el, index ) => ! ( index === i ) ) } );
										} }
										icon="no-alt"
									/>
									<IconButton
										isLarge
										tooltip={ __( 'Mark as featured' ) }
										className={ `${ className }__featured` }
										onClick={ () => {
											const tables = [ ...attributes.tables ];
											tables.map( ( t ) => t.featured = false );
											tables[ i ].featured = true;
											setAttributes( { tables } );
										} }
										icon={ table.featured ? 'star-filled' : 'star-empty' }
									/>

									<div className={ `${ className }__header` }>
										<RichText
											tagName="h3"
											placeholder={ __( 'Write title...' ) }
											className={ `${ className }__title` }
											value={ table.title }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].title = value;
												setAttributes( { tables } );
											} }
										/>

										<RichText
											tagName="p"
											placeholder={ __( 'Write description...' ) }
											className={ `${ className }__description` }
											value={ table.description }
											onChange={ ( value ) => {
												const tables = [ ...attributes.tables ];
												tables[ i ].description = value;
												setAttributes( { tables } );
											} }
											keepPlaceholderOnFocus
										/>
									</div>

									<div className={ `${ className }__price` }>
										<div className="inline-container">
											<RichText
												tagName="span"
												placeholder="$10"
												className={ `${ className }__price__amount` }
												value={ table.price }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].price = value;
													setAttributes( { tables } );
												} }
												keepPlaceholderOnFocus
											/>
										</div>
										{ ' / ' }
										<div className="inline-container">
											<SelectControl
												className={ `${ className }__price__term_selector` }
												options={ [
													{ value: 'month', label: __( 'Month' ) },
													{ value: 'year', label: __( 'Year' ) },
												] }
												value={ table.price_term }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].price_term = value;
													setAttributes( { tables } );
												} }
											/>
										</div>

									</div>

									<RichText
										className={ `${ className }__features` }
										tagName="div"
										multiline="p"
										placeholder={ __( 'Enter plan features...' ) }
										value={ table.features }
										onChange={ ( value ) => {
											const tables = [ ...attributes.tables ];
											tables[ i ].features = value;
											setAttributes( { tables } );
										} }
										inlineToolbar
									/>

									<div className={ `${ className }__footer` }>
										<span
											role="button"
											onClick={ () => this.setState( { focusedIndex: i } ) }
											onKeyPress={ this.stopKeyPropagation }
											tabIndex={ i }
											className="wp-block-button"
										>
											<RichText
												tagName="span"
												placeholder={ __( 'Add text…' ) }
												value={ table.buttonText }
												onChange={ ( value ) => {
													const tables = [ ...attributes.tables ];
													tables[ i ].buttonText = value;
													setAttributes( { tables } );
												} }
												formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
												className={ classnames( 'wp-block-button__link' ) }
												keepPlaceholderOnFocus
											/>
										</span>
										{ ( this.state.focusedIndex === i ) && (
											<form
												className="core-blocks-button__inline-link"
												onSubmit={ ( event ) => event.preventDefault() }>
												<Dashicon icon="admin-links" />
												<URLInput
													value={ table.buttonURL }
													onChange={ ( value ) => {
														const tables = [ ...attributes.tables ];
														tables[ i ].buttonURL = value;
														setAttributes( { tables } );
													} }
												/>
												<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
											</form>
										) }
									</div>
								</div>
							) ) ) : null
						}
					</div>

					<div style={ {
						textAlign: 'center',
						marginTop: '1em',
					} }>
						<Button
							icon="plus"
							isLarge
							className={ `${ className }__add` }
							onClick={ () => {
								const tables = [ ...attributes.tables ];

								tables.push( {
									title: '',
									description: '',
									price: '100',
									price_term: 'month',
									features: [],
								} );

								setAttributes( { tables } );
							} }
						>
							<Dashicon icon="plus" />
							{ __( 'Add new' ) }
						</Button>
					</div>
				</Fragment>
			);
		}
	}
);

export default EnhancedComponent;
