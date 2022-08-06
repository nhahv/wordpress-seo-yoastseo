"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StemOriginalPair = exports.TopicPhrase = exports.collectStems = exports.buildStems = undefined;

var _filterFunctionWordsFromArray = require("../helpers/filterFunctionWordsFromArray.js");

var _filterFunctionWordsFromArray2 = _interopRequireDefault(_filterFunctionWordsFromArray);

var _retrieveStemmer = require("../helpers/retrieveStemmer.js");

var _retrieveStemmer2 = _interopRequireDefault(_retrieveStemmer);

var _getWords = require("../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _parseSynonyms = require("../stringProcessing/parseSynonyms");

var _parseSynonyms2 = _interopRequireDefault(_parseSynonyms);

var _quotes = require("../stringProcessing/quotes");

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TopicPhrase(stemOriginalPairs = [], exactMatch = false) {
  this.stemOriginalPairs = stemOriginalPairs;
  this.exactMatch = exactMatch;
}

TopicPhrase.prototype.getStems = function () {
  if (this.exactMatch) {
    return [];
  }

  return this.stemOriginalPairs.map(stemOriginalPair => stemOriginalPair.stem);
};

function StemOriginalPair(stem, original) {
  this.stem = stem;
  this.original = original;
}

const buildStems = function buildStems(keyphrase, language, morphologyData) {
  if ((0, _lodashEs.isUndefined)(keyphrase) || keyphrase === "") {
    return new TopicPhrase();
  }

  const doubleQuotes = ["“", "”", "〝", "〞", "〟", "‟", "„", "\""];
  if ((0, _lodashEs.includes)(doubleQuotes, keyphrase[0]) && (0, _lodashEs.includes)(doubleQuotes, keyphrase[keyphrase.length - 1])) {
    keyphrase = keyphrase.substring(1, keyphrase.length - 1);
    return new TopicPhrase([new StemOriginalPair((0, _lodashEs.escapeRegExp)(keyphrase), keyphrase)], true);
  }

  const words = (0, _filterFunctionWordsFromArray2.default)((0, _getWords2.default)(keyphrase), language);

  const getStem = (0, _retrieveStemmer2.default)(language, morphologyData);

  const stemOriginalPairs = words.map(word => {
    const lowCaseWord = (0, _lodashEs.escapeRegExp)(word.toLocaleLowerCase(language));
    return new StemOriginalPair(getStem((0, _quotes.normalizeSingle)(lowCaseWord), morphologyData), word);
  });

  return new TopicPhrase(stemOriginalPairs);
};

const collectKeyphraseAndSynonymsStems = function collectKeyphraseAndSynonymsStems(keyphrase, synonyms, language = "en", morphologyData) {
  const synonymsSplit = (0, _parseSynonyms2.default)(synonyms);

  const keyphraseStems = buildStems(keyphrase, language, morphologyData);
  const synonymsStems = synonymsSplit.map(synonym => buildStems(synonym, language, morphologyData));

  return {
    keyphraseStems,
    synonymsStems
  };
};

const primeMorphologyData = (0, _lodashEs.memoize)(morphologyData => {
  return (0, _lodashEs.memoize)((keyphrase, synonyms, language = "en") => {
    return collectKeyphraseAndSynonymsStems(keyphrase, synonyms, language, morphologyData);
  }, (keyphrase, synonyms, language) => {
    return keyphrase + "," + synonyms + "," + language;
  });
});

function collectStems(keyphrase, synonyms, language = "en", morphologyData) {
  const collectStemsWithMorphologyData = primeMorphologyData(morphologyData);

  return collectStemsWithMorphologyData(keyphrase, synonyms, language);
}

exports.buildStems = buildStems;
exports.collectStems = collectStems;
exports.TopicPhrase = TopicPhrase;
exports.StemOriginalPair = StemOriginalPair;
