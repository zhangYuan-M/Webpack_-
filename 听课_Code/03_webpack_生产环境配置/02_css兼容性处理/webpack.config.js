/**
 * 1. 生产环境和开发环境下的css兼容性处理
 * 	  1. 使用：
 * 			1.post-loader post-preset-env
 * 			2. 修改package.json
 *		     帮 postcss找到 package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
 *			  "browserslist": {
 *				 // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
 *				 "development": [
 *				 	 "last 1 chrome version",
 *				 	 "last 1 firefox version",
 *					 "last 1 safari version"
 *			  	],
 *			  	// 生产环境：默认是看生产环境
 *				 "production": [
 *				 	  ">0.2%",
 *					  "not dead",
 *					  "not op_mini all"
 *				  ]
 *			  }
 * 		2. 默认是处理生产环境的兼容性
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

/* $ npm i postcss-loader postcss-preset-env -D */
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					// 使用loader的默认配置
					// 'postcss-loader',
					// 修改loader的配置
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								// postcss的插件
								require('postcss-preset-env')()
							]
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		})
	],
	mode: 'development'
}
