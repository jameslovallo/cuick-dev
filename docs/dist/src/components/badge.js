import { create, css, html } from '//unpkg.com/cuick-dev'

create('badge', {
	label: 'badge',
	variant: 'badge',
	template: ({ label, variant }) => html`
		<div class=${variant}>${label}</div>
		<slot><div part="placeholder" /></slot>
	`,
	styles: css`
		:host {
			display: inline-block;
			position: relative;
		}
		.ribbon {
			background: dodgerblue;
			font-size: 0.75rem;
			letter-spacing: 1px;
			line-height: 1;
			padding: 0.5rem;
			position: absolute;
			right: -0.5rem;
			text-transform: uppercase;
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
