"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const getElementContent = function getElementContent(element, html) {
  const location = element.location;
  if (location) {
    const start = location.startTag ? location.startTag.endOffset : location.startOffset;
    const end = location.endTag ? location.endTag.startOffset : location.endOffset;
    return html.slice(start, end);
  }
  return "";
};

exports.default = getElementContent;
