"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTextIntoSentences = undefined;

var _SentenceTokenizer = require("./SentenceTokenizer");

var _SentenceTokenizer2 = _interopRequireDefault(_SentenceTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseTextIntoSentences = function parseTextIntoSentences(text) {
  const sentenceTokenizer = new _SentenceTokenizer2.default();

  var _sentenceTokenizer$cr = sentenceTokenizer.createTokenizer();

  const tokenizer = _sentenceTokenizer$cr.tokenizer,
        tokens = _sentenceTokenizer$cr.tokens;


  sentenceTokenizer.tokenize(tokenizer, text);
  return sentenceTokenizer.getSentencesFromTokens(tokens);
};

exports.parseTextIntoSentences = parseTextIntoSentences;
