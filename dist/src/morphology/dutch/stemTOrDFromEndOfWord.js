"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stemTOrDFromEndOfWord = stemTOrDFromEndOfWord;

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers");

var _detectAndStemRegularParticiple = require("./detectAndStemRegularParticiple");

var _getStemWordsWithTAndDEnding = require("./getStemWordsWithTAndDEnding");

var _checkExceptionsWithFullForms = require("../morphoHelpers/checkExceptionsWithFullForms");

var _checkExceptionsWithFullForms2 = _interopRequireDefault(_checkExceptionsWithFullForms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkIfTorDIsUnambiguous = function checkIfTorDIsUnambiguous(morphologyDataNL, stemmedWord, word) {
  const wordsNotToBeStemmed = morphologyDataNL.stemExceptions.wordsNotToBeStemmedExceptions;
  const adjectivesEndingInRd = morphologyDataNL.stemExceptions.removeSuffixesFromFullForms[1].forms;
  const wordsEndingInTOrDExceptionList = morphologyDataNL.ambiguousTAndDEndings.tOrDArePartOfStem.doNotStemTOrD;

  if ((0, _detectAndStemRegularParticiple.detectAndStemRegularParticiple)(morphologyDataNL, word) || (0, _getStemWordsWithTAndDEnding.generateCorrectStemWithTAndDEnding)(morphologyDataNL, word) || (0, _exceptionListHelpers.checkIfWordIsOnVerbExceptionList)(word, wordsNotToBeStemmed.verbs, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes) || (0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(word, wordsNotToBeStemmed.endingMatch) || wordsNotToBeStemmed.exactMatch.includes(word) || adjectivesEndingInRd.includes(stemmedWord) || (0, _checkExceptionsWithFullForms2.default)(morphologyDataNL, word) || stemmedWord.endsWith("heid") || (0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(stemmedWord, wordsEndingInTOrDExceptionList)) {
    return true;
  }
};

function stemTOrDFromEndOfWord(morphologyDataNL, stemmedWord, word) {
  if (checkIfTorDIsUnambiguous(morphologyDataNL, stemmedWord, word)) {
    return null;
  }

  return stemmedWord.slice(0, -1);
}
