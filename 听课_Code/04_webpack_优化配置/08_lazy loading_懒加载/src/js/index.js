console.log('index.js文件加载了')

// import { mul } from './test'

/**
 * 正常加载可以认为是并行加载（同一时间加载多个文件）
 * prefetch：等其他资源加载完毕，浏览器空闲了，在偷偷加载。（存在兼容性问题，现代浏览器才能比较完美使用，移动端似乎不好）
 */

document.getElementById('btn').addEventListener('click', function () {
	// 懒加载
	// import(/* webpackChunkName : 'test' */ './test').then(({ mul }) => {
	// 	console.log(mul)
	// })
	// 预加载
	import(/* webpackChunkName : 'test', webpackPrefetch: true */ './test').then(({ mul }) => {
		console.log(mul)
	})
})
