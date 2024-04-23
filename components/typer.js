import { create, html } from '../index.js'

create('typer', {
	sentence: 'This is ',
	words: 'string 1, string 2, string 3',
	$currentWord: '',
	letterDelay: 100,
	backDelay: 1000,
	nextDelay: 500,
	setup({ sentence, words, $currentWord, letterDelay, backDelay, nextDelay }) {
		words = words.split(', ')
		const numWords = words.length
		let wordIndex = 0

		const writeWord = (index) => {
			const letters = words[index].split('')
			const letterLength = letters.length
			// for each letter
			letters.forEach((letter, i) => {
				// add letter
				setTimeout(() => {
					$currentWord.value += letter
					// if last letter
					if (i === letterLength - 1) {
						// go backwards
						setTimeout(() => {
							for (let i = 0; i < letterLength; i++) {
								setTimeout(() => {
									$currentWord.value = $currentWord.value.slice(0, -1)
									// start over
									if ($currentWord.value.length === 0) {
										if (wordIndex < numWords - 1) {
											wordIndex++
										} else wordIndex = 0
										setTimeout(() => {
											writeWord(wordIndex)
										}, nextDelay)
									}
								}, i * letterDelay)
							}
						}, backDelay)
					}
				}, i * letterDelay)
			})
		}

		writeWord(wordIndex)
	},
	template: ({ sentence, $currentWord }) => {
		return html`
			<span>${sentence}</span>
			<span>${$currentWord.value}</span>
		`
	},
})
