"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stem;

const determineR1 = function determineR1(word) {
  let r1Index = word.search(/[aeiouyøåæ][^aeiouyøåæ]/);

  if (r1Index !== -1) {
    r1Index += 2;
  }

  if (r1Index !== -1 && r1Index < 3) {
    r1Index = 3;
  }

  return r1Index;
};

const removeSuffixesStep1 = function removeSuffixesStep1(word, r1Index, morphologyData) {
  const suffixes1aIndex = word.search(new RegExp(morphologyData.externalStemmer.regexSuffixes1a));
  if (suffixes1aIndex >= r1Index && r1Index !== -1) {
    let wordAfterStemming = word.substring(0, suffixes1aIndex);
    if (/ert$/i.test(wordAfterStemming)) {
      wordAfterStemming = wordAfterStemming.slice(0, -1);
    }
    return wordAfterStemming;
  }

  const suffixSIndex = word.search(/s$/);
  const suffixes1bIndex = word.search(new RegExp(morphologyData.externalStemmer.regexSuffixes1b));
  if (suffixSIndex >= r1Index && suffixes1bIndex !== -1 && r1Index !== -1) {
    return word.slice(0, -1);
  }

  return word;
};

const removeSuffixesStep2 = function removeSuffixesStep2(word, r1Index, morphologyData) {
  const suffixes2Index = word.search(new RegExp(morphologyData.externalStemmer.regexSuffixes2));
  if (suffixes2Index >= r1Index && r1Index !== -1) {
    word = word.slice(0, -1);
  }
  return word;
};

const removeSuffixesStep3 = function removeSuffixesStep3(word, r1Index, morphologyData) {
  const suffixes3Index = word.search(new RegExp(morphologyData.externalStemmer.regexSuffixes3));
  if (suffixes3Index >= r1Index && r1Index !== -1) {
    word = word.substring(0, suffixes3Index);
  }
  return word;
};

function stem(word, morphologyData) {
  let r1Index = -1;
  for (const step of [removeSuffixesStep1, removeSuffixesStep2, removeSuffixesStep3]) {
    r1Index = determineR1(word);
    word = step(word, r1Index, morphologyData);
  }

  return word;
}
