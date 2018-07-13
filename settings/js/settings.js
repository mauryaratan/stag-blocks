/* global fetch, _stagBlocks */
( async function fetchBlocks() {
	const blocks = await( await fetch( `${ _stagBlocks.root }stag_blocks/v1/blocks` ) ).json();

	console.log( blocks );
}() );
