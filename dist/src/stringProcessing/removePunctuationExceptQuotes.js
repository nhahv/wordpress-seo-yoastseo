"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  text = text.replace(punctuationRegexStart, "");
  text = text.replace(punctuationRegexEnd, "");

  return text;
};

const punctuationRegexString = "[\\–\\-\\(\\)_\\[\\]’'.?!:;,¿¡«»‹›\u2014\u00d7\u002b\u0026\<\>]+";
const punctuationRegexStart = new RegExp("^" + punctuationRegexString);
const punctuationRegexEnd = new RegExp(punctuationRegexString + "$");
