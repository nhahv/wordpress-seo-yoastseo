"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _buildTree = require("./html/buildTree");

var _buildTree2 = _interopRequireDefault(_buildTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TreeBuilder {
	constructor() {
		this._buildFunctions = {
			html: _buildTree2.default
		};

		this.build = this.build.bind(this);
		this.register = this.register.bind(this);
	}

	build(sourceText, options = { language: "html" }) {
		return this._buildFunctions[options.language](sourceText);
	}

	register(language, buildFunction) {
		this._buildFunctions[language] = buildFunction;
	}
}

exports.default = TreeBuilder;
