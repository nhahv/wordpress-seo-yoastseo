"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _missingArgument = require("../errors/missingArgument");

var _missingArgument2 = _interopRequireDefault(_missingArgument);

var _shortlinker = require("../helpers/shortlinker");

var _AssessmentResult = require("../values/AssessmentResult.js");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreviouslyUsedKeyword = function PreviouslyUsedKeyword(app, args) {
	if ((0, _lodashEs.isUndefined)(app)) {
		throw new _missingArgument2.default("The previously keyword plugin requires the YoastSEO app");
	}

	if ((0, _lodashEs.isUndefined)(args)) {
		args = {
			usedKeywords: {},
			searchUrl: "",
			postUrl: ""
		};
	}

	this.app = app;
	this.usedKeywords = args.usedKeywords;
	this.searchUrl = args.searchUrl;
	this.postUrl = args.postUrl;
	this.urlTitle = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33x");
	this.urlCallToAction = (0, _shortlinker.createAnchorOpeningTag)("https://yoa.st/33y");
};

PreviouslyUsedKeyword.prototype.registerPlugin = function () {
	this.app.registerAssessment("usedKeywords", {
		getResult: this.assess.bind(this),

		isApplicable: function isApplicable(paper) {
			return paper.hasKeyword();
		}
	}, "previouslyUsedKeywords");
};

PreviouslyUsedKeyword.prototype.updateKeywordUsage = function (usedKeywords) {
	this.usedKeywords = usedKeywords;
};

PreviouslyUsedKeyword.prototype.scoreAssessment = function (previouslyUsedKeywords, paper, i18n) {
	var count = previouslyUsedKeywords.count;
	var id = previouslyUsedKeywords.id;
	if (count === 0) {
		return {
			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%1$sPreviously used keyphrase%2$s: You've not used this keyphrase before, very good."), this.urlTitle, "</a>"),
			score: 9
		};
	}
	if (count === 1) {
		var url = "<a href='" + this.postUrl.replace("{id}", id) + "' target='_blank'>";
		return {
			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%3$sPreviously used keyphrase%5$s: " + "You've used this keyphrase %1$sonce before%2$s. " + "%4$sDo not use your keyphrase more than once%5$s."), url, "</a>", this.urlTitle, this.urlCallToAction, "</a>"),
			score: 6
		};
	}
	if (count > 1) {
		url = "<a href='" + this.searchUrl.replace("{keyword}", encodeURIComponent(paper.getKeyword())) + "' target='_blank'>";
		return {
			text: i18n.sprintf(i18n.dgettext("js-text-analysis", "%4$sPreviously used keyphrase%6$s: " + "You've used this keyphrase %1$s%2$d times before%3$s. " + "%5$sDo not use your keyphrase more than once%6$s."), url, count, "</a>", this.urlTitle, this.urlCallToAction, "</a>"),
			score: 1
		};
	}
};

PreviouslyUsedKeyword.prototype.researchPreviouslyUsedKeywords = function (paper) {
	var keyword = paper.getKeyword();
	var count = 0;
	var id = 0;

	if (!(0, _lodashEs.isUndefined)(this.usedKeywords[keyword])) {
		count = this.usedKeywords[keyword].length;
		id = this.usedKeywords[keyword][0];
	}

	return {
		id: id,
		count: count
	};
};

PreviouslyUsedKeyword.prototype.assess = function (paper, researcher, i18n) {
	var previouslyUsedKeywords = this.researchPreviouslyUsedKeywords(paper);
	var previouslyUsedKeywordsResult = this.scoreAssessment(previouslyUsedKeywords, paper, i18n);

	var assessmentResult = new _AssessmentResult2.default();
	assessmentResult.setScore(previouslyUsedKeywordsResult.score);
	assessmentResult.setText(previouslyUsedKeywordsResult.text);

	return assessmentResult;
};

exports.default = PreviouslyUsedKeyword;
