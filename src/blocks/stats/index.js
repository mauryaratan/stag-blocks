import classnames from 'classnames';
import Controls from './controls';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText } = wp.editor;
const {
	Button,
	TextControl,
	Dashicon,
} = wp.components;

registerBlockType( 'sgb/stats', {
	title: __( 'Stats' ),
	category: 'common',
	description: __( 'Display useful custom stats for anything.' ),
	icon: 'chart-area',
	keywords: [
		__( 'stats' ),
		__( 'numbers' ),
		__( 'stag' ),
	],

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

	edit: function( props ) {
		const { attributes, setAttributes, className } = props;

		return (
			<Fragment>
				<Controls { ...props } />

				<div className={ classnames( className, `columns-${ attributes.columns }` ) }>
					{
						( attributes.content.length ) ? ( attributes.content.map( ( v, i ) => (
							<div className={ `${ className }__counter` } key={ i }>
								<Button
									isLarge
									label={ __( 'Remove counter' ) }
									tooltip={ __( 'Remove counter' ) }
									className={ `${ className }__remove` }
									onClick={ () => {
										const content = [ ...attributes.content ];

										setAttributes( { content: content.filter( ( el, index ) => ! ( index === i ) ) } );
									} }
								>
									<Dashicon icon="no-alt" />
								</Button>

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
								/>

								<RichText
									tagName="p"
									placeholder={ __( 'Enter stats text...' ) }
									className={ `${ className }__text` }
									value={ attributes.content[ i ].text }
									onChange={ ( value ) => {
										const content = [ ...attributes.content ];
										content[ i ].text = value[ 0 ];
										setAttributes( { content } );
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
							const content = [ ...attributes.content ];

							content.push( { count: '', text: '' } );

							setAttributes( { content } );
						} }
						label={ __( 'Add new stat' ) }
					>
						<Dashicon icon="plus" />
						{ __( 'Add new stat' ) }
					</Button>
				</div>

			</Fragment>
		);
	},

	save: function( props ) {
		const { attributes } = props;
		const className = 'wp-block-sgb-stats';

		return (
			<div className={ classnames( className, `columns-${ attributes.columns }` ) }>
				{
					( attributes.content.length ) ? ( attributes.content.map( ( v, i ) => (
						<div className={ `${ className }__counter` } key={ i }>
							<div className={ `${ className }__count` }>{ attributes.content[ i ].count }</div>
							<div className={ `${ className }__text` }>{ attributes.content[ i ].text }</div>
						</div>
					) ) ) : null
				}
			</div>
		);
	},
} );
