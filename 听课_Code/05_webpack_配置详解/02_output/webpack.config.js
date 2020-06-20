const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 1. output:
 * 	1. filename: 指定文件输出的（名称+目录）
 *
 * 	2. path: 指定所有文件输出的公共目录
 *
 * 	3. publicPath: 一般用于生产环境, 所有资源引入的路径前缀
 *
 *  4. chunkFilename: 非入口chunk文件 例: import('./src/count.js').then({default: a} => {console.log(a)})
 *
 * 	5. library: DDL功能，使用
 */
module.exports = {
	entry: './src/index.js',

	output: {
		filename: 'built_[name].js', // 指定文件输出的（名称+目录）
		path: resolve(__dirname, 'build'), // 指定所有文件输出的公共目录
		publicPath: '/', // 引入资源路径前缀
		chunkFilename: 'chunk_[name].js', // 非入口chunk的名称
		library: '[name]', // 整个库向外暴露的名称  例: built_[name].js向外暴露的名称
		libraryTarget: 'global', // 名称添加到window全局变量上
		libraryTarget: 'commonjs' // 导出的规范 例: export
	},

	plugins: [new HtmlWebpackPlugin()],

	mode: 'development'
}
