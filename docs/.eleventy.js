const meta = {
	title: 'Cuick',
	description:
		'Create fast, self-documenting components that work anywhere, without any tooling.',
	layout: 'layout.njk',
}

module.exports = function (eleventyConfig) {
	Object.keys(meta).forEach((key) =>
		eleventyConfig.addGlobalData(key, meta[key])
	)
	eleventyConfig.addPassthroughCopy('src/**/*')
	// Return your Object options:
	return {
		dir: {
			input: 'pages',
			output: 'dist',
		},
	}
}
