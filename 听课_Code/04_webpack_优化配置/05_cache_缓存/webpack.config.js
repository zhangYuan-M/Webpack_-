const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
/**
 * 缓存: (node构建本地服务器调试查看)
 * 	1. babel 缓存 --> 让第二次构建速度更快
 * 	  cacheDirectory: true
 *	  如果请求的资源有在本地缓存过不会再向服务器请求的，在资源名称没有变化的情况下
 *
 * 	2. 文件资源缓存  --> 服务上线后体验更友好。
 * 		hash: 每次webpack构建的时候都会生成一个唯一 hash
 * 			问题: css和 js生成的hash都是同一个, 一旦重新打包, (可能只改动js文件)两个都同时缓存失效、
 *
 * 		chunkhash: 根据 chunk生成的 hash, 如果来自同一个chunk，hash值一样
 * 			问题: css和 js生成的hash都是同一个chunk, 名称还是一样的
 *
 * 		contenthash: 根据文件内容生成的 hash, 如果文件内容不一样，hash值一定不一样
 * 			最终解决: 修改css文件不会影响js文件
 */

const handleStyle = [
	{
		loader: MiniCssExtractPlugin.loader,
		// 配置公共路径，确保css中的图片路径没有问题
		options: {
			publicPath: '../' // 图片前缀
		}
	},
	'css-loader',
	{
		loader: 'postcss-loader', // 还要在package.json中指定兼容范围
		options: {
			ident: 'postcss',
			plugins: () => [require('postcss-preset-env')()]
		}
	}
]
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.[contenthash:10].js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				oneOf: [
					// 1) css + 兼容性处理
					{
						test: /\.css$/,
						// use: ['style-loader', 'css-loader']  css和js混合 <style></style>
						use: [...handleStyle]
					},
					// 2) less + 兼容性处理
					{
						test: /\.less$/,
						// 1. less-loader 处理less文件为css文件
						// 2. postcss-loader 对css文件进行兼容性处理
						// 3. css-loader 把css文件打包到build.js中
						// 4. mini-css-extract-plugin 把build.js中的css文件分包
						use: [...handleStyle, 'less-loader']
					},
					// 4) js语法兼容性处理
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage',
										corejs: { version: 3 },
										targets: {
											chrome: '60',
											firefox: '50'
										}
									}
								]
							],
							// 开启缓存, 提高第二次构建速度
							cacheDirectory: true
						}
					},
					// 5) 图片处理
					{
						test: /\.(png|jpg|gif)$/,
						loader: 'url-loader',
						options: {
							limit: 8 * 1024,
							name: '[contenthash:10].[ext]',
							// 图片输出路径 /build/img
							outputPath: 'img',
							esModule: false
						}
					},
					// 6) html中的图片问题
					{
						test: /\.html$/,
						loader: 'html-loader'
					},
					// 7) 其他资源处理
					{
						exclude: /\.(js|less|css|jpg|png|gif|html)$/,
						loader: 'file-loader',
						options: {
							outputPath: 'media',
							name: '[hash:10].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		// 生成模板
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: false
		}),
		// css 从 built.js中分包处理
		new MiniCssExtractPlugin({
			filename: 'css/built.[contenthash:10].css'
		}),
		// 压缩css代码
		new OptimizeCssAssetsPlugin()
	],
	mode: 'production' // 压缩 js代码
}
