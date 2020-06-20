/*  babel-loader @babel/preset-env @babel/core babel  
  
			js兼容性处理：babel-loader @babel/core
				1. 基本js兼容性处理 --> @babel/preset-env
					问题：只能转换基本语法，如promise高级语法不能转换

				2. 全部js兼容性处理 --> @babel/polyfill  
					问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~

				3. 需要做兼容性处理的就做：按需加载  --> core-js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

/* npm install --save-dev babel-loader @babel/core @babel/preset-env  core-js */
// 测试过程安装的包
/* npm i -D @babel/polyfill */
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
			template: './src/index.html'
		}),
		// css从 built.js 分包
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		}),
		// 压缩css
		new OptimizeCssAssetsWebpackPlugin()
	],
	mode: 'development'
}
