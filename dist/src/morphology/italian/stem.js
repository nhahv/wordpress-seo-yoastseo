"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData");

function isVowel(letter, morphologyData) {
	return morphologyData.externalStemmer.vowels.includes(letter);
}

function getNextVowelPos(word, morphologyData, start) {
	start = start + 1;
	const length = word.length;

	for (let i = start; i < length; i++) {
		if (isVowel(word[i], morphologyData)) {
			return i;
		}
	}

	return length;
}

function getNextConsonantPos(word, morphologyData, start) {
	const length = word.length;

	for (let i = start; i < length; i++) {
		if (!isVowel(word[i], morphologyData)) {
			return i;
		}
	}

	return length;
}

function endsinArr(word, suffixes) {
	for (let i = 0; i < suffixes.length; i++) {
		if (word.endsWith(suffixes[i])) {
			return suffixes[i];
		}
	}

	return "";
}

function replaceAcute(word, morphologyData) {
	const acuteReplacements = (0, _createRulesFromMorphologyData.createRulesFromMorphologyData)(morphologyData.externalStemmer.preProcessing.acuteReplacements, "gi");

	for (const acuteReplacement of acuteReplacements) {
		word = word.replace(acuteReplacement.reg, acuteReplacement.repl);
	}

	return word;
}

function vowelMarking(word, morphologyData) {
	return word.replace(new RegExp(morphologyData.externalStemmer.preProcessing.vowelMarking, "g"), (match, p1, p2, p3) => p1 + p2.toUpperCase() + p3);
}

function preProcess(word, morphologyData) {
	word = word.toLowerCase();
	word = replaceAcute(word, morphologyData);
	const quReplacement = (0, _createRulesFromMorphologyData.createSingleRuleFromMorphologyData)(morphologyData.externalStemmer.preProcessing.quReplacement, "g");
	word = word.replace(quReplacement.reg, quReplacement.repl);
	word = vowelMarking(word, morphologyData);

	return word;
}

const determineRs = function determineRs(word, morphologyData) {
	let r1 = word.length;
	let r2 = word.length;
	let rv = word.length;

	for (let i = 0; i < word.length - 1 && r1 === word.length; i++) {
		if (isVowel(word[i], morphologyData) && !isVowel(word[i + 1], morphologyData)) {
			r1 = i + 2;
		}
	}

	for (let i = r1; i < word.length - 1 && r2 === word.length; i++) {
		if (isVowel(word[i], morphologyData) && !isVowel(word[i + 1], morphologyData)) {
			r2 = i + 2;
		}
	}

	if (word.length > 3) {
		if (!isVowel(word[1], morphologyData)) {
			rv = getNextVowelPos(word, morphologyData, 1) + 1;
		} else if (isVowel(word[0], morphologyData) && isVowel(word[1], morphologyData)) {
			rv = getNextConsonantPos(word, morphologyData, 2) + 1;
		} else {
			rv = 3;
		}
	}

	return { r1, r2, rv };
};

const removePronounSuffixes = function removePronounSuffixes(word, morphologyData, rvText) {
	const foundSuffix = endsinArr(word, morphologyData.externalStemmer.pronounSuffixes.suffixes);

	if (foundSuffix !== "") {
		const foundSuffixPre1 = endsinArr(rvText.slice(0, -foundSuffix.length), morphologyData.externalStemmer.pronounSuffixes.preSuffixesGerund);
		const foundSuffixPre2 = endsinArr(rvText.slice(0, -foundSuffix.length), morphologyData.externalStemmer.pronounSuffixes.preSuffixesInfinitive);

		if (foundSuffixPre1 !== "") {
			word = word.slice(0, -foundSuffix.length);
		}
		if (foundSuffixPre2 !== "") {
			word = word.slice(0, -foundSuffix.length) + morphologyData.externalStemmer.pronounSuffixes.infinitiveCompletion;
		}
	}
	return word;
};

