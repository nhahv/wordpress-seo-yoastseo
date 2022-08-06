"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stem;

var _turkishStemmer = require("../../../vendor/turkishStemmer");

var _turkishStemmer2 = _interopRequireDefault(_turkishStemmer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stem(word, morphologyData) {
  word = word.toLowerCase();

  const stemmer = new _turkishStemmer2.default(morphologyData);
  stemmer.setCurrent(word);
  stemmer.stem();

  return stemmer.getCurrent();
}
