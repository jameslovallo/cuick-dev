import { create, css, html } from '//unpkg.com/cuick-dev'
import '//unpkg.com/cuick-dev/components/toolbar.js'

create('nav', {
	template() {
		return html`
			<nav>
				<c-toolbar>
					<a slot="left" href="/">Home</a>
					<a slot="right" href="/components">Components</a>
					<a slot="right" href="/templates"> Project Templates </a>
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
