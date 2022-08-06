"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentence, language) {
	return getSentenceParts(sentence, language);
};

var _indices = require("../../../stringProcessing/indices");

var _indices2 = _interopRequireDefault(_indices);

var _stripSpaces = require("../../../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _quotes = require("../../../stringProcessing/quotes.js");

var _createRegexFromArray = require("../../../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _getIndicesWithRegex = require("./getIndicesWithRegex.js");

var _getIndicesWithRegex2 = _interopRequireDefault(_getIndicesWithRegex);

var _includesIndex = require("../../../stringProcessing/includesIndex");

var _includesIndex2 = _interopRequireDefault(_includesIndex);

var _followsIndex = require("../../../stringProcessing/followsIndex");

var _followsIndex2 = _interopRequireDefault(_followsIndex);

var _lodashEs = require("lodash-es");

var _SentencePart = require("../../english/passiveVoice/SentencePart");

var _SentencePart2 = _interopRequireDefault(_SentencePart);

var _auxiliaries = require("../../english/passiveVoice/auxiliaries.js");

var _auxiliaries2 = _interopRequireDefault(_auxiliaries);

var _stopwords = require("../../english/passiveVoice/stopwords.js");

var _stopwords2 = _interopRequireDefault(_stopwords);

var _SentencePart3 = require("../../french/passiveVoice/SentencePart");

var _SentencePart4 = _interopRequireDefault(_SentencePart3);

var _auxiliaries3 = require("../../french/passiveVoice/auxiliaries.js");

var _auxiliaries4 = _interopRequireDefault(_auxiliaries3);

var _stopwords3 = require("../../french/passiveVoice/stopwords.js");

var _stopwords4 = _interopRequireDefault(_stopwords3);

var _SentencePart5 = require("../../spanish/passiveVoice/SentencePart");

var _SentencePart6 = _interopRequireDefault(_SentencePart5);

var _auxiliaries5 = require("../../spanish/passiveVoice/auxiliaries.js");

var _auxiliaries6 = _interopRequireDefault(_auxiliaries5);

var _stopwords5 = require("../../spanish/passiveVoice/stopwords.js");

var _stopwords6 = _interopRequireDefault(_stopwords5);

var _SentencePart7 = require("../../portuguese/passiveVoice/SentencePart");

var _SentencePart8 = _interopRequireDefault(_SentencePart7);

var _auxiliaries7 = require("../../portuguese/passiveVoice/auxiliaries.js");

var _auxiliaries8 = _interopRequireDefault(_auxiliaries7);

var _stopwords7 = require("../../portuguese/passiveVoice/stopwords.js");

var _stopwords8 = _interopRequireDefault(_stopwords7);

var _SentencePart9 = require("../../italian/passiveVoice/SentencePart");

var _SentencePart10 = _interopRequireDefault(_SentencePart9);

var _auxiliaries9 = require("../../italian/passiveVoice/auxiliaries.js");

var _auxiliaries10 = _interopRequireDefault(_auxiliaries9);

var _stopwords9 = require("../../italian/passiveVoice/stopwords.js");

var _stopwords10 = _interopRequireDefault(_stopwords9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getIndicesOfList = _indices2.default.getIndicesByWordList;
const filterIndices = _indices2.default.filterIndices;
const sortIndices = _indices2.default.sortIndices;

const auxiliariesEnglish = (0, _auxiliaries2.default)().all;

const stopwordsEnglish = (0, _stopwords2.default)();
const stopCharacterRegexEnglish = /([:,]|('ll)|('ve))(?=[ \n\r\t'"+\-»«‹›<>])/ig;
const verbEndingInIngRegex = /\w+ing(?=$|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;
const ingExclusionArray = ["king", "cling", "ring", "being", "thing", "something", "anything"];

const auxiliariesFrench = (0, _auxiliaries4.default)();

const stopwordsFrench = (0, _stopwords4.default)();
const stopCharacterRegexFrench = /(,)(?=[ \n\r\t'"+\-»«‹›<>])/ig;
const followingAuxiliaryExceptionWordsFrench = ["le", "la", "les", "une", "l'un", "l'une"];
const reflexivePronounsFrench = ["se", "me", "te", "s'y", "m'y", "t'y", "nous nous", "vous vous"];
const directPrecedenceExceptionRegexFrench = (0, _createRegexFromArray2.default)(reflexivePronounsFrench);
const elisionAuxiliaryExceptionWords = ["c'", "s'", "peut-"];
const elisionAuxiliaryExceptionRegex = (0, _createRegexFromArray2.default)(elisionAuxiliaryExceptionWords, true);

const auxiliariesSpanish = (0, _auxiliaries6.default)();

const stopwordsSpanish = (0, _stopwords6.default)();
const followingAuxiliaryExceptionWordsSpanish = ["el", "la", "los", "las", "una"];

const auxiliariesPortuguese = (0, _auxiliaries8.default)();

const stopwordsPortuguese = (0, _stopwords8.default)();
const followingAuxiliaryExceptionWordsPortuguese = ["o", "a", "os", "as", "um", "ums", "uma", "umas"];

const auxiliariesItalian = (0, _auxiliaries10.default)();

const stopwordsItalian = (0, _stopwords10.default)();
const followingAuxiliaryExceptionWordsItalian = ["il", "i", "la", "le", "lo", "gli", "uno", "una"];
const reflexivePronounsItalian = ["mi", "ti", "si", "ci", "vi"];
const directPrecedenceExceptionRegexItalian = (0, _createRegexFromArray2.default)(reflexivePronounsItalian);

const stopCharacterRegexOthers = /([:,])(?=[ \n\r\t'"+\-»«‹›<>])/ig;

const languageVariables = {
	en: {
		stopwords: stopwordsEnglish,
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesEnglish),
		SentencePart: _SentencePart2.default,
		auxiliaries: auxiliariesEnglish,
		stopCharacterRegex: stopCharacterRegexEnglish
	},
	fr: {
		stopwords: stopwordsFrench,
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesFrench),
		SentencePart: _SentencePart4.default,
		auxiliaries: auxiliariesFrench,
		stopCharacterRegex: stopCharacterRegexFrench,
		followingAuxiliaryExceptionRegex: (0, _createRegexFromArray2.default)(followingAuxiliaryExceptionWordsFrench),
		directPrecedenceExceptionRegex: directPrecedenceExceptionRegexFrench
	},
	es: {
		stopwords: stopwordsSpanish,
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesSpanish),
		SentencePart: _SentencePart6.default,
		auxiliaries: auxiliariesSpanish,
		stopCharacterRegex: stopCharacterRegexOthers,
		followingAuxiliaryExceptionRegex: (0, _createRegexFromArray2.default)(followingAuxiliaryExceptionWordsSpanish)
	},
	pt: {
		stopwords: stopwordsPortuguese,
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesPortuguese),
		SentencePart: _SentencePart8.default,
		auxiliaries: auxiliariesPortuguese,
		stopCharacterRegex: stopCharacterRegexOthers,
		followingAuxiliaryExceptionRegex: (0, _createRegexFromArray2.default)(followingAuxiliaryExceptionWordsPortuguese)
	},
	it: {
		stopwords: stopwordsItalian,
		auxiliaryRegex: (0, _createRegexFromArray2.default)(auxiliariesItalian),
		SentencePart: _SentencePart10.default,
		auxiliaries: auxiliariesItalian,
		stopCharacterRegex: stopCharacterRegexOthers,
		followingAuxiliaryExceptionRegex: (0, _createRegexFromArray2.default)(followingAuxiliaryExceptionWordsItalian),
		directPrecedenceExceptionRegex: directPrecedenceExceptionRegexItalian
	}
};

const getVerbsEndingInIng = function getVerbsEndingInIng(sentence) {
	const matches = sentence.match(verbEndingInIngRegex) || [];

	return (0, _lodashEs.filter)(matches, function (match) {
		return !(0, _lodashEs.includes)(ingExclusionArray, (0, _stripSpaces2.default)(match));
	});
};

const getStopCharacters = function getStopCharacters(sentence, language) {
	const stopCharacterRegex = languageVariables[language].stopCharacterRegex;
	let match;
	const matches = [];

	stopCharacterRegex.lastIndex = 0;

	while ((match = stopCharacterRegex.exec(sentence)) !== null) {
		matches.push({
			index: match.index,
			match: match[0]
		});
	}
	return matches;
};

const auxiliaryPrecedenceExceptionFilter = function auxiliaryPrecedenceExceptionFilter(text, auxiliaryMatches, language) {
	const directPrecedenceExceptionMatches = (0, _getIndicesWithRegex2.default)(text, languageVariables[language].directPrecedenceExceptionRegex);

	(0, _lodashEs.forEach)(auxiliaryMatches, function (auxiliaryMatch) {
		if ((0, _includesIndex2.default)(directPrecedenceExceptionMatches, auxiliaryMatch.index)) {
			auxiliaryMatches = auxiliaryMatches.filter(function (auxiliaryObject) {
				return auxiliaryObject.index !== auxiliaryMatch.index;
			});
		}
	});

	return auxiliaryMatches;
};

const followingAuxiliaryExceptionFilter = function followingAuxiliaryExceptionFilter(text, auxiliaryMatches, language) {
	const followingAuxiliaryExceptionRegex = languageVariables[language].followingAuxiliaryExceptionRegex;
	const followingAuxiliaryExceptionMatches = (0, _getIndicesWithRegex2.default)(text, followingAuxiliaryExceptionRegex);

	(0, _lodashEs.forEach)(auxiliaryMatches, function (auxiliaryMatch) {
		if ((0, _followsIndex2.default)(followingAuxiliaryExceptionMatches, auxiliaryMatch)) {
			auxiliaryMatches = auxiliaryMatches.filter(function (auxiliaryObject) {
				return auxiliaryObject.index !== auxiliaryMatch.index;
			});
		}
	});

	return auxiliaryMatches;
};

const elisionAuxiliaryExceptionFilter = function elisionAuxiliaryExceptionFilter(text, auxiliaryMatches) {
	const elisionAuxiliaryExceptionMatches = (0, _getIndicesWithRegex2.default)(text, elisionAuxiliaryExceptionRegex);

	(0, _lodashEs.forEach)(auxiliaryMatches, function (auxiliaryMatch) {
		if ((0, _includesIndex2.default)(elisionAuxiliaryExceptionMatches, auxiliaryMatch.index, false)) {
			auxiliaryMatches = auxiliaryMatches.filter(function (auxiliaryObject) {
				return auxiliaryObject.index !== auxiliaryMatch.index;
			});
		}
	});

	return auxiliaryMatches;
};

const getSentenceBreakers = function getSentenceBreakers(sentence, language) {
	sentence = sentence.toLocaleLowerCase();
	const stopwords = languageVariables[language].stopwords;
	const auxiliaries = languageVariables[language].auxiliaries;
	let auxiliaryIndices = getIndicesOfList(auxiliaries, sentence);
	const stopwordIndices = getIndicesOfList(stopwords, sentence);
	const stopCharacterIndices = getStopCharacters(sentence, language);
	let indices;

	switch (language) {
		case "fr":
			auxiliaryIndices = auxiliaryPrecedenceExceptionFilter(sentence, auxiliaryIndices, "fr");

			auxiliaryIndices = elisionAuxiliaryExceptionFilter(sentence, auxiliaryIndices);

			indices = [].concat(auxiliaryIndices, stopwordIndices, stopCharacterIndices);
			break;
		case "es":
			indices = [].concat(auxiliaryIndices, stopwordIndices, stopCharacterIndices);
			break;
		case "pt":
			indices = [].concat(auxiliaryIndices, stopwordIndices, stopCharacterIndices);
			break;
		case "it":
			auxiliaryIndices = auxiliaryPrecedenceExceptionFilter(sentence, auxiliaryIndices, "it");
			indices = [].concat(auxiliaryIndices, stopwordIndices, stopCharacterIndices);
			break;
		case "en":
		default:
			var ingVerbs = getVerbsEndingInIng(sentence);
			var ingVerbsIndices = getIndicesOfList(ingVerbs, sentence);
			indices = [].concat(auxiliaryIndices, stopwordIndices, ingVerbsIndices, stopCharacterIndices);
			break;
	}
	indices = filterIndices(indices);
	return sortIndices(indices);
};

const getAuxiliaryMatches = function getAuxiliaryMatches(sentencePart, language) {
	const auxiliaryRegex = languageVariables[language].auxiliaryRegex;
	const auxiliaryMatches = sentencePart.match(auxiliaryRegex) || [];

	switch (language) {
		case "fr":
		case "es":
		case "pt":
		case "it":
			var auxiliaryMatchIndices = getIndicesOfList(auxiliaryMatches, sentencePart);

			if (language === "fr" || language === "it") {
				auxiliaryMatchIndices = auxiliaryPrecedenceExceptionFilter(sentencePart, auxiliaryMatchIndices, language);
			}

			auxiliaryMatchIndices = followingAuxiliaryExceptionFilter(sentencePart, auxiliaryMatchIndices, language);

			var auxiliaryMatchWords = [];

			(0, _lodashEs.forEach)(auxiliaryMatchIndices, function (auxiliaryMatchIndex) {
				auxiliaryMatchWords.push(auxiliaryMatchIndex.match);
			});

			return (0, _lodashEs.map)(auxiliaryMatchWords, function (auxiliaryMatch) {
				return (0, _stripSpaces2.default)(auxiliaryMatch);
			});
		case "en":
		default:
			return (0, _lodashEs.map)(auxiliaryMatches, function (auxiliaryMatch) {
				return (0, _stripSpaces2.default)(auxiliaryMatch);
			});
	}
};

const getSentenceParts = function getSentenceParts(sentence, language) {
	const sentenceParts = [];
	const auxiliaryRegex = languageVariables[language].auxiliaryRegex;
	const SentencePart = languageVariables[language].SentencePart;

	sentence = (0, _quotes.normalizeSingle)(sentence);

	if (sentence.match(auxiliaryRegex) === null) {
		return sentenceParts;
	}

	const indices = getSentenceBreakers(sentence, language);

	for (let i = 0; i < indices.length; i++) {
		let endIndex = sentence.length;
		if (!(0, _lodashEs.isUndefined)(indices[i + 1])) {
			endIndex = indices[i + 1].index;
		}

		const sentencePart = (0, _stripSpaces2.default)(sentence.substr(indices[i].index, endIndex - indices[i].index));

		const auxiliaryMatches = getAuxiliaryMatches(sentencePart, language);

		if (auxiliaryMatches.length !== 0) {
			sentenceParts.push(new SentencePart(sentencePart, auxiliaryMatches));
		}
	}
	return sentenceParts;
};
