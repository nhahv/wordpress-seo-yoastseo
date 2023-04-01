"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.findShortestAndAlphabeticallyFirst = findShortestAndAlphabeticallyFirst;
exports.determineIrregularStem = determineIrregularStem;
exports.determineIrregularVerbStem = determineIrregularVerbStem;
exports.determineRegularStem = determineRegularStem;
exports.determineStem = determineStem;

var _lodashEs = require("lodash-es");

var _buildFormRule = require("../morphoHelpers/buildFormRule");

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData.js");

var _createRulesFromMorphologyData2 = _interopRequireDefault(_createRulesFromMorphologyData);

var _getAdjectiveStem = require("./getAdjectiveStem");

var _getAdjectiveStem2 = _interopRequireDefault(_getAdjectiveStem);

var _getVerbStem = require("./getVerbStem.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findShortestAndAlphabeticallyFirst(array) {
	const strings = (0, _lodashEs.flatten)(array);
	let result = strings.pop();

	strings.forEach(str => {
		const lengthDifference = str.length - result.length;
		if (lengthDifference === 0) {
			if (str.localeCompare(result) < 0) {
				result = str;
			}
		} else if (lengthDifference < 0) {
			result = str;
		}
	});

	return result;
}

function determineIrregularStem(word, irregulars) {
	for (let i = 0; i < irregulars.length; i++) {
		const paradigm = irregulars[i];
		for (let j = 0; j < paradigm.length; j++) {
			if (paradigm[j] === word) {
				return paradigm[0];
			}
		}
	}
	return null;
}

function determineIrregularVerbStem(word, verbMorphology) {
	const paradigmIfIrregularVerb = (0, _getVerbStem.checkIrregulars)(word, verbMorphology.irregularVerbs, verbMorphology.regexVerb.verbPrefixes);
	if (!(0, _lodashEs.isUndefined)(paradigmIfIrregularVerb)) {
		return paradigmIfIrregularVerb[0];
	}
	return null;
}

function determineRegularStem(word, morphologyData) {
	const regexVerb = morphologyData.verbs.regexVerb;
	const baseIfPluralNoun = (0, _buildFormRule.buildOneFormFromRegex)(word, (0, _createRulesFromMorphologyData2.default)(morphologyData.nouns.regexNoun.singularize));
	if (!(0, _lodashEs.isUndefined)(baseIfPluralNoun)) {
		if ((0, _getVerbStem.endsWithIng)(baseIfPluralNoun)) {
			return (0, _buildFormRule.buildOneFormFromRegex)(baseIfPluralNoun, (0, _createRulesFromMorphologyData2.default)(regexVerb.ingFormToInfinitive));
		}
		return baseIfPluralNoun;
	}

	const regexAdjective = morphologyData.adjectives.regexAdjective;
	const baseIfIcally = (0, _buildFormRule.buildOneFormFromRegex)(word, (0, _createRulesFromMorphologyData2.default)(regexAdjective.icallyToBase));
	if (!(0, _lodashEs.isUndefined)(baseIfIcally)) {
		return baseIfIcally;
	}

	const possibleRegularBases = [];

	const baseIfVerb = (0, _getVerbStem.getInfinitive)(word, regexVerb).infinitive;

	possibleRegularBases.push(baseIfVerb);

	const stopAdjectives = morphologyData.adjectives.stopAdjectives;

	const baseIfAdjective = (0, _getAdjectiveStem2.default)(word, regexAdjective, stopAdjectives).base;
	possibleRegularBases.push(baseIfAdjective);

	return findShortestAndAlphabeticallyFirst(possibleRegularBases);
}

function determineStem(word, morphologyData) {
	const nounMorphology = morphologyData.nouns;

	const baseIfPossessive = (0, _buildFormRule.buildOneFormFromRegex)(word, (0, _createRulesFromMorphologyData2.default)(nounMorphology.regexNoun.possessiveToBase));

	let stem, irregular;

	if ((0, _lodashEs.isUndefined)(baseIfPossessive)) {
		stem = word;

		irregular = determineIrregularStem(word, nounMorphology.irregularNouns) || determineIrregularStem(word, morphologyData.adjectives.irregularAdjectives) || determineIrregularVerbStem(word, morphologyData.verbs);
	} else {
		stem = baseIfPossessive;

		irregular = determineIrregularStem(baseIfPossessive, nounMorphology.irregularNouns);
	}

	if (irregular) {
		return irregular;
	}

	return determineRegularStem(stem, morphologyData);
}
