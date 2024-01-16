import { create } from '../index.js'
import { highlightElement } from '//cdn.skypack.dev/prismjs@1.29.0'

const css = (t) =>
	[
		'https://cdn.jsdelivr.net',
		'/npm/prism-themes/themes/',
		`prism-${t}.css`,
	].join('')

create('code', {
	src: 'https://unpkg.com/cuick-dev@1.0.1/components/toolbar.js',
	theme: 'one-dark',
	setup({ src, theme, root }) {
		const fileType = src.split('.').slice(-1)
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = css(theme)
		root.appendChild(link)
		const code = document.createElement('code')
		code.classList.add(`language-${'javascript'}`)
		const pre = document.createElement('pre')
		pre.appendChild(code)
		fetch(src)
			.then((res) => res.text())
			.then((text) => {
				code.textContent = text
				highlightElement(code)
				root.appendChild(pre)
			})
	},
})
