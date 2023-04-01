"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	var sentences = (0, _getSentences2.default)(paper.getText());

	return (0, _lodashEs.map)(sentences, function (sentence) {
		return {
			sentence: sentence,
			words: getWordComplexityForSentence(sentence)
		};
	});
};

var _getWords = require("../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _count = require("../stringProcessing/syllables/count.js");

var _count2 = _interopRequireDefault(_count);

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWordComplexityForSentence = function getWordComplexityForSentence(sentence) {
	var words = (0, _getWords2.default)(sentence);
	var results = [];

	(0, _lodashEs.forEach)(words, function (word, i) {
		results.push({
			word: word,
			wordIndex: i,
			complexity: (0, _count2.default)(word)
		});
	});

	return results;
};
