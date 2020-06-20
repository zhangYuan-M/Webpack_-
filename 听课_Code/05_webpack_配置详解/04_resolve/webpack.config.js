const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * resolve: 模块解析规则
 *   1. alias: 路径起别名
 *   2. extensions: [] 后缀名选择忽略
 * 	 3. modules: [resolve(__dirname, '../../node_modules')]: node_modules准确路径
 */
module.exports = {
	entry: './src/index.js',
	module: {},
	plugins: [new HtmlWebpackPlugin()],
	mode: 'development',
	// 模块解析规则
	resolve: {
		alias: {
			// 解析模块路径的别名  $css === src/css
			$css: resolve(__dirname, 'src/css')
		},
		// 从前往后的顺序尝试给没有加后缀名的文件添加后缀名。
		// 默认是可以省略 .js .json
		extensions: ['.js', '.json', '.css'],
		// 告诉 webpack 解析模块是去找哪个目录,
		// 默认是向上一级目录查找，没有继续向上一级查找，性能较差
		modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
	}
}
