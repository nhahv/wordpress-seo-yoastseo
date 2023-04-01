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

class OutboundLinksAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			scores: {
				noLinks: 3,
				allNofollowed: 7,
				someNoFollowed: 8,
				allFollowed: 9
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34f"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/34g")
		};

		this.identifier = "externalLinks";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		const linkStatistics = researcher.getResearch("getLinkStatistics");
		const assessmentResult = new _AssessmentResult2.default();
		if (!(0, _lodashEs.isEmpty)(linkStatistics)) {
			assessmentResult.setScore(this.calculateScore(linkStatistics));
			assessmentResult.setText(this.translateScore(linkStatistics, i18n));
		}
		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasText();
	}

	calculateScore(linkStatistics) {
		if (linkStatistics.externalTotal === 0) {
			return this._config.scores.noLinks;
		}

		if (linkStatistics.externalNofollow === linkStatistics.externalTotal) {
			return this._config.scores.allNofollowed;
		}

		if (linkStatistics.externalDofollow < linkStatistics.externalTotal) {
			return this._config.scores.someNoFollowed;
		}

		if (linkStatistics.externalDofollow === linkStatistics.externalTotal) {
			return this._config.scores.allFollowed;
		}

		return null;
	}

	translateScore(linkStatistics, i18n) {
		if (linkStatistics.externalTotal === 0) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sOutbound links%3$s: " + "No outbound links appear in this page. " + "%2$sAdd some%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>");
		}

		if (linkStatistics.externalNofollow === linkStatistics.externalTotal) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sOutbound links%3$s: " + "All outbound links on this page are nofollowed. " + "%2$sAdd some normal links%3$s."), this._config.urlTitle, this._config.urlCallToAction, "</a>");
		}

		if (linkStatistics.externalDofollow === linkStatistics.externalTotal) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sOutbound links%2$s: " + "Good job!"), this._config.urlTitle, "</a>");
		}

		if (linkStatistics.externalDofollow < linkStatistics.externalTotal) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sOutbound links%2$s: " + "There are both nofollowed and normal outbound links on this page. " + "Good job!"), this._config.urlTitle, "</a>");
		}

		return "";
	}
}
exports.default = OutboundLinksAssessment;
