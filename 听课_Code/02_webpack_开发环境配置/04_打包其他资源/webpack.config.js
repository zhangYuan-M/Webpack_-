/**
 * 1. 打包处理其他资源：如：字体图标
 * 	1. exclude: /\.(css|js|html|less)$/
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* $ npm i file-loader -D */
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// 打包其他资源(除了html/js/css资源以外的资源)
			{
				// 排除css/js/html资源
				exclude: /\.(css|js|html|less)$/,
				loader: 'file-loader',
				options: {
					name: '[hash:10].[ext]'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'development'
}
