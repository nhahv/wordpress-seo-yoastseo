"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (language, morphologyData) {
  const stemFunction = stemFunctions[language];

  if (morphologyData && stemFunction) {
    return stemFunction;
  }

  return word => word;
};

var _getStemForLanguage = require("../helpers/getStemForLanguage");

var _getStemForLanguage2 = _interopRequireDefault(_getStemForLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stemFunctions = (0, _getStemForLanguage2.default)();
