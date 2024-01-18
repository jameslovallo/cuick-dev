---
title: Components
---

# Components

Cuick provides a small but powerful library of UI components. These components are ready for production. The are also here to demonstrate Cuick's API and how to document your components using the `<c-story>` component.

<div class="component-grid">
	<a href="code">
		<span class="icon">{{ icons.code }}</span>
		Code
	</a>
	<a href="grid">
		<span class="icon">{{ icons.grid }}</span>
		Grid
	</a>
	<a href="grid">
		<span class="icon">{{ icons.grid }}</span>
		Grid
	</a>
	<a href="grid">
		<span class="icon">{{ icons.grid }}</span>
		Grid
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
		display: grid;
		gap: 1rem;
		justify-content: center;
		padding: 1rem;
		text-align: center;
		text-decoration: none;
	}
	.component-grid a .icon {
		border: 1px solid var(--gold);
		border-radius: 50%;
		box-sizing: border-box;
		padding: 1rem;
		width: 4rem;
	}
	.component-grid a:hover .icon {
		background: var(--gold);
		color: black;
	}
</style>
