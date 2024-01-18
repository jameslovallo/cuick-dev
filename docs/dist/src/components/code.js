import { highlightElement } from '//cdn.skypack.dev/prismjs@1.29.0'
import { create } from '//unpkg.com/cuick-dev@latest'

const css = (t) =>
	[
		'https://cdn.jsdelivr.net',
		'/npm/prism-themes/themes/',
		`prism-${t}.css`,
	].join('')

create('code', {
	src: '',
	theme: 'one-dark',
	setup({ src, theme, root }) {
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = css(theme)
		if (src) {
			const fileType = src.split('.').slice(-1)
			root.appendChild(link)
			const code = document.createElement('code')
			code.classList.add(`language-${fileType}`)
			const pre = document.createElement('pre')
			pre.appendChild(code)
			fetch(src)
				.then((res) => res.text())
				.then((text) => {
					code.textContent = text
					highlightElement(code)
					root.appendChild(pre)
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
