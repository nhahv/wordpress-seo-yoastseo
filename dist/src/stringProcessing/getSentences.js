"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	text = (0, _unifyWhitespace.unifyNonBreakingSpace)(text);
	let blocks = (0, _html.getBlocks)(text);

	blocks = (0, _lodashEs.flatMap)(blocks, function (block) {
		return block.split(newLineRegex);
	});

	const sentences = (0, _lodashEs.flatMap)(blocks, getSentencesFromBlockCached);

	return (0, _lodashEs.filter)(sentences, (0, _lodashEs.negate)(_lodashEs.isEmpty));
};

var _lodashEs = require("lodash-es");

var _html = require("../helpers/html.js");

var _unifyWhitespace = require("../stringProcessing/unifyWhitespace.js");

var _SentenceTokenizer = require("./SentenceTokenizer");

var _SentenceTokenizer2 = _interopRequireDefault(_SentenceTokenizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newLines = "\n\r|\n|\r";

const newLineRegex = new RegExp(newLines);

function getSentencesFromBlock(block) {
	const sentenceTokenizer = new _SentenceTokenizer2.default();

	var _sentenceTokenizer$cr = sentenceTokenizer.createTokenizer();

	const tokenizer = _sentenceTokenizer$cr.tokenizer,
	      tokens = _sentenceTokenizer$cr.tokens;

	sentenceTokenizer.tokenize(tokenizer, block);

	return tokens.length === 0 ? [] : sentenceTokenizer.getSentencesFromTokens(tokens);
}

const getSentencesFromBlockCached = (0, _lodashEs.memoize)(getSentencesFromBlock);
