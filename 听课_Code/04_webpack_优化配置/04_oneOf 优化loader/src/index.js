// add(100, 1)
function add(x, y) {
	console.log(x + y)
}
console.log('index.js加载~~')()
import './assets/css/global.css'

import './assets/css/base.less'

import './assets/font/iconfont.css'

import home from './home'
home()

if (module.hot) {
	module.hot.accept('./home.js', function () {
		home()
		console.log('home的热模块更新')
	})
}
