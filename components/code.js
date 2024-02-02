import { create } from '../index.js'
import { highlightElement } from '//cdn.skypack.dev/prismjs@1.29.0'

create('code', {
	src: '',
	theme: 'one-dark',
	setup({ src, theme, shadowRoot }) {
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = `https://unpkg.com/prism-themes/themes/prism-${theme}.min.css`
		if (src) {
			const fileType = src.split('.').slice(-1)
			shadowRoot.appendChild(link)
			const code = document.createElement('code')
			code.classList.add(`language-${fileType}`)
			const pre = document.createElement('pre')
			pre.appendChild(code)
			fetch(src)
				.then((res) => res.text())
				.then((text) => {
					code.textContent = text
					highlightElement(code)
					shadowRoot.appendChild(pre)
				})
		} else {
			link.setAttribute('c-code', '')
			if (!document.querySelector('c-code').length) {
				document.head.appendChild(link)
			}
			document
				.querySelectorAll('[class*=language-]')
				.forEach((c) => highlightElement(c))
		}
	},
})
