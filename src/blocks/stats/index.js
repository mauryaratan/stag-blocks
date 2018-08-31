import classnames from 'classnames';
import edit from './edit';
import './editor.scss';
import icon from './icon';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'sgb/stats', {
	title: __( 'Stats' ),
	category: 'common',
	description: __( 'Display useful custom stats for just about anything.' ),
	icon,
	keywords: [
		__( 'stats' ),
		__( 'numbers' ),
		__( 'stag' ),
	],

	supports: {
		align: [ 'wide', 'full' ],
	},

	customCategory: 'stag-blocks',

	attributes: {
		columns: {
			type: 'number',
			default: 2,
		},
		content: {
			type: 'array',
			default: [],
		},
		backgroundColor: {
			type: 'string',
		},
		color: {
			type: 'string',
		},
		counterColor: {
			type: 'string',
		},
	},

	edit,

	save( props ) {
		const { attributes } = props;
		const className = 'wp-block-sgb-stats';

		return (
			<div className={ classnames( className, `columns-${ attributes.columns }` ) } >
				{
					( attributes.content.length ) ? ( attributes.content.map( ( counter, i ) => (
						<div
							className={ `${ className }__counter` }
							key={ i }
							style={ {
								backgroundColor: attributes.backgroundColor,
								color: attributes.color,
							} }
						>
							<div className={ `${ className }__count` } style={ { color: attributes.counterColor } }>
								{ counter.count }
							</div>
							<div className={ `${ className }__text` }>{ counter.text }</div>
						</div>
					) ) ) : null
				}
			</div>
		);
	},
} );
