"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _syllables = require("../../config/syllables.js");

var _syllables2 = _interopRequireDefault(_syllables);

var _getWords = require("../getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _lodashEs = require("lodash-es");

var _syllableCountIterator = require("../../helpers/syllableCountIterator.js");

var _syllableCountIterator2 = _interopRequireDefault(_syllableCountIterator);

var _DeviationFragment = require("./DeviationFragment");

var _DeviationFragment2 = _interopRequireDefault(_DeviationFragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countVowelGroups = function countVowelGroups(word, locale) {
	var numberOfSyllables = 0;
	var vowelRegex = new RegExp("[^" + (0, _syllables2.default)(locale).vowels + "]", "ig");
	var foundVowels = word.split(vowelRegex);
	var filteredWords = (0, _lodashEs.filter)(foundVowels, function (vowel) {
		return vowel !== "";
	});
	numberOfSyllables += filteredWords.length;

	return numberOfSyllables;
};

var countVowelDeviations = function countVowelDeviations(word, locale) {
	var syllableCountIterator = new _syllableCountIterator2.default((0, _syllables2.default)(locale));
	return syllableCountIterator.countSyllables(word);
};

var countFullWordDeviations = function countFullWordDeviations(word, locale) {
	var fullWordDeviations = (0, _syllables2.default)(locale).deviations.words.full;

	var deviation = (0, _lodashEs.find)(fullWordDeviations, function (fullWordDeviation) {
		return fullWordDeviation.word === word;
	});

	if (!(0, _lodashEs.isUndefined)(deviation)) {
		return deviation.syllables;
	}

	return 0;
};

function createDeviationFragments(syllableConfig) {
	var deviationFragments = [];

	var deviations = syllableConfig.deviations;

	if (!(0, _lodashEs.isUndefined)(deviations.words) && !(0, _lodashEs.isUndefined)(deviations.words.fragments)) {
		deviationFragments = (0, _lodashEs.flatMap)(deviations.words.fragments, function (fragments, fragmentLocation) {
			return (0, _lodashEs.map)(fragments, function (fragment) {
				fragment.location = fragmentLocation;

				return new _DeviationFragment2.default(fragment);
			});
		});
	}

	return deviationFragments;
}

var createDeviationFragmentsMemoized = (0, _lodashEs.memoize)(createDeviationFragments);

var countPartialWordDeviations = function countPartialWordDeviations(word, locale) {
	var deviationFragments = createDeviationFragmentsMemoized((0, _syllables2.default)(locale));
	var remainingParts = word;
	var syllableCount = 0;

	(0, _lodashEs.forEach)(deviationFragments, function (deviationFragment) {
		if (deviationFragment.occursIn(remainingParts)) {
			remainingParts = deviationFragment.removeFrom(remainingParts);
			syllableCount += deviationFragment.getSyllables();
		}
	});

	return { word: remainingParts, syllableCount: syllableCount };
};

var countUsingVowels = function countUsingVowels(word, locale) {
	var syllableCount = 0;

	syllableCount += countVowelGroups(word, locale);
	syllableCount += countVowelDeviations(word, locale);

	return syllableCount;
};

var countSyllablesInWord = function countSyllablesInWord(word, locale) {
	var syllableCount = 0;

	var fullWordExclusion = countFullWordDeviations(word, locale);
	if (fullWordExclusion !== 0) {
		return fullWordExclusion;
	}

	var partialExclusions = countPartialWordDeviations(word, locale);
	word = partialExclusions.word;
	syllableCount += partialExclusions.syllableCount;
	syllableCount += countUsingVowels(word, locale);

	return syllableCount;
};

var countSyllablesInText = function countSyllablesInText(text, locale) {
	text = text.toLocaleLowerCase();
	var words = (0, _getWords2.default)(text);

	var syllableCounts = (0, _lodashEs.map)(words, function (word) {
		return countSyllablesInWord(word, locale);
	});

	return (0, _lodashEs.sum)(syllableCounts);
};

exports.default = countSyllablesInText;
