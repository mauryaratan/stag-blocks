const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { PlainText, InspectorControls } = wp.editor;
const { SelectControl, PanelBody } = wp.components;
const { Fragment } = wp.element;

import './editor.scss';
import './style.scss';

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
		},
		edit( { attributes, setAttributes, className } ) {
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody>
							<SelectControl
								label="Language"
								value={ attributes.language }
								options={
									[ { label: __( 'Select code language' ), value: '' } ].concat(
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
			const customClass = ( attributes.language ) ? `language-${ attributes.language }` : '';

			return (
				<pre><code lang={ attributes.language } className={ customClass }>{ attributes.content }</code></pre>
			);
		},
	};

	return newCodeBlockSettings;
};

addFilter( 'blocks.registerBlockType', 'sgb/code', addSyntaxToCodeBlock );
