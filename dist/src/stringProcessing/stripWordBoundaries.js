"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const wordBoundary = "[ \\u00a0\\u06d4\\u061f\\u060C\\u061B \\n\\r\\t.,'()\"+\\-;!?:/»«‹›<>]";
const wordBoundaryStart = new RegExp("^(" + wordBoundary + "+)", "ig");
const wordBoundaryEnd = new RegExp("(" + wordBoundary + "+$)", "ig");

const stripWordBoundariesStart = function stripWordBoundariesStart(text) {
  text = text.replace(wordBoundaryStart, "");

  return text;
};

const stripWordBoundariesEnd = function stripWordBoundariesEnd(text) {
  text = text.replace(wordBoundaryEnd, "");

  return text;
};

const stripWordBoundariesEverywhere = function stripWordBoundariesEverywhere(text) {
  text = text.replace(wordBoundaryStart, "");
  text = text.replace(wordBoundaryEnd, "");

  return text;
};

exports.stripWordBoundariesStart = stripWordBoundariesStart;
exports.stripWordBoundariesEnd = stripWordBoundariesEnd;
exports.stripWordBoundariesEverywhere = stripWordBoundariesEverywhere;
exports.default = {
  stripWordBoundariesStart: stripWordBoundariesStart,
  stripWordBoundariesEnd: stripWordBoundariesEnd,
  stripWordBoundariesEverywhere: stripWordBoundariesEverywhere
};
