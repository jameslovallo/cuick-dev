import { create, html } from '../../index.js'

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
