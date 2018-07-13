/* global fetch, _stagBlocks, localStorage */

const getCircularReplacer = () => {
	const seen = new WeakSet;
	return ( key, value ) => {
		if ( typeof value === 'object' && value !== null ) {
			if ( seen.has( value ) ) {
				return;
			}
			seen.add( value );
		}
		return value;
	};
};

window.onload = () => {
	const blocks = wp.blocks.getBlockTypes();
	const formattedBlocks = JSON.stringify( blocks, getCircularReplacer() );

	const hours = 24; // Reset when storage is more than 24hours
	const now = new Date().getTime();
	const stagBlocksSyncTime = localStorage.getItem( 'stagBlocksSyncTime' );

	if ( ! blocks.length ) {
		console.warn( 'No blocks found, bailing' ); // eslint-disable-line
		return;
	}

	if ( now - stagBlocksSyncTime > hours * 60 * 60 * 1000 ) {
		( async function syncBlocks() {
			console.group( 'Stag Blocks' ); // eslint-disable-line
			console.info( 'Syncing blocks data.' ); // eslint-disable-line

			await fetch( `${ _stagBlocks.root }stag_blocks/v1/blocks`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: formattedBlocks,
			} );

			localStorage.setItem( 'stagBlocksSyncTime', now );

			console.info( 'Blocks data synced.' ); // eslint-disable-line
			console.groupEnd(); // eslint-disable-line
		}() );
	} else {
		console.log( 'Block data up to date with Stag Blocks' ); // eslint-disable-line
	}
};