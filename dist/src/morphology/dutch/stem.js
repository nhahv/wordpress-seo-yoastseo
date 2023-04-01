"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers");

var _stemHelpers = require("../morphoHelpers/stemHelpers");

var _detectAndStemSuffixes = require("./detectAndStemSuffixes");

var _detectAndStemSuffixes2 = _interopRequireDefault(_detectAndStemSuffixes);

var _getStemWordsWithTAndDEnding = require("./getStemWordsWithTAndDEnding.js");

var _checkExceptionsWithFullForms = require("../morphoHelpers/checkExceptionsWithFullForms");

var _checkExceptionsWithFullForms2 = _interopRequireDefault(_checkExceptionsWithFullForms);

var _detectAndStemRegularParticiple = require("./detectAndStemRegularParticiple");

var _stemModificationHelpers = require("./stemModificationHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const removeSuffixFromFullForms = function removeSuffixFromFullForms(morphologyDataNL, word) {
	for (const exceptionClass of morphologyDataNL.stemExceptions.removeSuffixesFromFullForms) {
		const stemmedWord = (0, _stemHelpers.removeSuffixesFromFullForm)(exceptionClass.forms, exceptionClass.suffixes, word);
		if (stemmedWord) {
			return stemmedWord;
		}
	}

	for (const exceptionClass of morphologyDataNL.stemExceptions.removeSuffixFromFullForms) {
		const stemmedWord = (0, _stemHelpers.removeSuffixFromFullForm)(exceptionClass.forms, exceptionClass.suffix, word);
		if (stemmedWord) {
			return stemmedWord;
		}
	}
};

const checkOtherStemmingExceptions = function checkOtherStemmingExceptions(word, morphologyDataNL) {
	let stemFromFullForm = removeSuffixFromFullForms(morphologyDataNL, word);
	if (stemFromFullForm) {
		if ((0, _stemModificationHelpers.isVowelDoublingAllowed)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.exceptionsStemModifications, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes)) {
			stemFromFullForm = (0, _stemModificationHelpers.modifyStem)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.doubleVowel);
			return (0, _stemModificationHelpers.modifyStem)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.finalChanges);
		}
		return (0, _stemModificationHelpers.modifyStem)(stemFromFullForm, morphologyDataNL.regularStemmer.stemModifications.finalChanges);
	}
	return null;
};

function stem(word, morphologyDataNL) {
	let stemmedWord = (0, _checkExceptionsWithFullForms2.default)(morphologyDataNL, word);
	if (stemmedWord) {
		return stemmedWord;
	}

	stemmedWord = (0, _detectAndStemRegularParticiple.detectAndStemRegularParticiple)(morphologyDataNL, word);
	if (stemmedWord) {
		return stemmedWord;
	}

	const wordsNotToBeStemmed = morphologyDataNL.stemExceptions.wordsNotToBeStemmedExceptions;
	if ((0, _exceptionListHelpers.checkIfWordIsOnVerbExceptionList)(word, wordsNotToBeStemmed.verbs, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes) || (0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(word, wordsNotToBeStemmed.endingMatch) || wordsNotToBeStemmed.exactMatch.includes(word)) {
		return word;
	}

	const tAndDEndings = morphologyDataNL.ambiguousTAndDEndings.otherTAndDEndings;
	for (const ending of tAndDEndings) {
		if (word.endsWith(ending)) {
			stemmedWord = (0, _getStemWordsWithTAndDEnding.generateCorrectStemWithTAndDEnding)(morphologyDataNL, word);
			if (stemmedWord) {
				return stemmedWord;
			}
		}
	}

	stemmedWord = checkOtherStemmingExceptions(word, morphologyDataNL);
	if (stemmedWord) {
		return stemmedWord;
	}

	return (0, _detectAndStemSuffixes2.default)(word, morphologyDataNL);
}
