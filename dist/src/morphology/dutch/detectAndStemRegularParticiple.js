"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.detectAndStemRegularParticiple = detectAndStemRegularParticiple;

var _nonParticiples = require("../../researches/dutch/passiveVoice/nonParticiples.js");

var _nonParticiples2 = _interopRequireDefault(_nonParticiples);

var _regexHelpers = require("../morphoHelpers/regexHelpers");

var _stemModificationHelpers = require("./stemModificationHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkAndStemIfExceptionWithoutGePrefix = function checkAndStemIfExceptionWithoutGePrefix(dataExceptionListToCheck, word) {
	if (dataExceptionListToCheck.includes(word)) {
		return word.slice(0, -1);
	}
	return null;
};

const shouldSuffixBeStemmed = function shouldSuffixBeStemmed(wordWithoutPrefix, morphologyDataNL) {
	if (wordWithoutPrefix.endsWith("t")) {
		const exceptionsTShouldBeStemmed = morphologyDataNL.ambiguousTAndDEndings.wordsTShouldBeStemmed;
		if (exceptionsTShouldBeStemmed.includes(wordWithoutPrefix)) {
			return true;
		}

		if ((0, _regexHelpers.doesWordMatchRegex)(wordWithoutPrefix, morphologyDataNL.ambiguousTAndDEndings.tOrDArePartOfStem.tEnding)) {
			return false;
		}

		const exceptionsTShouldNotBeStemmed = morphologyDataNL.stemExceptions.wordsNotToBeStemmedExceptions.verbs;
		return !exceptionsTShouldNotBeStemmed.includes(wordWithoutPrefix);
	}
	if (wordWithoutPrefix.endsWith("d")) {
		const exceptionsDShouldNotBeStemmed = morphologyDataNL.pastParticipleStemmer.doNotStemD;
		return !exceptionsDShouldNotBeStemmed.includes(wordWithoutPrefix);
	}
};

const detectAndStemParticiplesWithoutPrefixes = function detectAndStemParticiplesWithoutPrefixes(morphologyDataNL, word) {
	const geStemTParticipleRegex = new RegExp("^" + morphologyDataNL.pastParticipleStemmer.participleStemmingClasses[0].regex);

	if (geStemTParticipleRegex.test(word)) {
		const exception = checkAndStemIfExceptionWithoutGePrefix(morphologyDataNL.pastParticipleStemmer.doNotStemGe, word);
		if (exception) {
			return exception;
		}

		let wordWithoutPrefix = word.slice(2);

		if (wordWithoutPrefix.startsWith("ë")) {
			wordWithoutPrefix = "e" + wordWithoutPrefix.slice(1);
		}

		if (shouldSuffixBeStemmed(wordWithoutPrefix, morphologyDataNL)) {
			return wordWithoutPrefix.slice(0, -1);
		}

		return wordWithoutPrefix;
	}

	return null;
};

const detectAndStemParticiplePerPrefixClass = function detectAndStemParticiplePerPrefixClass(morphologyDataNL, word, separable, prefixes, regexPart) {
	for (const currentPrefix of prefixes) {
		const participleRegex = new RegExp("^" + currentPrefix + regexPart);

		if (participleRegex.test(word)) {
			let wordWithoutPrefix = word.slice(currentPrefix.length - word.length);

			if (separable) {
				const exception = checkAndStemIfExceptionWithoutGePrefix(morphologyDataNL.pastParticipleStemmer.doNotStemGe, wordWithoutPrefix);
				if (exception) {
					return currentPrefix + exception;
				}
				wordWithoutPrefix = wordWithoutPrefix.slice(2);
			}

			if (wordWithoutPrefix.startsWith("ë")) {
				wordWithoutPrefix = "e" + wordWithoutPrefix.slice(1);
			}

			if (shouldSuffixBeStemmed(wordWithoutPrefix, morphologyDataNL)) {
				return currentPrefix + wordWithoutPrefix.slice(0, -1);
			}
			return currentPrefix + wordWithoutPrefix;
		}
	}

	return null;
};

const detectAndStemParticiplesWithPrefixes = function detectAndStemParticiplesWithPrefixes(morphologyDataNL, word) {
	for (const participleClass of morphologyDataNL.pastParticipleStemmer.participleStemmingClasses) {
		const regex = participleClass.regex;
		const separable = participleClass.separable;

		const prefixes = separable ? morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes.separable : morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes.inseparable;

		const stem = detectAndStemParticiplePerPrefixClass(morphologyDataNL, word, separable, prefixes, regex);

		if (stem) {
			return stem;
		}
	}

	return null;
};

const checkIfParticipleIsSameAsStem = function checkIfParticipleIsSameAsStem(dataParticiplesSameAsStem, word) {
	return dataParticiplesSameAsStem.includes(word);
};

const checkAndStemIfInseparablePrefixWithEndEnding = function checkAndStemIfInseparablePrefixWithEndEnding(inseparablePrefixes, dataExceptionListToCheck, finalChangesRules, word) {
	const startsWithInseparablePrefix = inseparablePrefixes.map(prefix => word.startsWith(prefix)).some(value => value === true);

	if (startsWithInseparablePrefix && word.endsWith("end") && !dataExceptionListToCheck.includes(word)) {
		return (0, _stemModificationHelpers.modifyStem)(word.slice(0, -3), finalChangesRules);
	}
	return null;
};

function detectAndStemRegularParticiple(morphologyDataNL, word) {
	if (word.endsWith("heid") || word.endsWith("teit") || word.endsWith("tijd") || (0, _nonParticiples2.default)().includes(word)) {
		return "";
	}

	if (checkIfParticipleIsSameAsStem(morphologyDataNL.pastParticipleStemmer.inseparableCompoundVerbsNotToBeStemmed, word)) {
		return word;
	}

	let stem = detectAndStemParticiplesWithoutPrefixes(morphologyDataNL, word);

	if (stem) {
		return stem;
	}

	stem = checkAndStemIfExceptionWithoutGePrefix(morphologyDataNL.pastParticipleStemmer.inseparableCompoundVerbs, word);

	if (stem) {
		return stem;
	}

	stem = checkAndStemIfInseparablePrefixWithEndEnding(morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes.inseparable, morphologyDataNL.pastParticipleStemmer.pastParticiplesEndingOnEnd, morphologyDataNL.regularStemmer.stemModifications.finalChanges, word);

	if (stem) {
		return stem;
	}

	stem = detectAndStemParticiplesWithPrefixes(morphologyDataNL, word);

	if (stem) {
		return stem;
	}

	return null;
}
