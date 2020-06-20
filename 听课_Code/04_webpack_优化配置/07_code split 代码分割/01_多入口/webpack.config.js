const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 *  1、 多入口打包文件
 * 		entry: {
 *      bar: './src/bar.js',
 * 			foo: './src/foo.js'
 *    }
 */

module.exports = {
	// 单入口
	// entry: './src/js/index.js',
	entry: {
		// 多入口：有一个入口，最终输出就有 多 个bundle ??
		index: './src/js/index.js',
		test: './src/js/test.js',
		foo: './src/js/foo.js'
	},
	output: {
		// [name]：取文件名 entry 多入口的 key
		filename: 'js/[name].[contenthash:10].js',
		path: resolve(__dirname, 'build')
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
			// 会被 mode='production'替代吗
			// minify: {
			// 	collapseWhitespace: true,
			// 	removeComments: true
			// }
		})
	],
	mode: 'production' // 会压缩 HTML代码
}
