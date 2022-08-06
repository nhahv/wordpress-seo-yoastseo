"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _determineProminentWords = require("../stringProcessing/determineProminentWords");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProminentWordsForInsights(paper, researcher) {
	const text = paper.getText();
	const language = (0, _getLanguage2.default)(paper.getLocale());
	const morphologyData = (0, _lodashEs.get)(researcher.getData("morphology"), language, false);

	const abbreviations = (0, _determineProminentWords.retrieveAbbreviations)(text);

	const prominentWordsFromText = (0, _determineProminentWords.getProminentWords)(text, abbreviations, language, morphologyData);

	const collapsedWords = (0, _determineProminentWords.collapseProminentWordsOnStem)(prominentWordsFromText);
	(0, _determineProminentWords.sortProminentWords)(collapsedWords);

	return (0, _lodashEs.take)((0, _determineProminentWords.filterProminentWords)(collapsedWords, 5), 20);
}

exports.default = getProminentWordsForInsights;
