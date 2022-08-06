"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  return text.replace(sentenceTerminators, "");
};

var sentenceTerminators = /[.?!:;,]/g;
