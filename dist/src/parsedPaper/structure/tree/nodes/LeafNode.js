"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _TextContainer = require("../TextContainer");

var _TextContainer2 = _interopRequireDefault(_TextContainer);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LeafNode extends _Node2.default {
	constructor(type, sourceCodeLocation) {
		super(type, sourceCodeLocation);

		this.textContainer = new _TextContainer2.default();
	}

	get text() {
		return this.textContainer.text;
	}

	set text(text) {
		this.textContainer.text = text;
	}

	appendText(text) {
		this.textContainer.appendText(text);
	}

	addFormatting(formatting) {
		formatting.parent = this;
		this.textContainer.formatting.push(formatting);
	}
}

exports.default = LeafNode;
