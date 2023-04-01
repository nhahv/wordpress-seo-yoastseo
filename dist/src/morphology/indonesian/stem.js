"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

var _buildFormRule = require("../morphoHelpers/buildFormRule");

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData");

var _createRulesFromMorphologyData2 = _interopRequireDefault(_createRulesFromMorphologyData);

var _flattenSortLength = require("../morphoHelpers/flattenSortLength");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkSingleSyllableWordSuffix = function checkSingleSyllableWordSuffix(word, suffixesArray) {
	for (const suffix of suffixesArray) {
		if (word.match(suffix)) {
			return true;
		}
	}
};

const stemSingleSyllableWordsPrefixes = function stemSingleSyllableWordsPrefixes(word, morphologyData) {
	if (word.startsWith("di") && (0, _helpers.checkBeginningsList)(word, 2, morphologyData.stemming.singleSyllableWords)) {
		return word.substring(2, word.length);
	}

	if (/^[mp]enge/i.test(word) && (0, _helpers.checkBeginningsList)(word, 5, morphologyData.stemming.singleSyllableWords)) {
		return word.substring(5, word.length);
	}
	return word;
};

const stemSingleSyllableWords = function stemSingleSyllableWords(word, morphologyData) {
	const singleSyllableWords = morphologyData.stemming.singleSyllableWords;
	const suffixCombination = morphologyData.stemming.singleSyllableWordsSuffixes;
	const inputWord = word;

	word = stemSingleSyllableWordsPrefixes(word, morphologyData);

	if (singleSyllableWords.some(shortWord => word.startsWith(shortWord)) && (0, _helpers.calculateTotalNumberOfSyllables)(word) <= 3 && checkSingleSyllableWordSuffix(word, suffixCombination)) {
		word = (0, _helpers.removeEnding)(word, morphologyData.stemming.regexRules.removeParticle, morphologyData.stemming.doNotStemWords.doNotStemParticle, morphologyData);

		word = (0, _helpers.removeEnding)(word, morphologyData.stemming.regexRules.removePronoun, morphologyData.stemming.doNotStemWords.doNotStemPronounSuffix, morphologyData);

		const wordWithoutDerivationalSuffix = (0, _helpers.removeEnding)(word, morphologyData.stemming.regexRules.removeSuffixes, morphologyData.stemming.doNotStemWords.doNotStemSuffix, morphologyData);

		if (singleSyllableWords.includes(wordWithoutDerivationalSuffix)) {
			word = wordWithoutDerivationalSuffix;
		}
	}

	if ((0, _helpers.calculateTotalNumberOfSyllables)(word) > 1 || word.length === 1) {
		word = inputWord;
	}
	return word;
};

const tryStemmingKeAndTer = function tryStemmingKeAndTer(morphologyData, word) {
	const terException = morphologyData.stemming.doNotStemWords.doNotStemPrefix.doNotStemFirstOrderPrefix.doNotStemTer;

	if (word.startsWith("keter")) {
		word = word.substring(2, word.length);
	}
	if (word.startsWith("ter")) {
		if (terException.some(wordWithTer => word.startsWith(wordWithTer))) {
			return word;
		}

		if ((0, _helpers.checkBeginningsList)(word, 3, morphologyData.stemming.beginningModification.rBeginning)) {
			return word.replace(/^ter/i, "r");
		}

		return word.substring(3, word.length);
	}
};

const checkFirstOrderPrefixExceptions = function checkFirstOrderPrefixExceptions(word, morphologyData) {
	const beginningModification = morphologyData.stemming.beginningModification;

	if (/^[mp]en/i.test(word)) {
		if ((0, _helpers.checkBeginningsList)(word, 3, beginningModification.nBeginning)) {
			return word.replace(/^[mp]en/i, "n");
		}
	}
	if (/^[mp]eng/i.test(word) && (0, _helpers.checkBeginningsList)(word, 4, beginningModification.kBeginning)) {
		return word.replace(/^[mp]eng/i, "k");
	}

	if (/^[mp]em/i.test(word)) {
		if ((0, _helpers.checkBeginningsList)(word, 3, beginningModification.pBeginning)) {
			return word.replace(/^(mem|pem)/i, "p");
		} else if ((0, _helpers.checkBeginningsList)(word, 3, beginningModification.mBeginning)) {
			return word.replace(/^(mem|pem)/i, "m");
		}
	}

	const wordAfterKeTerCheck = tryStemmingKeAndTer(morphologyData, word);
	if (wordAfterKeTerCheck) {
		return wordAfterKeTerCheck;
	}
};

const removeFirstOrderPrefix = function removeFirstOrderPrefix(word, morphologyData) {
	const firstOrderPrefixException = checkFirstOrderPrefixExceptions(word, morphologyData);

	if (firstOrderPrefixException) {
		return firstOrderPrefixException;
	}
	const regex = (0, _createRulesFromMorphologyData2.default)(morphologyData.stemming.regexRules.removeFirstOrderPrefixes);
	const withRemovedFirstOrderPrefix = (0, _buildFormRule.buildOneFormFromRegex)(word, regex);

	return withRemovedFirstOrderPrefix || word;
};

