/**
 * 生产环境
 * 	mode: 'production'
 * 	  1. 自动压缩 html代码
 *    2. 自动压缩 js代码
 *
 */
// 动态拼接路径
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解析html的webpack插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //  简单从built.js中分离 css，不压缩

/* $ npm i mini-css-extract-plugin -D */
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
			// 2) 解析css文件
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// 公共路径是在全部图片前面添加一个路径
							publicPath: '../'
						}
					},
					'css-loader'
				]
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
			}
		]
	},
	// 4. 插件配置
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		// css 简单从built.js中分离，不压缩
		new MiniCssExtractPlugin({ filename: 'css/built.css' })
	],
	// 5, 运行环境配置
	mode: 'development'
}
