/* global localStorage */

const { apiFetch } = wp;
const { dispatch } = wp.data;

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

			apiFetch( {
				path: 'stag_blocks/v1/blocks',
				method: 'POST',
				body: formattedBlocks,
				headers: {
					'Content-Type': 'application/json',
				},
			} ).then( () => {
				apiFetch( { path: 'stag_blocks/v1/settings' } ).then( ( prevBlocks ) => {
					const inactiveBlocks = Object.keys( prevBlocks ).filter( ( block ) => {
						return ! prevBlocks[ block ];
					} );

					inactiveBlocks.map( ( block ) => {
						wp.blocks.unregisterBlockType( block );
					} );
				} );
			} );

			localStorage.setItem( 'stagBlocksSyncTime', now );

			// Show notice if it exists.
			SGBNotice();

			console.info( 'Blocks data synced.' ); // eslint-disable-line
			console.groupEnd(); // eslint-disable-line
		}() );
	} else {
		console.log( 'Block data up to date with Stag Blocks' ); // eslint-disable-line
	}
};

const SGBNotice = () => {
	const params = window.location.search;
	const searchParams = new URLSearchParams( params );
	const hasNotice = searchParams.get( 'sgb_notice' );

	if ( hasNotice ) {
		const settingsURL = _stagBlocks.settingsURL.replace( '#settings', '' );

		const NoticeContent = (
			<p>Stag Blocks data synced. You may now visit and configure <a href={ settingsURL }>settings</a> page.</p>
		);

		dispatch( 'core/editor' ).createInfoNotice( NoticeContent, {
			spokenMessage: 'Stag Blocks data synced.',
		} );
	}
};
