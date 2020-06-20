// 动态拼接路径
const { resolve } = require('path')
// 解析html的webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	// 1.入口文件
	entry: ['./src/index.js', './src/index.html'],

	// 2.输出文件配置对象
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},

	// 3. loader解析对象
	module: {
		rules: [
			// 1) 解析less文件
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			// 2) 解析css文件
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			// 3) 解析css文件中的图片资源   url-loader依赖于file-loader
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 8 * 1024,
					name: '[hash:10].[ext]',
					esModule: false, // 支持：解决html-loader图片是commonjs打包
					outputPath: 'img'
				}
			},
			// 4) 解析html文件中的img标签
			{
				test: /\.html/,
				loader: 'html-loader'
			},
			// 5) 解析其他文件，包括字体图标。
			{
				exclude: /\.(html|js|css|less|png|jpg|gif)/,
				loader: 'file-loader',
				options: {
					outputPath: 'media',
					name: '[hash:10].[ext]' // 文件名截取哈希值的前十位
				}
			}
		]
	},

	// 4. 插件配置
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],

	// 5, 运行环境配置
	mode: 'development',

	// 代码映射
	/**
	 * dev-tool : 选择一种源映射样式，以增强调试过程。这些值会极大地影响构建和重建速度
	 *		eval: 精确错误源码位置, 但是不能点击进入 不生成文件
	 *    source-map:  精确行定位错误,但是不能点击进入,  生成 map文件
	 * 		hidden-source-map: 不能定位源码, 不能点击进入,  生成 map文件
	 * 		inline-source-map: 精确错误源码位置, 但是不能点击进入, 生成 map文件
	 * 		* eval-source-map *: 精确错误源码位置, 能点击进入, 不生成文件 支持断点
	 * 		cheap-source-map: 精确错误源码位置(行), 能点击进入, 生成文件
	 * 		cheap-module-source-map: 精确错误源码位置(行), 能点击进入, 生成文件  支持 babel 这种预编译工具
	 *
	 * 	生成 map文件的体积会比较小
	 */
	devtool: 'eval-source-map'
}
