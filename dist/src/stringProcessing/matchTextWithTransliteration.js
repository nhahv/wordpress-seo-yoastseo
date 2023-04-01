"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (text, keyword, locale) {
	var keywordRegex = toRegex(keyword, locale);

	if (locale === "tr_TR") {
		const turkishMappings = (0, _specialCharacterMappings.replaceTurkishIsMemoized)(keyword);
		keywordRegex = new RegExp(turkishMappings.map(x => (0, _addWordboundary2.default)(x)).join("|"), "ig");
	}
	var matches = text.match(keywordRegex) || [];

	text = text.replace(keywordRegex, "");

	var transliterateKeyword = (0, _transliterate2.default)(keyword, locale);
	var transliterateKeywordRegex = toRegex(transliterateKeyword, locale);
	var transliterateMatches = text.match(transliterateKeywordRegex) || [];
	var combinedArray = matches.concat(transliterateMatches);

	var transliterateWPKeyword = (0, _transliterateWPstyle2.default)(keyword, locale);

	if (!(transliterateWPKeyword === transliterateKeyword)) {
		var transliterateWPKeywordRegex = toRegex(transliterateWPKeyword, locale);
		var transliterateWPMatches = text.match(transliterateWPKeywordRegex) || [];

		combinedArray = combinedArray.concat(transliterateWPMatches);
	}

	return (0, _lodashEs.map)(combinedArray, function (match) {
		return (0, _stripSpaces2.default)(match);
	});
};

var _lodashEs = require("lodash-es");

var _addWordboundary = require("./addWordboundary.js");

var _addWordboundary2 = _interopRequireDefault(_addWordboundary);

var _stripSpaces = require("./stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _transliterate = require("./transliterate.js");

var _transliterate2 = _interopRequireDefault(_transliterate);

var _transliterateWPstyle = require("./transliterateWPstyle.js");

var _transliterateWPstyle2 = _interopRequireDefault(_transliterateWPstyle);

var _specialCharacterMappings = require("./specialCharacterMappings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toRegex = function toRegex(keyword, locale) {
	keyword = (0, _addWordboundary2.default)(keyword, false, "", locale);
	return new RegExp(keyword, "ig");
};
