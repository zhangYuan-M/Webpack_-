const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * module:
 * 	1. oneOf: 提高打包构建速度
 *  2. enforce: 'pre'提前所有loader执行 。'post'延迟执行
 *  3. rules: [{test: /.xxx$/, use: ['yyy-loader', 'zzz-loader']}]
 *  4. rules: [{test: /.xxx$/, {loader: 'xxx-loader', options: {} }}]
 */
module.exports = {
	entry: './src/index.js',

	output: {
		filename: 'built.[name].js', // 指定文件输出的（名称+目录）
		path: resolve(__dirname, 'build'), // 指定所有文件输出的公共目录
		publicPath: '/', // 引入资源路径前缀
		chunkFilename: '[name]_chunk.js', // 非入口chunk的名称
		library: '[name]', // 整个库向外暴露的名称
		libraryTarget: 'global', // 名称添加到window全局变量上
		libraryTarget: 'commonjs' // 导出的规范 export
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				include: resolve(__dirname, 'src'),
				options: {},
				enforce: 'pre' // post: 推迟
			},
			{
				oneOf: [
					{
						//...
					}
				]
			}
		]
	},

	plugins: [new HtmlWebpackPlugin()],
	mode: 'development'
}
