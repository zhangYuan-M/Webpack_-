const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

/*
  thread-loader
*/

const commonCssLoader = [
	MiniCssExtractPlugin.loader,
	'css-loader',
	{
		// 还需要在package.json中定义browserslist
		loader: 'postcss-loader',
		options: {
			ident: 'postcss',
			plugins: () => [require('postcss-preset-env')()]
		}
	}
]

// npm i thread-loader -D
module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'js/built.[contenthash:10].js',
		path: resolve(__dirname, 'build')
	},
	module: {
		rules: [
			{
				// 以下loader只会匹配一个
				// 注意：不能有两个配置处理同一种类型文件
				oneOf: [
					{
						test: /\.css$/,
						use: [...commonCssLoader]
					},
					{
						test: /\.less$/,
						use: [...commonCssLoader, 'less-loader']
					},
					/*
            正常来讲，一个文件只能被一个loader处理。
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
              先执行eslint 在执行babel
          */
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: [
							// 多进程打包
							// 进程启动大概 600ms 进程通信也有开销
							// 建议只有在工作消耗比较大，才使用
							{
								loader: 'thread-loader',
								options: {
									// worker: 2 //
								}
							},
							{
								loader: 'babel-loader',
								options: {
									presets: [
										[
											'@babel/preset-env',
											{
												useBuiltIns: 'usage',
												corejs: { version: 3 },
												targets: {
													chrome: '60',
													firefox: '50'
												}
											}
										]
									],
									// 开启babel缓存
									// 第二次构建时，会读取之前的缓存
									cacheDirectory: true
								}
							}
						]
					},
					{
						test: /\.(jpg|png|gif)/,
						loader: 'url-loader',
						options: {
							limit: 8 * 1024,
							name: '[hash:10].[ext]',
							outputPath: 'imgs',
							esModule: false
						}
					},
					{
						test: /\.html$/,
						loader: 'html-loader'
					},
					{
						exclude: /\.(js|css|less|html|jpg|png|gif)/,
						loader: 'file-loader',
						options: {
							outputPath: 'media'
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/built.[contenthash:10].css'
		}),
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true
			}
		}),
		new WorkboxWebpackPlugin.GenerateSW({
			/*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件~
      */
			clientsClaim: true,
			skipWaiting: true
		})
	],
	mode: 'production',
	devtool: 'source-map'
}
