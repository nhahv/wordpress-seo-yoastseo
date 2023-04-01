"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _StructuredNode = require("./StructuredNode");

var _StructuredNode2 = _interopRequireDefault(_StructuredNode);

var _ListItem = require("./ListItem");

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a list of items.
 *
 * @extends module:parsedPaper/structure.Node
 *
 * @memberOf module:parsedPaper/structure
 */
class List extends _StructuredNode2.default {
	/**
  * Represents a list of items.
  *
  * @param {boolean} ordered            Whether the list is ordered or not.
  * @param {Object}  sourceCodeLocation The parse5 formatted location of the element inside of the source code.
  *
  * @returns {void}
  */
	constructor(ordered, sourceCodeLocation) {
		super("List", sourceCodeLocation);
		/**
   * If this list is ordered.
   * @type {boolean}
   */
		this.ordered = ordered;
		/**
   * This node's children (should only be list items).
   * @type {ListItem[]}
   */
		this.children = [];
	}

	/**
  * Appends the child to this List's children.
  *
  * @param {ListItem} child The child to add.
  * @returns {void}
  */
	addChild(child) {
		if (!(child instanceof _ListItem2.default)) {
			console.warn("Added child is not a ListItem!");
		}
		this.children.push(child);
	}
}
exports.default = List;
//# sourceMappingURL=List.js.map
