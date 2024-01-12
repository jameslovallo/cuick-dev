import { create, css, html } from '../index.js'

create('toolbar', {
	template() {
		return html`
			<slot name="left" />
			<slot name="center" />
			<slot name="right" />
		`
	},
	styles: css`
		:host {
			align-items: center;
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr auto 1fr;
			line-height: 1;
			padding: 1rem;
		}
		slot {
			align-items: center;
			display: flex;
			gap: 1rem;
		}
		[name='center'] {
			justify-content: center;
		}
		[name='right'] {
			justify-content: flex-end;
		}
	`,
})
