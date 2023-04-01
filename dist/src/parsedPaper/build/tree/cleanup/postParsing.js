"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tree = require("../../../structure/tree");

var _calculateTextIndices = require("./calculateTextIndices");

var _calculateTextIndices2 = _interopRequireDefault(_calculateTextIndices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cleanUpNode = function cleanUpNode(node) {
  if (node instanceof _tree.LeafNode) {
    (0, _calculateTextIndices2.default)(node);
  }
  return node;
};

const cleanUpTree = function cleanUpTree(tree) {
  tree.map(node => cleanUpNode(node));
  return tree;
};

exports.default = cleanUpTree;
