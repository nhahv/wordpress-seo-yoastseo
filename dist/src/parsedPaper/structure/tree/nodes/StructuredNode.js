"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a piece of structure that is present in the original text, but is not relevant for the further analysis
 * of the text.
 *
 * Talking about HTML, this would encompass thing like `<div>`, `<section>`, `<aside>`, `<fieldset>`
 * and other HTML block elements.
 *
 * @extends module:parsedPaper/structure.Node
 *
 * @memberOf module:parsedPaper/structure
 */
class StructuredNode extends _Node2.default {
	/**
  * Represents a piece of structure that is present in the original text, but is not relevant for the further
  * analysis of the text.
  *
  * Talking about HTML, this would encompass thing like `<div>`, `<section>`, `<aside>`, `<fieldset>`
  * and other HTML block elements.
  *
  * @param {string} tag                The tag used in the node.
  * @param {?Object} sourceCodeLocation The parse5 formatted location of the element inside of the source code.
  *
  * @returns {void}
  */
	constructor(tag, sourceCodeLocation) {
		super("StructuredNode", sourceCodeLocation);
		/**
   * Type of structured node (e.g. "div", "section" etc.).
   * @type {string}
   */
		this.tag = tag;
		/**
   * This node's child nodes.
   * @type {module:parsedPaper/structure.Node[]}
   */
		this.children = [];
	}

	/**
  * Adds a child and sets its parent to this node.
  *
  * @param {module:parsedPaper/structure.Node} child The child to add.
  *
  * @returns {void}
  */
	addChild(child) {
		child.parent = this;
		this.children.push(child);
	}
}
exports.default = StructuredNode;
//# sourceMappingURL=StructuredNode.js.map
