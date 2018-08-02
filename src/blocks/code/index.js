import classnames from 'classnames';
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { PlainText, InspectorControls } = wp.editor;
const { SelectControl, PanelBody, ToggleControl } = wp.components;
const { Fragment } = wp.element;

const LANGS = {
	bash: 'Bash (shell)',
	clike: 'C-like',
	css: 'CSS',
	git: 'Git',
	go: 'Go (golang)',
	graphql: 'GraphQL',
	markup: 'HTML/Markup',
	javascript: 'JavaScript',
	json: 'JSON',
	markdown: 'Markdown',
	php: 'PHP',
	python: 'Python',
	jsx: 'React JSX',
	sass: 'Sass/Scss',
	sql: 'SQL',
	typescript: 'TypeScript',
	xml: 'XML',
};

const addSyntaxToCodeBlock = ( settings ) => {
	if ( settings.name !== 'core/code' ) {
		return settings;
	}

	const newCodeBlockSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			language: {
				type: 'string',
				selector: 'code',
				source: 'attribute',
				attribute: 'lang',
			},
			lineNumbers: {
				type: 'boolean',
				default: false,
			},
		},
		edit( { attributes, setAttributes, className } ) {
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody>
							<ToggleControl
								label={ __( 'Show Line Numbers' ) }
								checked={ !! attributes.lineNumbers }
								onChange={ () => setAttributes( { lineNumbers: ! attributes.lineNumbers } ) }
							/>
							<SelectControl
								label="Language"
								value={ attributes.language }
								options={
									[ { label: __( 'Select Code Language' ), value: '' } ].concat(
										Object.keys( LANGS ).map( ( lang ) => (
											{ label: LANGS[ lang ], value: lang }
										) ) )
								}
								onChange={ ( language ) => setAttributes( { language } ) }
							/>
						</PanelBody>
					</InspectorControls>

					<div className={ className }>
						<PlainText
							value={ attributes.content }
							onChange={ ( content ) => setAttributes( { content } ) }
							placeholder={ __( 'Write code…' ) }
							aria-label={ __( 'Code' ) }
						/>
					</div>
				</Fragment>
			);
		},
		save( { attributes } ) {
			const customClass = classnames( {
				'line-numbers': attributes.lineNumbers,
				[ `language-${ attributes.language }` ]: attributes.language,
			} );

			return (
				<pre><code lang={ attributes.language } className={ customClass }>{ attributes.content }</code></pre>
			);
		},
	};

	return newCodeBlockSettings;
};

addFilter( 'blocks.registerBlockType', 'sgb/code', addSyntaxToCodeBlock );
