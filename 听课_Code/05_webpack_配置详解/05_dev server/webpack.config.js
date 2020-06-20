const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * 1. devServer:
 * 		1. contentBase: 静态资源部署目录
 * 		2. watchContentBase:
 * 				观看该devServer.contentBase选项提供的文件。默认情况下禁用。启用后，文件更改将触发整个页面重新加载。
 *    3. watchOptions: 监视目录的选择配置
 *    4. compress: 启动 gzip压缩
 *      5. clientLogLevel: 'none' : 不要显示启动服务器的日志信息
 *      6、quiet: true  除了一些基本详细，其他内容不要显示
 * 	  	7、overlay: flase如果出错不要全屏提示
 *    8、proxy: 代理服务器，解决前端跨域问题
 * 				target: '目标主机‘
 * 				pathRewrite: 路径重写
 */
module.exports = {
	// 自动服务器
	devServer: {
		// 代码运行的目录
		contentBase: resolve(__dirname, 'build'),
		// 监视 contentBase目录下的文件变化，一旦变化 reload
		watchContetnBase: true,
		// 监视目录配置,
		watchOptions: {
			// 忽略node_modules目录 变化
			ignore: /node_modules/
		},
		// 端口号
		port: 5000,
		// 热更新 HMR
		hot: true,
		// 主机名
		host: 'localhost',
		// 启动gzip压缩
		compress: true,
		// 不要显示启动服务器日志信息
		clientLogLevel: 'none',
		// 除了一些基本启动信息以外，其他内容都不要显示
		quiet: true,
		// 如果出错了，不要全屏提示~
		overlay: false,
		// 服务器代理，解决开发环境下跨域问题
		proxy: {
			// 开发调试环境下，一旦接受到 /api/xxx 的请求，就会转发到服务器（3000）
			'/api': {
				// 不同主机不存在跨域问题吗？？？
				target: 'http://localhost:3000',
				// 转发的路径重写，不用再修改后台服务器了  去掉 /api
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
