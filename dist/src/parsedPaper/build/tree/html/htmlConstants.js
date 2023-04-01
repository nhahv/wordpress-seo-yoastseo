"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const formattingElements = ["a", "abbr", "audio", "b", "bdo", "button", "canvas", "cite", "command", "data", "datalist", "dfn", "del", "em", "embed", "i", "iframe", "img", "input", "kbd", "keygen", "label", "mark", "math", "meter", "noscript", "object", "output", "progress", "q", "ruby", "samp", "select", "small", "span", "strong", "sub", "sup", "svg", "textarea", "time", "var", "video", "wbr"];

const ignoredHtmlElements = ["script", "style", "pre", "#comment", "code", "br"];

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];

exports.formattingElements = formattingElements;
exports.ignoredHtmlElements = ignoredHtmlElements;
exports.headings = headings;
