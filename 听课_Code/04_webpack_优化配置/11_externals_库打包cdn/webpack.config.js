const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	mode: 'production',
	externals: {
		// jQuery大写，在这里配置忽略打包到静态资源目录，在html文件中srcipt引入cdn
		jquery: 'jQuery'
	}
}
