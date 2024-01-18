import { create, css, html } from '//unpkg.com/cuick-dev'

const i18n = {
	en: {
		nav: {
			home: 'Home',
			about: 'About',
			shop: 'Shop',
			account: 'Account',
			cart: 'Cart',
		},
	},
	es: {
		nav: {
			home: 'Inicio',
			about: 'Acerca de',
			shop: 'Tienda',
			account: 'Cuenta',
			cart: 'Carrito',
		},
	},
	fr: {
		nav: {
			home: 'Accueil',
			about: 'À propos',
			shop: 'Magasin',
			account: 'Compte',
			cart: 'Panier',
		},
	},
}

create('demo-i18n', {
	lang: 'en',
	template({ lang }) {
		const icon = lang === 'en' ? 'gb' : lang
		return html`
			<code>&lt;demo-i18n lang="${lang}" /&gt;</code>
			<svg viewBox="0 0 24 24">
				<path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" />
			</svg>
			<img src=${`https://s2.svgbox.net/flags-hd.svg?ic=${icon}`} />
		`
	},
	styles: css`
		:host {
			align-items: center;
			display: flex;
			font-size: 14px;
			gap: 0.5em;
			width: max-content;
		}
		svg {
			fill: currentColor;
			width: 1.5em;
		}
		img {
			height: auto;
			width: 1.25rem;
		}
	`,
})

create('demo-nav', {
	_i18n: 'demo-i18n',
	template({ _i18n }) {
		const {
			nav: { home, about, shop, account, cart },
		} = i18n[_i18n.lang]
		return html`
			<nav>
				<c-toolbar>
					<a slot="left">${home}</a>
					<a slot="left">${about}</a>
					<a slot="center" class="logo">Logo</a>
					<a slot="right">${shop}</a>
					<a slot="right">${account}</a>
					<select
						slot="right"
						value=${_i18n.lang}
						@change=${(e) => {
							_i18n.lang = e.target.value
						}}
					>
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="fr">French</option>
					</select>
				</c-toolbar>
			</nav>
		`
	},
	styles: css`
		:host {
			display: block;
		}
		.logo {
			font-size: 1.25rem;
			font-weight: bold;
		}
		select {
			background: transparent;
			border: none;
			color: inherit;
			margin: 0 -3px;
		}
	`,
})
