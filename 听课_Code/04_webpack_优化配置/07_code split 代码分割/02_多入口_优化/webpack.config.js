const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * optimization
 */
module.exports = {
	// 单入口
	// entry: './src/js/index.js',
	entry: {
		// 多入口：有一个入口，最终输出就有一个 bundle
		index: './src/js/index.js',
		test: './src/js/test.js'
	},
	output: {
		// [name]：取文件名 entryd 多入口的 key
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
	mode: 'production',
	// 如果没有配置optimization 选项，默认在多入口中的每一次node_modules包都会被打包（重复打包）
	// 配置了optimization, 会自动寻找一样的包整合到一个文件中（多个文件也只会整合到一个js文件中）
	// 代码分割优化
	optimization: {
		// 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
		// 解决：修改a文件导致b文件的contenthash变化
		runtimeChunk: {
			// 生成一个提供映射的文件
			// 非import导入的js模块也不会因为自己变化重新打包main_chunk.js
			name: entrypoint => `runtime_${entrypoint.name}`
		},
		// node_modules代码不会被重复打包
		splitChunks: {
			chunks: 'all'
		}
	}
}
