"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = includesAny;

var _lodashEs = require("lodash-es");

function includesAny(collection, values) {
  for (let i = 0; i < values.length; i++) {
    if ((0, _lodashEs.includes)(collection, values[i])) {
      return true;
    }
  }

  return false;
}
