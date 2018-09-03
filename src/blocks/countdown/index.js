import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
	RichText,
} = wp.editor;

// Use of specific date 'YYYYMMDD' instead of now() ensures that
// the default value doesn't breaks on reload if date is unchanged.
const currentDate = moment().format( 'YYYYMMDD' );
const oneMonthAhead = moment( currentDate ).add( 1, 'M' );

registerBlockType( 'sgb/countdown', {
	title: __( 'Countdown' ),
	category: 'common',
	description: __( 'A nice description for countdown block.' ),
	icon,
	customCategory: 'stag-blocks',
	keywords: [
		__( 'countdown' ),
		__( 'timer' ),
		__( 'stag' ),
	],

	supports: {
		multiple: false,
		html: false,
	},

	styles: [
		{ name: 'default', label: __( 'Default' ) },
		{ name: 'flipped', label: __( 'Flipped' ) },
		{ name: 'countdown-only', label: __( 'Countdown Only' ) },
	],

	attributes: {
		title: {
			type: 'array',
		},
		content: {
			type: 'array',
		},
		date: {
			type: 'string',
			default: oneMonthAhead,
		},
		dateFormat: {
			type: 'string',
			default: '<span><em>%D</em>d</span><span><em>%H</em>h</span><span><em>%M</em>m</span><span><em>%S</em>s</span>',
		},
		textColor: {
			type: 'string',
			default: '#4f4f4f',
		},
		backgroundColor: {
			type: 'string',
			default: '#f2f2f2',
		},
		borderColor: {
			type: 'string',
		},
		countdownColor: {
			type: 'string',
		},
	},

	edit,

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-sgb-countdown';

		return (
			<div
				style={ {
					backgroundColor: attributes.backgroundColor,
					color: attributes.textColor,
					borderColor: attributes.borderColor,
				} }
			>
				<div className="countdown-content">
					<RichText.Content
						tagName="h3"
						className={ `${ className }__title` }
						value={ attributes.title }
					/>
					<RichText.Content
						tagName="p"
						className={ `${ className }__content` }
						value={ attributes.content }
					/>
				</div>

				{ attributes.date &&
					<div
						className="countdown"
						style={ {
							color: attributes.countdownColor,
						} }
						data-countdown={ Date.parse( attributes.date ) }
					/> }

				<span className="date-format" hidden>{ attributes.dateFormat }</span>
			</div>
		);
	},
} );
