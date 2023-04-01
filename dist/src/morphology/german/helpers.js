"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allGermanVerbPrefixesSorted = allGermanVerbPrefixesSorted;

var _lodashEs = require("lodash-es");

function allGermanVerbPrefixesSorted(verbPrefixDataGerman) {
  const allPrefixes = (0, _lodashEs.flatten)(Object.values(verbPrefixDataGerman));

  return allPrefixes.sort((a, b) => b.length - a.length || a.localeCompare(b));
}
