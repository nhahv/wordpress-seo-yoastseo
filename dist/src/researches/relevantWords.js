"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _relevantWords = require("../stringProcessing/relevantWords");

var _countWords = require("../stringProcessing/countWords");

var _countWords2 = _interopRequireDefault(_countWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function relevantWords(paper) {
	const text = paper.getText();
	const metadescription = paper.getDescription();
	const title = paper.getTitle();

	const result = {};
	result.hasMetaDescription = metadescription !== "";
	result.hasTitle = title !== "";
	result.prominentWords = [];

	if ((0, _countWords2.default)(text) < 400) {
		return result;
	}

	result.prominentWords = (0, _relevantWords.getRelevantWords)(paper.getText(), paper.getLocale());
	return result;
}

exports.default = relevantWords;
