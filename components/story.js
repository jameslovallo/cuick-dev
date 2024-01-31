import { create, css, handleAttr, html, reserved } from '../index.js'

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
	setup() {
		this.props = []
		this.watched = []
		this.signals = []
		this.slots = []
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
			const template = String(childConfig.template)
			;[/<slot>/g, /<slot\s+\/>/g, /<slot name="[a-z]+/g].forEach((r) => {
				const matches = template.match(r)
				matches &&
					matches.forEach((match) => {
						if (!match.includes('name') && this.slots.includes('default')) {
							this.slots.push('default')
						} else if (match.includes('name')) {
							this.slots.push(match.split('name="')[1])
						}
					})
			})
			this.connectedCallback()
		})
	},
	template({ child, props, watched, signals, slots }) {
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
				${fieldset(props, 'Props')} ${fieldset(watched, 'Watched Elements')}
				${fieldset(signals, 'Signals', true)}
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
			</form>
		`
	},
	styles: css`
		:host {
			--border: 1px solid rgba(150, 150, 150, 0.5);
			--border-radius: 0;
			border: var(--border);
			border-radius: var(--border-radius);
			display: grid;
			gap: 1rem;
			padding: 1rem 1rem 0;
		}
		slot {
			display: block;
		}
		form {
			display: grid;
			gap: 1rem;
		}
		fieldset {
			border: var(--border);
			border-radius: var(--border-radius);
			display: grid;
			gap: 1rem;
			margin: 0;
		}
		legend {
			padding: 0 0.5rem;
		}
		input:not([type='checkbox']),
		select {
			background: transparent;
			border: var(--border);
			border-radius: var(--border-radius);
			min-width: 150px;
			width: 200px;
		}
		.flex {
			align-items: center;
			display: flex;
			justify-content: space-between;
			position: relative;
		}
		ol {
			display: grid;
			gap: 0.5rem;
			margin: 0;
			padding-left: 1rem;
		}
	`,
})
