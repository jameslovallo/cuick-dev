import { create, html } from '//unpkg.com/cuick-dev'

create('counter', {
	$count: 0,
	template({ $count }) {
		return html`
			<button @click=${() => $count.value++}>
				Count: ${$count.value}
			</button>
		`
	},
})
