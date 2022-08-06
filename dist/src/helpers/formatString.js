"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (string, formatMap, delimiter = "%%") {
	delimiter = (0, _lodashEs.escapeRegExp)(delimiter);
	const parameterRegex = new RegExp(`${delimiter}(.+?)${delimiter}`, "g");
	let match;
	let formattedString = string;

	while ((match = parameterRegex.exec(string)) !== null) {
		const key = match[1];

		const replaceRegex = new RegExp(`${delimiter}${(0, _lodashEs.escapeRegExp)(key)}${delimiter}`, "g");

		if (key in formatMap) {
			formattedString = formattedString.replace(replaceRegex, formatMap[key]);
		}
	}

	return formattedString;
};

var _lodashEs = require("lodash-es");
