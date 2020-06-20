const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// import(/* webpackChunkName: 'test' */ './test').then(
// 	({ mul, count }) => {
// 		console.log(mul)
// 	},
// 	err => {
// 		console.log(err)
// 	}
// )

module.exports = {
	entry: './src/js/index.js',
	output: {
		// [name]：取文件名
		// 单入口的文件名 [name] === 'main'
		filename: 'js/[name].[contenthash:10].js',
		path: resolve(__dirname, 'build')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true
			}
		})
	],
	/*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		// 添加不同js文件的映射, 不会修改一个js文件重新打包所有js文件
		runtimeChunk: {
			name: entryName => `runtime_${entryName.name}`
		}
	},
	mode: 'production'
}
