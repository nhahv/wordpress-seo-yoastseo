"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _StructuredNode = require("./StructuredNode");

var _StructuredNode2 = _interopRequireDefault(_StructuredNode);

var _ListItem = require("./ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class List extends _StructuredNode2.default {
	constructor(ordered, sourceCodeLocation) {
		super("List", sourceCodeLocation);

		this.ordered = ordered;

		this.children = [];
	}

	addChild(child) {
		if (!(child instanceof _ListItem2.default)) {
			console.warn("Added child is not a ListItem!");
		}
		this.children.push(child);
	}
}
exports.default = List;
