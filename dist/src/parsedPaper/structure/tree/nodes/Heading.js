"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _LeafNode = require("./LeafNode");

var _LeafNode2 = _interopRequireDefault(_LeafNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A header in a document.
 *
 * @extends module:parsedPaper/structure.LeafNode
 *
 * @memberOf module:parsedPaper/structure
 */
class Heading extends _LeafNode2.default {
	/**
  * Makes a new header object.
  *
  * @param {number} level              The header level (e.g. 1 for main heading, 2 for subheading lvl 2, etc.)
  * @param {Object} sourceCodeLocation The parse5 formatted location of the element inside of the source code.
  */
	constructor(level, sourceCodeLocation) {
		super("Heading", sourceCodeLocation);
		/**
   * Heading's level (e.g. 1 for "h1", 2 for "h2", ... ).
   * @type {number}
   */
		this.level = level;
	}
}
exports.default = Heading;
//# sourceMappingURL=Heading.js.map
