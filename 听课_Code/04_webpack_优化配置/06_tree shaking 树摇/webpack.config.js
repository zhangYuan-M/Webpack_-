const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/**
 *  tree shaking
 * 		1. 使用es6 模块化
 * 		2. 开启生产环境
 *    3. 在 package.json中配置
 *     	"sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
 *      	 问题：可能会把css / @babel/polyfill （副作用）文件干掉
 *     	   解决："sideEffects": ["*.css", "*.less"]
 */
// 处理css兼容性问题的postcss-loader, browserlist的哪个环境
process.env.NODE_ENV = 'production'

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
							name: '[hash:10].[ext]',
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
	// 4. 插件的配置数组
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
	// 5. 模式
	mode: 'production' // 压缩 js代码
}
