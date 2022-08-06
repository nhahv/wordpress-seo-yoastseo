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

class TextCompetingLinksAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMaximum: 0
			},
			scores: {
				bad: 2
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34l"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34m")
		};

		this.identifier = "textCompetingLinks";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		const assessmentResult = new _AssessmentResult2.default();

		this.linkCount = researcher.getResearch("getLinkStatistics");

		const calculatedResult = this.calculateResult(i18n);

		if ((0, _lodashEs.isUndefined)(calculatedResult)) {
			return assessmentResult;
		}

		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);
		assessmentResult.setHasMarks(false);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasText() && paper.hasKeyword();
	}

	calculateResult(i18n) {
		if (this.linkCount.keyword.totalKeyword > this._config.parameters.recommendedMaximum) {
			return {
				score: this._config.scores.bad,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sLink keyphrase%3$s: " + "You're linking to another page with the words you want this page to rank for. " + "%2$sDon't do that%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}
	}
}

exports.default = TextCompetingLinksAssessment;
