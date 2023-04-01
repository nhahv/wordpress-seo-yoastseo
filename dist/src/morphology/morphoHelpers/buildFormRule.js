"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildOneFormFromRegex = buildOneFormFromRegex;
function buildOneFormFromRegex(word, regexes) {
  for (let i = 0; i < regexes.length; i++) {
    if (regexes[i].reg.test(word) === true) {
      return word.replace(regexes[i].reg, regexes[i].repl);
    }
  }
}
