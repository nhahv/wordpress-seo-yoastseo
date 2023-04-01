"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	text = text.replace(/\|/ig, "");
	text = text.replace(/<h([1-6])(?:[^>]+)?>(.*?)<\/h\1>/ig, "|");

	const subheadingsTexts = text.split("|");

	if ((0, _lodashEs.isEmpty)(subheadingsTexts[0])) {
		subheadingsTexts.shift();
	}

	return subheadingsTexts;
};

var _lodashEs = require("lodash-es");
