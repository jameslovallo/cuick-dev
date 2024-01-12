import { create, css, html } from '../../index.js'
import '/components/toolbar.js'

create('nav', {
	template() {
		return html`
			<nav>
				<c-toolbar>
					<c-spa-link slot="left"><a href="/">Home</a></c-spa-link>
					<c-spa-link slot="right"><a href="/">Components</a></c-spa-link>
					<c-spa-link slot="right">
						<a href="/">Project Templates</a></c-spa-link
					>
				</c-toolbar>
			</nav>
		`
	},
	styles: css`
		a {
			color: inherit;
			text-decoration: none;
		}
	`,
})
