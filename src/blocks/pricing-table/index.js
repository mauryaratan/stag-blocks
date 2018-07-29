import Controls from './controls';
import Edit from './edit';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

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
					price: '20',
					price_term: 'month',
					features: [],
					featured: false,
					buttonText: 'Choose this plan',
					buttonURL: 'https://google.com',
				},
				{
					title: 'Enterprise',
					description: 'You know you have made it when...',
					price: '100',
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

		return (
			<p>You suck</p>
		);
	},
} );
