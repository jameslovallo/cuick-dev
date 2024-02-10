import { create, html } from '../index.js'

create('grid', {
	columns: 12,
	gap: '1rem',
	alignment: ['center', 'start', 'end', 'stretch'],
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
	template({ columns, gap, sm, md, lg, xl, xxl }) {
		const bps = { xs: 0, sm, md, lg, xl, xxl }
		return html`
			<slot />
			<style>
				${`
					slot {
						--columns: ${columns};
						display: grid;
						gap: ${gap};
						grid-template-columns: repeat(${columns}, 1fr);
						align-items: ${alignment};
					}
					::slotted(*) {
						/* span */
						--xs: ${columns};
						--sm: var(--xs);
						--md: var(--sm);
						--lg: var(--md);
						--xl: var(--lg);
						--xxl: var(--xl);
						/* start */
						--xs-start: auto;
						--sm-start: var(--xs-start);
						--md-start: var(--sm-start);
						--lg-start: var(--md-start);
						--xl-start: var(--lg-start);
						--xxl-start: var(--xl-start);
					}
					/* breakpoints */
					${Object.keys(bps)
						.map(
							(bp) => `
								@media(min-width: ${bps[bp]}px) {
									::slotted(*) {
										grid-column: var(--${bp}-start) / span var(--${bp})
									}
								}
							`
						)
						.join('')}
				`}
			</style>
		`
	},
})
