"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getIndicesByWordListSorted = exports.sortIndices = exports.filterIndices = exports.getIndicesByWordList = exports.getIndicesByWord = undefined;

var _lodashEs = require("lodash-es");

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _matchWordInSentence = require("../stringProcessing/matchWordInSentence.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getIndicesByWord(word, text) {
	var startIndex = 0;
	var searchStringLength = word.length;
	var index,
	    indices = [];
	while ((index = text.indexOf(word, startIndex)) > -1) {
		var isPreviousCharacterWordBoundary = (0, _matchWordInSentence.characterInBoundary)(text[index - 1]) || index === 0;

		var isNextCharacterWordBoundary = (0, _matchWordInSentence.characterInBoundary)(text[index + searchStringLength]) || text.length === index + searchStringLength;

		if (isPreviousCharacterWordBoundary && isNextCharacterWordBoundary) {
			indices.push({
				index: index,
				match: word
			});
		}
		startIndex = index + searchStringLength;
	}
	return indices;
}

var getIndicesByWordList = function getIndicesByWordList(words, text) {
	var matchedWords = [];

	(0, _lodashEs.forEach)(words, function (word) {
		word = (0, _stripSpaces2.default)(word);
		if (!(0, _matchWordInSentence.isWordInSentence)(word, text)) {
			return;
		}
		matchedWords = matchedWords.concat(getIndicesByWord(word, text));
	});
	return matchedWords;
};

var sortIndices = function sortIndices(indices) {
	return indices.sort(function (a, b) {
		return a.index > b.index;
	});
};

var filterIndices = function filterIndices(indices) {
	indices = sortIndices(indices);
	var filtered = [];
	for (var i = 0; i < indices.length; i++) {
		if (!(0, _lodashEs.isUndefined)(indices[i + 1]) && indices[i + 1].index < indices[i].index + indices[i].match.length) {
			filtered.push(indices[i]);

			i++;
			continue;
		}
		filtered.push(indices[i]);
	}
	return filtered;
};

var getIndicesByWordListSorted = function getIndicesByWordListSorted(words, text) {
	var matchedWords = [];

	(0, _lodashEs.forEach)(words, function (word) {
		word = (0, _stripSpaces2.default)(word);
		if (!(0, _matchWordInSentence.isWordInSentence)(word, text)) {
			return matchedWords;
		}
		matchedWords = matchedWords.concat(getIndicesByWord(word, text));
	});

	matchedWords = matchedWords.sort(function (a, b) {
		if (a.index < b.index) {
			return -1;
		}
		if (a.index > b.index) {
			return 1;
		}
		return 0;
	});

	return matchedWords;
};

exports.getIndicesByWord = getIndicesByWord;
exports.getIndicesByWordList = getIndicesByWordList;
exports.filterIndices = filterIndices;
exports.sortIndices = sortIndices;
exports.getIndicesByWordListSorted = getIndicesByWordListSorted;
exports.default = {
	getIndicesByWord: getIndicesByWord,
	getIndicesByWordList: getIndicesByWordList,
	filterIndices: filterIndices,
	sortIndices: sortIndices,
	getIndicesByWordListSorted: getIndicesByWordListSorted
};
