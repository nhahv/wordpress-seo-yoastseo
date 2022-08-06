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

class InternalLinksAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			parameters: {
				recommendedMinimum: 1
			},
			scores: {
				allInternalFollow: 9,
				someInternalFollow: 8,
				noneInternalFollow: 7,
				noInternal: 3
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33z"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34a")
		};

		this.identifier = "internalLinks";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this.linkStatistics = researcher.getResearch("getLinkStatistics");
		const assessmentResult = new _AssessmentResult2.default();

		const calculatedResult = this.calculateResult(i18n);
		assessmentResult.setScore(calculatedResult.score);
		assessmentResult.setText(calculatedResult.resultText);

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasText();
	}

	calculateResult(i18n) {
		if (this.linkStatistics.internalTotal === 0) {
			return {
				score: this._config.scores.noInternal,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sInternal links%3$s: " + "No internal links appear in this page, %2$smake sure to add some%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.linkStatistics.internalNofollow === this.linkStatistics.internalTotal) {
			return {
				score: this._config.scores.noneInternalFollow,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sInternal links%3$s: " + "The internal links in this page are all nofollowed. %2$sAdd some good internal links%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>")
			};
		}

		if (this.linkStatistics.internalDofollow === this.linkStatistics.internalTotal) {
			return {
				score: this._config.scores.allInternalFollow,
				resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sInternal links%2$s: You have enough internal links. Good job!"), this._config.urlTitle, "</a>")
			};
		}
		return {
			score: this._config.scores.someInternalFollow,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sInternal links%2$s: There are both nofollowed and normal internal links on this page. Good job!"), this._config.urlTitle, "</a>")
		};
	}
}

exports.default = InternalLinksAssessment;
