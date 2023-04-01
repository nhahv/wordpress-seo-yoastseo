"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StructuredNode extends _Node2.default {
	constructor(tag, sourceCodeLocation) {
		super("StructuredNode", sourceCodeLocation);

		this.tag = tag;

		this.children = [];
	}

	addChild(child) {
		child.parent = this;
		this.children.push(child);
	}
}
exports.default = StructuredNode;
