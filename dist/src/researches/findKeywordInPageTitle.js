"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	let keyword = (0, _lodashEs.escapeRegExp)(paper.getKeyword());
	const title = paper.getTitle();
	const locale = paper.getLocale();

	const result = { exactMatchFound: false, allWordsFound: false, position: -1, exactMatchKeyphrase: false };

	const exactMatchRequest = processExactMatchRequest(keyword);
	if (exactMatchRequest.exactMatchRequested) {
		keyword = exactMatchRequest.keyword;
		result.exactMatchKeyphrase = true;
	}

	const keywordMatched = (0, _matchTextWithWord2.default)(title, keyword, locale);

	if (keywordMatched.count > 0) {
		result.exactMatchFound = true;
		result.allWordsFound = true;
		result.position = adjustPosition(title, keywordMatched.position, locale);

		return result;
	}

	const topicForms = researcher.getResearch("morphology");

	const useSynonyms = false;

	const separateWordsMatched = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, title, useSynonyms, locale);

	if (separateWordsMatched.percentWordMatches === 100) {
		result.allWordsFound = true;
	}

	return result;
};

var _matchTextWithWord = require("../stringProcessing/matchTextWithWord.js");

var _matchTextWithWord2 = _interopRequireDefault(_matchTextWithWord);

var _findKeywordFormsInString = require("./findKeywordFormsInString.js");

var _getFunctionWords = require("../helpers/getFunctionWords");

var _getFunctionWords2 = _interopRequireDefault(_getFunctionWords);

var _lodashEs = require("lodash-es");

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFunctionWords = (0, _getFunctionWords2.default)();

const stripFunctionWordsFromStart = function stripFunctionWordsFromStart(functionWords, str) {
	str = str.toLocaleLowerCase();
	let titleWords = (0, _getWords2.default)(str.toLocaleLowerCase());

	titleWords = (0, _lodashEs.filter)(titleWords, function (word) {
		return !(0, _lodashEs.includes)(functionWords, word.trim().toLocaleLowerCase());
	});

	return (0, _lodashEs.isEmpty)(titleWords);
};

const processExactMatchRequest = function processExactMatchRequest(keyword) {
	const exactMatchRequest = { exactMatchRequested: false, keyword: keyword };

	const doubleQuotes = ["“", "”", "〝", "〞", "〟", "‟", "„", "\""];
	if ((0, _lodashEs.includes)(doubleQuotes, keyword[0]) && (0, _lodashEs.includes)(doubleQuotes, keyword[keyword.length - 1])) {
		exactMatchRequest.keyword = keyword.substring(1, keyword.length - 1);
		exactMatchRequest.exactMatchRequested = true;
	}

	return exactMatchRequest;
};

const adjustPosition = function adjustPosition(title, position, locale) {
	if (position === 0) {
		return position;
	}

	const language = (0, _getLanguage2.default)(locale);
	const functionWords = (0, _lodashEs.get)(getFunctionWords, [language], []);
	if ((0, _lodashEs.isUndefined)(functionWords.all)) {
		return position;
	}

	const titleBeforeKeyword = title.substr(0, position);
	if (stripFunctionWordsFromStart(functionWords.all, titleBeforeKeyword)) {
		return 0;
	}

	return position;
};
