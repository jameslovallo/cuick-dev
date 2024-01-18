# Cuick

Create fast, self-documenting components that work _anywhere_, without _any_ tooling.

## Features

Cuick is lightning fast, works anywhere, and has a beginner-friendly API, documented in the interactive playgrounds below. Fun fact: those playgrounds are powered by Cuick's `<c-story>` component, which automatically creates interactive documentation for a nested Cuick component.

<c-code src="/src/components/counter.js"></c-code>

## Props

Properties allow you to configure your component. To create a prop, simply add a key in the component's options object. Props whose default values are defined as booleans or numbers will be converted back to that type when the component's corresponding attribute is updated.

<c-story>
	<currency-formatter></currency-formatter>
</c-story>

## Signals

Reactive properties (signals) store stateful data and efficiently update the component's markup when the data is changed. To create a signal, add a key to the component's options object begging with a `$`.

<c-story>
	<c-counter></c-counter>
</c-story>

## Slots

Slots allow you to inject child elements anywhere inside your component's Shadow DOM. You can use a default slot or multiple named slots. To assign a child element to a named slot, add the `slot` attribute to the element and set the value to the name of the slot.

<c-story>
	<c-toolbar>
		<a slot="left">Left</a>
		<span slot="center">Center</span>
		<a slot="right">Right</a>
	</c-toolbar>
</c-story>

<h3 style="display: flex; align-items: baseline; justify-content: space-between">
	Watched Elements
	<demo-i18n></demo-i18n>
</h3>

Watched elements allow your component to synchronize with another component's properties. This is very useful for groups of components that need to be able to react to each other, for example an i18n system or a carousel with external control elements. To watch an element, add a key to the component's options object that begins with a `_` and set the value to the selector for the element the component should watch for updates.

In this example, the language switcher on the right side of the site nav updates the `lang` attribute on the <code>&lt;demo-i18n&gt;</code> element (see flag in heading). When the `lang` attribute changes, any components watching the element (like the nav) will also update, regardless of how the elements are arranged in the DOM. It's a whole lot easier than React's Context API. 😉

<c-story>
	<demo-nav></demo-nav>
</c-story>

<style>
	c-toolbar,
	demo-nav {
		background: var(--atom-bg)
	}
</style>
