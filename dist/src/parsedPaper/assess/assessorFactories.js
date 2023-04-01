"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.constructReadabilityAssessor = exports.constructSEOAssessor = undefined;

var _assessmentListFactories = require("./assessmentListFactories");

var _assessmentListFactories2 = require("./cornerstone/assessmentListFactories");

var _scoreAggregators = require("./scoreAggregators");

var _TreeAssessor = require("./TreeAssessor");

var _TreeAssessor2 = _interopRequireDefault(_TreeAssessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SEO_ASSESSMENTS_MAP = {
	Default: _assessmentListFactories.constructSEOAssessments,

	RelatedKeyphrase: _assessmentListFactories.constructRelatedKeyphraseAssessments,
	Taxonomy: _assessmentListFactories.constructTaxonomyAssessments,
	RelatedKeyphraseTaxonomy: _assessmentListFactories.constructRelatedKeyphraseTaxonomyAssessments,

	Cornerstone: _assessmentListFactories2.constructSEOAssessments,
	CornerstoneRelatedKeyphrase: _assessmentListFactories2.constructRelatedKeyphraseAssessments
};

const constructSEOAssessor = function constructSEOAssessor(i18n, researcher, config) {
	const cornerstone = config.cornerstone ? "Cornerstone" : "";
	const relatedKeyphrase = config.relatedKeyphrase ? "RelatedKeyphrase" : "";
	const taxonomy = config.taxonomy ? "Taxonomy" : "";

	const key = [cornerstone, relatedKeyphrase, taxonomy].join("") || "Default";

	const assessmentFactory = SEO_ASSESSMENTS_MAP[key];

	if (!assessmentFactory) {
		throw new Error("Cannot make an assessor based on the provided combination of configuration options");
	}

	const assessments = assessmentFactory();
	const scoreAggregator = new _scoreAggregators.SEOScoreAggregator();
	return new _TreeAssessor2.default({ i18n, researcher, assessments, scoreAggregator });
};

const constructReadabilityAssessor = function constructReadabilityAssessor(i18n, researcher, isCornerstoneContent = false) {
	const assessments = isCornerstoneContent ? (0, _assessmentListFactories.constructReadabilityAssessments)() : (0, _assessmentListFactories2.constructReadabilityAssessments)();
	const scoreAggregator = new _scoreAggregators.ReadabilityScoreAggregator();
	return new _TreeAssessor2.default({ i18n, researcher, assessments, scoreAggregator });
};

exports.constructSEOAssessor = constructSEOAssessor;
exports.constructReadabilityAssessor = constructReadabilityAssessor;
