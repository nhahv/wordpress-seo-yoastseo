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

/**
 * Parses the given html-string to a tree, to be used in further analysis.
 *
 * @param {string} html The html-string that should be parsed.
 *
 * @returns {module:parsedPaper/structure.Node} The build tree.
 *
 * @memberOf module:parsedPaper/builder
 */
const buildTree = function buildTree(html) {
	/*
  * Parsing of a HTML article takes on average 19ms
  * (based on the fullTexts in the specs (n=24), measured using `console.time`).
  */
	const parse5Tree = (0, _parse.parseFragment)(html, { sourceCodeLocationInfo: true });

	const htmlTreeConverter = new _HTMLTreeConverter2.default();
	let tree = htmlTreeConverter.convert(parse5Tree);

	// Cleanup takes < 2ms.
	tree = (0, _postParsing2.default)(tree);
	return tree;
};

exports.default = buildTree;
//# sourceMappingURL=buildTree.js.map
