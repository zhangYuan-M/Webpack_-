/**
 * 	生成环境下自动压缩JS代码 和 HTML代码
 * 	mode: 'production'
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					// 预设：指示babel做怎么样的兼容性处理
					presets: [
						[
							'@babel/preset-env',
							{
								// 按需加载
								useBuiltIns: 'usage',
								// 指定core-js版本
								corejs: {
									version: 3
								},
								// 指定兼容性做到哪个版本浏览器
								targets: {
									chrome: '60',
									firefox: '60',
									ie: '9',
									safari: '10',
									edge: '17'
								}
							}
						]
					]
				}
			}
		]
	},
	plugins: [
		// html模板输出
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// 压缩HTML代码
			minify: {
				// 空格压缩
				collapseWhitespace: true,
				// 移除注释
				removeComments: true
			}
		}),
		// css从 built.js 分包
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		}),
		// 压缩css
		new OptimizeCssAssetsWebpackPlugin()
	],
	// 生成环境下自动压缩JS代码 和 HTML代码
	mode: 'production'
}
