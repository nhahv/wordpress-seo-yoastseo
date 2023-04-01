"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const topicForms = researcher.getResearch("morphology");
	const locale = paper.getLocale();

	let paragraphs = (0, _matchParagraphs2.default)(paper.getText());
	paragraphs = (0, _lodashEs.reject)(paragraphs, _lodashEs.isEmpty);
	paragraphs = (0, _lodashEs.reject)(paragraphs, paragraphHasNoText)[0] || "";

	const result = {
		foundInOneSentence: false,
		foundInParagraph: false,
		keyphraseOrSynonym: ""
	};

	const sentences = (0, _getSentences2.default)(paragraphs);

	const useSynonyms = true;

	if (!(0, _lodashEs.isEmpty)(sentences)) {
		sentences.forEach(function (sentence) {
			const resultSentence = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, sentence, useSynonyms, locale);
			if (resultSentence.percentWordMatches === 100) {
				result.foundInOneSentence = true;
				result.foundInParagraph = true;
				result.keyphraseOrSynonym = resultSentence.keyphraseOrSynonym;
				return result;
			}
		});

		const resultParagraph = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, paragraphs, useSynonyms, locale);
		if (resultParagraph.percentWordMatches === 100) {
			result.foundInParagraph = true;
			result.keyphraseOrSynonym = resultParagraph.keyphraseOrSynonym;
			return result;
		}
	}

	return result;
};

var _matchParagraphs = require("../stringProcessing/matchParagraphs.js");

var _matchParagraphs2 = _interopRequireDefault(_matchParagraphs);

var _getSentences = require("../stringProcessing/getSentences.js");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _findKeywordFormsInString = require("./findKeywordFormsInString.js");

var _imageInText = require("../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

var _findEmptyDivisions = require("../stringProcessing/findEmptyDivisions");

var _findEmptyDivisions2 = _interopRequireDefault(_findEmptyDivisions);

var _getAnchorsFromText = require("../stringProcessing/getAnchorsFromText");

var _getAnchorsFromText2 = _interopRequireDefault(_getAnchorsFromText);

var _matchStringWithRegex = require("../stringProcessing/matchStringWithRegex");

var _matchStringWithRegex2 = _interopRequireDefault(_matchStringWithRegex);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeLinksFromText(text) {
	const anchors = (0, _getAnchorsFromText2.default)(text);
	if (anchors.length > 0) {
		anchors.forEach(function (anchor) {
			text = text.replace(anchor, "");
		});
	}

	return text;
}

function removeImagesFromText(text) {
	const images = (0, _imageInText2.default)(text);
	const imageTags = (0, _matchStringWithRegex2.default)(text, "</img>");

	if (images.length > 0) {
		images.forEach(function (image) {
			text = text.replace(image, "");
		});

		imageTags.forEach(function (imageTag) {
			text = text.replace(imageTag, "");
		});
	}

	return text;
}

function paragraphHasNoText(text) {
	text = removeLinksFromText(text);
	if (text === "") {
		return true;
	}

	text = removeImagesFromText(text);
	if (text === "") {
		return true;
	}

	const emptyDivisions = (0, _findEmptyDivisions2.default)(text);
	if (emptyDivisions.length < 1) {
		return false;
	}

	emptyDivisions.forEach(function (emptyDivision) {
		text = text.replace(emptyDivision, "");
	});

	return text === "";
}
