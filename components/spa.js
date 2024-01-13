import { create, css, html } from '../index.js'

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
	href: '/',
	template({ _spa, href }) {
		return html`
			<a
				href=${href}
				@click=${(e) => {
					e.preventDefault()
					_spa.path = href
				}}
			>
				<slot />
			</a>
		`
	},
	styles: css`
		:host {
			width: max-content;
		}
		a {
			color: inherit;
			text-decoration: none;
		}
	`,
})
