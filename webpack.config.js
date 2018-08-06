/**
 * External Dependencies
 */
const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );

// Enviornment Flag
const inProduction = 'production' === process.env.NODE_ENV;

// Block CSS loader
const cssExtractTextPlugin = new ExtractTextPlugin( {
	filename: 'dist/settings/settings.style.css',
} );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
	use: [
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				plugins: [ require( 'autoprefixer' ) ],
			},
		},
		{
			loader: 'sass-loader',
		},
	],
};

// Externals
const externals = {
	react: 'React',
	'react-dom': 'ReactDOM',
};

// WordPress dependences
const wpDependencies = [
	'components',
	'element',
	'blocks',,
	'utils',
	'i18n',
];

wpDependencies.forEach( wpDependency => {
	externals[ '@wordpress/' + wpDependency ] = {
		this: [ 'wp', wpDependency ],
	};
} );

// Webpack config.
const config = {
	entry: [
		'./settings/js/index.js',
		'./settings/css/style.scss',
	],
	externals,
	output: {
		filename: 'dist/settings/settings.build.js',
		path: __dirname,
		library: [ 'stag-blocks', '[name]' ],
		libraryTarget: 'this',
	},
	resolve: {
		modules: [ __dirname, 'node_modules' ],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /style\.s?css$/,
				use: cssExtractTextPlugin.extract( extractConfig ),
			},
			{
				test: /\.(png|jpeg)$/,
				use: [
					{ loader: 'url-loader' },
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin( [ 'build/settings' ] ),
		cssExtractTextPlugin,
		new WebpackRTLPlugin(),
	],
	stats: {
		children: false,
	},
};

// For Productions
if ( inProduction ) {
	config.plugins.push( new webpack.optimize.UglifyJsPlugin( { sourceMap: true } ) );
	config.plugins.push( new webpack.LoaderOptionsPlugin( { minimize: true } ) );
}

module.exports = config;
