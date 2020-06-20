import './index.css'

import './index.less'

import './assets/font/iconfont.css'

const foo = 234
console.log(foo)

bar()
function bar() {
	return new Promise(res => {
		setTimeout(() => {
			console.log(1234)
			res()
		}, 1000)
	})
}
