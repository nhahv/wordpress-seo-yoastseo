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

class UrlLengthAssessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		console.warn("Deprecation Warning: The UrlLengthAssessment has been deprecated since version 1.48. " + "We have removed it from the assessments since we do not consider it an important SEO factor anymore.");

		const defaultConfig = {
			scores: {
				tooLong: 6
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35b"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35c")
		};

		this.identifier = "urlLength";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		const urlIsTooLong = researcher.getResearch("urlLength");
		const assessmentResult = new _AssessmentResult2.default();

		assessmentResult.setScore(this.calculateScore(urlIsTooLong));
		assessmentResult.setText(this.translateScore(urlIsTooLong, i18n));

		return assessmentResult;
	}

	isApplicable(paper) {
		return paper.hasUrl();
	}

	calculateScore(urlIsTooLong) {
		if (urlIsTooLong) {
			return this._config.scores.tooLong;
		}

		return null;
	}

	translateScore(urlIsTooLong, i18n) {
		if (urlIsTooLong) {
			return i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSlug too long%3$s: the slug for this page is a bit long. %2$sShorten it%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>");
		}

		return "";
	}
}

exports.default = UrlLengthAssessment;
