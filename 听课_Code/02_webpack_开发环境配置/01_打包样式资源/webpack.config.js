/**
 * 1. webpack.config.js  webpack的配置文件
 *   作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
 *
 * 2. 所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
 */

const { resolve } = require('path') // node核心模块, 拼接路径

// webpack配置对象向外暴露一个对象
/* $ npm i style-loader css-loader less-loader less -D */
module.exports = {
	// 1. 入口文件
	entry: './src/index.js',

	// 2. 输出配置对象
	output: {
		filename: 'built.js', // 输出文件名
		path: resolve(__dirname, 'build') // 代表当前文件的目录绝对路径, 动态的
	},

	// 3. loader 配置
	module: {
		// 详细的loader配置，指定不同文件类型的解析规则
		rules: [
			{
				// 匹配文件类型规则
				test: /\.css$/,
				// use的解析顺序，从下到上，从右到左
				use: [
					// 将用css编译过的js字符串添加到 <style></style>中
					'style-loader',
					// 将css文件变成commonjs模块加载js中，里面内容是样式字符串
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				// use的解析顺序，从下到上，从右到左
				use: [
					// 将用css编译过的js字符串添加到 <style></style>中
					'style-loader',
					// 将css文件变成commonjs模块加载js中，里面内容是样式字符串
					'css-loader',
					// 将less文件编译为 css文件
					'less-loader'
				]
			}
		]
	},

	// 4. plugins的配置
	plugins: [
		// 详细plugins的配置
	],

	// 5. 模式 --  productin
	mode: 'development' // 开发模式
}
