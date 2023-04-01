"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _LeafNode = require("./LeafNode");

var _LeafNode2 = _interopRequireDefault(_LeafNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListItem extends _LeafNode2.default {
	constructor(sourceCodeLocation) {
		super("ListItem", sourceCodeLocation);

		this.children = [];
	}
}
exports.default = ListItem;
