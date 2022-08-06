var path = require("path");
var fs = require('fs');
var loadGruntConfig = require("load-grunt-config");

module.exports = function (grunt) {

	grunt.registerTask('copy:package', 'My super task', () => {
		// file with json with file paths
		//{"someRandomStuff":"myRandomStuff","includeNodesFromFiles":{"item1":"item1.json","item2":"item2.json","item3":"item3.json"}}
		let main = JSON.parse(fs.readFileSync('package.json', 'utf8'));
		// Object.keys(main.devDependencies).forEach((key) => {
		// 	main.devDependencies[key] = "";
		// });
		//... do some stuff
		delete (main.devDependencies);
		delete (main.jest);
		grunt.log.writeln(JSON.stringify(main, null, 2)); //{"someRandomStuff":"myRandomStuff","includeNodesFromFiles":{"item1":{},"item2":{},"item3":{}}}
		grunt.file.write('dist/package.json', JSON.stringify(main, null, 2))
	});

	// Define project configuration
	var project = {
		paths: {
			grunt: "grunt/",
			js: "src/",
			css: "css/",
			/**
			 * Gets the path to the grunt config.
			 *
			 * @returns {string} The config path.
			 */
			get config() {
				return this.grunt + "config/";
			},
		},
		files: {
			js: [
				"src/**/*.js",
				"vendor/**/*.js",
				"grunt/config/*.js",
				"!src/config/*.js",
				"<%= files.grunt %>",
				"!js",
			],
			jsDontLint: [
				"!src/templates.js",
			],
			jsTests: [
				"spec/**/*.js",
			],
			scss: "css/*.scss",
			templates: "templates/*.jst",
			jed: "node_modules/jed/jed.js",
			/**
			 * Gets the wildcard to get the grunt config files.
			 *
			 * @returns {string} The wildcard.
			 */
			get config() {
				return project.paths.config + "*.js";
			},
			grunt: "Gruntfile.js",
		},
		pkg: grunt.file.readJSON("package.json"),
	};

	// Load Grunt configurations and tasks
	loadGruntConfig(grunt, {
		configPath: path.join(process.cwd(), project.paths.config),
		data: project,
		jitGrunt: {
			customTasksDir: "grunt/custom",
		},
	});
};
