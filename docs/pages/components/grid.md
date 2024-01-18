---
title: Grid
---

# Grid

`<c-grid>` couldn't be easier to use and keeps your DOM clean.

```js
import '//unpkg.com/cuick-dev/components/grid.js'
```

## Usage

`<c-grid>` is configured with sensible defaults (12 columns, same breakpoints as tailwind) and can be easily customized with props.Instead of requiring separate child elements for each column, just add the CSS Variable for a breakpoint to the child element's CSS and assign it to the number of columns you want it to span. For example, `--xs: 3` will span 3 columns. You can also customize the number of columns an element should start at, i.e. `--xs: 8; --xs-start: 3` will create a column that spans 8 columns and is centered in a 12 column grid.

Each breakpoint variable is inerited by larger breakpoints, i.e. `--xs -> --sm -> --md`. This saves you from having to write the same rule for larger breakpoints unless it changes. If you prefer, you can also write fractional rules using `calc` and the `--columns` variable, i.e. `--xs: calc(var(--columns)/2)`,

<c-story>
	<c-grid>
		<div style="--xs: 3">--xs: 3</div>
		<div style="--xs: 3">--xs: 3</div>
		<div style="--xs: 3">--xs: 3</div>
		<div style="--xs: 3">--xs: 3</div>
		<div style="--xs: 4">--xs: 4</div>
		<div style="--xs: 4">--xs: 4</div>
		<div style="--xs: 4">--xs: 4</div>
		<div style="--xs: 6">--xs: 6</div>
		<div style="--xs: 6">--xs: 6</div>
		<div style="--xs: 8">--xs: 8</div>
		<div style="--xs: 4">--xs: 4</div>
		<div style="--xs: calc( var(--columns) / 2 )">--xs: calc( var(--columns) / 2 )</div>
		<div style="--xs: calc( var(--columns) / 2 )">--xs: calc( var(--columns) / 2 )</div>
		<div style="--xs: 8; --xs-start: 3">--xs: 8; --xs-start: 3</div>
	</c-grid>
</c-story>

<style>
	c-grid div {
		background: var(--atom-bg);
		padding: .25rem;
	}
</style>
