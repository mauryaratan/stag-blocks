const { __ } = wp.i18n;

const LinkPreview = ( { attributes, className } ) => {
	return (
		<div className={ className }>
			{ attributes.image && (
				<figure className={ `${ className }__image` }>
					<img src={ attributes.image } alt={ attributes.title } />
				</figure>
			) }
			<a href={ attributes.url } className={ `${ className }__url` }>
				<span className="screen-reader-text">{ __( 'Link to' ) } { attributes.title }</span>
			</a>
			<div className={ `${ className }__content` }>
				<p className={ `${ className }__title` }>{ attributes.title }</p>
				<p className={ `${ className }__description` }>{ attributes.description }</p>
				<p className={ `${ className }__link` }>{ attributes.url }</p>
			</div>
		</div>
	);
};

export default LinkPreview;