const removeStandardSuffixes = function removeStandardSuffixes(word, morphologyData, r2Text, r1Text, rvText) {
	const regions = {
		r1: r1Text,
		r2: r2Text,
		rv: rvText
	};

	for (const suffixGroup of morphologyData.externalStemmer.standardSuffixes) {
		const foundSuffix = endsinArr(regions[suffixGroup.region], suffixGroup.suffixes);

		if (foundSuffix) {
			return word.slice(0, -foundSuffix.length) + suffixGroup.replacement;
		}
	}

	return word;
};

const removeVerbSuffixes = function removeVerbSuffixes(word, morphologyData, rvText) {
	const foundSuffix = endsinArr(rvText, morphologyData.externalStemmer.verbSuffixes);

	if (foundSuffix) {
		word = word.slice(0, -foundSuffix.length);
	}

	return word;
};

const normalizeDigraphs = function normalizeDigraphs(word, morphologyData, rvText) {
	const digraphCh = morphologyData.externalStemmer.digraphNormalization.digraphCh;
	const digraphGh = morphologyData.externalStemmer.digraphNormalization.digraphGh;

	if (rvText.endsWith(digraphCh[0])) {
		word = word.slice(0, -digraphGh[0].length) + digraphCh[1];
	} else if (rvText.endsWith(digraphGh[0])) {
		word = word.slice(0, -digraphGh[0].length) + digraphGh[1];
	}

	return word;
};

const canonicalizeStem = function canonicalizeStem(word, stemsThatBelongToOneWord) {
	for (const paradigm of stemsThatBelongToOneWord.verbsWithMultipleStems) {
		if (paradigm.includes(word)) {
			return paradigm[0];
		}
	}

	for (const paradigm of stemsThatBelongToOneWord.irregularDiminutives) {
		if (paradigm.includes(word)) {
			return paradigm[0];
		}
	}
};

const checkWordInFullFormExceptions = function checkWordInFullFormExceptions(word, exceptions) {
	for (const paradigm of exceptions) {
		if (paradigm[1].includes(word)) {
			return paradigm[0];
		}
	}
	return null;
};

function stem(word, morphologyData) {
	const irregularPluralNounsAndAdjectives = checkWordInFullFormExceptions(word, morphologyData.irregularPluralNounsAndAdjectives);
	if (irregularPluralNounsAndAdjectives) {
		return irregularPluralNounsAndAdjectives;
	}

	word = preProcess(word, morphologyData);

	if (word.length < 3) {
		return word;
	}

	var _determineRs = determineRs(word, morphologyData);

	const r1 = _determineRs.r1,
	      r2 = _determineRs.r2,
	      rv = _determineRs.rv;

	let r1Text = word.substring(r1);
	let r2Text = word.substring(r2);
	let rvText = word.substring(rv);

	const originalWord = word;

	word = removePronounSuffixes(word, morphologyData, rvText);

	if (word !== originalWord) {
		r1Text = word.substring(r1);
		r2Text = word.substring(r2);
		rvText = word.substring(rv);
	}

	const wordAfter0 = word;

	word = removeStandardSuffixes(word, morphologyData, r2Text, r1Text, rvText);

	if (word !== wordAfter0) {
		rvText = word.substring(rv);
	}

	const wordAfter1 = word;

	if (wordAfter0 === wordAfter1) {
		word = removeVerbSuffixes(word, morphologyData, rvText);
	}

	rvText = word.substring(rv);

	let foundSuffix = "";

	if ((foundSuffix = endsinArr(rvText, morphologyData.externalStemmer.generalSuffixes)) !== "") {
		word = word.slice(0, -foundSuffix.length);
	}

	rvText = word.substring(rv);

	word = normalizeDigraphs(word, morphologyData, rvText);

	const canonicalStem = canonicalizeStem(word, morphologyData.stemsThatBelongToOneWord);
	if (canonicalStem) {
		return canonicalStem;
	}
	return word.toLowerCase();
}
