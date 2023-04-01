"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _filterFunctionWordsFromArray = require("../helpers/filterFunctionWordsFromArray");

var _filterFunctionWordsFromArray2 = _interopRequireDefault(_filterFunctionWordsFromArray);

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _checkNofollow = require("../stringProcessing/checkNofollow.js");

var _checkNofollow2 = _interopRequireDefault(_checkNofollow);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _findKeywordInUrl = require("../stringProcessing/findKeywordInUrl.js");

var _findKeywordInUrl2 = _interopRequireDefault(_findKeywordInUrl);

var _getAnchorsFromText = require("../stringProcessing/getAnchorsFromText.js");

var _getAnchorsFromText2 = _interopRequireDefault(_getAnchorsFromText);

var _getLinkType = require("../stringProcessing/getLinkType.js");

var _getLinkType2 = _interopRequireDefault(_getLinkType);

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _urlUtils = require("../stringProcessing/urlUtils");

var _urlUtils2 = _interopRequireDefault(_urlUtils);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const linkToSelf = function linkToSelf(anchor, permalink) {
	const anchorLink = _urlUtils2.default.getFromAnchorTag(anchor);

	return _urlUtils2.default.areEqual(anchorLink, permalink);
};

const filterAnchorsLinkingToSelf = function filterAnchorsLinkingToSelf(anchors, permalink) {
	const anchorsLinkingToSelf = anchors.map(function (anchor) {
		return linkToSelf(anchor, permalink);
	});

	anchors = anchors.filter(function (anchor, index) {
		return anchorsLinkingToSelf[index] === false;
	});

	return anchors;
};

const filterAnchorsContainingTopic = function filterAnchorsContainingTopic(anchors, topicForms, locale) {
	const anchorsContainingKeyphraseOrSynonyms = anchors.map(function (anchor) {
		return (0, _findKeywordInUrl2.default)(anchor, topicForms, locale);
	});
	anchors = anchors.filter(function (anchor, index) {
		return anchorsContainingKeyphraseOrSynonyms[index] === true;
	});

	return anchors;
};

const filterAnchorsContainedInTopic = function filterAnchorsContainedInTopic(anchors, topicForms, locale) {
	const keyphraseAndSynonymsWords = [(0, _lodashEs.flatten)(topicForms.keyphraseForms)];
	const synonymsForms = topicForms.synonymsForms;
	for (let i = 0; i < synonymsForms.length; i++) {
		keyphraseAndSynonymsWords.push((0, _lodashEs.flatten)(synonymsForms[i]));
	}

	const language = (0, _getLanguage2.default)(locale);
	const anchorsContainedInTopic = [];

	anchors.forEach(function (currentAnchor) {
		let anchorWords = (0, _lodashEs.uniq)((0, _getWords2.default)(currentAnchor));

		anchorWords = (0, _filterFunctionWordsFromArray2.default)(anchorWords, language);

		for (let i = 0; i < keyphraseAndSynonymsWords.length; i++) {
			if (anchorWords.every(anchorWord => (0, _matchTextWithArray2.default)(anchorWord, keyphraseAndSynonymsWords[i], locale).count > 0)) {
				anchorsContainedInTopic.push(true);
				break;
			}
		}
	});

	anchors = anchors.filter(function (anchor, index) {
		return anchorsContainedInTopic[index] === true;
	});

	return anchors;
};

const keywordInAnchor = function keywordInAnchor(paper, researcher, anchors, permalink) {
	const result = { totalKeyword: 0, matchedAnchors: [] };

	const keyword = paper.getKeyword();

	if (keyword === "") {
		return result;
	}

	anchors = filterAnchorsLinkingToSelf(anchors, permalink);
	if (anchors.length === 0) {
		return result;
	}

	const locale = paper.getLocale();
	const topicForms = researcher.getResearch("morphology");

	anchors = filterAnchorsContainingTopic(anchors, topicForms, locale);
	if (anchors.length === 0) {
		return result;
	}

	anchors = filterAnchorsContainedInTopic(anchors, topicForms, locale);
	result.totalKeyword = anchors.length;
	result.matchedAnchors = anchors;

	return result;
};

const countLinkTypes = function countLinkTypes(paper, researcher) {
	const anchors = (0, _getAnchorsFromText2.default)(paper.getText());
	const permalink = paper.getPermalink();

	const linkCount = {
		total: anchors.length,
		totalNaKeyword: 0,
		keyword: {
			totalKeyword: 0,
			matchedAnchors: []
		},
		internalTotal: 0,
		internalDofollow: 0,
		internalNofollow: 0,
		externalTotal: 0,
		externalDofollow: 0,
		externalNofollow: 0,
		otherTotal: 0,
		otherDofollow: 0,
		otherNofollow: 0
	};

	for (let i = 0; i < anchors.length; i++) {
		const currentAnchor = anchors[i];

		const linkType = (0, _getLinkType2.default)(currentAnchor, permalink);
		const linkFollow = (0, _checkNofollow2.default)(currentAnchor);

		linkCount[linkType + "Total"]++;
		linkCount[linkType + linkFollow]++;
	}

	const keywordInAnchors = keywordInAnchor(paper, researcher, anchors, permalink);
	linkCount.keyword.totalKeyword = keywordInAnchors.totalKeyword;
	linkCount.keyword.matchedAnchors = keywordInAnchors.matchedAnchors;

	return linkCount;
};

exports.default = countLinkTypes;
