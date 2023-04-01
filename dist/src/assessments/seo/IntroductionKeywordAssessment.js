"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _shortlinker = require("../../helpers/shortlinker");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IntroductionKeywordAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			scores: {
				good: 9,
				okay: 6,
				bad: 3
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33e"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33f")
		};

		this.identifier = "introductionKeyword";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		const assessmentResult = new _AssessmentResult2.default();

		this._firstParagraphMatches = researcher.getResearch("firstParagraph");
		const calculatedResult = this.calculateResult(i18n);

		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasKeyword() && paper.hasText();
	}

	calculateResult(i18n) {
		if (this._firstParagraphMatches.foundInOneSentence) {
			return {
				score: this._config.scores.good,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in introduction%2$s: Well done!"), this._config.urlTitle, "</a>")
			};
		}

		if (this._firstParagraphMatches.foundInParagraph) {
			return {
				score: this._config.scores.okay,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in introduction%3$s:" + "Your keyphrase or its synonyms appear in the first paragraph of the copy, but not within one sentence. %2$sFix that%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		return {
			score: this._config.scores.bad,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sKeyphrase in introduction%3$s: Your keyphrase or its synonyms do not appear in the first paragraph. " + "%2$sMake sure the topic is clear immediately%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>")
		};
	}
}

exports.default = IntroductionKeywordAssessment;
