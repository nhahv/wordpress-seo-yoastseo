"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _syllableCountStep = require("./syllableCountStep.js");

var _syllableCountStep2 = _interopRequireDefault(_syllableCountStep);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SyllableCountIterator = function SyllableCountIterator(config) {
  this.countSteps = [];
  if (!(0, _lodashEs.isUndefined)(config)) {
    this.createSyllableCountSteps(config.deviations.vowels);
  }
};

SyllableCountIterator.prototype.createSyllableCountSteps = function (syllableCounts) {
  (0, _lodashEs.forEach)(syllableCounts, function (syllableCountStep) {
    this.countSteps.push(new _syllableCountStep2.default(syllableCountStep));
  }.bind(this));
};

SyllableCountIterator.prototype.getAvailableSyllableCountSteps = function () {
  return this.countSteps;
};

SyllableCountIterator.prototype.countSyllables = function (word) {
  var syllableCount = 0;
  (0, _lodashEs.forEach)(this.countSteps, function (step) {
    syllableCount += step.countSyllables(word);
  });
  return syllableCount;
};

exports.default = SyllableCountIterator;
