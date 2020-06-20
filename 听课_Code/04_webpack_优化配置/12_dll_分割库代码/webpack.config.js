const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: []
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		// 告诉webpack忽略那些文件
		new webpack.DllReferencePlugin({
			manifest: resolve(__dirname, 'dll/manifest.json')
		}),
		// 告诉webpack忽略那些文件之后，该去哪打包
		new AddAssetHtmlPlugin({
			filepath: resolve(__dirname, 'dll/_lodash.js')
		}),
		// 告诉webpack忽略那些文件之后，该去哪打包
		new AddAssetHtmlPlugin({
			filepath: resolve(__dirname, 'dll/_jquery.js')
		})
	],
	mode: 'development'
}
