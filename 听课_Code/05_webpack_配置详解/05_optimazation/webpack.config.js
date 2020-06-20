const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
/**
 *  optimization: 一些优化配置
 * 	  1. splitChunks: {chunks: 'all' }
 *    2. runtimeChunk: {name: e => e + 'name'}  将当前模块的记录其他模块的hash单独打包为一个文件 runtime
 *    3. minimizer: 新的压缩方案
 */
module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all'
			// 默认值，可以不写~
			/* minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSiza: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }*/
		},
		// 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
		// 解决：修改a文件导致b文件的contenthash变化
		runtimeChunk: {
			// 生成一个提供映射的文件
			// 非import导入的js模块也不会因为自己变化重新打包main_chunk.js
			name: entrypoint => `runtime_${entrypoint.name}`
		},
		minimizer: [
			// 配置生产环境的压缩方案：js和css
			new TerserWebpackPlugin({
				// 开启缓存
				cache: true,
				// 开启多进程打包
				parallel: true,
				// 启动source-map
				sourceMap: true
			})
		]
	}
}
