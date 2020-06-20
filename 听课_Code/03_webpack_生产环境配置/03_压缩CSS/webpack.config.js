/**
 * 压缩生产环境下的css代码
 *   安装 optimize-css-assets-webpack-plugin
 *   在plugin 数组中new调用即可
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

// npm i -D optimize-css-assets-webpack-plugin
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					// 使用loader的默认配置
					// 'postcss-loader',
					// 修改loader的配置
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								// postcss的插件
								require('postcss-preset-env')()
							]
						}
					}
				]
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
		new OptimizeCssAssetsWebpackPlugin()
	],
	mode: 'production'
}
