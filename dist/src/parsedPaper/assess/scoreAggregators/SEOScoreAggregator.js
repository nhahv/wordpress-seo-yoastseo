"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScoreAggregator = require("./ScoreAggregator");

var _ScoreAggregator2 = _interopRequireDefault(_ScoreAggregator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ScoreScale = 100;

const ScoreFactor = 9;

class SEOScoreAggregator extends _ScoreAggregator2.default {
  aggregate(results) {
    const score = results.reduce((sum, result) => sum + result.getScore(), 0);

    return Math.round(score * ScoreScale / (results.length * ScoreFactor)) || 0;
  }
}

exports.default = SEOScoreAggregator;
