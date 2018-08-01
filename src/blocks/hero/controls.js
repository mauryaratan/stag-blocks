const { __ } = wp.i18n;
const { Fragment } = wp.element;

import BackgroundPositionControl from '../../components/background-position';

const {
	PanelBody,
	RangeControl,
} = wp.components;

const {
	InspectorControls,
	PanelColorSettings,
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

				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: attributes.color,
							onChange: ( color ) => ( setAttributes( { color } ) ),
							label: __( 'Text Color' ),
						},
						{
							value: attributes.backgroundColor,
							onChange: ( backgroundColor ) => ( setAttributes( { backgroundColor } ) ),
							label: __( 'Background Color' ),
						},
						{
							value: attributes.buttonColor,
							onChange: ( buttonColor ) => ( setAttributes( { buttonColor } ) ),
							label: __( 'Button Color' ),
						},
						{
							value: attributes.buttonBackground,
							onChange: ( buttonBackground ) => ( setAttributes( { buttonBackground } ) ),
							label: __( 'Button Background Color' ),
						},
					] }
				/>
			</InspectorControls>
		</Fragment>
	);
};

export default Controls;
