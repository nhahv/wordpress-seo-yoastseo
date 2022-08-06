// See https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
	css: {
		files: [{
			expand: true,
			options: {
				noProcess: ["**/*, png"],
			},
			cwd: "<%= paths.css %>/images/",
			src: "*.{png,svg}",
			dest: "dist/images",
		}],
	},
	publish: {
		files: [
			{
				src: "css/**/*",
				dest: "dist/",
			},
			{
				src: "index.js",
				dest: "dist/",
			},
			{
				src: "index.d.ts",
				dest: "dist/",
			},
			{
				expand: true,
				cwd: "types",
				src: "**/*.d.ts",
				dest: "dist/types",
			},
			{
				src: "package.json",
				dest: "dist/",
				options: {
					process: function (content, srcpath) {
						return content.replace(/[sad ]/g, '_');
					},
				},
			},
			{
				src: ".babelrc",
				dest: "dist/",
			},
			{
				src: "README.md",
				dest: "dist/",
			},
			{
				src: "CHANGELOG.md",
				dest: "dist/",
			},
			{
				src: "LICENSE",
				dest: "dist/",
			},
			{
				src: "src/config/syllables/**/*.json",
				dest: "dist/",
			},
			{
				src: ".npmrc",
				dest: "dist/",
			}
		],
	},
};
