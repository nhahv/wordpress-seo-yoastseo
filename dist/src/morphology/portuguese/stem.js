"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

var _findMatchingEndingInArray = require("../morphoHelpers/findMatchingEndingInArray");

const isVowel = function isVowel(character, vowels) {
	return vowels.includes(character);
};

const nextVowelPosition = function nextVowelPosition(word, vowels, start = 0) {
	const length = word.length;

	for (let position = start; position < length; position++) {
		if (isVowel(word[position], vowels)) {
			return position;
		}
	}

	return length;
};

const nextConsonantPosition = function nextConsonantPosition(word, vowels, start = 0) {
	const length = word.length;

	for (let position = start; position < length; position++) {
		if (!isVowel(word[position], vowels)) {
			return position;
		}
	}

	return length;
};

const replaceCharacters = function replaceCharacters(word, charactersToReplace, replacements) {
	for (let i = 0; i < charactersToReplace.length; i++) {
		word = word.replace(charactersToReplace[i], replacements[i]);
	}

	return word;
};

const stemStandardSuffixes = function stemStandardSuffixes(word, standardSuffixData, r1Text, r2Text, rvText) {
	const regions = {
		r1: r1Text,
		r2: r2Text,
		rv: rvText
	};

	for (const suffixGroup of standardSuffixData.standardGroups) {
		const foundSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(regions[suffixGroup.region], suffixGroup.suffixes);

		if (foundSuffix) {
			return word.slice(0, -foundSuffix.length) + suffixGroup.replacement;
		}
	}

	const specialEnding = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(regions[standardSuffixData.specialClass.region], standardSuffixData.specialClass.suffixes);
	if ((0, _findMatchingEndingInArray.findMatchingEndingInArray)(word, standardSuffixData.specialClass.wordEndingsToCheck) && specialEnding) {
		word = word.slice(0, -specialEnding.length) + standardSuffixData.specialClass.replacement;
	}

	return word;
};

const stemVerbSuffixes = function stemVerbSuffixes(word, verbSuffixes, rvText) {
	const verbSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, verbSuffixes);

	if (verbSuffix !== "") {
		word = word.slice(0, -verbSuffix.length);
	}

	return word;
};

const stemResidualSuffixes = function stemResidualSuffixes(word, residualSuffixData, rvText) {
	const foundSuffixUe = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, residualSuffixData.groupUe.suffixes);
	const foundSuffixIe = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, residualSuffixData.groupIe.suffixes);
	const foundSuffixE = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, residualSuffixData.groupESuffixes);

	if (foundSuffixUe && (0, _findMatchingEndingInArray.findMatchingEndingInArray)(word, residualSuffixData.groupUe.wordEndingsToCheck)) {
		word = word.slice(0, -foundSuffixUe.length);
	} else if (foundSuffixIe && (0, _findMatchingEndingInArray.findMatchingEndingInArray)(word, residualSuffixData.groupIe.wordEndingsToCheck)) {
		word = word.slice(0, -foundSuffixIe.length);
	} else if (foundSuffixE) {
		word = word.slice(0, -foundSuffixE.length);
	} else if (word.endsWith(residualSuffixData.cCedilla[0])) {
		word = word.slice(0, -1) + residualSuffixData.cCedilla[1];
	}

	return word;
};

function stem(word, morphologyData) {
	word.toLowerCase();
	const vowels = morphologyData.externalStemmer.vowels;

	const nasalVowels = morphologyData.externalStemmer.nasalVowels.originals;
	const nasalVowelsReplacement = morphologyData.externalStemmer.nasalVowels.replacements;
	word = replaceCharacters(word, nasalVowels, nasalVowelsReplacement);

	const length = word.length;
	if (length < 2) {
		return word;
	}

	let r1 = length;
	let r2 = length;
	let rv = length;

	for (let i = 0; i < length - 1 && r1 === length; i++) {
		if (isVowel(word[i], vowels) && !isVowel(word[i + 1], vowels)) {
			r1 = i + 2;
		}
	}

	for (let i = r1; i < length - 1 && r2 === length; i++) {
		if (isVowel(word[i], vowels) && !isVowel(word[i + 1], vowels)) {
			r2 = i + 2;
		}
	}

	if (length > 3) {
		if (!isVowel(word[1], vowels)) {
			rv = nextVowelPosition(word, vowels, 2) + 1;
		} else if (isVowel(word[0], vowels) && isVowel(word[1], vowels)) {
			rv = nextConsonantPosition(word, vowels, 2) + 1;
		} else {
			rv = 3;
		}
	}

	const r1Text = word.slice(r1);
	const r2Text = word.slice(r2);
	let rvText = word.slice(rv);

	const wordAfterStep1 = stemStandardSuffixes(word, morphologyData.externalStemmer.standardSuffixes, r1Text, r2Text, rvText);

	let wordAfterStep2 = "";

	if (word === wordAfterStep1) {
		wordAfterStep2 = stemVerbSuffixes(word, morphologyData.externalStemmer.verbSuffixes, rvText);
	}

	if (word !== wordAfterStep1) {
		word = wordAfterStep1;
		rvText = word.slice(rv);
	} else if (word !== wordAfterStep2) {
		word = wordAfterStep2;
		rvText = word.slice(rv);
	}

	if (wordAfterStep1 !== word || wordAfterStep2 !== word) {
		if (word.endsWith(morphologyData.externalStemmer.ciToC[0]) && rvText.endsWith(morphologyData.externalStemmer.ciToC[1])) {
			word = word.slice(0, -1);
			rvText = word.slice(rv);
		}
	} else {
		const foundGeneralSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, morphologyData.externalStemmer.generalSuffixes);
		if (foundGeneralSuffix !== "") {
			word = word.slice(0, -foundGeneralSuffix.length);
			rvText = word.slice(rv);
		}
	}

	word = stemResidualSuffixes(word, morphologyData.externalStemmer.residualSuffixes, rvText);

	word = replaceCharacters(word, nasalVowelsReplacement, nasalVowels);

	return word;
}
