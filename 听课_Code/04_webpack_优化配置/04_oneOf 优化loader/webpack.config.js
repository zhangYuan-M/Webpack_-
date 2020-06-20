/**
 * oneOf : 优化生产环境 打包构建速度
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// // 处理css兼容性问题的postcss-loader, browserlist的哪个环境
// process.env.NODE_ENV = 'production'

// less和css的兼容性处理
const handleStyle = [
	{
		loader: MiniCssExtractPlugin.loader,
		// 配置公共路径，确保css中的图片路径没有问题
		options: {
			publicPath: '../' // 图片前缀
		}
	},
	'css-loader',
	// 还要在package.json中指定兼容范围
	{
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			plugins: () => [require('postcss-preset-env')()]
		}
	}
]
// 如果一个文件有多个loader一定要考虑顺序，
module.exports = {
	// 1. 入口文件
	entry: './src/index.js',
	// 2. 输出配置
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	// 3. loader 配置对象
	module: {
		rules: [
			// 3) js语法检查 eslint
			// 和js兼容性的loader冲突，放在外面。
			{
				// 在 pageage.json中的 eslintConfig: { "extends: airbnb" }
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				enforce: 'pre', // 优先执行于其他loader
				options: {
					fix: true // 自动修复
				}
			},
			// OneOf
			// OneOf一种类型的文件只会选择一个loader执行
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
							]
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
			// ???
			minify: false
			// minify: {
			// 	// 压缩空格
			// 	// collapseWhitespace: true,
			// 	// 去除注释
			// 	// removeComments: true
			// }
		}),
		// css 从 built.js中分包处理
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		}),
		// 压缩css代码
		new OptimizeCssAssetsPlugin({})
	],
	// 5. 模式
	mode: 'production' // 压缩 js代码
}
