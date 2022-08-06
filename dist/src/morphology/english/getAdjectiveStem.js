"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (word, regexAdjective, stopAdjectives) {
	const canBeComparative = constructCanBeFunction("er", 4, stopAdjectives.erExceptions);
	if (canBeComparative(word)) {
		const comparativeToBaseRegex = (0, _createRulesFromMorphologyData2.default)(regexAdjective.comparativeToBase);
		return {
			base: (0, _buildFormRule.buildOneFormFromRegex)(word, comparativeToBaseRegex) || word,
			guessedForm: "er"
		};
	}

	const canBeSuperlative = constructCanBeFunction("est", 5, stopAdjectives.estExceptions);
	if (canBeSuperlative(word)) {
		const superlativeToBaseRegex = (0, _createRulesFromMorphologyData2.default)(regexAdjective.superlativeToBase);
		return {
			base: (0, _buildFormRule.buildOneFormFromRegex)(word, superlativeToBaseRegex) || word,
			guessedForm: "est"
		};
	}

	const canBeLyAdverb = constructCanBeFunction("ly", 5, stopAdjectives.lyExceptions);
	if (canBeLyAdverb(word)) {
		const adverbToBaseRegex = (0, _createRulesFromMorphologyData2.default)(regexAdjective.adverbToBase);
		return {
			base: (0, _buildFormRule.buildOneFormFromRegex)(word, adverbToBaseRegex),
			guessedForm: "ly"
		};
	}

	return {
		base: word,
		guessedForm: "base"
	};
};

var _buildFormRule = require("../morphoHelpers/buildFormRule");

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData");

var _createRulesFromMorphologyData2 = _interopRequireDefault(_createRulesFromMorphologyData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const constructCanBeFunction = function constructCanBeFunction(endsWith, minimumWordLength, exceptions) {
	return word => {
		const wordLength = word.length;
		if (wordLength < minimumWordLength) {
			return false;
		}

		const doesEndWith = word.substring(wordLength - endsWith.length, wordLength) === endsWith;
		return doesEndWith && !exceptions.includes(word);
	};
};
