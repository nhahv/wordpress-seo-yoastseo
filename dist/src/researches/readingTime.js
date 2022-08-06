"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper) {
	const language = (0, _getLanguage2.default)(paper.getLocale());

	const wordsPerMinute = {
		ar: 138,
		cn: 158,
		de: 179,
		en: 228,
		es: 218,
		fi: 161,
		fr: 195,
		he: 187,
		it: 188,
		ja: 193,
		nl: 202,
		pl: 166,
		pt: 181,
		ru: 184,
		sl: 180,
		sv: 199,
		tr: 166
	};
	const minutesPerImage = 0.2;

	let wordsPerMinuteScore = wordsPerMinute[language];

	if (!wordsPerMinuteScore) {
		const sumWordsPerMinute = Object.values(wordsPerMinute).reduce((a, b) => a + b);
		const sumNumberOfLanguages = Object.keys(wordsPerMinute).length;
		wordsPerMinuteScore = sumWordsPerMinute / sumNumberOfLanguages;
	}

	const numberOfWords = (0, _wordCountInText2.default)(paper);
	const numberOfImages = (0, _imageCountInText2.default)(paper);

	return Math.ceil(numberOfWords / wordsPerMinuteScore + numberOfImages * minutesPerImage);
};

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _wordCountInText = require("./wordCountInText.js");

var _wordCountInText2 = _interopRequireDefault(_wordCountInText);

var _imageCountInText = require("./imageCountInText.js");

var _imageCountInText2 = _interopRequireDefault(_imageCountInText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
