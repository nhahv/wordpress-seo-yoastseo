"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.determineStem = determineStem;

var _lodashEs = require("lodash-es");

var _detectAndStemRegularParticiple = require("./detectAndStemRegularParticiple");

var _flattenSortLength = require("../morphoHelpers/flattenSortLength");

var _stem = require("./stem");

var _stem2 = _interopRequireDefault(_stem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findStemOnNounExceptionList = function findStemOnNounExceptionList(morphologyDataNouns, stemmedWord) {
	const exceptionStems = morphologyDataNouns.exceptionStems;

	for (const exceptionStemSet of exceptionStems) {
		const matchedStem = exceptionStemSet.find(exceptionStem => stemmedWord.endsWith(exceptionStem));

		if (matchedStem) {
			const precedingLexicalMaterial = stemmedWord.slice(0, stemmedWord.length - matchedStem.length);

			return precedingLexicalMaterial + exceptionStemSet[0];
		}
	}

	return null;
};

const findStemOnAdjectiveExceptionList = function findStemOnAdjectiveExceptionList(morphologyDataAdjectives, stemmedWord) {
	const adjectiveExceptionClasses = morphologyDataAdjectives.exceptions;

	for (const key of Object.keys(adjectiveExceptionClasses)) {
		const exceptionStems = adjectiveExceptionClasses[key];

		for (const exceptionStemSet of exceptionStems) {
			if (exceptionStemSet.includes(stemmedWord)) {
				return exceptionStemSet[0];
			}
		}
	}

	return null;
};

const findStemOnVerbExceptionList = function findStemOnVerbExceptionList(morphologyDataVerbs, stemmedWord) {
	let wordToCheck = stemmedWord;
	const strongAndIrregularVerbStems = morphologyDataVerbs.strongAndIrregularVerbs.stems;
	const prefixes = (0, _flattenSortLength.flattenSortLength)(morphologyDataVerbs.prefixes);

	let matchedPrefix = prefixes.find(prefix => stemmedWord.startsWith(prefix));

	if (matchedPrefix) {
		const wordWithoutPrefix = wordToCheck.slice(matchedPrefix.length, wordToCheck.length);

		if (wordWithoutPrefix.length > 2) {
			wordToCheck = wordWithoutPrefix;
		} else {
			matchedPrefix = null;
		}
	}

	for (const strongOrIrregularVerbParadigm of strongAndIrregularVerbStems) {
		let stems = strongOrIrregularVerbParadigm.stems;
		stems = (0, _lodashEs.flatten)(Object.values(stems));

		if (stems.includes(wordToCheck)) {
			if (matchedPrefix) {
				return matchedPrefix + strongOrIrregularVerbParadigm.stems.present;
			}

			return strongOrIrregularVerbParadigm.stems.present;
		}
	}

	return null;
};

function determineStem(word, morphologyDataGerman) {
	const verbData = morphologyDataGerman.verbs;
	const stemmedWord = (0, _stem2.default)(verbData, word);

	return findStemOnNounExceptionList(morphologyDataGerman.nouns, stemmedWord) || findStemOnAdjectiveExceptionList(morphologyDataGerman.adjectives, stemmedWord) || findStemOnVerbExceptionList(verbData, stemmedWord) || (0, _detectAndStemRegularParticiple.detectAndStemRegularParticiple)(verbData, word) || stemmedWord;
}
