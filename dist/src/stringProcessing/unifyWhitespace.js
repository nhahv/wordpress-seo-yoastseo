"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var unifyNonBreakingSpace = function unifyNonBreakingSpace(text) {
  return text.replace(/&nbsp;/g, " ");
};

var unifyWhiteSpace = function unifyWhiteSpace(text) {
  return text.replace(/\s/g, " ");
};

var unifyAllSpaces = function unifyAllSpaces(text) {
  text = unifyNonBreakingSpace(text);
  return unifyWhiteSpace(text);
};

exports.unifyNonBreakingSpace = unifyNonBreakingSpace;
exports.unifyWhiteSpace = unifyWhiteSpace;
exports.unifyAllSpaces = unifyAllSpaces;
exports.default = {
  unifyNonBreakingSpace: unifyNonBreakingSpace,
  unifyWhiteSpace: unifyWhiteSpace,
  unifyAllSpaces: unifyAllSpaces
};
