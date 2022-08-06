"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SentencePart = require("../../../values/SentencePart.js");

var _SentencePart2 = _interopRequireDefault(_SentencePart);

var _getParticiples = require("./getParticiples.js");

var _getParticiples2 = _interopRequireDefault(_getParticiples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HungarianSentencePart = function HungarianSentencePart(sentencePartText, auxiliaries, locale) {
  _SentencePart2.default.call(this, sentencePartText, auxiliaries, locale);
};

require("util").inherits(HungarianSentencePart, _SentencePart2.default);

HungarianSentencePart.prototype.getParticiples = function () {
  return (0, _getParticiples2.default)(this.getSentencePartText(), this.getAuxiliaries(), "hu");
};

exports.default = HungarianSentencePart;
