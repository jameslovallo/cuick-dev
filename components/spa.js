import { create, html } from '../index.js'

create('spa', {
	path: '/',
	template({ path }) {
		path !== location.pathname &&
			fetch(path)
				.then((res) => res.text())
				.then((text) => {
					if (text.includes('<c-spa>')) {
						text = text.split('<c-spa>')[1].split('</c-spa>')[0]
					}
					this.innerHTML = text
					history.pushState(undefined, undefined, path)
				})
		return html`<slot />`
	},
})

create('c-spa-link', {
	_spa: 'c-spa',
	setup({ _spa }) {
		const link = this.firstElementChild
		link.addEventListener('click', (e) => {
			e.preventDefault()
			const { pathname } = link
			if (pathname.startsWith('/')) {
				_spa.path = pathname
			}
		})
	},
	template() {
		return html`<slot />`
	},
})
