"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyStem = modifyStem;
exports.isVowelDoublingAllowed = isVowelDoublingAllowed;

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers.js");

const checkIfWordIsOnNoVowelDoublingList = function checkIfWordIsOnNoVowelDoublingList(word, noVowelDoublingList, compoundVerbPrefixes) {
  if ((0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(word, noVowelDoublingList.endingMatch) || (0, _exceptionListHelpers.checkIfWordIsOnVerbExceptionList)(word, noVowelDoublingList.verbs, compoundVerbPrefixes) || noVowelDoublingList.exactMatch.includes(word)) {
    return true;
  }
};

const isVowelPrecededByDoubleConsonant = function isVowelPrecededByDoubleConsonant(word) {
  const fourthToLastLetter = word.charAt(word.length - 4);
  const thirdToLastLetter = word.charAt(word.length - 3);
  return fourthToLastLetter !== thirdToLastLetter;
};

const doesPrecedingSyllableContainDiphthong = function doesPrecedingSyllableContainDiphthong(word, noVowelDoublingRegex) {
  return word.search(new RegExp(noVowelDoublingRegex)) === -1;
};

function modifyStem(word, modificationGroup) {
  const neededReplacement = modificationGroup.find(replacement => word.search(new RegExp(replacement[0])) !== -1);
  if (typeof neededReplacement !== "undefined") {
    word = word.replace(new RegExp(neededReplacement[0]), neededReplacement[1]);
  }return word;
}

function isVowelDoublingAllowed(word, morphologyDataNLStemmingExceptions, morphologyDataNLVerbPrefixes) {
  const firstCheck = (0, _exceptionListHelpers.checkIfWordIsOnVerbExceptionList)(word, morphologyDataNLStemmingExceptions.getVowelDoubling, morphologyDataNLVerbPrefixes);

  const secondCheck = checkIfWordIsOnNoVowelDoublingList(word, morphologyDataNLStemmingExceptions.noVowelDoubling, morphologyDataNLVerbPrefixes);
  const thirdCheck = isVowelPrecededByDoubleConsonant(word);
  const fourthCheck = doesPrecedingSyllableContainDiphthong(word, morphologyDataNLStemmingExceptions.noVowelDoubling.rule);

  return firstCheck || !secondCheck && thirdCheck && fourthCheck;
}
