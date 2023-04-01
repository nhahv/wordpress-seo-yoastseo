"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _replaceDiacritics = require("../stringProcessing/replaceDiacritics.js");

var _replaceDiacritics2 = _interopRequireDefault(_replaceDiacritics);

var _addWordboundary = require("../stringProcessing/addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

var _sanitizeString = require("../stringProcessing/sanitizeString");

var _sanitizeString2 = _interopRequireDefault(_sanitizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _lodashEs.memoize)(function (string, extraBoundary, doReplaceDiacritics) {
	if ((0, _lodashEs.isUndefined)(extraBoundary)) {
		extraBoundary = "";
	}

	if ((0, _lodashEs.isUndefined)(doReplaceDiacritics) || doReplaceDiacritics === true) {
		string = (0, _replaceDiacritics2.default)(string);
	}

	string = (0, _sanitizeString2.default)(string);
	string = (0, _lodashEs.escapeRegExp)(string);
	string = (0, _addWordboundary2.default)(string, false, extraBoundary);
	return new RegExp(string, "ig");
});
