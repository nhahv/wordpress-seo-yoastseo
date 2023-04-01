"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const locale = paper.getLocale();
	const transitionWords = (0, _getTransitionWords2.default)(locale);
	const sentences = (0, _getSentences2.default)(paper.getText());
	const sentenceResults = checkSentencesForTransitionWords(sentences, transitionWords);

	return {
		totalSentences: sentences.length,
		sentenceResults: sentenceResults,
		transitionWordSentences: sentenceResults.length
	};
};

var _createRegexFromDoubleArray = require("../stringProcessing/createRegexFromDoubleArray.js");

var _createRegexFromDoubleArray2 = _interopRequireDefault(_createRegexFromDoubleArray);

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _quotes = require("../stringProcessing/quotes.js");

var _getTransitionWords = require("../helpers/getTransitionWords.js");

var _getTransitionWords2 = _interopRequireDefault(_getTransitionWords);

var _matchWordInSentence = require("../stringProcessing/matchWordInSentence.js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let regexFromDoubleArray = null;
let regexFromDoubleArrayCacheKey = "";

function getRegexFromDoubleArray(twoPartTransitionWords) {
	const cacheKey = (0, _lodashEs.flattenDeep)(twoPartTransitionWords).join("");
	if (regexFromDoubleArrayCacheKey !== cacheKey || regexFromDoubleArray === null) {
		regexFromDoubleArrayCacheKey = cacheKey;
		regexFromDoubleArray = (0, _createRegexFromDoubleArray2.default)(twoPartTransitionWords);
	}
	return regexFromDoubleArray;
}

const matchTwoPartTransitionWords = function matchTwoPartTransitionWords(sentence, twoPartTransitionWords) {
	sentence = (0, _quotes.normalizeSingle)(sentence);
	const twoPartTransitionWordsRegex = getRegexFromDoubleArray(twoPartTransitionWords);
	return sentence.match(twoPartTransitionWordsRegex);
};

const matchTransitionWords = function matchTransitionWords(sentence, transitionWords) {
	sentence = (0, _quotes.normalizeSingle)(sentence);
	return transitionWords.filter(word => (0, _matchWordInSentence.isWordInSentence)(word, sentence));
};

const checkSentencesForTransitionWords = function checkSentencesForTransitionWords(sentences, transitionWords) {
	const results = [];

	sentences.forEach(sentence => {
		const twoPartMatches = matchTwoPartTransitionWords(sentence, transitionWords.twoPartTransitionWords());

		if (twoPartMatches !== null) {
			results.push({
				sentence: sentence,
				transitionWords: twoPartMatches
			});

			return;
		}

		const transitionWordMatches = matchTransitionWords(sentence, transitionWords.transitionWords);

		if (transitionWordMatches.length !== 0) {
			results.push({
				sentence: sentence,
				transitionWords: transitionWordMatches
			});

			return;
		}
	});

	return results;
};
