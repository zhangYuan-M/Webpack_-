/**
 * 1. 处理打包时候的图片资源问题
 *   1. css文件中的图片引用问题
 * 		 1. 图片大小小于 8KB (limit: 8 * 1024) 就把图片转化为 base64编码。
 * 		 2. 优点: 减少页面请求数量，减少服务器压力
 * 		 3. 缺点: 图片体积会更大，文件请求速度更慢
 * 		 4. options:{name: xxx} 图片重命名, 取哈希值前十位数 +原来的后缀名
 *
 *   2. html文件中img标签图片引用问题
 * 			1. 问题: 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
 * 						 解析时出问题:[object Module]
 * 		  2. 解决: esModule: false // 为了支持 html-loader中的 commonjs模块化导入
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* $ npm i file-loader url-loader html-loader -D */
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			// 1)处理css文件
			{
				test: /\.css$/,
				// 多个loader
				use: ['style-loader', 'css-loader']
			},
			// 2)处理图片资源 css
			{
				test: /\.(jpg|png|gif)$/,
				// 一个loader
				// 下载 url-loader和 file-loader
				loader: 'url-loader',
				options: {
					// 图片大小小于8KB就把图片base64编码。
					// 优点: 减少页面请求数量，减少服务器压力
					// 缺点: 图片体积会更大，文件请求速度更慢
					limit: 8 * 1024,
					outputPath: 'img',
					// 问题:因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
					// 解析时会出问题:[object Module]
					// 为了支持 html-loader中的 commonjs模块化导入
					esModule: false,
					// 图片重命名, 取哈希值前十位数 +原来的后缀名
					name: '[hash:10].[ext]',
					// 图片输出的路径 build/img 包括 html-loader 解析的图片
					outputPath: 'img'
				}
			},
			// 3) 处理HTML中的img标签的图片资源
			{
				test: /\.html$/,
				// 专门处理html文件的img图片，
				loader: 'html-loader'
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
