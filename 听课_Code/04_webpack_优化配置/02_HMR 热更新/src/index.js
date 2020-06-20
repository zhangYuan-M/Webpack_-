// add(100, 1)
function add(x, y) {
	console.log(x + y + 10)
}
console.log('index.js加载')
console.log('index入口文件不能做热更新')
import './assets/css/global.css'

import './assets/css/base.less'

import './assets/font/iconfont.css'

import home from './home'

if (module.hot) {
	module.hot.accept('./home.js', function () {
		console.log('home的热模块更新')
	})
}
