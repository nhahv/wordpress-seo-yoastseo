"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const createSingleRuleFromMorphologyData = function createSingleRuleFromMorphologyData(rule, flags = "i") {
  if (rule.length === 2) {
    return {
      reg: new RegExp(rule[0], flags),
      repl: rule[1]
    };
  }
  if (rule.length === 3) {
    return {
      reg: new RegExp(rule[0], flags),
      repl1: rule[1],
      repl2: rule[2]
    };
  }
};

const createRulesFromMorphologyData = function createRulesFromMorphologyData(rules, flags = "i") {
  return rules.map(rule => createSingleRuleFromMorphologyData(rule, flags));
};

exports.createSingleRuleFromMorphologyData = createSingleRuleFromMorphologyData;
exports.createRulesFromMorphologyData = createRulesFromMorphologyData;
exports.default = createRulesFromMorphologyData;
