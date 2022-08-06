"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _shortlinker = require("../../helpers/shortlinker");

var _stripHTMLTags = require("../../stringProcessing/stripHTMLTags");

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function textPresenceAssessment(paper, researcher, i18n) {
	const text = (0, _stripHTMLTags.stripFullTags)(paper.getText());
	const urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35h");
	const urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/35i");

	if (text.length < 50) {
		const result = new _AssessmentResult2.default();

		result.setText(i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sNot enough content%2$s: %3$sPlease add some content to enable a good analysis%2$s."), urlTitle, "</a>", urlCallToAction));

		result.setScore(3);
		return result;
	}

	return new _AssessmentResult2.default();
}

exports.default = {
	identifier: "textPresence",
	getResult: textPresenceAssessment
};
