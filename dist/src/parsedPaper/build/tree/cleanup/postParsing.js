"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tree = require("../../../structure/tree");

var _calculateTextIndices = require("./calculateTextIndices");

var _calculateTextIndices2 = _interopRequireDefault(_calculateTextIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Cleans up a node in the tree.
 *
 * @param {module:parsedPaper/structure.Node} node The node that needs to be cleaned.
 *
 * @returns {module:parsedPaper/structure.Node} The cleaned up node.
 *
 * @private
 */
const cleanUpNode = function cleanUpNode(node) {
  // Clean up formatting elements in headings and paragraphs.
  if (node instanceof _tree.LeafNode) {
    // Start and end position in leaf node's (header's or paragraph's) text without formatting.
    (0, _calculateTextIndices2.default)(node);
  }
  return node;
};

/**
 * Cleans up the given tree after parsing of the HTML source code
 * by setting the start and end index of each formatting element in a leaf node's text.
 *
 * @param {module:parsedPaper/structure.Node} tree The tree structure to be cleaned.
 *
 * @returns {module:parsedPaper/structure.Node} The cleaned up tree.
 *
 * @private
 */
const cleanUpTree = function cleanUpTree(tree) {
  tree.map(node => cleanUpNode(node));
  return tree;
};

exports.default = cleanUpTree;
//# sourceMappingURL=postParsing.js.map
