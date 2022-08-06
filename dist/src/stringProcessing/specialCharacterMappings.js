"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.replaceTurkishIsMemoized = exports.replaceTurkishIs = exports.combinations = exports.arraysOverlap = exports.arraysDifference = exports.getIndicesOfCharacter = exports.getIndicesOfWords = undefined;

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _includes = require("lodash/includes");

var _includes2 = _interopRequireDefault(_includes);

var _memoize = require("lodash/memoize");

var _memoize2 = _interopRequireDefault(_memoize);

var _getWords = require("./getWords");

var _getWords2 = _interopRequireDefault(_getWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getIndicesOfWords(text) {
	const indices = [];
	const words = (0, _getWords2.default)(text);
	let startSearchFrom = 0;

	words.forEach(function (word) {
		const currentIndex = text.indexOf(word, startSearchFrom);
		indices.push(currentIndex);
		startSearchFrom = currentIndex + word.length;
	});

	return indices;
}

function getIndicesOfCharacter(text, characterToFind) {
	const indices = [];

	if (text.indexOf(characterToFind) > -1) {
		for (let i = 0; i < text.length; i++) {
			if (text[i] === characterToFind) {
				indices.push(i);
			}
		}
	}

	return indices;
}

function arraysDifference(bigArray, subarray) {
	return (0, _filter2.default)(bigArray, function (element) {
		return !(0, _includes2.default)(subarray, element);
	});
}

function arraysOverlap(firstArray, secondArray) {
	return (0, _filter2.default)(firstArray, function (element) {
		return (0, _includes2.default)(secondArray, element);
	});
}

function combinations(collection) {
	function acc(xs, array) {
		const x = xs[0];

		if (typeof x === "undefined") {
			return array;
		}

		for (let i = 0, l = array.length; i < l; ++i) {
			array.push(array[i].concat(x));
		}
		return acc(xs.slice(1), array);
	}
	return acc(collection, [[]]).slice(1).concat([[]]);
}

function replaceCharactersByIndex(text, indices, substitute) {
	const modifiedTextSplitByLetter = text.split("");

	indices.forEach(function (index) {
		modifiedTextSplitByLetter.splice(index, 1, substitute);
	});

	return modifiedTextSplitByLetter.join("");
}

function replaceTurkishIs(text) {
	const indicesOfAllIs = getIndicesOfCharacter(text, "İ").concat(getIndicesOfCharacter(text, "I"), getIndicesOfCharacter(text, "i"), getIndicesOfCharacter(text, "ı"));
	indicesOfAllIs.sort();

	if (indicesOfAllIs.length === 0) {
		return [text];
	}
	const indicesOfIsInWordBeginnings = arraysOverlap(getIndicesOfWords(text), indicesOfAllIs);

	const results = [];

	const combinationsDottedI = combinations(indicesOfIsInWordBeginnings);

	combinationsDottedI.forEach(function (oneCombinationDottedI) {
		if (oneCombinationDottedI === indicesOfIsInWordBeginnings) {
			results.push([oneCombinationDottedI, [], [], []]);
		} else {
			const indicesNotDottedI = arraysDifference(indicesOfIsInWordBeginnings, oneCombinationDottedI);

			const combinationsDotlessI = combinations(indicesNotDottedI);
			combinationsDotlessI.forEach(function (oneCombinationDotlessI) {
				if (oneCombinationDotlessI === indicesNotDottedI) {
					results.push([oneCombinationDottedI, oneCombinationDotlessI, [], []]);
				} else {
					const indicesSmalli = arraysDifference(indicesNotDottedI, oneCombinationDotlessI);

					const combinationsDottedi = combinations(indicesSmalli);

					combinationsDottedi.forEach(function (oneCombinationDottedi) {
						if (oneCombinationDottedi === indicesSmalli) {
							results.push([oneCombinationDottedI, oneCombinationDotlessI, oneCombinationDottedi, []]);
						} else {
							const oneCombinationDotlessi = arraysDifference(indicesSmalli, oneCombinationDottedi);

							results.push([oneCombinationDottedI, oneCombinationDotlessI, oneCombinationDottedi, oneCombinationDotlessi]);
						}
					});
				}
			});
		}
	});

	const textAlternations = [];

	results.forEach(function (result) {
		const toDottedI = replaceCharactersByIndex(text, result[0], "İ");
		const toDotlessI = replaceCharactersByIndex(toDottedI, result[1], "I");
		const toDottedi = replaceCharactersByIndex(toDotlessI, result[2], "i");
		const toDotlessi = replaceCharactersByIndex(toDottedi, result[3], "ı");
		textAlternations.push(toDotlessi);
	});

	return textAlternations;
}

const replaceTurkishIsMemoized = (0, _memoize2.default)(replaceTurkishIs);

exports.getIndicesOfWords = getIndicesOfWords;
exports.getIndicesOfCharacter = getIndicesOfCharacter;
exports.arraysDifference = arraysDifference;
exports.arraysOverlap = arraysOverlap;
exports.combinations = combinations;
exports.replaceTurkishIs = replaceTurkishIs;
exports.replaceTurkishIsMemoized = replaceTurkishIsMemoized;
