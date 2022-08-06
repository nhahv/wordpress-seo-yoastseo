"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sentencePartText, auxiliaries, language) {
  const auxiliaryMatches = sentencePartText.match(auxiliaryRegex);

  if (auxiliaryMatches === null) {
    return false;
  }

  const participles = (0, _getParticiples2.default)(sentencePartText, auxiliaries, language);
  return (0, _determineSentencePartIsPassive2.default)(participles);
};

var _createRegexFromArray = require("../../../stringProcessing/createRegexFromArray.js");

var _createRegexFromArray2 = _interopRequireDefault(_createRegexFromArray);

var _auxiliaries = require("../../hungarian/passiveVoice/auxiliaries.js");

var _auxiliaries2 = _interopRequireDefault(_auxiliaries);

var _getParticiples = require("./getParticiples.js");

var _getParticiples2 = _interopRequireDefault(_getParticiples);

var _determineSentencePartIsPassive = require("../../passiveVoice/periphrastic/determineSentencePartIsPassive.js");

var _determineSentencePartIsPassive2 = _interopRequireDefault(_determineSentencePartIsPassive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hungarianAuxiliaries = (0, _auxiliaries2.default)().allAuxiliaries;


const auxiliaryRegex = (0, _createRegexFromArray2.default)(hungarianAuxiliaries);
