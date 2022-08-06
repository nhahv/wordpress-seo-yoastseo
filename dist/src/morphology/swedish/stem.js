"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stem;

const getRegions = function getRegions(word, morphologyData) {
  const match = word.match(new RegExp(morphologyData.externalStemmer.regexR1region));
  let r1 = "";
  if (match && match[1]) {
    r1 = match[1];
    if (match.index + 2 < 3) {
      r1 = word.slice(3);
    }
  }
  return {
    r1,
    rest: word.slice(0, word.length - r1.length)
  };
};

const removeSuffixes1a = function removeSuffixes1a(word, regions, morphologyData) {
  const r1 = regions.r1;
  if (!r1) {
    return word;
  }
  const regexSuffixes1a = new RegExp(morphologyData.externalStemmer.regexSuffixes1a);
  const match = r1.match(regexSuffixes1a);
  return match ? regions.rest + r1.slice(0, match.index) : word;
};

const removeSuffixS1b = function removeSuffixS1b(word, regions, morphologyData) {
  if (regions.r1 && word.match(new RegExp(morphologyData.externalStemmer.regexSuffixes1b))) {
    return word.slice(0, -1);
  }
  return word;
};

const removeSuffixStep2 = function removeSuffixStep2(word, regions, morphologyData) {
  const r1 = regions.r1;
  if (r1 && r1.match(new RegExp(morphologyData.externalStemmer.regexSuffixes2))) {
    return word.slice(0, -1);
  }
  return word;
};

const removeSuffixStep3 = function removeSuffixStep3(word, regions, morphologyData) {
  const r1 = regions.r1;
  if (r1) {
    if (r1.match(new RegExp(morphologyData.externalStemmer.regexSuffixes3a))) {
      return word.slice(0, -1);
    }
    const match = r1.match(new RegExp(morphologyData.externalStemmer.regexSuffixes3b));
    return match ? regions.rest + r1.slice(0, match.index) : word;
  }
  return word;
};

function stem(word, morphologyData) {
  let regions = getRegions(word, morphologyData);

  const wordAfterStep1a = removeSuffixes1a(word, regions, morphologyData);
  const wordAfterStep1b = removeSuffixS1b(word, regions, morphologyData);

  word = wordAfterStep1a.length < wordAfterStep1b.length ? wordAfterStep1a : wordAfterStep1b;
  regions = getRegions(word, morphologyData);

  word = removeSuffixStep2(word, regions, morphologyData);
  regions = getRegions(word, morphologyData);

  word = removeSuffixStep3(word, regions, morphologyData);
  return word;
}
