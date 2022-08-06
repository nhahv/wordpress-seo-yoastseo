"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

function removeDuplicateMarks(marks) {
  return (0, _lodashEs.uniqBy)(marks, function (mark) {
    return mark.getOriginal();
  });
}

exports.default = removeDuplicateMarks;
