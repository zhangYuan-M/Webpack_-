const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 1. entry:
 *  1. string
 *    指定一个js文件作为入口，所有文件形成一个bundle文件
 *    [name]文件名称 默认是 main
 *  2. array
 *    多入口，引入多个文件，只会形成一个bundle文件 一个chunk
 *    用途：在 hmr不能热更新 HTML文件的时候。考虑采用
 *  3. object
 *    多入口，有几个入口文件，就形成几个chunk，输出的也有几个bunddle
 *    用途: 代码分割
 *  4. object + array
 *    在 dll 模式中
 *    用途：例如: vue: ['vue','vue-router','axios']
 */
module.exports = {
	/* 1. string */
	entry: './src/index.js',

	/* 2. array */
	entry: ['./src/index.js', './src/add.js'],

	/* 3. object */
	entry: {
		index: './src/index.js',
		add: './src/add.js'
	},

	/* 4. object + array */
	entry: {
		index: ['./src/index.js', './src/count.js'],
		add: './src/add.js'
	},

	output: {
		filename: 'built.[name].js',
		path: resolve(__dirname, 'build')
	},
	plugins: [new HtmlWebpackPlugin()],
	mode: 'development'
}
