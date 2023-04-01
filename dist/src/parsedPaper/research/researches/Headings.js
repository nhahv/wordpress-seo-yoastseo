"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tree = require("../../structure/tree");

var _Research = require("./Research");

var _Research2 = _interopRequireDefault(_Research);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A research giving back the headings located in a text.
 */
class Headings extends _Research2.default {
	/**
  * Calculates the result of the research for the given Node.
  *
  * @param {module:parsedPaper/structure.Node} node The node to do the research on.
  *
  * @returns {Promise<module:parsedPaper/structure.Heading[]|[]>} The result of the research.
  */
	calculateFor(node) {
		return node instanceof _tree.Heading ? Promise.resolve([node]) : Promise.resolve([]);
	}
}

exports.default = Headings;
//# sourceMappingURL=Headings.js.map
