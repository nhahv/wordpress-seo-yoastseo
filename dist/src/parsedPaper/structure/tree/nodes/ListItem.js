"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _LeafNode = require("./LeafNode");

var _LeafNode2 = _interopRequireDefault(_LeafNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents an item within a list.
 *
 * @extends module:parsedPaper/structure.Node
 *
 * @memberOf module:parsedPaper/structure
 */
class ListItem extends _LeafNode2.default {
	/**
  * Represents an item within a list.
  *
  * @param {Object} sourceCodeLocation The parse5 formatted location of the element inside of the source code.
  *
  * @returns {void}
  */
	constructor(sourceCodeLocation) {
		super("ListItem", sourceCodeLocation);
		/**
   * This ListItem's child nodes.
   * @type {Node[]}
   */
		this.children = [];
	}
}
exports.default = ListItem;
//# sourceMappingURL=ListItem.js.map
