// See https://github.com/jmreidy/grunt-browserify
module.exports = {
	example: {
		files: {
			"examples/browserified/example-browserified.js": ["examples/browserified/example.js"],
		},
		options: {

			browserifyOptions: {
				"parser": "babel-eslint",
				"parserOptions": {
					"sourceType": "module",
					"allowImportExportEverywhere": true
				},
				debug: true,
				presets: ["es2005"],
				sourceMaps: true,
				global: true,
			},
		},
	},
};
