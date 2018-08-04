import classnames from 'classnames';
import Controls from './controls';
import Edit from './edit';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

const {
	RichText,
} = wp.editor;

registerBlockType( 'sgb/pricing-table', {
	title: __( 'Pricing Table' ),
	category: 'common',
	description: __( 'Add a pricing table block to showcase different plans and offers.' ),
	icon: <i className="dashicon fas fa-money-check-alt" />,
	keywords: [
		__( 'pricing-table' ),
		__( 'stag' ),
	],
	customCategory: 'stag-blocks',
	supports: {
		align: [ 'wide', 'full' ],
	},

	attributes: {
		title: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		columns: {
			type: 'number',
			default: 2,
		},
		featured_text: {
			type: 'string',
			default: 'Recommended',
		},
		accent: {
			type: 'string',
			default: '#3575FF',
		},
		textColor: {
			type: 'string',
			default: '#1d1d1f',
		},
		backgroundColor: {
			type: 'string',
			default: '#f5f6f8',
		},
		tables: {
			type: 'array',
			default: [],
		},
	},

	edit: function( props ) {
		return (
			<Fragment>
				<Controls { ...props } />

				<Edit { ...props } />
			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;
		const className = 'wp-block-sgb-pricing-table';

		return (
			<div className={ classnames( className, `columns-${ attributes.columns }` ) }>
				{
					( attributes.tables.length ) ? ( attributes.tables.map( ( table, i ) => (
						<div
							key={ i }
							className={ classnames( `${ className }__table`, {
								'is-featured': table.featured,
							} ) }
							style={ {
								backgroundColor: attributes.backgroundColor,
								color: attributes.textColor,
							} }
						>
							{ ( attributes.featured_text ) && ( table.featured ) &&
								<span className={ `${ className }__featured_text` }>{ attributes.featured_text }</span>
							}
							<div className={ `${ className }__header` }>
								<RichText.Content tagName="h3" className={ `${ className }__title` } value={ table.title } />
								<RichText.Content tagName="p" className={ `${ className }__description` } value={ table.description } />
							</div>

							<div className={ `${ className }__price` }>
								<RichText.Content tagName="div" className={ `${ className }__price__amount` } value={ table.price } />
								<RichText.Content tagName="div" className={ `${ className }__price__term` } value={ table.price_term } />
							</div>

							<RichText.Content tagName="div" className={ `${ className }__features` } value={ table.features } />

							<div className={ `${ className }__footer` }>
								<div className="wp-block-button is-style-squared">
									<RichText.Content
										tagName="a"
										className="wp-block-button__link"
										href={ table.buttonURL }
										title={ table.buttonText }
										value={ table.buttonText }
									/>
								</div>
							</div>
						</div>
					) ) ) : null
				}
			</div>
		);
	},
} );
