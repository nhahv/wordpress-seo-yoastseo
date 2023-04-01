"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doesWordMatchRegex = doesWordMatchRegex;
exports.searchAndReplaceWithRegex = searchAndReplaceWithRegex;
exports.applyAllReplacements = applyAllReplacements;
function doesWordMatchRegex(word, regex) {
  const regexObject = RegExp(regex);
  return regexObject.test(word);
}

function searchAndReplaceWithRegex(word, groupOfRegexAndReplacements) {
  for (const regexAndReplacement of groupOfRegexAndReplacements) {
    if (word.search(new RegExp(regexAndReplacement[0])) !== -1) {
      word = word.replace(new RegExp(regexAndReplacement[0]), regexAndReplacement[1]);
      return word;
    }
  }
}

function applyAllReplacements(word, listOfRegexAndReplacement) {
  listOfRegexAndReplacement.forEach(function (setOfRegexAndReplacement) {
    word = word.replace(new RegExp(setOfRegexAndReplacement[0]), setOfRegexAndReplacement[1]);
  });
  return word;
}
