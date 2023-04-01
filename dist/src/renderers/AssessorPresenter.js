"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _templates = require("../templates.js");

var _scoreToRating = require("../interpreters/scoreToRating.js");

var _scoreToRating2 = _interopRequireDefault(_scoreToRating);

var _presenter = require("../config/presenter.js");

var _presenter2 = _interopRequireDefault(_presenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssessorPresenter = function AssessorPresenter(args) {
  this.keyword = args.keyword;
  this.assessor = args.assessor;
  this.i18n = args.i18n;
  this.output = args.targets.output;
  this.overall = args.targets.overall || "overallScore";
  this.presenterConfig = (0, _presenter2.default)(args.i18n);

  this._disableMarkerButtons = false;

  this._activeMarker = false;
};

AssessorPresenter.prototype.setKeyword = function (keyword) {
  this.keyword = keyword;
};

AssessorPresenter.prototype.configHasProperty = function (property) {
  return this.presenterConfig.hasOwnProperty(property);
};

AssessorPresenter.prototype.getIndicator = function (rating) {
  return {
    className: this.getIndicatorColorClass(rating),
    screenReaderText: this.getIndicatorScreenReaderText(rating),
    fullText: this.getIndicatorFullText(rating),
    screenReaderReadabilityText: this.getIndicatorScreenReaderReadabilityText(rating)
  };
};

AssessorPresenter.prototype.getIndicatorColorClass = function (rating) {
  if (!this.configHasProperty(rating)) {
    return "";
  }

  return this.presenterConfig[rating].className;
};

AssessorPresenter.prototype.getIndicatorScreenReaderText = function (rating) {
  if (!this.configHasProperty(rating)) {
    return "";
  }

  return this.presenterConfig[rating].screenReaderText;
};

AssessorPresenter.prototype.getIndicatorScreenReaderReadabilityText = function (rating) {
  if (!this.configHasProperty(rating)) {
    return "";
  }

  return this.presenterConfig[rating].screenReaderReadabilityText;
};

AssessorPresenter.prototype.getIndicatorFullText = function (rating) {
  if (!this.configHasProperty(rating)) {
    return "";
  }

  return this.presenterConfig[rating].fullText;
};

AssessorPresenter.prototype.resultToRating = function (result) {
  if (!(0, _lodashEs.isObject)(result)) {
    return "";
  }

  result.rating = (0, _scoreToRating2.default)(result.score);

  return result;
};

AssessorPresenter.prototype.getIndividualRatings = function () {
  var ratings = {};
  var validResults = this.sort(this.assessor.getValidResults());
  var mappedResults = validResults.map(this.resultToRating);

  (0, _lodashEs.forEach)(mappedResults, function (item, key) {
    ratings[key] = this.addRating(item);
  }.bind(this));

  return ratings;
};

AssessorPresenter.prototype.excludeFromResults = function (results, exclude) {
  return (0, _lodashEs.difference)(results, exclude);
};

AssessorPresenter.prototype.sort = function (results) {
  var unsortables = this.getUndefinedScores(results);
  var sortables = this.excludeFromResults(results, unsortables);

  sortables.sort(function (a, b) {
    return a.score - b.score;
  });

  return unsortables.concat(sortables);
};

AssessorPresenter.prototype.getUndefinedScores = function (results) {
  return results.filter(function (result) {
    return (0, _lodashEs.isUndefined)(result.score) || result.score === 0;
  });
};

AssessorPresenter.prototype.addRating = function (item) {
  var indicator = this.getIndicator(item.rating);
  indicator.text = item.text;
  indicator.identifier = item.getIdentifier();

  if (item.hasMarker()) {
    indicator.marker = item.getMarker();
  }

  return indicator;
};

AssessorPresenter.prototype.getOverallRating = function (overallScore) {
  var rating = 0;

  if (this.keyword === "") {
    return this.resultToRating({ score: rating });
  }

  if ((0, _lodashEs.isNumber)(overallScore)) {
    rating = overallScore / 10;
  }

  return this.resultToRating({ score: rating });
};

AssessorPresenter.prototype.markAssessment = function (identifier, marker) {
  if (this._activeMarker === identifier) {
    this.removeAllMarks();
    this._activeMarker = false;
  } else {
    marker();
    this._activeMarker = identifier;
  }

  this.render();
};

AssessorPresenter.prototype.disableMarker = function () {
  this._activeMarker = false;
  this.render();
};

AssessorPresenter.prototype.disableMarkerButtons = function () {
  this._disableMarkerButtons = true;
  this.render();
};

AssessorPresenter.prototype.enableMarkerButtons = function () {
  this._disableMarkerButtons = false;
  this.render();
};

AssessorPresenter.prototype.addMarkerEventHandler = function (identifier, marker) {
  var container = document.getElementById(this.output);
  var markButton = container.getElementsByClassName("js-assessment-results__mark-" + identifier)[0];

  markButton.addEventListener("click", this.markAssessment.bind(this, identifier, marker));
};

AssessorPresenter.prototype.render = function () {
  this.renderIndividualRatings();
  this.renderOverallRating();
};

AssessorPresenter.prototype.bindMarkButtons = function (scores) {
  (0, _lodashEs.forEach)(scores, function (score) {
    if (score.hasOwnProperty("marker")) {
      this.addMarkerEventHandler(score.identifier, score.marker);
    }
  }.bind(this));
};

AssessorPresenter.prototype.removeAllMarks = function () {
  var marker = this.assessor.getSpecificMarker();

  marker(this.assessor.getPaper(), []);
};

AssessorPresenter.prototype.renderIndividualRatings = function () {
  var outputTarget = document.getElementById(this.output);
  var scores = this.getIndividualRatings();

  outputTarget.innerHTML = (0, _templates.assessmentPresenterResult)({
    scores: scores,
    i18n: {
      disabledMarkText: this.i18n.dgettext("js-text-analysis", "Marks are disabled in current view"),
      markInText: this.i18n.dgettext("js-text-analysis", "Mark this result in the text"),
      removeMarksInText: this.i18n.dgettext("js-text-analysis", "Remove marks in the text")
    },
    activeMarker: this._activeMarker,
    markerButtonsDisabled: this._disableMarkerButtons
  });

  this.bindMarkButtons(scores);
};

AssessorPresenter.prototype.renderOverallRating = function () {
  var overallRating = this.getOverallRating(this.assessor.calculateOverallScore());
  var overallRatingElement = document.getElementById(this.overall);

  if (!overallRatingElement) {
    return;
  }

  overallRatingElement.className = "overallScore " + this.getIndicatorColorClass(overallRating.rating);
};

exports.default = AssessorPresenter;
