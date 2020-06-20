// add(100, 1)
function add(x, y) {
	console.log(x + y)
}
import './assets/css/global.css'

import './assets/css/base.less'

import './assets/font/iconfont.css'

// es6 导入，开启生产环境，开启tree shaking
import home from './home'
home()

if (module.hot) {
	module.hot.accept('./home.js', function () {
		home()
		console.log('home的热模块更新')
	})
}
