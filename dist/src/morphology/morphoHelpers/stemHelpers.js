"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSuffixesFromFullForm = removeSuffixesFromFullForm;
exports.removeSuffixFromFullForm = removeSuffixFromFullForm;
function removeSuffixesFromFullForm(exceptions, suffixes, word) {
  for (let i = 0; i < exceptions.length; i++) {
    if (word.startsWith(exceptions[i])) {
      const suffixRetrieved = word.substring(exceptions[i].length);
      for (let j = 0; j < suffixes.length; j++) {
        if (suffixes[j] === suffixRetrieved) {
          return word.slice(0, -suffixRetrieved.length);
        }
      }
    }
  }
}

function removeSuffixFromFullForm(exceptions, suffix, word) {
  for (let i = 0; i < exceptions.length; i++) {
    if (word.endsWith(exceptions[i])) {
      return word.slice(0, -suffix.length);
    }
  }
}
