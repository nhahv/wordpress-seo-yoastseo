"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenSortLength = flattenSortLength;

var _lodashEs = require("lodash-es");

function flattenSortLength(dataWords) {
  const allWords = (0, _lodashEs.flatten)(Object.values(dataWords));

  return allWords.sort((a, b) => b.length - a.length || a.localeCompare(b));
}
