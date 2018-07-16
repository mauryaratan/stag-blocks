const { __ } = wp.i18n;
const { Fragment } = wp.element;

import BackgroundPositionControl from '../../components/background-position';

const {
	PanelBody,
	RangeControl,
} = wp.components;

const {
	InspectorControls,
	PanelColor,
} = wp.editor;

const Controls = ( props ) => {
	const { attributes, setAttributes } = props;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody>
					<BackgroundPositionControl
						label={ __( 'Content position' ) }
						value={ attributes.alignment }
						onChange={ ( alignment ) => setAttributes( { alignment } ) }
					/>

					<RangeControl
						label={ __( 'Background Opacity' ) }
						initialPosition={ attributes.backgroundOpacity }
						value={ attributes.backgroundOpacity || '' }
						min={ 1 }
						max={ 100 }
						onChange={ ( opacity ) => setAttributes( { backgroundOpacity: opacity } ) }
						beforeIcon="visibility"
					/>
				</PanelBody>

				<PanelColor
					title={ __( 'Text Color' ) }
					initialOpen={ false }
					colorValue={ attributes.color }
					onChange={ ( color ) => setAttributes( { color } ) }
				/>
				<PanelColor
					title={ __( 'Background Color' ) }
					initialOpen={ false }
					colorValue={ attributes.backgroundColor }
					onChange={ ( backgroundColor ) => setAttributes( { backgroundColor } ) }
				/>
				<PanelColor
					title={ __( 'Button Color' ) }
					initialOpen={ false }
					colorValue={ attributes.buttonColor }
					onChange={ ( buttonColor ) => setAttributes( { buttonColor } ) }
				/>
				<PanelColor
					title={ __( 'Button Background Color' ) }
					initialOpen={ false }
					colorValue={ attributes.buttonBackground }
					onChange={ ( buttonBackground ) => setAttributes( { buttonBackground } ) }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
