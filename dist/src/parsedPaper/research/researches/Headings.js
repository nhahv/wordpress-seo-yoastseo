"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tree = require("../../structure/tree");

var _Research = require("./Research");

var _Research2 = _interopRequireDefault(_Research);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Headings extends _Research2.default {
	calculateFor(node) {
		return node instanceof _tree.Heading ? Promise.resolve([node]) : Promise.resolve([]);
	}
}

exports.default = Headings;
