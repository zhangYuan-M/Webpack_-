console.log('index.js')
// import { add } from './add'
// console.log(add)

import(/* webpackChunkName: 'add' */ './add').then(res => {
	console.log(res)
})
