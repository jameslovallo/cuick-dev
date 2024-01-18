---
title: code
---

# Code

`<c-code>` uses [Prism](https://prismjs.com) to highlight code blocks or code from remote files.

```js
import '//unpkg.com/cuick-dev/components/code.js'
```

## Usage

`<c-code>` has 2 props, `src` and `theme`. If a remote file is specified, that file will be fetched and highlighted in the component's Shadow DOM. Otherwise, `<c-code>` is an effortless way to use Prism on your site, i.e. in an eleventy site just import it and include it in your template. The theme defaults to `one-dark` but can be set to use any theme from the [prism-themes](https://unpkg.com/prism-themes/themes/) package.

### Remote File

```html
<c-code src="/src/components/counter.js"></c-code>
```

<c-code src="/src/components/counter.js"></c-code>

### All Code Blocks

```html
<c-code></c-code>
```
