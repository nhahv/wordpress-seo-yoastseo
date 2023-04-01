"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripBlockTagsAtStartEnd = exports.stripIncompleteTags = exports.stripFullTags = undefined;

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _html = require("../helpers/html.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blockElementStartRegex = new RegExp("^<(" + _html.blockElements.join("|") + ")[^>]*?>", "i");
var blockElementEndRegex = new RegExp("</(" + _html.blockElements.join("|") + ")[^>]*?>$", "i");

var stripIncompleteTags = function stripIncompleteTags(text) {
  text = text.replace(/^(<\/([^>]+)>)+/i, "");
  text = text.replace(/(<([^/>]+)>)+$/i, "");
  return text;
};

var stripBlockTagsAtStartEnd = function stripBlockTagsAtStartEnd(text) {
  text = text.replace(blockElementStartRegex, "");
  text = text.replace(blockElementEndRegex, "");
  return text;
};

var stripFullTags = function stripFullTags(text) {
  text = text.replace(/(<([^>]+)>)/ig, " ");
  text = (0, _stripSpaces2.default)(text);
  return text;
};

exports.stripFullTags = stripFullTags;
exports.stripIncompleteTags = stripIncompleteTags;
exports.stripBlockTagsAtStartEnd = stripBlockTagsAtStartEnd;
exports.default = {
  stripFullTags: stripFullTags,
  stripIncompleteTags: stripIncompleteTags,
  stripBlockTagsAtStartEnd: stripBlockTagsAtStartEnd
};
