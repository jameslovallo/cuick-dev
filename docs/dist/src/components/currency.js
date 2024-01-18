import { create } from '//unpkg.com/cuick-dev'

create('currency-formatter', {
	value: 1234.56,
	punctuation: ',',
	symbol: '$',
	round: false,
	trailingsymbol: false,
	template({ value, punctuation, symbol, round, trailingsymbol }) {
		let whole = Math.floor(value)
		const decimal = (value - whole).toFixed(2)
		let formatted = value
		whole = round ? String(Math.round(value)) : String(whole)
		if (whole.length > 3) {
			const outputArray = whole
				.split('')
				.reverse()
				.map((v, i) => {
					if (i % 3 === 0 && i !== 0) {
						return v + punctuation
					} else return v
				})
			formatted = outputArray.reverse().join('')
		}
		return [
			!trailingsymbol ? symbol : '',
			formatted,
			!round ? decimal && '.' + String(decimal).split('.')[1] : '',
			trailingsymbol ? symbol : '',
		].join('')
	},
})
