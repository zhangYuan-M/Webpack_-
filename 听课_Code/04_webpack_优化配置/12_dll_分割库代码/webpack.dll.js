const { resolve } = require('path')
const webpack = require('webpack')

/**
 * 搭建忽略打包的配置
 */
module.exports = {
	entry: {
		_jquery: ['jquery'],
		_lodash: ['lodash']
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dll'),
		library: '[name]_[hash:10]' // 打包出去库代码中的 var [name]_[hash:10] = function(){...}
	},
	module: {
		rules: []
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]__[hash:10]', // manifest.json 中的库名称
			path: resolve(__dirname, 'dll/manifest.json') // 映射路径
		})
	],
	mode: 'production'
}
