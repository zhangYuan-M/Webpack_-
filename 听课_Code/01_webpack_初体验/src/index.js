// webpack打包入口起点文件： index.js
/**
 * 1. 运行指令
 *  1. 开发环境
 *    webpack ./src/index.js -o ./build/built.js --mode=development
 *      结果: Hash: de587b9e149bea188350 哈希值
 *  2. 生产环境
 *    webpack ./src/index.js -o ./build/built.js --mode=production
 *  3. 生产环境比开发环境多了一个压缩js的代码
 * 	4. 生产环境，开发环境 都 支持模块化
 */
// 打包js资源
function add(x, y) {
	return x + y
}
console.log(add(1, 2))

// 打包json文件
import data from './data.json'
console.log(data)

// 打包css文件, 图片资源, 报错
// import './index.css'
