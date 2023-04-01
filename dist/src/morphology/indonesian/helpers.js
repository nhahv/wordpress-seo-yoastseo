"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateTotalNumberOfSyllables = calculateTotalNumberOfSyllables;
exports.removeEnding = removeEnding;
exports.checkBeginningsList = checkBeginningsList;

var _buildFormRule = require("../morphoHelpers/buildFormRule");

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData");

var _createRulesFromMorphologyData2 = _interopRequireDefault(_createRulesFromMorphologyData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const vowelCharacters = ["a", "e", "i", "o", "u"];

function isVowel(character) {
  return vowelCharacters.includes(character);
}

function calculateTotalNumberOfSyllables(word) {
  let result = 0;

  for (let i = 0; i < word.length; i++) {
    if (isVowel(word[i])) {
      result++;
    }
  }

  return result;
}

function removeEnding(word, regexRules, exceptions, morphologyData) {
  if (exceptions.includes(word)) {
    return word;
  }

  const wordsWithKEnding = morphologyData.stemming.doNotStemWords.doNotStemK;
  if (word.endsWith("kan")) {
    const wordWithoutSuffixAn = word.substring(0, word.length - 2);

    if (wordsWithKEnding.includes(wordWithoutSuffixAn)) {
      word = wordWithoutSuffixAn;
    }
  }

  const removePartRegex = (0, _createRulesFromMorphologyData2.default)(regexRules);
  const withRemovedPart = (0, _buildFormRule.buildOneFormFromRegex)(word, removePartRegex);
  return withRemovedPart || word;
}

function checkBeginningsList(word, prefixLength, beginnings) {
  const wordWithoutPrefix = word.slice(prefixLength);
  return beginnings.some(beginning => wordWithoutPrefix.startsWith(beginning));
}
