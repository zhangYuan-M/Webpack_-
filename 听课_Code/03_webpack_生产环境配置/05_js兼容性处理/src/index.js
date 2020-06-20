import './base.css'

const a = 300
console.log(a)

function add() {
	return new Promise(res => {
		setTimeout(() => {
			console.log(123)
			res()
		}, 1000)
	})
}
console.log(add(1, 2))
