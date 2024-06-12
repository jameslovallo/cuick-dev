import { create, css, handleAttr, html, reserved } from '../index.js'
import colors from './utils/colorNames.js'

const getType = (v) => {
	let type
	switch (typeof v) {
		case 'string':
			type = 'string'
			break
		case 'number':
			type = 'number'
			break
		case 'boolean':
			type = 'checkbox'
			break
	}
	return type
}

function waitFor(conditionFunction) {
	const poll = (resolve) => {
		if (conditionFunction()) resolve(conditionFunction())
		else setTimeout(() => poll(resolve), 400)
	}
	return new Promise(poll)
}

create('story', {
	$buttonText: 'Copy Element',
	setup() {
		this.props = []
		this.watched = []
		this.signals = []
		this.slots = []
		this.cssVars = []
		this.child = this.children[0]
		waitFor(() => this.child.config).then((childConfig) => {
			Object.keys(childConfig)
				.filter((k) => !reserved.includes(k))
				.map((k) => {
					if (k.startsWith('$')) {
						this.signals.push([k, childConfig[k]])
					} else if (k.startsWith('_')) {
						this.watched.push([k, childConfig[k]])
					} else {
						this.props.push([k, childConfig[k]])
					}
				})
			const slots = String(childConfig.template).match(/slot name="[\w-]+/gm)
			if (slots) {
				slots.forEach((s) => {
					this.slots.push(s.split('"')[1])
				})
			}
			if (childConfig.styles) {
				const host = childConfig.styles[0].match(/:host {[\s\S]*?}/gm)[0]
				if (host) {
					const cssVars = host.match(/--[\w-]+:/gm)
					if (cssVars) {
						cssVars.forEach((v) => {
							v = v.replace(':', '')
							this.cssVars.push([
								v,
								getComputedStyle(this.child).getPropertyValue(v),
							])
						})
					}
				}
			}
			this.connectedCallback()
		})
	},
	template({ child, props, watched, signals, slots, cssVars, $buttonText }) {
		const input = (key, value) => {
			const type = getType(value)
			const assignedValue =
				type === 'checkbox' ? child.hasAttribute(key) : child.getAttribute(key)
			return Array.isArray(value)
				? html`
						<select @change=${(e) => child.setAttribute(key, e.target.value)}>
							${value.map(
								(option) => html`
									<option selected=${option === assignedValue ? true : null}>
										${option}
									</option>
								`
							)}
						</select>
				  `
				: html`
						<input
							type=${type}
							?checked=${type === 'checkbox' && (assignedValue || value)}
							value=${type !== 'checkbox' ? assignedValue || value : null}
							@input=${(e) =>
								handleAttr({
									el: child,
									type: type === 'checkbox' ? 'boolean' : type,
									attr: key,
									value: e.target.checked || e.target.value,
								})}
						/>
				  `
		}
		const fieldset = (category, label) => {
			return category.length
				? html`
						<fieldset>
							<legend>${label}</legend>
							${category.map((r) => {
								return category === signals
									? html`
											<div class="flex">
												${r[0]}<span>Default: ${r[1]}</span>
											</div>
									  `
									: html`
											<label class="flex">${r[0]}${input(r[0], r[1])}</label>
									  `
							})}
						</fieldset>
				  `
				: ''
		}
		return html`
			<slot />
			<form>
				${fieldset(props, 'Props')} ${fieldset(signals, 'Signals', true)}
				${fieldset(watched, 'Watched Elements')}
				${cssVars.length
					? html`
							<fieldset>
								<legend>CSS Variables</legend>
								${cssVars.map(
									(v) => html`
										<label class="flex">
											${v[0]}
											<div class="flex">
												${colors.filter((c) => v[1].toLowerCase().startsWith(c))
													.length
													? html`
															<input
																type="color"
																@input=${(e) => {
																	child.style.setProperty(v[0], e.target.value)
																	e.target.nextElementSibling.style.setProperty(
																		'--bg',
																		e.target.value
																	)
																	e.target.parentElement.lastElementChild.value =
																		e.target.value
																}}
															/>
															<div class="color" style=${`--bg: ${v[1]}`} />
													  `
													: ''}
												<input
													value=${v[1]}
													@input=${(e) => {
														child.style.setProperty(v[0], e.target.value)
														e.target.previousElementSibling.style.setProperty(
															'--bg',
															e.target.value
														)
													}}
												/>
											</div>
										</label>
									`
								)}
							</fieldset>
					  `
					: ''}
				${slots.length
					? html`
							<fieldset>
								<legend>Slots</legend>
								<ol>
									${slots.map((slot) => html`<li>${slot}</li>`)}
								</ol>
							</fieldset>
					  `
					: ''}
				<button
					@click=${(e) => {
						e.preventDefault()
						navigator.clipboard.writeText(child.outerHTML)
						$buttonText.value = 'Copied!'
						setTimeout(() => ($buttonText.value = 'Copy Element'), 2000)
					}}
				>
					${$buttonText.value}
				</button>
			</form>
		`
	},
	styles: css`
		:host {
			--story-border: 1px solid rgba(150, 150, 150, 0.5);
			--story-border-radius: 0.25rem;
			border: var(--story-border);
			border-radius: var(--story-border-radius);
			display: grid;
			gap: 1rem;
			padding: 1rem;
		}
		slot {
			display: block;
		}
		form {
			display: grid;
			gap: 1rem;
			margin: 0;
		}
		fieldset {
			border: var(--story-border);
			border-radius: var(--story-border-radius);
			display: grid;
			gap: 1rem;
			margin: 0;
			padding: 1rem;
		}
		legend {
			font-size: 14px;
			font-weight: bold;
			padding: 0 0.5rem;
		}
		input:not([type='checkbox']):not([type='color']),
		select {
			background: transparent;
			border: var(--story-border);
			border-radius: var(--story-border-radius);
			font-size: 14px;
			padding: 0.25rem;
			width: 150px;
		}
		.flex {
			align-items: center;
			display: flex;
			flex-flow: row wrap;
			gap: 0.5rem;
			justify-content: space-between;
			position: relative;
		}
		[type='color'] {
			height: 1rem;
			opacity: 0;
			width: 1rem;
		}
		.color {
			background: var(--bg);
			border: var(--story-border);
			border-radius: 50%;
			height: 1rem;
			left: 0;
			pointer-events: none;
			position: absolute;
			top: calc(50% - 0.5rem);
			width: 1rem;
		}
		ol {
			display: grid;
			gap: 0.5rem;
			margin: 0;
			padding-left: 1rem;
		}
		code {
			font-size: 0.75rem;
		}
		button {
			background: transparent;
			border: var(--story-border);
			border-radius: var(--story-border-radius);
			padding: 0.5rem;
		}
		button:hover {
			background: var(--primary-bg);
			color: var(--primary-fg);
		}
	`,
})
