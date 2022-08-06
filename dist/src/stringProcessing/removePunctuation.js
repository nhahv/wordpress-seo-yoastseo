"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (text) {
  text = text.replace(punctuationRegexStart, "");
  text = text.replace(punctuationRegexEnd, "");

  return text;
};

var punctuationRegexString = "[\\–\\-\\(\\)_\\[\\]’“”〝〞〟‟„\"'.?!:;,¿¡«»‹›\u2014\u00d7\u002b\u0026\u06d4\u061f\u060C\u061B\\<\>]+";
var punctuationRegexStart = new RegExp("^" + punctuationRegexString);
var punctuationRegexEnd = new RegExp(punctuationRegexString + "$");
