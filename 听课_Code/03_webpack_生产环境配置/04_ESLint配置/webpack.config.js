/**
 * eslint-loader配置
 * package.json 中 eslintConfig 中设置 ~
 *   "eslintConfig": {
 *      "extends": "airbnb-base"
 *    }
 *
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

/* npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import */
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
				loader: 'eslint-loader',
				exclude: /node_modules/,
				options: {
					// 自动修复eslint的错误
					fix: true
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
