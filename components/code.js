import { parse } from 'https://cdn.jsdelivr.net/npm/marked/+esm'
import { highlightAllUnder } from 'https://cdn.skypack.dev/prismjs@1.29.0'
import { create, html } from '../index.js'

const codeTemplate = (doc, extension) => `
\`\`\`${extension}
${doc}
\`\`\`
`

create('code', {
	src: '/README.md',
	theme: 'one-dark',
	setup({ src, theme, root }) {
		const stylesheet = theme.startsWith('http')
			? theme
			: `https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-${theme}.css`
		const prismStyles = `
			<link rel="stylesheet" href="${stylesheet}">
			<style>
				code[class*='language-'],
				pre[class*='language-'] {
					font-size: 0.9rem;
					line-height: 2;
					margin: 0;
					tab-size: 2;
				}
			</style>
		`
		fetch(src)
			.then((res) => res.text())
			.then((doc) => {
				if (src.endsWith('.md')) {
					root.innerHTML = prismStyles + parse(doc)
				} else {
					const srcArr = src.split(['.'])
					const extension = srcArr[srcArr.length - 1]
					root.innerHTML =
						prismStyles +
						parse(codeTemplate(doc.replace(/\t/g, '  '), extension))
				}
				highlightAllUnder(root)
			})
	},
	template() {
		return html`<slot />`
	},
})
