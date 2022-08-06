"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (matches, keywordForms, locale) {
	let foundInHeader = -1;

	if (matches !== null) {
		foundInHeader = 0;
		for (let i = 0; i < matches.length; i++) {
			const formattedHeaders = (0, _replaceString2.default)(matches[i], removalWords);
			if ((0, _matchTextWithArray2.default)(formattedHeaders, keywordForms, locale).count > 0 || (0, _matchTextWithArray2.default)(matches[i], keywordForms, locale).count > 0) {
				foundInHeader++;
			}
		}
	}
	return foundInHeader;
};

var _replaceString = require("../stringProcessing/replaceString.js");

var _replaceString2 = _interopRequireDefault(_replaceString);

var _removalWords = require("../config/removalWords.js");

var _removalWords2 = _interopRequireDefault(_removalWords);

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray.js");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const removalWords = (0, _removalWords2.default)();
