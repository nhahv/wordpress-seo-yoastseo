"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _countWords = require("../stringProcessing/countWords");

var _countWords2 = _interopRequireDefault(_countWords);

var _determineProminentWords = require("../stringProcessing/determineProminentWords");

var _getSubheadings = require("../stringProcessing/getSubheadings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProminentWordsForInternalLinking(paper, researcher) {
	const text = paper.getText();
	const metadescription = paper.getDescription();
	const title = paper.getTitle();

	const result = {};
	result.hasMetaDescription = metadescription !== "";
	result.hasTitle = title !== "";
	result.prominentWords = [];

	const textLength = (0, _countWords2.default)(text);
	if (textLength < 100) {
		return result;
	}

	const language = (0, _getLanguage2.default)(paper.getLocale());
	const morphologyData = (0, _lodashEs.get)(researcher.getData("morphology"), language, false);

	const subheadings = (0, _getSubheadings.getSubheadingsTopLevel)(text).map(subheading => subheading[2]);
	const attributes = [paper.getKeyword(), paper.getSynonyms(), title, metadescription, subheadings.join(" ")];

	const abbreviations = (0, _determineProminentWords.retrieveAbbreviations)(text.concat(attributes.join(" ")));

	const prominentWordsFromText = (0, _determineProminentWords.getProminentWords)((0, _getSubheadings.removeSubheadingsTopLevel)(text), abbreviations, language, morphologyData);

	const prominentWordsFromPaperAttributes = (0, _determineProminentWords.getProminentWordsFromPaperAttributes)(attributes, abbreviations, language, morphologyData);

	prominentWordsFromPaperAttributes.forEach(relevantWord => relevantWord.setOccurrences(relevantWord.getOccurrences() * 3));

	const collapsedWords = (0, _determineProminentWords.collapseProminentWordsOnStem)(prominentWordsFromPaperAttributes.concat(prominentWordsFromText));
	(0, _determineProminentWords.sortProminentWords)(collapsedWords);

	let minimumNumberOfOccurrences = 4;

	if (!morphologyData) {
		minimumNumberOfOccurrences = 2;
	}

	result.prominentWords = (0, _lodashEs.take)((0, _determineProminentWords.filterProminentWords)(collapsedWords, minimumNumberOfOccurrences), 100);

	return result;
}

exports.default = getProminentWordsForInternalLinking;
