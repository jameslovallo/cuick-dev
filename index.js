import { html, render, signal, svg } from '//unpkg.com/uhtml/preactive'
export { html, svg }

const theme = `
	*, *::before, *::after {
		box-sizing: border-box;
	}
	:host {
		--primary-bg: dodgerblue;
		--primary-fg: white;
		font-family: sans-serif;
		-webkit-font-smoothing: antialiased;
	}
	img, picture, video, canvas, svg {
		display: block;
		max-width: 100%;
	}
	input, button, textarea, select {
		font: inherit;
		margin: 0;
	}
	button {
		cursor: pointer;
	}
	p, h1, h2, h3, h4, h5, h6 {
		overflow-wrap: break-word;
	}
`

export const css = (v) => v
export const reserved = ['setup', 'template', 'styles']

export const handleAttr = (options) => {
	const { el, type, attr, value } = options
	if (type === 'boolean') {
		value === true ? el.setAttribute(attr, '') : el.removeAttribute(attr)
	} else el.setAttribute(attr, value)
}

export const create = (name, options) => {
	customElements.define(
		name.includes('-') ? name : 'c-' + name,
		class extends HTMLElement {
			static observedAttributes = Object.keys(options).filter(
				(k) => !reserved.includes(k) && !k.startsWith('$')
			)
			constructor() {
				super().attachShadow({ mode: 'open' })
				this.template = options.template
				this.styles = options.styles
				this.config = options
				Object.keys(options)
					.filter((o) => !reserved.includes(o))
					.forEach((o) => {
						if (o.startsWith('$')) {
							this[o] = signal(options[o])
						} else {
							let dv = options[o]
							if (Array.isArray(dv)) dv = dv[0]
							let type = typeof dv
							if (o.startsWith('_')) {
								type = 'el'
								dv = document.querySelector(dv)
								dv.addEventListener('update', this.connectedCallback)
							}
							Object.defineProperty(this, o, {
								get: () => {
									const v = this.getAttribute(o) || dv
									switch (type) {
										case 'el':
											return dv
										case 'string':
											return v
										case 'number':
											return Number(v)
										case 'boolean':
											return this.hasAttribute(o)
									}
								},
								set: (v) => {
									handleAttr({
										el: this,
										type,
										attr: o,
										value: v,
									})
								},
							})
						}
					})
				if (options.setup) {
					this.setup = options.setup
					this.setup(this)
				}
				this.dispatchEvent(new Event('setup'))
			}
			async connectedCallback() {
				const template = await this.template
				if (template) {
					render(
						this.shadowRoot,
						() => html`
							${template(this)}
							<style>
								${theme + (this.styles ? this.styles : '')}
							</style>
						`
					)
					this.dispatchEvent(new Event('render'))
				}
			}
			attributeChangedCallback() {
				this.connectedCallback()
				this.dispatchEvent(new Event('update'))
			}
		}
	)
}
