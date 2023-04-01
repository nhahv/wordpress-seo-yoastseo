"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _createRegexFromArray = require("../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SyllableCountStep = function SyllableCountStep(syllableRegex) {
  this._hasRegex = false;
  this._regex = "";
  this._multiplier = "";
  this.createRegex(syllableRegex);
};

SyllableCountStep.prototype.hasRegex = function () {
  return this._hasRegex;
};

SyllableCountStep.prototype.createRegex = function (syllableRegex) {
  if (!(0, _lodashEs.isUndefined)(syllableRegex) && !(0, _lodashEs.isUndefined)(syllableRegex.fragments)) {
    this._hasRegex = true;
    this._regex = (0, _createRegexFromArray2.default)(syllableRegex.fragments, true);
    this._multiplier = syllableRegex.countModifier;
  }
};

SyllableCountStep.prototype.getRegex = function () {
  return this._regex;
};

SyllableCountStep.prototype.countSyllables = function (word) {
  if (this._hasRegex) {
    var match = word.match(this._regex) || [];
    return match.length * this._multiplier;
  }
  return 0;
};

exports.default = SyllableCountStep;
