"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.filterEndingWith = exports.filterOneCharacterWordCombinations = exports.filterOnDensity = exports.filterFunctionWordsAnywhere = exports.filterFunctionWords = exports.filterFunctionWordsAtBeginning = exports.filterFunctionWordsAtEnding = exports.sortCombinations = exports.getRelevantCombinations = exports.calculateOccurrences = exports.getRelevantWords = exports.getWordCombinations = undefined;

var _getWords = require("../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _WordCombination = require("../values/WordCombination.js");

var _WordCombination2 = _interopRequireDefault(_WordCombination);

var _quotes = require("../stringProcessing/quotes.js");

var _getFunctionWords = require("../helpers/getFunctionWords.js");

var _getFunctionWords2 = _interopRequireDefault(_getFunctionWords);

var _getLanguage = require("../helpers/getLanguage.js");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const functionWordLists = (0, _getFunctionWords2.default)();


const densityLowerLimit = 0;
const densityUpperLimit = 0.03;
const relevantWordLimit = 100;
const wordCountLowerLimit = 200;

const specialCharacters = ["–", "—", "-", "\u00a9", "#", "%", "/", "\\", "$", "€", "£", "*", "•", "|", "→", "←", "}", "{", "//", "||", "\u200b"];

function getWordCombinations(text, combinationSize, functionWords) {
	const sentences = (0, _getSentences2.default)(text);

	let words, combination;

	return (0, _lodashEs.flatMap)(sentences, function (sentence) {
		sentence = sentence.toLocaleLowerCase();
		sentence = (0, _quotes.normalize)(sentence);
		words = (0, _getWords2.default)(sentence);

		return (0, _lodashEs.filter)((0, _lodashEs.map)(words, function (word, i) {
			if (i + combinationSize - 1 < words.length) {
				combination = words.slice(i, i + combinationSize);
				return new _WordCombination2.default(combination, 0, functionWords);
			}

			return false;
		}));
	});
}

function calculateOccurrences(wordCombinations) {
	const occurrences = {};

	(0, _lodashEs.forEach)(wordCombinations, function (wordCombination) {
		const combination = wordCombination.getCombination();

		if (!(0, _lodashEs.has)(occurrences, combination)) {
			occurrences[combination] = wordCombination;
		}

		occurrences[combination].incrementOccurrences();
	});

	return (0, _lodashEs.values)(occurrences);
}

function getRelevantCombinations(wordCombinations) {
	wordCombinations = wordCombinations.filter(function (combination) {
		return combination.getOccurrences() !== 1 && combination.getRelevance() !== 0;
	});
	return wordCombinations;
}

function sortCombinations(wordCombinations) {
	wordCombinations.sort(function (combinationA, combinationB) {
		const difference = combinationB.getRelevance() - combinationA.getRelevance();

		if (difference !== 0) {
			return difference;
		}

		return combinationB.getLength() - combinationA.getLength();
	});
}

function filterOneCharacterWordCombinations(wordCombinations) {
	return wordCombinations.filter(function (combination) {
		return !(combination.getLength() === 1 && combination.getWords()[0].length <= 1);
	});
}

function filterFunctionWordsAnywhere(wordCombinations, functionWords) {
	return wordCombinations.filter(function (combination) {
		return (0, _lodashEs.isEmpty)((0, _lodashEs.intersection)(functionWords, combination.getWords()));
	});
}

function filterFunctionWordsAtBeginning(wordCombinations, functionWords) {
	return wordCombinations.filter(function (combination) {
		return !(0, _lodashEs.includes)(functionWords, combination.getWords()[0]);
	});
}

function filterFunctionWordsAtEnding(wordCombinations, functionWords) {
	return wordCombinations.filter(function (combination) {
		const words = combination.getWords();
		const lastWordIndex = words.length - 1;
		return !(0, _lodashEs.includes)(functionWords, words[lastWordIndex]);
	});
}

function filterFunctionWordsAtBeginningAndEnding(wordCombinations, functionWords) {
	wordCombinations = filterFunctionWordsAtBeginning(wordCombinations, functionWords);
	wordCombinations = filterFunctionWordsAtEnding(wordCombinations, functionWords);
	return wordCombinations;
}

function filterOnDensity(wordCombinations, wordCount, lowerLimit, upperLimit) {
	return wordCombinations.filter(function (combination) {
		return combination.getDensity(wordCount) >= lowerLimit && combination.getDensity(wordCount) < upperLimit;
	});
}

function filterEndingWith(wordCombinations, str, exceptions) {
	wordCombinations = wordCombinations.filter(function (combination) {
		const combinationstr = combination.getCombination();
		for (let i = 0; i < exceptions.length; i++) {
			if (combinationstr.endsWith(exceptions[i])) {
				return true;
			}
		}
		return !combinationstr.endsWith(str);
	});
	return wordCombinations;
}

function filterFunctionWords(combinations, functionWords) {
	combinations = filterFunctionWordsAnywhere(combinations, functionWords.filteredAnywhere);
	combinations = filterFunctionWordsAtBeginningAndEnding(combinations, functionWords.filteredAtBeginningAndEnding);
	combinations = filterFunctionWordsAtEnding(combinations, functionWords.filteredAtEnding);
	combinations = filterFunctionWordsAtBeginning(combinations, functionWords.filteredAtBeginning);
	return combinations;
}

function filterCombinations(combinations, functionWords, language) {
	combinations = filterFunctionWordsAnywhere(combinations, specialCharacters);
	combinations = filterOneCharacterWordCombinations(combinations);
	combinations = filterFunctionWords(combinations, functionWords);
	if (language === "en") {
		combinations = filterEndingWith(combinations, "'s", []);
	}
	return combinations;
}

function getRelevantWords(text, locale) {
	let language = (0, _getLanguage2.default)(locale);
	if (!functionWordLists.hasOwnProperty(language)) {
		language = "en";
	}

	const functionWords = functionWordLists[language];

	const words = getWordCombinations(text, 1, functionWords.all);
	const wordCount = words.length;

	let oneWordCombinations = getRelevantCombinations(calculateOccurrences(words));

	sortCombinations(oneWordCombinations);
	oneWordCombinations = (0, _lodashEs.take)(oneWordCombinations, 100);

	const oneWordRelevanceMap = {};

	(0, _lodashEs.forEach)(oneWordCombinations, function (combination) {
		oneWordRelevanceMap[combination.getCombination()] = combination.getRelevance();
	});

	const twoWordCombinations = calculateOccurrences(getWordCombinations(text, 2, functionWords.all));
	const threeWordCombinations = calculateOccurrences(getWordCombinations(text, 3, functionWords.all));
	const fourWordCombinations = calculateOccurrences(getWordCombinations(text, 4, functionWords.all));
	const fiveWordCombinations = calculateOccurrences(getWordCombinations(text, 5, functionWords.all));

	let combinations = oneWordCombinations.concat(twoWordCombinations, threeWordCombinations, fourWordCombinations, fiveWordCombinations);

	combinations = filterCombinations(combinations, functionWords, language);

	(0, _lodashEs.forEach)(combinations, function (combination) {
		combination.setRelevantWords(oneWordRelevanceMap);
	});

	combinations = getRelevantCombinations(combinations);
	sortCombinations(combinations);

	if (wordCount >= wordCountLowerLimit) {
		combinations = filterOnDensity(combinations, wordCount, densityLowerLimit, densityUpperLimit);
	}

	return (0, _lodashEs.take)(combinations, relevantWordLimit);
}

exports.getWordCombinations = getWordCombinations;
exports.getRelevantWords = getRelevantWords;
exports.calculateOccurrences = calculateOccurrences;
exports.getRelevantCombinations = getRelevantCombinations;
exports.sortCombinations = sortCombinations;
exports.filterFunctionWordsAtEnding = filterFunctionWordsAtEnding;
exports.filterFunctionWordsAtBeginning = filterFunctionWordsAtBeginning;
exports.filterFunctionWords = filterFunctionWords;
exports.filterFunctionWordsAnywhere = filterFunctionWordsAnywhere;
exports.filterOnDensity = filterOnDensity;
exports.filterOneCharacterWordCombinations = filterOneCharacterWordCombinations;
exports.filterEndingWith = filterEndingWith;
exports.default = {
	getWordCombinations: getWordCombinations,
	getRelevantWords: getRelevantWords,
	calculateOccurrences: calculateOccurrences,
	getRelevantCombinations: getRelevantCombinations,
	sortCombinations: sortCombinations,
	filterFunctionWordsAtEnding: filterFunctionWordsAtEnding,
	filterFunctionWordsAtBeginning: filterFunctionWordsAtBeginning,
	filterFunctionWords: filterFunctionWordsAtBeginningAndEnding,
	filterFunctionWordsAnywhere: filterFunctionWordsAnywhere,
	filterOnDensity: filterOnDensity,
	filterOneCharacterWordCombinations: filterOneCharacterWordCombinations,
	filterEndingWith: filterEndingWith
};
