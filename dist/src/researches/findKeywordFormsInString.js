"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findTopicFormsInString = exports.findWordFormsInString = undefined;

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray.js");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findWordFormsInString = function findWordFormsInString(keywordForms, text, locale) {
	const wordNumber = keywordForms.length;
	const foundWords = Array(wordNumber);

	for (let i = 0; i < wordNumber; i++) {
		const found = (0, _matchTextWithArray2.default)(text, keywordForms[i], locale).count > 0;
		foundWords[i] = found ? 1 : 0;
	}
	const foundNumberOfWords = (0, _lodashEs.sum)(foundWords);
	const result = {
		countWordMatches: foundNumberOfWords,
		percentWordMatches: 0
	};

	if (wordNumber > 0) {
		result.percentWordMatches = Math.round(foundNumberOfWords / wordNumber * 100);
	}

	return result;
};

const findTopicFormsInString = function findTopicFormsInString(topicForms, text, useSynonyms, locale) {
	let result = findWordFormsInString(topicForms.keyphraseForms, text, locale);
	result.keyphraseOrSynonym = "keyphrase";

	if (result.percentWordMatches === 100 || useSynonyms === false || (0, _lodashEs.isEmpty)(topicForms.synonymsForms)) {
		return result;
	}

	const resultsSynonyms = [];
	for (let i = 0; i < topicForms.synonymsForms.length; i++) {
		const synonym = topicForms.synonymsForms[i];
		resultsSynonyms[i] = findWordFormsInString(synonym, text, locale);
	}

	const foundSynonyms = resultsSynonyms.map(resultSynonyms => resultSynonyms.percentWordMatches);
	const bestSynonymIndex = foundSynonyms.indexOf(Math.max(...foundSynonyms));

	if (result.percentWordMatches >= resultsSynonyms[bestSynonymIndex].percentWordMatches) {
		return result;
	}

	result = resultsSynonyms[bestSynonymIndex];
	result.keyphraseOrSynonym = "synonym";

	return result;
};

exports.findWordFormsInString = findWordFormsInString;
exports.findTopicFormsInString = findTopicFormsInString;
