"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Gets the content of an element (the part _between_ the opening and closing tag) from the HTML source code.
 *
 * @param {module:parsedPaper/structure.Node|module:parsedPaper/structure.FormattingElement} element The element to parse the contents of
 * @param {string} html                                                                The source code to parse the contents from
 *
 * @returns {string} The element's contents.
 *
 * @private
 */
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
//# sourceMappingURL=getElementContent.js.map
