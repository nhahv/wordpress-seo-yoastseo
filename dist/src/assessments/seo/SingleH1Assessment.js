"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _assessment = require("../../assessment.js");

var _assessment2 = _interopRequireDefault(_assessment);

var _shortlinker = require("../../helpers/shortlinker");

var _addMark = require("../../markers/addMark.js");

var _addMark2 = _interopRequireDefault(_addMark);

var _AssessmentResult = require("../../values/AssessmentResult.js");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _Mark = require("../../values/Mark.js");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class singleH1Assessment extends _assessment2.default {
	constructor(config = {}) {
		super();

		const defaultConfig = {
			scores: {
				textContainsSuperfluousH1: 1
			},
			urlTitle: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/3a6"),
			urlCallToAction: (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/3a7")
		};

		this.identifier = "singleH1";
		this._config = (0, _lodashEs.merge)(defaultConfig, config);
	}

	getResult(paper, researcher, i18n) {
		this._h1s = researcher.getResearch("h1s");

		const assessmentResult = new _AssessmentResult2.default();
		assessmentResult.setText(i18n.dgettext("js-text-analysis", "%1$sSingle title%3$s: OK!"));

		const calculatedResult = this.calculateResult(i18n);

		if (!(0, _lodashEs.isUndefined)(calculatedResult)) {
			assessmentResult.setScore(calculatedResult.score);
			assessmentResult.setText(calculatedResult.resultText);
			assessmentResult.setHasMarks(true);
		}

		return assessmentResult;
	}

	firstH1AtBeginning() {
		return this._h1s[0].position === 0;
	}

	calculateResult(i18n) {
		if (this._h1s.length === 0) {
			return;
		}

		if (this._h1s.length === 1 && this.firstH1AtBeginning()) {
			return;
		}

		return {
			score: this._config.scores.textContainsSuperfluousH1,
			resultText: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sSingle title%3$s: H1s should only be used as your main title. Find all H1s in your text " + "that aren't your main title and %2$schange them to a lower heading level%3$s!"), this._config.urlTitle, this._config.urlCallToAction, "</a>")
		};
	}

	getMarks() {
		const h1s = this._h1s;

		if (this.firstH1AtBeginning()) {
			h1s.shift();
		}

		return (0, _lodashEs.map)(h1s, function (h1) {
			return new _Mark2.default({
				original: "<h1>" + h1.content + "</h1>",
				marked: "<h1>" + (0, _addMark2.default)(h1.content) + "</h1>"
			});
		});
	}

	isApplicable(paper) {
		return paper.hasText();
	}
}

exports.default = singleH1Assessment;
