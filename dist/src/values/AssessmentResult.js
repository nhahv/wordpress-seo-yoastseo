"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _Mark = require("./Mark");

var _Mark2 = _interopRequireDefault(_Mark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyMarker = function emptyMarker() {
  return [];
};

var AssessmentResult = function AssessmentResult(values) {
  this._hasScore = false;
  this._identifier = "";
  this._hasMarks = false;
  this._marker = emptyMarker;
  this.score = 0;
  this.text = "";
  this.marks = [];

  if ((0, _lodashEs.isUndefined)(values)) {
    values = {};
  }

  if (!(0, _lodashEs.isUndefined)(values.score)) {
    this.setScore(values.score);
  }

  if (!(0, _lodashEs.isUndefined)(values.text)) {
    this.setText(values.text);
  }

  if (!(0, _lodashEs.isUndefined)(values.marks)) {
    this.setMarks(values.marks);
  }
};

AssessmentResult.prototype.hasScore = function () {
  return this._hasScore;
};

AssessmentResult.prototype.getScore = function () {
  return this.score;
};

AssessmentResult.prototype.setScore = function (score) {
  if ((0, _lodashEs.isNumber)(score)) {
    this.score = score;
    this._hasScore = true;
  }
};

AssessmentResult.prototype.hasText = function () {
  return this.text !== "";
};

AssessmentResult.prototype.getText = function () {
  return this.text;
};

AssessmentResult.prototype.setText = function (text) {
  if ((0, _lodashEs.isUndefined)(text)) {
    text = "";
  }

  this.text = text;
};

AssessmentResult.prototype.getMarks = function () {
  return this.marks;
};

AssessmentResult.prototype.setMarks = function (marks) {
  if ((0, _lodashEs.isArray)(marks)) {
    this.marks = marks;
    this._hasMarks = marks.length > 0;
  }
};

AssessmentResult.prototype.setIdentifier = function (identifier) {
  this._identifier = identifier;
};

AssessmentResult.prototype.getIdentifier = function () {
  return this._identifier;
};

AssessmentResult.prototype.setMarker = function (marker) {
  this._marker = marker;
};

AssessmentResult.prototype.hasMarker = function () {
  return this._hasMarks && this._marker !== this.emptyMarker;
};

AssessmentResult.prototype.getMarker = function () {
  return this._marker;
};

AssessmentResult.prototype.setHasMarks = function (hasMarks) {
  this._hasMarks = hasMarks;
};

AssessmentResult.prototype.hasMarks = function () {
  return this._hasMarks;
};

AssessmentResult.prototype.serialize = function () {
  return {
    _parseClass: "AssessmentResult",
    identifier: this._identifier,
    score: this.score,
    text: this.text,
    marks: this.marks.map(mark => mark.serialize())
  };
};

AssessmentResult.parse = function (serialized) {
  const result = new AssessmentResult({
    text: serialized.text,
    score: serialized.score,
    marks: serialized.marks.map(mark => _Mark2.default.parse(mark))
  });
  result.setIdentifier(serialized.identifier);

  return result;
};

exports.default = AssessmentResult;
