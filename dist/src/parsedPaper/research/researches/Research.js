"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _tree = require("../../structure/tree");

class Research {
	isLeafNode(node) {
		return node instanceof _tree.LeafNode;
	}

	calculateFor(node, metadata) {
		console.warn("calculateFor should be implemented by a child class of Researcher.");
	}

	mergeChildrenResults(results) {
		return (0, _lodashEs.flatten)(results);
	}
}

exports.default = Research;
