/**
 * 1. devSerser
 * 		自动化构建服务器工具
 *    启动指令:  npx webpack-dev-server
 *    不会有输出 build文件夹 等
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
	mode: 'development',

	// 开发服务器 devServer , 只会在内存中编译打包不会有任何输出到本地
	// 不会有输出 build文件夹 等
	// 启动指令:  npx webpack-dev-server
	devServer: {
		contentBase: resolve(__dirname, 'build'),
		// 启动gzip压缩
		compress: true,
		// 端口号
		port: 3000,
		// 自动打开浏览器, 系统默认浏览器
		open: true
	}
}
