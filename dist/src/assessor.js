"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _researcher = require("./researcher.js");

var _researcher2 = _interopRequireDefault(_researcher);

var _missingArgument = require("./errors/missingArgument");

var _missingArgument2 = _interopRequireDefault(_missingArgument);

var _removeDuplicateMarks = require("./markers/removeDuplicateMarks");

var _removeDuplicateMarks2 = _interopRequireDefault(_removeDuplicateMarks);

var _AssessmentResult = require("./values/AssessmentResult.js");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _errors = require("./helpers/errors.js");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScoreRating = 9;

var Assessor = function Assessor(i18n, options) {
  this.type = "Assessor";
  this.setI18n(i18n);
  this._assessments = [];

  this._options = options || {};

  if (!(0, _lodashEs.isUndefined)(this._options.researcher)) {
    this._researcher = this._options.researcher;
  }
};

Assessor.prototype.setI18n = function (i18n) {
  if ((0, _lodashEs.isUndefined)(i18n)) {
    throw new _missingArgument2.default("The assessor requires an i18n object.");
  }
  this.i18n = i18n;
};

Assessor.prototype.getAvailableAssessments = function () {
  return this._assessments;
};

Assessor.prototype.isApplicable = function (assessment, paper, researcher) {
  if (assessment.hasOwnProperty("isApplicable") || typeof assessment.isApplicable === "function") {
    return assessment.isApplicable(paper, researcher);
  }

  return true;
};

Assessor.prototype.hasMarker = function (assessment) {
  return (0, _lodashEs.isFunction)(this._options.marker) && (assessment.hasOwnProperty("getMarks") || typeof assessment.getMarks === "function");
};

Assessor.prototype.getSpecificMarker = function () {
  return this._options.marker;
};

Assessor.prototype.getPaper = function () {
  return this._lastPaper;
};

Assessor.prototype.getMarker = function (assessment, paper, researcher) {
  var specificMarker = this._options.marker;

  return function () {
    let marks = assessment.getMarks(paper, researcher);
    marks = (0, _removeDuplicateMarks2.default)(marks);

    specificMarker(paper, marks);
  };
};

Assessor.prototype.assess = function (paper) {
  if ((0, _lodashEs.isUndefined)(this._researcher)) {
    this._researcher = new _researcher2.default(paper);
  } else {
    this._researcher.setPaper(paper);
  }

  var assessments = this.getAvailableAssessments();
  this.results = [];

  assessments = (0, _lodashEs.filter)(assessments, function (assessment) {
    return this.isApplicable(assessment, paper, this._researcher);
  }.bind(this));

  this.setHasMarkers(false);
  this.results = (0, _lodashEs.map)(assessments, this.executeAssessment.bind(this, paper, this._researcher));

  this._lastPaper = paper;
};

Assessor.prototype.setHasMarkers = function (hasMarkers) {
  this._hasMarkers = hasMarkers;
};

Assessor.prototype.hasMarkers = function () {
  return this._hasMarkers;
};

Assessor.prototype.executeAssessment = function (paper, researcher, assessment) {
  var result;

  try {
    result = assessment.getResult(paper, researcher, this.i18n);
    result.setIdentifier(assessment.identifier);

    if (result.hasMarks()) {
      result.marks = assessment.getMarks(paper, researcher);
      result.marks = (0, _removeDuplicateMarks2.default)(result.marks);
    }

    if (result.hasMarks() && this.hasMarker(assessment)) {
      this.setHasMarkers(true);

      result.setMarker(this.getMarker(assessment, paper, researcher));
    }
  } catch (assessmentError) {
    (0, _errors.showTrace)(assessmentError);

    result = new _AssessmentResult2.default();

    result.setScore(-1);
    result.setText(this.i18n.sprintf(this.i18n.dgettext("js-text-analysis", "An error occurred in the '%1$s' assessment"), assessment.identifier, assessmentError));
  }
  return result;
};

Assessor.prototype.getValidResults = function () {
  return (0, _lodashEs.filter)(this.results, function (result) {
    return this.isValidResult(result);
  }.bind(this));
};

Assessor.prototype.isValidResult = function (assessmentResult) {
  return assessmentResult.hasScore() && assessmentResult.hasText();
};

Assessor.prototype.calculateOverallScore = function () {
  var results = this.getValidResults();
  var totalScore = 0;

  (0, _lodashEs.forEach)(results, function (assessmentResult) {
    totalScore += assessmentResult.getScore();
  });

  return Math.round(totalScore / (results.length * ScoreRating) * 100) || 0;
};

Assessor.prototype.addAssessment = function (name, assessment) {
  if (!assessment.hasOwnProperty("identifier")) {
    assessment.identifier = name;
  }

  this._assessments.push(assessment);
  return true;
};

Assessor.prototype.removeAssessment = function (name) {
  var toDelete = (0, _lodashEs.findIndex)(this._assessments, function (assessment) {
    return assessment.hasOwnProperty("identifier") && name === assessment.identifier;
  });

  if (-1 !== toDelete) {
    this._assessments.splice(toDelete, 1);
  }
};

Assessor.prototype.getAssessment = function (identifier) {
  return (0, _lodashEs.find)(this._assessments, function (assessment) {
    return assessment.hasOwnProperty("identifier") && identifier === assessment.identifier;
  });
};

Assessor.prototype.getApplicableAssessments = function () {
  var availableAssessments = this.getAvailableAssessments();
  return (0, _lodashEs.filter)(availableAssessments, function (availableAssessment) {
    return this.isApplicable(availableAssessment, this.getPaper());
  }.bind(this));
};

exports.default = Assessor;
