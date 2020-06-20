const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				/**
				 * browserlist: {
				 *   development: [
				 *     'last 1 chrome version',
				 *     'last 1 firefox version'
				 *   ]},
				 *   production: [
				 *     '> 0.2%',
				 *     'not dead'
				 *     'not op_mini all']
				 */
				test: /\.css/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						publicPath: '../'
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [require('postcss-preset-env')]
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage',
								corejs: { version: 3 },
								targets: {
									chrom: '60',
									firefox: '50'
								}
							}
						]
					]
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					name: '[hash:10].[ext]',
					outputPath: 'img',
					esModule: false
				}
			},
			{
				test: /\.html$/,
				loader: 'file-loader',
				options: {
					outputPath: 'media',
					name: '[hash:10].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		}),
		new OptimizeCssAssetsPlugin({})
	],
	mode: 'production'
}
