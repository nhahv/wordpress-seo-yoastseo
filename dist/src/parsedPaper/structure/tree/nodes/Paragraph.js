"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _LeafNode = require("./LeafNode");

var _LeafNode2 = _interopRequireDefault(_LeafNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a paragraph with text within a document.
 *
 * @extends module:parsedPaper/structure.LeafNode
 *
 * @memberOf module:parsedPaper/structure
 */
class Paragraph extends _LeafNode2.default {
	/**
  * A paragraph within a document.
  *
  * @param {Object}  sourceCodeLocation The parse5 formatted location of the element inside of the source code.
  * @param {boolean} [isImplicit=false] If this paragraph is implicit.
  */
	constructor(sourceCodeLocation, isImplicit = false) {
		super("Paragraph", sourceCodeLocation);

		this.isImplicit = isImplicit;
	}
}

exports.default = Paragraph;
//# sourceMappingURL=Paragraph.js.map
