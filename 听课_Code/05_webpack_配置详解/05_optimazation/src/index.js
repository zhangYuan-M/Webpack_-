console.log('index.js')
// import { add } from './add'
// console.log(add)

import { add } from './add.js'

import(/* webpackChunkName: 'count'*/ './count.js')
