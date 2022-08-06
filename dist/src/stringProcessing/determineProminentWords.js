"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.retrieveAbbreviations = exports.collapseProminentWordsOnStem = exports.sortProminentWords = exports.filterProminentWords = exports.getProminentWordsFromPaperAttributes = exports.getProminentWords = undefined;

var _lodashEs = require("lodash-es");

var _retrieveStemmer = require("../helpers/retrieveStemmer");

var _retrieveStemmer2 = _interopRequireDefault(_retrieveStemmer);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _quotes = require("../stringProcessing/quotes");

var _ProminentWord = require("../values/ProminentWord");

var _ProminentWord2 = _interopRequireDefault(_ProminentWord);

var _getFunctionWords = require("../helpers/getFunctionWords");

var _getFunctionWords2 = _interopRequireDefault(_getFunctionWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const functionWordLists = (0, _getFunctionWords2.default)();
const specialCharacters = /[1234567890‘’“”"'.…?!:;,¿¡«»&*@#±^%$|~=+§`[\](){}⟨⟩<>/\\–\-\u2014\u00d7\s]/g;

function filterProminentWords(prominentWords, minimalNumberOfOccurrences = 2) {
	prominentWords = prominentWords.filter(function (combination) {
		return combination.getOccurrences() >= minimalNumberOfOccurrences && combination.getWord().replace(specialCharacters, "") !== "";
	});
	return prominentWords;
}

function sortProminentWords(prominentWords) {
	prominentWords.sort(function (wordA, wordB) {
		const difference = wordB.getOccurrences() - wordA.getOccurrences();

		if (difference !== 0) {
			return difference;
		}

		return wordA.getStem().localeCompare(wordB.getStem());
	});
}

function collapseProminentWordsOnStem(prominentWords) {
	if (prominentWords.length === 0) {
		return [];
	}

	prominentWords.sort(function (wordA, wordB) {
		return wordA.getStem().localeCompare(wordB.getStem());
	});

	const collapsedProminentWords = [];
	let previousWord = new _ProminentWord2.default(prominentWords[0].getWord(), prominentWords[0].getStem(), prominentWords[0].getOccurrences());

	for (let i = 1; i < prominentWords.length; i++) {
		const currentWord = new _ProminentWord2.default(prominentWords[i].getWord(), prominentWords[i].getStem(), prominentWords[i].getOccurrences());

		if (currentWord.getStem() === previousWord.getStem()) {
			previousWord.setOccurrences(previousWord.getOccurrences() + currentWord.getOccurrences());

			if (currentWord.getWord() === previousWord.getStem() || currentWord.getWord().toLocaleLowerCase() === previousWord.getStem()) {
				previousWord.setWord(currentWord.getWord());
			}
		} else {
			collapsedProminentWords.push(previousWord);
			previousWord = currentWord;
		}
	}

	collapsedProminentWords.push(previousWord);

	return collapsedProminentWords;
}

function retrieveFunctionWords(language) {
	return (0, _lodashEs.get)(functionWordLists, language.concat(".all"), []);
}

function retrieveAbbreviations(text) {
	const words = (0, _getWords2.default)((0, _quotes.normalizeSingle)(text));
	const abbreviations = [];

	words.forEach(function (word) {
		if (word.length > 1 && word.length < 5 && word === word.toLocaleUpperCase()) {
			abbreviations.push(word.toLocaleLowerCase());
		}
	});

	return (0, _lodashEs.uniq)(abbreviations);
}

function computeProminentWords(words, abbreviations, language, morphologyData) {
	const functionWords = retrieveFunctionWords(language);
	const determineStem = (0, _retrieveStemmer2.default)(language, morphologyData);

	if (words.length === 0) {
		return [];
	}

	const uniqueContentWords = (0, _lodashEs.uniq)(words.filter(word => !functionWords.includes(word.trim())));
	const prominentWords = [];

	uniqueContentWords.forEach(function (word) {
		if (abbreviations.includes(word)) {
			prominentWords.push(new _ProminentWord2.default(word.toLocaleUpperCase(), word, words.filter(element => element === word).length));
		} else {
			prominentWords.push(new _ProminentWord2.default(word, determineStem(word, morphologyData), words.filter(element => element === word).length));
		}
	});

	return collapseProminentWordsOnStem(prominentWords);
}

const primeProminentWords = (0, _lodashEs.memoize)(morphologyData => {
	return (0, _lodashEs.memoize)((words, abbreviations, language) => {
		return computeProminentWords(words, abbreviations, language, morphologyData);
	}, (words, abbreviations, language) => {
		return words.join(",") + "," + abbreviations.join(",") + "," + language;
	});
});

function getProminentWords(text, abbreviations, language, morphologyData) {
	if (text === "") {
		return [];
	}

	const words = (0, _getWords2.default)((0, _quotes.normalizeSingle)(text).toLocaleLowerCase());
	const computeProminentWordsMemoized = primeProminentWords(morphologyData);

	return computeProminentWordsMemoized(words, abbreviations, language, morphologyData);
}

function getProminentWordsFromPaperAttributes(attributes, abbreviations, language, morphologyData) {
	const wordsFromAttributes = (0, _getWords2.default)(attributes.join(" ").toLocaleLowerCase());

	return computeProminentWords(wordsFromAttributes, abbreviations, language, morphologyData);
}

exports.getProminentWords = getProminentWords;
exports.getProminentWordsFromPaperAttributes = getProminentWordsFromPaperAttributes;
exports.filterProminentWords = filterProminentWords;
exports.sortProminentWords = sortProminentWords;
exports.collapseProminentWordsOnStem = collapseProminentWordsOnStem;
exports.retrieveAbbreviations = retrieveAbbreviations;
exports.default = {
	getProminentWords,
	getProminentWordsFromPaperAttributes,
	filterProminentWords,
	sortProminentWords,
	collapseProminentWordsOnStem,
	retrieveAbbreviations
};
