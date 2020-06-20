/**
 * 1. webpack默认不支持打包HTML文件
 *	1. 默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
 *  2. 默认是不开启压缩 html文件
 * 	3. 如果没有创建html文件，默认会创建一个空的index.html文件，里面只有初始化结构
 *  4. 开发环境不建议开启html压缩
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* $ npm i html-webpack-plugin -D */
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
		// 默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
		new HtmlWebpackPlugin({
			// 复制'./src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
			// 如果没有创建html文件，默认会创建一个空的index.html文件，里面只有初始化结构
			template: './src/index.html'
			// 开发环境不建议开启html压缩
			// minify: {
			// 	// 压缩空格
			// 	collapseWhitespace: true,
			// 	// 去除注释
			// 	removeComments: true
			// }
		})
	],
	mode: 'development'
}
