---
title: Components
---

# Components

Cuick provides a small but powerful library of UI components. These components are ready for production. The are also here to demonstrate Cuick's API and how to document your components using the `<c-story>` component.

<div class="component-grid">
	<a href="badge">
		<span class="icon">{{ icons.badge }}</span>
		Badge
	</a>
	<a href="code">
		<span class="icon">{{ icons.code }}</span>
		Code
	</a>
	<a href="grid">
		<span class="icon">{{ icons.grid }}</span>
		Grid
	</a>
	<a href="toolbar">
		<span class="icon">{{ icons.toolbar }}</span>
		Toolbar
	</a>
</div>

<style>
	.component-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	}
	.component-grid a {
		background: var(--atom-bg);
		border: var(--atom-border);
		border-radius: 1rem;
		box-sizing: padding-box;
		display: grid;
		gap: 1rem;
		justify-content: center;
		padding: 1rem;
		text-align: center;
		text-decoration: none;
		transition: .25s;
	}
	.component-grid a:hover:not(:active) {
		border-bottom-width: 4px;
		margin-top: -3px;
	}
	.component-grid a .icon {
		box-shadow: inset 0 0 0 1px var(--gold);
		border-radius: 50%;
		padding: 1rem;
		transition: .25s;
		width: 4rem;
	}
	.component-grid a:hover .icon {
		box-shadow: inset 0 0 0 3px var(--gold);
	}
</style>
