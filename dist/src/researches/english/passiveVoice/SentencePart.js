"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SentencePart = require("../../../values/SentencePart.js");

var _SentencePart2 = _interopRequireDefault(_SentencePart);

var _getParticiples = require("../../passiveVoice/periphrastic/getParticiples.js");

var _getParticiples2 = _interopRequireDefault(_getParticiples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnglishSentencePart = function EnglishSentencePart(sentencePartText, auxiliaries, locale) {
  _SentencePart2.default.call(this, sentencePartText, auxiliaries, locale);
};

require("util").inherits(EnglishSentencePart, _SentencePart2.default);

EnglishSentencePart.prototype.getParticiples = function () {
  return (0, _getParticiples2.default)(this.getSentencePartText(), this.getAuxiliaries(), "en");
};

exports.default = EnglishSentencePart;
