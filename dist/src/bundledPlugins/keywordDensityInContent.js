"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assessment = require("../assessment.js");

var _assessment2 = _interopRequireDefault(_assessment);

var _AssessmentResult = require("../values/AssessmentResult.js");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KeywordDensityInContent extends _assessment2.default {
    constructor(config = {}) {
        super();

        this.identifier = "keywordDensityInContent";
    }

    isApplicable(paper) {
        return paper.hasKeyword();
    }
    getResult(paper, researcher, i18n) {
        const result = new _AssessmentResult2.default();
        const _keywordCount = researcher.getResearch("keywordCount");
        const wordCount = researcher.getResearch("wordCountInText");
        console.log("keywordDensityInContent", _keywordCount, wordCount, paper);
        result.setScore(9);
        result.setText("Excellent");
        return result;
    }
}

exports.default = KeywordDensityInContent;
