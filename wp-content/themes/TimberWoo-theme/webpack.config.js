'use strict';

const path = require('path')
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		app: "./js/app.js"
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js'
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorPluginOptions: {
					preset: ['default', { discardComments: { removeAll: true } }],
				},       
			})
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true
				},
			}
		}
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
			use: [
			{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: [
					[ "@babel/preset-env" ]
					],
					plugins: ['@babel/plugin-syntax-dynamic-import']
				},
			}
			],
		},
		{
			test: /\.scss$/,
			use: [
			MiniCssExtractPlugin.loader,
			{ 
				loader: 'css-loader', 
				options: { 
					importLoaders: 1 
				}
			},
			{
				loader: 'sass-loader'
			}
			],
		},
		{
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=1000&name=[name]-[hash].[ext]'
		}
		],
	},
	externals: {
		'TweenMax': 'TweenMax'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "app.bundle.css"
		}),
	],
};