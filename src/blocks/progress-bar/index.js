import Controls from './controls';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;

registerBlockType( 'sgb/progress-bar', {
	title: __( 'Progress Bar' ),
	category: 'layout',
	description: __( 'A nice description for progress-bar block.' ),
	icon: 'chart-bar',
	customCategory: 'stag-blocks',
	keywords: [
		__( 'progress' ),
		__( 'counter' ),
		__( 'stag' ),
	],

	attributes: {
		progress: {
			type: 'number',
			default: 50,
		},
	},

	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( props ) {
		const { attributes, className } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<progress
					min={ 0 }
					max={ 100 }
					value={ attributes.progress }
					className={ className }
				/>
			</Fragment>
		);
	},

	save( { attributes: { progress } } ) {
		const className = 'wp-block-sgb-progress-bar';
		return (
			<progress
				min={ 0 }
				max={ 100 }
				value={ progress }
				className={ className }
			/>
		);
	},
} );
