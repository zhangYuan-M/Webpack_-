const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 处理css兼容性问题的postcss-loader, browserlist的哪个环境
process.env.NODE_ENV = 'production'

// less和css的兼容性处理
/**
    "browserslist": {
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    },
  */
const handleStyle = [
	{
		loader: MiniCssExtractPlugin.loader,
		// 配置公共路径，确保css中的图片路径没有问题
		options: {
			publicPath: '../' // 图片路径前缀
		}
	},
	'css-loader',
	{
		loader: 'postcss-loader', // 还要在package.json中指定兼容范围
		options: {
			ident: 'postcss',
			plugins: () => [require('postcss-preset-env')()]
		}
	}
]
// 如果一个文件有多个loader一定要考虑顺序， 例如: 先执行 eslint-loader, babel-loader
module.exports = {
	// 1. 入口文件
	entry: './src/index.js',
	// 2. 输出配置
	output: {
		filename: 'js/built.js',
		path: resolve(__dirname, 'build')
	},
	// 3. loader 配置对象
	module: {
		rules: [
			// 1) css + 兼容性处理
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']  css和js混合 <style></style>
				use: [...handleStyle] // 开发环境
			},
			// 2) less + 兼容性处理
			{
				test: /\.less$/,
				// 1. less-loader 处理less文件为css文件
				// 2. postcss-loader 对css文件进行兼容性处理
				// 3. css-loader 把css文件打包到build.js中
				// 4. mini-css-extract-plugin 把build.js中的css文件分包
				use: [...handleStyle, 'less-loader']
			},
			// 3) js语法检查 eslint
			// {
			// 	// 在 pageage.json中的 eslintConfig: { "extends: airbnb" }
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	loader: 'eslint-loader',
			// 	enforce: 'pre', // 优先执行于其他loader
			// 	options: {
			// 		// 自动修复
			// 		// fix:true
			// 	}
			// },
			// 4) js语法兼容性处理
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader', // 只有一个loader
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'usage', // 按需加载
								corejs: { version: 3 }, // 按需加载
								// 兼容的浏览器范围
								targets: {
									chrome: '60',
									firefox: '50'
								}
							}
						]
					]
				}
			},
			// 5) 图片处理
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader', // url-loader 依赖于 file-loader
				options: {
					limit: 8 * 1024, // base64图片编码的 图片大小范围
					name: '[hash:10].[ext]', // 非base64图片 重命名
					// 图片输出路径 /build/img
					outputPath: 'img',
					esModule: false // 兼容 html-loader
				}
			},
			// 6) html中的图片问题
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			// 7) 其他资源处理
			{
				exclude: /\.(js|less|css|jpg|png|gif|html)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'media',
					name: '[hash:10].[ext]'
				}
			}
		]
	},
	// 4. 插件的配置数组
	plugins: [
		// 生成模板
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: false
			// minify: {
			// 	// 压缩空格
			// 	// collapseWhitespace: true,
			// 	// 去除注释
			// 	// removeComments: true
			// }
		}),
		// css 从 built.js中分包处理
		new MiniCssExtractPlugin({
			filename: 'css/built.css'
		}),
		// 压缩css代码
		new OptimizeCssAssetsPlugin({})
	],
	// 5. 模式
	mode: 'production' // 压缩 js代码
}
