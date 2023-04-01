"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.normalizePrefixed = exports.endsWithIng = exports.checkIrregulars = exports.getInfinitive = undefined;

var _lodashEs = require("lodash-es");

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData.js");

var _createRulesFromMorphologyData2 = _interopRequireDefault(_createRulesFromMorphologyData);

var _buildFormRule = require("../morphoHelpers/buildFormRule");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const vowelRegex = /([aeiouy])/g;

const normalizePrefixed = function normalizePrefixed(word, verbPrefixes) {
	for (const property in verbPrefixes) {
		if (verbPrefixes.hasOwnProperty(property)) {
			verbPrefixes[property] = new RegExp(verbPrefixes[property], "i");
		}
	}

	if (verbPrefixes.sevenLetterHyphenPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.sevenLetterHyphenPrefixes, ""),
			prefix: word.substring(0, 8)
		};
	}

	if (verbPrefixes.sevenLetterPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.sevenLetterPrefixes, ""),
			prefix: word.substring(0, 7)
		};
	}

	if (verbPrefixes.fiveLetterHyphenPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.fiveLetterHyphenPrefixes, ""),
			prefix: word.substring(0, 6)
		};
	}

	if (verbPrefixes.fiveLetterPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.fiveLetterPrefixes, ""),
			prefix: word.substring(0, 5)
		};
	}

	if (verbPrefixes.fourLetterHyphenPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.fourLetterHyphenPrefixes, ""),
			prefix: word.substring(0, 5)
		};
	}

	if (verbPrefixes.fourLetterPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.fourLetterPrefixes, ""),
			prefix: word.substring(0, 4)
		};
	}

	if (verbPrefixes.threeLetterHyphenPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.threeLetterHyphenPrefixes, ""),
			prefix: word.substring(0, 4)
		};
	}

	if (verbPrefixes.threeLetterPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.threeLetterPrefixes, ""),
			prefix: word.substring(0, 3)
		};
	}

	if (verbPrefixes.twoLetterHyphenPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.twoLetterHyphenPrefixes, ""),
			prefix: word.substring(0, 3)
		};
	}

	if (verbPrefixes.twoLetterPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.twoLetterPrefixes, ""),
			prefix: word.substring(0, 2)
		};
	}

	if (verbPrefixes.oneLetterPrefixes.test(word) === true) {
		return {
			normalizedWord: word.replace(verbPrefixes.oneLetterPrefixes, ""),
			prefix: word.substring(0, 1)
		};
	}
};

const checkIrregulars = function checkIrregulars(word, irregularVerbs, verbPrefixes) {
	let irregulars;

	irregularVerbs.forEach(function (paradigm) {
		paradigm.forEach(function (wordInParadigm) {
			if (wordInParadigm === word) {
				irregulars = paradigm;
			}
		});
	});

	if ((0, _lodashEs.isUndefined)(irregulars)) {
		const normalizedIrregular = normalizePrefixed(word, verbPrefixes);

		if (!(0, _lodashEs.isUndefined)(normalizedIrregular)) {
			irregularVerbs.forEach(function (paradigm) {
				paradigm.forEach(function (wordInParadigm) {
					if (wordInParadigm === normalizedIrregular.normalizedWord) {
						irregulars = paradigm.map(function (verb) {
							return normalizedIrregular.prefix.concat(verb);
						});
					}
				});
			});
		}
	}

	return irregulars;
};

const endsWithS = function endsWithS(word) {
	const wordLength = word.length;

	if (wordLength > 3) {
		return word[word.length - 1] === "s";
	}
	return false;
};

const endsWithIng = function endsWithIng(word) {
	const vowelCount = (word.match(vowelRegex) || []).length;

	if (vowelCount > 1 && word.length > 4) {
		return word.substring(word.length - 3, word.length) === "ing";
	}
	return false;
};

const endsWithEd = function endsWithEd(word) {
	const vowelCount = (word.match(vowelRegex) || []).length;

	if (vowelCount > 1 || vowelCount === 1 && word.substring(word.length - 3, word.length - 2) !== "e") {
		return word.substring(word.length - 2, word.length) === "ed";
	}
	return false;
};

const getInfinitive = function getInfinitive(word, regexVerb) {
	const sFormToInfinitiveRegex = (0, _createRulesFromMorphologyData2.default)(regexVerb.sFormToInfinitive);
	const ingFormToInfinitiveRegex = (0, _createRulesFromMorphologyData2.default)(regexVerb.ingFormToInfinitive);
	const edFormToInfinitiveRegex = (0, _createRulesFromMorphologyData2.default)(regexVerb.edFormToInfinitive);

	if (endsWithS(word)) {
		return {
			infinitive: (0, _buildFormRule.buildOneFormFromRegex)(word, sFormToInfinitiveRegex),
			guessedForm: "s"
		};
	}

	if (endsWithIng(word)) {
		return {
			infinitive: (0, _buildFormRule.buildOneFormFromRegex)(word, ingFormToInfinitiveRegex),
			guessedForm: "ing"
		};
	}

	if (endsWithEd(word)) {
		return {
			infinitive: (0, _buildFormRule.buildOneFormFromRegex)(word, edFormToInfinitiveRegex) || word,
			guessedForm: "ed"
		};
	}
	return {
		infinitive: word,
		guessedForm: "inf"
	};
};

exports.getInfinitive = getInfinitive;
exports.checkIrregulars = checkIrregulars;
exports.endsWithIng = endsWithIng;
exports.normalizePrefixed = normalizePrefixed;
