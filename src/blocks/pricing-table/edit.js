import classnames from 'classnames';
const { __ } = wp.i18n;
const { Fragment } = wp.element;

const {
	IconButton,
	Button,
	Dashicon,
	SelectControl,
} = wp.components;

const {
	RichText,
} = wp.editor;

const Edit = ( props ) => {
	const { attributes, setAttributes, className } = props;

	return (
		<Fragment>
			<div className={ classnames( className, `columns-${ attributes.columns }` ) }>
				{
					( attributes.tables.length ) ? ( attributes.tables.map( ( table, i ) => (
						<div
							key={ i }
							className={ classnames( `${ className }__table` ) }
						>
							<IconButton
								isLarge
								tooltip={ __( 'Remove table' ) }
								className={ `${ className }__remove` }
								onClick={ () => {
									const tables = [ ...attributes.tables ];

									setAttributes( { tables: tables.filter( ( el, index ) => ! ( index === i ) ) } );
								} }
							>
								<Dashicon icon="no-alt" />
							</IconButton>
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

							<div className={ `${ className }__price` }>
								<span className={ `${ className }__price__currency` }>$</span>

								<div className="inline-container">
									<RichText
										tagName="span"
										placeholder="10"
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
										onChange={ ( value ) => console.log( value ) }
									/>
									{ /* <span className={ `${ className }__price__term` }>{ table.price_term }</span> */ }
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
							/>
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
};

export default Edit;
