"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

const isVowel = function isVowel(char, morphologyData) {
	return morphologyData.externalStemmer.vowels.includes(char);
};

const findRvRegion = function findRvRegion(word, morphologyData) {
	let rv = 0;
	let state = 0;
	const wordLength = word.length;

	for (let i = 1; i < wordLength; i++) {
		const prevChar = word.substring(i - 1, i);
		const char = word.substring(i, i + 1);
		switch (state) {
			case 0:
				if (isVowel(char, morphologyData)) {
					rv = i + 1;
					state = 1;
				}
				break;
			case 1:
				if (isVowel(prevChar, morphologyData) && isVowel(char, morphologyData)) {
					state = 2;
				}
				break;
			case 2:
				if (isVowel(prevChar, morphologyData) && isVowel(char, morphologyData)) {
					return rv;
				}
				break;
		}
	}

	return rv;
};

const removeEndings = function removeEndings(word, regex, region) {
	const prefix = word.substr(0, region);
	const ending = word.substr(prefix.length);

	let currentRegex;

	if (Array.isArray(regex)) {
		currentRegex = new RegExp(regex[0], "i");

		if (currentRegex.test(ending)) {
			word = prefix + ending.replace(currentRegex, "");
			return word;
		}

		currentRegex = new RegExp(regex[1], "i");
	} else {
		currentRegex = new RegExp(regex, "i");
	}

	if (currentRegex.test(ending)) {
		word = prefix + ending.replace(currentRegex, "");
		return word;
	}

	return null;
};

const removeInflectionalSuffixes = function removeInflectionalSuffixes(word, morphologyData, rv) {
	const removeDerivationalNounSuffix = removeEndings(word, morphologyData.externalStemmer.regexDerivationalNounSuffix, rv);
	if (removeDerivationalNounSuffix) {
		return removeDerivationalNounSuffix;
	}

	const removeGerundSuffixes = removeEndings(word, [morphologyData.externalStemmer.regexPerfectiveGerunds1, morphologyData.externalStemmer.regexPerfectiveGerunds2], rv);

	if (removeGerundSuffixes) {
		word = removeGerundSuffixes;
	} else {
		const removeReflexiveSuffixes = removeEndings(word, morphologyData.externalStemmer.regexReflexives, rv);

		if (removeReflexiveSuffixes) {
			word = removeReflexiveSuffixes;
		}

		const regexAdjective = morphologyData.externalStemmer.regexAdjective;
		const removeParticipleSuffixes = removeEndings(word, morphologyData.externalStemmer.regexParticiple + regexAdjective, rv);
		const removeAdjectiveSuffixes = removeEndings(word, regexAdjective, rv);

		if (removeParticipleSuffixes) {
			word = removeParticipleSuffixes;
		} else if (removeAdjectiveSuffixes) {
			word = removeAdjectiveSuffixes;
		} else {
			const removeVerbalSuffixes = removeEndings(word, [morphologyData.externalStemmer.regexVerb1, morphologyData.externalStemmer.regexVerb2], rv);
			if (removeVerbalSuffixes) {
				word = removeVerbalSuffixes;
			} else {
				const removeNounSuffixes = removeEndings(word, morphologyData.externalStemmer.regexNoun, rv);
				if (removeNounSuffixes) {
					word = removeNounSuffixes;
				}
			}
		}
	}

	return word;
};

const checkWordInFullFormExceptions = function checkWordInFullFormExceptions(word, exceptions) {
	for (const paradigm of exceptions) {
		if (paradigm[1].includes(word)) {
			return paradigm[0];
		}
	}
	return null;
};

const canonicalizeStems = function canonicalizeStems(word, wordsWithMultipleStems) {
	const multipleStems = wordsWithMultipleStems.find(stems => stems.includes(word));

	if (multipleStems) {
		return multipleStems[0];
	}

	return word;
};

function stem(word, morphologyData) {
	if (morphologyData.doNotStemSuffix.includes(word)) {
		return word;
	}

	const fullFormException = checkWordInFullFormExceptions(word, morphologyData.exceptionStemsWithFullForms);
	if (fullFormException) {
		return fullFormException;
	}

	const rv = findRvRegion(word, morphologyData);

	word = removeInflectionalSuffixes(word, morphologyData, rv);

	const removeIEnding = removeEndings(word, morphologyData.externalStemmer.regexI, rv);
	if (removeIEnding) {
		word = removeIEnding;
	}

	if (word.endsWith(morphologyData.externalStemmer.doubleN)) {
		word = word.substr(0, word.length - 1);
	}

	const removeSuperlativeSuffixes = removeEndings(word, morphologyData.externalStemmer.regexSuperlative, rv);
	if (removeSuperlativeSuffixes) {
		word = removeSuperlativeSuffixes;
	}

	const removeSoftSignEnding = removeEndings(word, morphologyData.externalStemmer.regexSoftSign, rv);
	if (removeSoftSignEnding) {
		word = removeSoftSignEnding;
	}

	const canonicalizedStem = canonicalizeStems(word, morphologyData.stemsThatBelongToOneWord);
	if (canonicalizedStem) {
		return canonicalizedStem;
	}

	return word;
}
