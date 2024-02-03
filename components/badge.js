import { create, css, html } from '../index.js'

create('badge', {
	label: '3',
	variant: ['badge', 'ribbon'],
	template: ({ label, variant }) => html`
		<div class=${variant}>${label}</div>
		<slot><div part="placeholder" /></slot>
	`,
	styles: css`
		:host {
			--badge-fg: var(--primary-fg);
			--badge-bg: var(--primary-bg);
			--badge-border-radius: unset;
			display: inline-block;
			position: relative;
		}
		.badge,
		.ribbon {
			background: var(--badge-bg);
			color: var(--badge-fg);
			font-size: 0.75rem;
			letter-spacing: 1px;
			padding: 0.5rem;
			position: absolute;
			right: -0.5rem;
			text-transform: uppercase;
		}
		.badge {
			align-items: center;
			border-radius: var(--badge-border-radius, 0.75rem);
			display: flex;
			justify-content: center;
			line-height: 1;
			top: -0.5rem;
			height: 1.5rem;
			min-width: 1.5rem;
		}
		.ribbon {
			border-radius: var(--badge-border-radius);
			border-bottom-right-radius: 0;
			top: 0.5rem;
		}
		.ribbon:before {
			background: inherit;
			clip-path: polygon(0 0, 0% 100%, 100% 0);
			content: '';
			height: 0.5rem;
			filter: brightness(0.5);
			position: absolute;
			right: 0;
			top: 100%;
			width: 0.5rem;
		}
		[part='placeholder'] {
			background: #555;
			height: 4rem;
			width: 12rem;
		}
	`,
})
