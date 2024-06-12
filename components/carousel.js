import { create, css, html } from '../index.js'

const rMq = (rString) => {
	return rString
		.split(', ')
		.map((r) => r.split(': '))
		.map(
			(r) => `@media (min-width: ${r[0]}px) { :host { --slides: ${r[1]}; } }`
		)
		.join('')
}

const mdi = (path) => html`<svg viewBox="0 0 24 24"><path d=${path} /></svg>`
const left = 'M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z'
const right = 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'

create('carousel', {
	autoplay: 0,
	responsive: '0: 1, 768: 2, 1024: 3',
	setup({ children, shadowRoot }) {
		this.slides = [...children].filter((c) => !c.slot)
		this.slides.forEach((s, i) => (s.slot = i))
		this.track = () => shadowRoot.querySelector('[part="track"]')
		this.prev = () => {
			const { scrollLeft, scrollWidth } = this.track()
			scrollLeft === 0
				? this.track().scrollTo(scrollWidth, 0)
				: this.track().scrollBy(-1, 0)
		}
		this.next = () => {
			const { scrollLeft, scrollWidth, offsetWidth } = this.track()
			scrollLeft + offsetWidth + 5 > scrollWidth
				? this.track().scrollTo(0, 0)
				: this.track().scrollBy(1, 0)
		}
		this.goTo = (i) => () => this.track().scrollTo(this.slides[i].offsetLeft, 0)
		this.addEventListener('render', () => {
			this.indicators = () => shadowRoot.querySelectorAll('[part="indicator"]')
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					const index = this.slides.indexOf(entry.target)
					const indicator = this.indicators()[index]
					if (entry.isIntersecting) {
						indicator.classList.add('active')
					} else indicator.classList.remove('active')
				})
			})
			this.slides.forEach((s, i) => observer.observe(s, i))
		})
		if (this.autoplay) {
			this.addEventListener('mouseenter', () => (this.pause = true))
			this.addEventListener('mouseleave', () => (this.pause = false))
			setInterval(() => !this.pause && this.next(), this.autoplay)
		}
	},
	template({ responsive, slides, prev, next, goTo }) {
		return html`
			<style>
				${rMq(responsive)}
			</style>
			<ul part="track">
				${slides.map((s, i) => html`<li part="slide"><slot name=${i} /></li>`)}
			</ul>
			<div part="controls">
				<button part="prev" @click=${prev}>
					<slot name="prev">${mdi(left)}</slot>
				</button>
				<div part="indicators">
					${slides.map(
						(s, i) =>
							html`<button part="indicator" @click=${goTo(i)}>${i + 1}</button>`
					)}
				</div>
				<button part="next" @click=${next}>
					<slot name="next">${mdi(right)}</slot>
				</button>
			</div>
		`
	},
	styles: css`
		:host {
			--gap: 0.5rem;
		}
		ul {
			display: flex;
			list-style: none;
			padding: 0;
		}
		[part='track'] {
			margin: 0 calc(var(--gap) / -2);
			overflow-x: scroll;
			scroll-behavior: smooth;
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
		}
		[part='track']::-webkit-scrollbar {
			display: none;
		}
		[part='slide'] {
			display: block;
			min-width: calc(100% / var(--slides));
			padding: 0 calc(var(--gap) / 2);
			scroll-snap-align: start;
		}
		[part='slide'] ::slotted(*) {
			width: 100%;
		}
		[part='slide'] ::slotted(img),
		[part='slide'] ::slotted(video) {
			display: block;
		}
		[part='indicators'] {
			display: flex;
			justify-content: center;
		}
		[part='indicator'] {
			background: transparent;
			border: 0;
			color: currentcolor;
		}
		[part='indicator'].active {
			color: dodgerblue;
		}
		[part='controls'] {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}
		[part='prev'],
		[part='next'] {
			color: inherit;
			background: transparent;
			border: 0;
			padding: 0.5rem;
		}
		svg,
		::slotted(svg) {
			fill: currentcolor;
			display: block;
			width: 24px;
		}
	`,
})
