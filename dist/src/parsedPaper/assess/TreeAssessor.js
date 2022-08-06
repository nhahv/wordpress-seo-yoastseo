"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _AssessmentResult = require("../../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TreeAssessor {
	constructor(options) {
		this.i18n = options.i18n;

		this.researcher = options.researcher;

		this.scoreAggregator = options.scoreAggregator;

		this._assessments = options.assessments || [];

		this._assessments.forEach(assessment => assessment.setResearcher(this.researcher));
	}

	getAssessments() {
		return this._assessments;
	}

	async assess(paper, node) {
		const applicableAssessments = await this.getApplicableAssessments(paper, node);

		const results = await Promise.all(applicableAssessments.map(assessment => this.applyAssessment(assessment, paper, node)));

		const validResults = results.filter(result => result.getScore() !== -1);

		const score = this.scoreAggregator.aggregate(validResults);

		return { results, score };
	}

	async applyAssessment(assessment, paper, node) {
		return assessment.apply(paper, node).catch(() => {
			return new _AssessmentResult2.default({
				text: this.i18n.sprintf(this.i18n.dgettext("js-text-analysis", "An error occurred in the '%1$s' assessment"), assessment.name),
				score: -1
			});
		});
	}

	registerAssessment(name, assessment) {
		assessment.name = name;
		assessment.setResearcher(this.researcher);
		this._assessments.push(assessment);
	}

	removeAssessment(name) {
		const index = this._assessments.findIndex(assessment => assessment.name === name);
		if (index > -1) {
			const deleted = this._assessments.splice(index, 1);
			return deleted[0];
		}
		return null;
	}

	getAssessment(name) {
		const assessmentToReturn = this._assessments.find(assessment => assessment.name === name);
		return assessmentToReturn ? assessmentToReturn : null;
	}

	setAssessments(assessments) {
		this._assessments = assessments;
	}

	async getApplicableAssessments(paper, node) {
		const applicableAssessments = [];

		const promises = this._assessments.map(assessment => assessment.isApplicable(paper, node).then(applicable => {
			if (applicable) {
				applicableAssessments.push(assessment);
			}
		}));

		return Promise.all(promises).then(() => applicableAssessments);
	}
}

exports.default = TreeAssessor;
