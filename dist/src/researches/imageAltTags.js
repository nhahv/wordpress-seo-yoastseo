"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const topicForms = researcher.getResearch("morphology");

	return matchAltProperties((0, _imageInText2.default)(paper.getText()), topicForms, paper.getLocale());
};

var _imageInText = require("../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

var _getAlttagContent = require("../stringProcessing/getAlttagContent");

var _getAlttagContent2 = _interopRequireDefault(_getAlttagContent);

var _findKeywordFormsInString = require("../researches/findKeywordFormsInString");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const matchAltProperties = function matchAltProperties(imageMatches, topicForms, locale) {
	const altProperties = {
		noAlt: 0,
		withAlt: 0,
		withAltKeyword: 0,
		withAltNonKeyword: 0
	};

	for (let i = 0; i < imageMatches.length; i++) {
		const alttag = (0, _getAlttagContent2.default)(imageMatches[i]);

		if (alttag === "") {
			altProperties.noAlt++;
			continue;
		}

		if ((0, _lodashEs.isEmpty)(topicForms.keyphraseForms)) {
			altProperties.withAlt++;
			continue;
		}

		const keywordMatchedInAltTag = (0, _findKeywordFormsInString.findTopicFormsInString)(topicForms, alttag, true, locale);
		if (keywordMatchedInAltTag.percentWordMatches >= 50) {
			altProperties.withAltKeyword++;
			continue;
		}

		altProperties.withAltNonKeyword++;
	}

	return altProperties;
};
