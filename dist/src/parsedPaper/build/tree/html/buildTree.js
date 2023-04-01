"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _parse = require("parse5");

var _HTMLTreeConverter = require("./HTMLTreeConverter");

var _HTMLTreeConverter2 = _interopRequireDefault(_HTMLTreeConverter);

var _postParsing = require("../cleanup/postParsing");

var _postParsing2 = _interopRequireDefault(_postParsing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildTree = function buildTree(html) {
	const parse5Tree = (0, _parse.parseFragment)(html, { sourceCodeLocationInfo: true });

	const htmlTreeConverter = new _HTMLTreeConverter2.default();
	let tree = htmlTreeConverter.convert(parse5Tree);

	tree = (0, _postParsing2.default)(tree);
	return tree;
};

exports.default = buildTree;
