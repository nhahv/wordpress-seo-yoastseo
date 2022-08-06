"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (array) {
	array = array.map(function (wordCombination) {
		return wordCombinationToRegexString(wordCombination);
	});
	const regexString = "(" + array.join(")|(") + ")";
	return new RegExp(regexString, "ig");
};

var _addWordboundary = require("../stringProcessing/addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wordCombinationToRegexString = function wordCombinationToRegexString(array) {
	array = array.map(function (word) {
		return (0, _addWordboundary2.default)(word);
	});
	return array.join("(.*?)");
};
