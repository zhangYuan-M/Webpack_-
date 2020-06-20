/**
 * 开发环境基本配置，为了能让代码跑起来，调试友好
 * $ webpack  输出
 * $ npx webpack-dev-server 不输出，开启（热更新）自动化服务器
 */

// 动态拼接路径
const { resolve } = require('path')
// 解析html的webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* $ npm i style-loader css-loader less-loader less url-loader file-loader html-loader -D */
/* $ npm i html-webpack-plugin -D */
module.exports = {
	// 1.入口文件
	entry: './src/index.js',

	// 2.输出文件配置对象
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},

	// 3. loader解析对象
	module: {
		rules: [
			// 1) 解析less文件
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			// 2) 解析css文件
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// 3) 解析css文件中的图片资源   url-loader依赖于file-loader
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					name: '[hash:10].[ext]',
					esModule: false, // 支持：解决html-loader图片是commonjs打包
					outputPath: 'img'
				}
			},
			// 4) 解析html文件中的img标签
			{
				test: /\.html/,
				loader: 'html-loader'
			},
			// 5) 解析其他文件，包括字体图标。
			{
				exclude: /\.(html|js|css|less|png|jpg|gif)/,
				loader: 'file-loader',
				options: {
					outputPath: 'media',
					name: '[hash:10].[ext]' // 文件名截取哈希值的前十位
				}
			}
		]
	},
	// 4. 插件配置
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	// 5, 运行环境配置
	mode: 'development',

	// 开启本地自动化服务，在内存中编译，不会有任何输出
	devServer: {
		contentBase: resolve(__dirname, 'build'), // 静态资源目录
		compress: true, // gzip压缩
		port: 3000, // 端口号
		open: true // 自动打开浏览器
	}
}
