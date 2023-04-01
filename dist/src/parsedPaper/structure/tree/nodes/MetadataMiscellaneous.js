"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Represents miscellaneous metadata within the metadata tree branch.
 *
 * @extends module:parsedPaper/structure.LeafNode
 *
 * @memberOf module:parsedPaper/structure
 */
class MetadataMiscellaneous extends _Node2.default {
	/**
  * Creates a new MetadataMiscellaneous node.
  *
  * @param {string} type The type of this node.
  * @param {*} [data=null] The data.
  *
  * @constructor
  */
	constructor(type = "MetadataMiscellaneous", data = null) {
		super(type, null);

		this._data = data;
	}

	/**
  * Retrieves the data.
  *
  * @returns {*} The data.
  */
	get data() {
		return this._data;
	}

	/**
  * Sets the data.
  *
  * @param {*} data The data to keep.
  *
  * @returns {void}
  */
	set data(data) {
		this._data = data;
	}
}

exports.default = MetadataMiscellaneous;
//# sourceMappingURL=MetadataMiscellaneous.js.map
