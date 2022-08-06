"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	return {
		regularParticiples: (0, _lodashEs.memoize)(regularParticiples),
		irregularParticiples: (0, _lodashEs.memoize)(irregularParticiples)
	};
};

var _lodashEs = require("lodash-es");

var _irregulars = require("../../english/passiveVoice/irregulars");

var _irregulars2 = _interopRequireDefault(_irregulars);

var _irregulars3 = require("../../french/passiveVoice/irregulars");

var _irregulars4 = _interopRequireDefault(_irregulars3);

var _participles = require("../../spanish/passiveVoice/participles");

var _participles2 = _interopRequireDefault(_participles);

var _participles3 = require("../../portuguese/passiveVoice/participles");

var _participles4 = _interopRequireDefault(_participles3);

var _participles5 = require("../../italian/passiveVoice/participles");

var _participles6 = _interopRequireDefault(_participles5);

var _irregulars5 = require("../../dutch/passiveVoice/irregulars");

var _irregulars6 = _interopRequireDefault(_irregulars5);

var _participles7 = require("../../polish/passiveVoice/participles");

var _participles8 = _interopRequireDefault(_participles7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const irregularsEnglish = (0, _irregulars2.default)();

const irregularsFrench = (0, _irregulars4.default)();

const irregularsRegularFrench = irregularsFrench.irregularsRegular;
const irregularsIrregularFrench = irregularsFrench.irregularsIrregular;
const irregularsEndingInSFrench = irregularsFrench.irregularsEndingInS;

const spanishParticiples = (0, _participles2.default)();

const portugueseParticiples = (0, _participles4.default)();

const italianParticiples = (0, _participles6.default)();

const irregularsDutch = (0, _irregulars6.default)();
const nlRegex1 = /^(ge|be|ont|ver|her|er)\S+(d|t)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;
const nlRegex2 = /^(aan|af|bij|binnen|los|mee|na|neer|om|onder|samen|terug|tegen|toe|uit|vast)(ge)\S+(d|t|n)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig;

const polishParticiples = (0, _participles8.default)();

const languageVariables = {
	en: {
		regularParticiplesRegex: /\w+ed($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig
	},
	fr: {
		regularParticiplesRegex: /\S+(é|ée|és|ées)($|[ \n\r\t.,'()"+\-;!?:/»«‹›<>])/ig
	},
	nl: {
		regularParticipleRegexPattern1: nlRegex1,
		regularParticipleRegexPattern2: nlRegex2
	}
};
const languagesWithoutRegularParticiples = ["es", "it", "pl", "pt"];

const regularParticiples = function regularParticiples(word, language) {
	if (languagesWithoutRegularParticiples.includes(language)) {
		return [];
	}

	let matches = [];

	Object.keys(languageVariables[language]).forEach(function (regex) {
		const match = word.match(languageVariables[language][regex]);
		if (match !== null) {
			matches.push(match);
		}
	});

	matches = (0, _lodashEs.flattenDeep)(matches);

	return matches;
};

const matchFrenchParticipleWithSuffix = function matchFrenchParticipleWithSuffix(word, irregulars, suffixes) {
	const matches = [];
	(0, _lodashEs.forEach)(irregulars, function (irregular) {
		const irregularParticiplesRegex = new RegExp("^" + irregular + suffixes + "?$", "ig");
		const participleMatch = word.match(irregularParticiplesRegex);
		if (participleMatch) {
			matches.push(participleMatch[0]);
		}
	});
	return matches;
};

const irregularParticiples = function irregularParticiples(word, language) {
	let matches = [];

	switch (language) {
		case "fr":
			matches = matches.concat(matchFrenchParticipleWithSuffix(word, irregularsRegularFrench, "(e|s|es)"));
			matches = matches.concat(matchFrenchParticipleWithSuffix(word, irregularsEndingInSFrench, "(e|es)"));

			(0, _lodashEs.find)(irregularsIrregularFrench, function (irregularParticiple) {
				if (irregularParticiple === word) {
					matches.push(irregularParticiple);
				}
			});
			break;
		case "es":
			if ((0, _lodashEs.includes)(spanishParticiples, word)) {
				matches.push(word);
			}
			break;
		case "it":
			if ((0, _lodashEs.includes)(italianParticiples, word)) {
				matches.push(word);
			}
			break;
		case "nl":
			if ((0, _lodashEs.includes)(irregularsDutch, word)) {
				matches.push(word);
			}
			break;
		case "pl":
			if ((0, _lodashEs.includes)(polishParticiples, word)) {
				matches.push(word);
			}
			break;
		case "pt":
			if ((0, _lodashEs.includes)(portugueseParticiples, word)) {
				matches.push(word);
			}
			break;
		case "en":
		default:
			(0, _lodashEs.find)(irregularsEnglish, function (irregularParticiple) {
				if (irregularParticiple === word) {
					matches.push(irregularParticiple);
				}
			});
			break;
	}
	return matches;
};
