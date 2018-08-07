const pkg = require( './package.json' );
const project = pkg.name;
const title = pkg.title;

const buildZipDestination = './build/';
const buildFiles = [
	'./**',
	'!build',
	'!build/**',
	'!node_modules/**',
	'!*.json',
	'!*.map',
	'!*.xml',
	'!*.log',
	'!*.gitignore',
	'!webpack.config.js',
	'!gulpfile.js',
	'!yarn.lock',
	'!package.lock',
	'!./src/blocks/**/*.js',
	'!./settings/**/*.js',
	'!./**/*.scss',
	'!./src/*.js',
	'!./src/components/**/*.js',
	'!./src/components/**/*.yml',
];

const cleanFiles = [
	`./build/${ project }/`,
	`./build/${ project }.zip`,
];

const buildDestination = `./build/${ project }/`;

const gulp = require( 'gulp' );
const wppot = require( 'gulp-wp-pot' );

const del = require( 'del' );
const notify = require( 'gulp-notify' );
const zip = require( 'gulp-zip' );
const copy = require( 'gulp-copy' );
const cache = require( 'gulp-cache' );
const replace = require( 'gulp-replace-task' );
const run = require( 'gulp-run-command' ).default;
const sort = require( 'gulp-sort' );

gulp.task( 'clearCache', ( done ) => {
	cache.clearAll();
	done();
} );

gulp.task( 'blocksBuild', run( 'npm run build' ) );
gulp.task( 'settingsBuild', run( 'npm run localBuild' ) );
gulp.task( 'translateJS', run( 'npx pot-to-php ./languages/sgb.pot ./languages/js-strings.php sgb' ) );

gulp.task( 'clean', () => {
	return del( cleanFiles );
} );

gulp.task( 'copy', () => {
	return gulp.src( buildFiles )
		.pipe( copy( buildDestination ) );
} );

gulp.task( 'processRelease', ( done ) => {
	done();
} );

gulp.task( 'updateVersion', () => {
	return gulp.src( './*.php' )
		.pipe( replace( {
			patterns: [
				{
					match: /(\d+\.+\d+\.+\d)/,
					replacement: pkg.version,
				},
			],
			usePrefix: false,
		} ) )
		.pipe( gulp.dest( './' ) );
} );

gulp.task( 'zip', () => {
	return gulp.src( `${ buildDestination }/**`, { base: 'build' } )
		.pipe( zip( `${ project }.zip` ) )
		.pipe( gulp.dest( buildZipDestination ) );
} );

gulp.task( 'build-notice', () => {
	return gulp.src( './' )
		.pipe( notify( {
			message: `Your build of ${ title } is complete.`,
			onLast: false,
		} ) );
} );

gulp.task( 'build-process', gulp.series( 'clearCache', 'clean', 'blocksBuild', 'settingsBuild', 'updateVersion', 'copy', 'zip', ( done ) => {
	done();
} ) );

gulp.task( 'build', gulp.series( 'build-process', 'build-notice', ( done ) => {
	done();
} ) );

// TODO: Add task for localization.
gulp.task( 'translate', gulp.series( 'clean', 'translateJS', () => {
	return gulp.src( [
		'./**/*.php',
		'./**/*.js',
		'!src/assets/**',
		'!node_modules/**',
	] )
		.pipe( sort() )
		.pipe( wppot( {
			domain: pkg.textDomain,
			package: pkg.title,
			bugReport: 'https://codestag.com/contact/',
			lastTranslator: 'Codestag',
			team: 'Codestag',
		} ) )
		.pipe( gulp.dest( './languages/sgb.pot' ) )
		.pipe( notify( {
			message: 'Task translate complete!',
			onLast: true,
		} ) );
} ) );
