"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _LeafNode = require("./LeafNode");

var _LeafNode2 = _interopRequireDefault(_LeafNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents a text within the metadata tree branch.
 *
 * @extends module:parsedPaper/structure.LeafNode
 *
 * @memberOf module:parsedPaper/structure
 */
class MetadataText extends _LeafNode2.default {
	/**
  * Creates a new MetadataText node.
  *
  * @param {string} type The type of this node.
  * @param {string} text The text of this node.
  *
  * @constructor
  */
	constructor(type = "MetadataText", text = "") {
		super(type, null);

		this.text = text;
	}
}

exports.default = MetadataText;
//# sourceMappingURL=MetadataText.js.map
