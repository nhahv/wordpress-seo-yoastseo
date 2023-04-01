"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text) {
	var alt = "";

	var matches = text.match(regexAltTag);

	if (matches !== null) {
		alt = (0, _stripSpaces2.default)(matches[2]);

		alt = alt.replace(/&quot;/g, "\"");
		alt = alt.replace(/&#039;/g, "'");
	}
	return alt;
};

var _stripSpaces = require("../stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regexAltTag = /alt=(['"])(.*?)\1/i;
