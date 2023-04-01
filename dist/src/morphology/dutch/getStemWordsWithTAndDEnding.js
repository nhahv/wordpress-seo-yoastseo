"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.generateCorrectStemWithTAndDEnding = generateCorrectStemWithTAndDEnding;

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers");

var _regexHelpers = require("../morphoHelpers/regexHelpers");

var _stemModificationHelpers = require("./stemModificationHelpers");

const stemWordsWithEOrEnSuffix = function stemWordsWithEOrEnSuffix(morphologyDataNL, regexAndReplacement, word) {
	if ((0, _regexHelpers.doesWordMatchRegex)(word, regexAndReplacement[0])) {
		const stemmedWord = word.replace(new RegExp(regexAndReplacement[0]), regexAndReplacement[1]);
		if ((0, _stemModificationHelpers.isVowelDoublingAllowed)(stemmedWord, morphologyDataNL.regularStemmer.stemModifications.exceptionsStemModifications, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes)) {
			const replacement = (0, _regexHelpers.searchAndReplaceWithRegex)(stemmedWord, morphologyDataNL.regularStemmer.stemModifications.doubleVowel);
			return replacement ? replacement : stemmedWord;
		}
		return stemmedWord;
	}

	return null;
};

const checkWhetherTOrDIsPartOfStem = function checkWhetherTOrDIsPartOfStem(word, morphologyDataNL) {
	const tAndDPartOfStemData = morphologyDataNL.ambiguousTAndDEndings.tOrDArePartOfStem;

	let stemmedWord = (0, _regexHelpers.searchAndReplaceWithRegex)(word, tAndDPartOfStemData.firstTOrDPartOfStem);

	if (stemmedWord) {
		return stemmedWord;
	}

	if (tAndDPartOfStemData.verbsDenShouldBeStemmed.includes(word)) {
		return word.slice(0, -3);
	}

	if ((0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(word, tAndDPartOfStemData.wordsStemOnlyEnEnding.endingMatch) || (0, _exceptionListHelpers.checkIfWordIsOnVerbExceptionList)(word, tAndDPartOfStemData.wordsStemOnlyEnEnding.verbs, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes) || (0, _regexHelpers.doesWordMatchRegex)(word, tAndDPartOfStemData.denEnding)) {
		stemmedWord = word.slice(0, -2);

		if ((0, _stemModificationHelpers.isVowelDoublingAllowed)(stemmedWord, morphologyDataNL.regularStemmer.stemModifications.exceptionsStemModifications, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes)) {
			const replacement = (0, _regexHelpers.searchAndReplaceWithRegex)(stemmedWord, morphologyDataNL.regularStemmer.stemModifications.doubleVowel);
			return replacement ? replacement : stemmedWord;
		}
		return stemmedWord;
	}

	const dIsPartOfStemRegex = tAndDPartOfStemData.deEnding;
	stemmedWord = stemWordsWithEOrEnSuffix(morphologyDataNL, dIsPartOfStemRegex, word);

	if (stemmedWord) {
		return stemmedWord;
	}

	const tIsPartOfStemRegex = tAndDPartOfStemData.teAndTenEndings;
	stemmedWord = stemWordsWithEOrEnSuffix(morphologyDataNL, tIsPartOfStemRegex, word);

	if (stemmedWord) {
		return stemmedWord;
	}

	return null;
};

function generateCorrectStemWithTAndDEnding(morphologyDataNL, word) {
	if ((0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(word, morphologyDataNL.ambiguousTAndDEndings.wordsTShouldBeStemmed)) {
		return word.slice(0, -1);
	}

	if ((0, _regexHelpers.doesWordMatchRegex)(word, morphologyDataNL.ambiguousTAndDEndings.tOrDArePartOfStem.tEnding)) {
		return word;
	}

	const stemmedWord = checkWhetherTOrDIsPartOfStem(word, morphologyDataNL);

	if (stemmedWord) {
		return stemmedWord;
	}

	return null;
}