const removeSecondOrderPrefix = function removeSecondOrderPrefix(word, morphologyData) {
	if ((word.startsWith("ber") || word.startsWith("per")) && (0, _helpers.checkBeginningsList)(word, 3, morphologyData.stemming.beginningModification.rBeginning)) {
		return word.replace(/^(ber|per)/i, "r");
	}

	if (/^peng/i.test(word) && (0, _helpers.checkBeginningsList)(word, 4, morphologyData.stemming.beginningModification.kBeginning)) {
		return word.replace(/^peng/i, "k");
	}
	const regex = (0, _createRulesFromMorphologyData2.default)(morphologyData.stemming.regexRules.removeSecondOrderPrefixes);
	const withRemovedSecondOrderPrefix = (0, _buildFormRule.buildOneFormFromRegex)(word, regex);

	return withRemovedSecondOrderPrefix || word;
};

const stemDerivational = function stemDerivational(word, morphologyData) {
	let wordLength = word.length;
	const removeSuffixRules = morphologyData.stemming.regexRules.removeSuffixes;
	const removeSuffixExceptions = morphologyData.stemming.doNotStemWords.doNotStemSuffix;
	const doNotStemFirstOrderPrefix = (0, _flattenSortLength.flattenSortLength)(morphologyData.stemming.doNotStemWords.doNotStemPrefix.doNotStemFirstOrderPrefix);
	const doNotStemSecondOrderPrefix = (0, _flattenSortLength.flattenSortLength)(morphologyData.stemming.doNotStemWords.doNotStemPrefix.doNotStemSecondOrderPrefix);

	if (!doNotStemFirstOrderPrefix.some(wordWithPrefixLookAlike => word.startsWith(wordWithPrefixLookAlike))) {
		word = removeFirstOrderPrefix(word, morphologyData);
	}

	if (wordLength === word.length) {
		if (!doNotStemSecondOrderPrefix.some(wordWithPrefixLookAlike => word.startsWith(wordWithPrefixLookAlike))) {
			word = removeSecondOrderPrefix(word, morphologyData);
		}

		if ((0, _helpers.calculateTotalNumberOfSyllables)(word) > 2) {
			word = (0, _helpers.removeEnding)(word, removeSuffixRules, removeSuffixExceptions, morphologyData);
		}
	} else {
		wordLength = word.length;

		if ((0, _helpers.calculateTotalNumberOfSyllables)(word) > 2) {
			word = (0, _helpers.removeEnding)(word, removeSuffixRules, removeSuffixExceptions, morphologyData);
		}

		if (wordLength !== word.length && !doNotStemSecondOrderPrefix.includes(word)) {
			if ((0, _helpers.calculateTotalNumberOfSyllables)(word) > 2) {
				word = removeSecondOrderPrefix(word, morphologyData);
			}
		}
	}
	return word;
};

const stemSingular = function stemSingular(word, morphologyData) {
	const singleSyllableWords = stemSingleSyllableWords(word, morphologyData);

	word = singleSyllableWords;

	const doNotStemParticle = morphologyData.stemming.doNotStemWords.doNotStemParticle;
	const doNotStemPronoun = morphologyData.stemming.doNotStemWords.doNotStemPronounSuffix;

	if ((0, _helpers.calculateTotalNumberOfSyllables)(word) <= 2) {
		return word;
	}

	const firstDerivationalStem = stemDerivational(word, morphologyData);
	if (doNotStemParticle.includes(firstDerivationalStem) || doNotStemPronoun.includes(firstDerivationalStem)) {
		return firstDerivationalStem;
	}

	word = (0, _helpers.removeEnding)(word, morphologyData.stemming.regexRules.removeParticle, doNotStemParticle, morphologyData);

	if ((0, _helpers.calculateTotalNumberOfSyllables)(word) > 2) {
		word = (0, _helpers.removeEnding)(word, morphologyData.stemming.regexRules.removePronoun, doNotStemPronoun, morphologyData);
	}

	if ((0, _helpers.calculateTotalNumberOfSyllables)(word) > 2) {
		word = stemDerivational(word, morphologyData);
	}
	return word;
};

const stemPlural = function stemPlural(word, morphologyData) {
	const hyphenIndex = word.indexOf("-");

	if (hyphenIndex === -1) {
		return null;
	}

	const splitWord = word.split("-");

	if (splitWord.length === 2) {
		let firstPart = splitWord[0];
		let secondPart = splitWord[1];

		firstPart = stemSingular(firstPart, morphologyData);
		secondPart = stemSingular(secondPart, morphologyData);

		const firstPartBeginningTrimmed = firstPart.substr(1);
		const secondPartBeginningTrimmed = secondPart.startsWith("ng") || secondPart.startsWith("ny") ? secondPart.substr(2) : secondPart.substr(1);

		if (firstPartBeginningTrimmed === secondPartBeginningTrimmed) {
			const nonPlurals = morphologyData.stemming.nonPluralReduplications;

			if (nonPlurals.includes(firstPart) && nonPlurals.includes(secondPart)) {
				return firstPart + "-" + firstPart;
			}

			return firstPart;
		}
	}

	return null;
};

function stem(word, morphologyData) {
	if (morphologyData.stemming.shouldNotBeStemmed.includes(word)) {
		return word;
	}

	const stemmedPlural = stemPlural(word, morphologyData);

	if (stemmedPlural) {
		return stemmedPlural;
	}

	word = stemSingular(word, morphologyData);

	return word;
}
