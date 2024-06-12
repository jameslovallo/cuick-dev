import { create, css, html } from '../index.js'

export default create('compare', {
	percent: 50,
	template({ percent }) {
		return html`
			<div style=${`--compare-percent: ${percent}%; --raw: ${percent}`}>
				<slot></slot>
				<input
					type="range"
					value=${percent}
					name="vol"
					min="0"
					max="100"
					step=".5"
					@input=${(e) => (this.percent = e.target.value)}
				/>
				<button aria-hidden="true">
					<svg viewBox="0 0 24 24">
						<path d="M8,14V18L2,12L8,6V10H16V6L22,12L16,18V14H8Z" />
					</svg>
				</button>
			</div>
		`
	},

	styles: css`
		:host {
			--compare-border-radius: 0.5rem;
			--compare-button-bg: var(--primary-bg);
			--compare-button-fg: var(--primary-fg);
			--compare-divider: var(--primary-fg);
			/* prettier-ignore */
			display: block;
			position: relative;
		}
		::slotted(*) {
			border-radius: var(--compare-border-radius);
			display: block;
			width: 100%;
		}
		::slotted(*:last-of-type) {
			clip-path: polygon(
				var(--compare-percent) 0,
				100% 0,
				100% 100%,
				var(--compare-percent) 100%
			);
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
		input[type='range'] {
			-webkit-appearance: none;
			appearance: none;
			background: transparent;
			border-radius: var(--compare-border-radius);
			cursor: pointer;
			height: 100%;
			left: 0;
			margin: 0;
			overflow: hidden;
			position: absolute;
			top: 0;
			width: 100%;
		}
		input[type='range']:focus {
			outline: none;
		}
		input[type='range']::-webkit-slider-runnable-track {
			background-color: transparent;
			height: 100%;
		}
		input[type='range']::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			background-color: var(--compare-divider);
			cursor: ew-resize;
			height: 100%;
			width: 0.5rem;
		}
		input[type='range']::-moz-range-track {
			background-color: transparent;
			height: 100%;
		}
		input[type='range']::-moz-range-thumb {
			background-color: var(--compare-divider);
			border: none;
			border-radius: 0;
			cursor: ew-resize;
			height: 100%;
			width: 0.5rem;
		}
		button {
			/* primary */
			align-items: center;
			background: var(--compare-button-bg);
			border-radius: 2rem;
			border: 0;
			box-shadow: 0 0 5px black;
			color: var(--compare-button-fg);
			display: flex;
			height: 2rem;
			justify-content: center;
			left: calc((100% - 8px) * (var(--raw) / 100) - 12px);
			padding: 0;
			pointer-events: none;
			position: absolute;
			top: calc(50% - 1rem);
			width: 2rem;
		}
		button svg {
			fill: currentColor;
			width: 24px;
		}
	`,
})
