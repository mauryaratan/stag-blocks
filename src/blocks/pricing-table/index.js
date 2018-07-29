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
	title: __( 'Pricing table' ),
	category: 'common',
	description: __( 'A nice description for pricing-table block.' ),
	icon: 'money',
	keywords: [
		__( 'pricing-table' ),
		__( 'stag' ),
	],
	customCategory: 'stag-blocks',

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
			default: [
				{
					title: 'Startup',
					description: 'This is where it all begins',
					price: '$20',
					price_term: 'month',
					features: [],
					featured: false,
					buttonText: 'Choose this plan',
					buttonURL: 'https://google.com',
				},
				{
					title: 'Enterprise',
					description: 'You know you have made it when...',
					price: '$100',
					price_term: 'month',
					features: [],
					featured: true,
					buttonText: 'Choose this plan',
					buttonURL: 'https://google.com',
				},
			],
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
							<div className={ `${ className }__header` }>
								<RichText.Content tagName="h3" className={ `${ className }__title` } value={ table.title } />
								<RichText.Content tagName="p" className={ `${ className }__description` } value={ table.description } />
							</div>

							<div className={ `${ className }__price` }>
								<RichText.Content tagName="span" className={ `${ className }__price__amount` } value={ table.price } />
								{ ' / ' }
								<span className={ `${ className }__price__term_selector` }>{ table.price_term }</span>
							</div>

							<RichText.Content tagName="div" className={ `${ className }__features` } value={ table.features } />

							<div className={ `${ className }__footer` }>
								<div className="wp-block-button">
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
