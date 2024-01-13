import { create, html } from '../../index.js'
import '/components/toolbar.js'

create('nav', {
	template() {
		return html`
			<nav>
				<c-toolbar>
					<c-spa-link slot="left" href="/">Home</c-spa-link>
					<c-spa-link slot="right" href="/components">Components</c-spa-link>
					<c-spa-link slot="right" href="/templates">
						Project Templates
					</c-spa-link>
				</c-toolbar>
			</nav>
		`
	},
})
