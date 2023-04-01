"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	text = text.replace(/\s{2,}/g, " ");

	text = text.replace(/\s\./g, ".");

	text = text.replace(/^\s+|\s+$/g, "");

	return text;
};
