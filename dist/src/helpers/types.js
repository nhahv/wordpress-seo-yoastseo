"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getType = function getType(subject) {
  if (Array.isArray(subject)) {
    return "array";
  }
  return typeof subject;
};

var isSameType = function isSameType(subject, expectedType) {
  var passedType = getType(subject);
  return passedType === expectedType;
};

exports.getType = getType;
exports.isSameType = isSameType;
exports.default = {
  getType: getType,
  isSameType: isSameType
};
