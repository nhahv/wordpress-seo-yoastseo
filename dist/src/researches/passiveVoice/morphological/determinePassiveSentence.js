"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (sentenceText, language) {
	if (["ru", "sv"].includes(language)) {
		return determineSentenceIsPassiveListBased(sentenceText, language);
	}

	if (language === "id") {
		return determineSentenceIsPassiveIndonesian(sentenceText);
	}

	if (language === "tr") {
		return determineSentenceIsPassiveTurkish(sentenceText);
	}

	if (language === "ar") {
		return determineSentenceIsPassiveArabic(sentenceText);
	}
	if (language === "he") {
		return determineSentenceIsPassiveHebrew(sentenceText);
	}
	if (language === "hu") {
		return determineSentenceIsPassiveHungarian(sentenceText);
	}
};

var _lodashEs = require("lodash-es");

var _getWords = require("../../../stringProcessing/getWords.js");

var _getWords2 = _interopRequireDefault(_getWords);

var _participlesShortenedList = require("../../russian/passiveVoice/participlesShortenedList.js");

var _participlesShortenedList2 = _interopRequireDefault(_participlesShortenedList);

var _participles = require("../../swedish/passiveVoice/participles.js");

var _participles2 = _interopRequireDefault(_participles);

var _passiveEndings = require("../../turkish/passiveVoice/passiveEndings");

var _passiveEndings2 = _interopRequireDefault(_passiveEndings);

var _nonPassivesTurkish = require("../../turkish/passiveVoice/nonPassivesTurkish");

var _nonPassiveVerbsStartingDi = require("../../indonesian/passiveVoice/nonPassiveVerbsStartingDi");

var _nonPassiveVerbsStartingDi2 = _interopRequireDefault(_nonPassiveVerbsStartingDi);

var _passiveVerbsWithLongVowel = require("../../arabic/passiveVoice/passiveVerbsWithLongVowel");

var _passiveVerbsWithLongVowel2 = _interopRequireDefault(_passiveVerbsWithLongVowel);

var _regularRootsNifal = require("../../hebrew/passiveVoice/regularRootsNifal");

var _regularRootsNifal2 = _interopRequireDefault(_regularRootsNifal);

var _regularRootsPual = require("../../hebrew/passiveVoice/regularRootsPual");

var _regularRootsPual2 = _interopRequireDefault(_regularRootsPual);

var _regularRootsHufal = require("../../hebrew/passiveVoice/regularRootsHufal");

var _regularRootsHufal2 = _interopRequireDefault(_regularRootsHufal);

var _odikVerbs = require("../../hungarian/passiveVoice/odikVerbs");

var _odikVerbs2 = _interopRequireDefault(_odikVerbs);

var _morphologicalPassiveAffixes = require("../../hungarian/passiveVoice/morphologicalPassiveAffixes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getPassiveVerbsRussian = (0, _participlesShortenedList2.default)().all;

const getPassiveVerbsSwedish = (0, _participles2.default)().all;

const passiveEndingsTurkish = (0, _passiveEndings2.default)();


const passivePrefixIndonesian = "di";

const nonPassivesIndonesian = (0, _nonPassiveVerbsStartingDi2.default)();

const getPassiveVerbsArabic = (0, _passiveVerbsWithLongVowel2.default)();

const nifalVerbsHebrew = (0, _regularRootsNifal2.default)();

const pualVerbsHebrew = (0, _regularRootsPual2.default)();

const hufalVerbsHebrew = (0, _regularRootsHufal2.default)();

const matchPassiveVerbs = function matchPassiveVerbs(sentence, passiveVerbs) {
	return (0, _lodashEs.filter)((0, _getWords2.default)(sentence), function (word) {
		return passiveVerbs.includes(word.toLocaleLowerCase());
	});
};

const determineSentenceIsPassiveListBased = function determineSentenceIsPassiveListBased(sentence, language) {
	let passiveVerbs = [];

	switch (language) {
		case "ru":
			passiveVerbs = getPassiveVerbsRussian;
			break;
		case "sv":
			passiveVerbs = getPassiveVerbsSwedish;
			break;
	}
	return matchPassiveVerbs(sentence, passiveVerbs).length !== 0;
};

const determineSentenceIsPassiveIndonesian = function determineSentenceIsPassiveIndonesian(sentence) {
	const words = (0, _getWords2.default)(sentence);
	let matchedPassives = words.filter(word => word.length > 4);
	matchedPassives = matchedPassives.filter(word => word.startsWith(passivePrefixIndonesian));
	if (matchedPassives.length === 0) {
		return false;
	}

	for (const nonPassive of nonPassivesIndonesian) {
		matchedPassives = matchedPassives.filter(word => !word.startsWith(nonPassive));
	}

	matchedPassives = matchedPassives.filter(function (matchedPassive) {
		let matchedPassivesShouldStay = true;
		const passiveIndex = words.indexOf(matchedPassive);
		const wordPrecedingPassive = words[passiveIndex - 1];
		if (wordPrecedingPassive === "untuk") {
			matchedPassivesShouldStay = false;
		}
		return matchedPassivesShouldStay;
	});
	return matchedPassives.length !== 0;
};

const checkTurkishNonPassivesStemsList = function checkTurkishNonPassivesStemsList(nonPassivesTurkish, passiveEndings, matchedPassives) {
	return matchedPassives.filter(passive => nonPassivesTurkish.some(stem => passiveEndings.some(function (ending) {
		const pattern = new RegExp("^" + stem + ending + "$");
		return !pattern.test(passive);
	})));
};

const determineSentenceIsPassiveTurkish = function determineSentenceIsPassiveTurkish(sentence) {
	const words = (0, _getWords2.default)(sentence);
	let matchedPassives = words.filter(word => word.length > 5);
	matchedPassives = matchedPassives.filter(word => !_nonPassivesTurkish.nonPassivesFullForms.includes(word));
	matchedPassives = checkTurkishNonPassivesStemsList(_nonPassivesTurkish.nonPassiveStems, passiveEndingsTurkish, matchedPassives);
	return matchedPassives.some(word => passiveEndingsTurkish.some(ending => word.endsWith(ending)));
};

const determineSentenceIsPassiveArabic = function determineSentenceIsPassiveArabic(sentence) {
	const arabicPrepositionalPrefix = "و";
	const words = (0, _getWords2.default)(sentence);
	const passiveVerbs = [];

	for (let word of words) {
		if (word.startsWith(arabicPrepositionalPrefix)) {
			word = word.slice(1);
		}
		let wordWithDamma = -1;

		if (word.length >= 2) {
			wordWithDamma = word[1].search("\u064F");
		}
		if (wordWithDamma !== -1 || getPassiveVerbsArabic.includes(word)) {
			passiveVerbs.push(word);
		}
	}

	return passiveVerbs.length !== 0;
};

const checkHebrewVerbRootsList = function checkHebrewVerbRootsList(word, verbRootsList, affixesList) {
	return verbRootsList.some(root => affixesList.some(function (affixes) {
		const pattern = new RegExp("^" + affixes.prefix + root + affixes.suffix + "$");
		return pattern.test(word);
	}));
};

const determineSentenceIsPassiveHebrew = function determineSentenceIsPassiveHebrew(sentence) {
	const words = (0, _getWords2.default)(sentence);
	for (const word of words) {
		const nifalAffixes = [{ prefix: "(נ|אי|תי|הי|יי|ני|להי)", suffix: "" }, { prefix: "(תי|הי)", suffix: "(י|ו|נה)" }, { prefix: "נ", suffix: "(ים|ת|ות|תי|ה|נו|תם|תן|ו)" }, { prefix: "יי", suffix: "ו" }];

		const nifalPassive = checkHebrewVerbRootsList(word, nifalVerbsHebrew, nifalAffixes);

		if (nifalPassive) {
			return true;
		}

		const pualAffixes = [{ prefix: "(מ|א|ת|י|נ)", suffix: "" }, { prefix: "תי", suffix: "נה" }, { prefix: "מ", suffix: "(ת|ים|ות)" }, { prefix: "ת", suffix: "(י|ו|נה)" }, { prefix: "י", suffix: "ו" }, { prefix: "", suffix: "(תי|ת|ה|נו|תם|תן|ו)" }, { prefix: "", suffix: "" }];
		const pualInfix = "ו";

		const pualPassive = pualVerbsHebrew.some(root => pualAffixes.some(function (affixes) {
			const pualPattern = new RegExp("^" + affixes.prefix + root[0] + pualInfix + root[1] + root[2] + affixes.suffix + "$");

			return pualPattern.test(word);
		}));

		if (pualPassive) {
			return true;
		}

		const hufalAffixes = [{ prefix: "(מו|הו|או|תו|יו|נו)", suffix: "" }, { prefix: "מו", suffix: "(ת|ים|ות)" }, { prefix: "הו", suffix: "(תי|ת|ית|ה|נו|תם|תן|ו)" }, { prefix: "תו", suffix: "(ו|נה|י)" }, { prefix: "יו", suffix: "ו" }];

		const hufalPassive = checkHebrewVerbRootsList(word, hufalVerbsHebrew, hufalAffixes);

		if (hufalPassive) {
			return true;
		}
	}

	return false;
};

const checkHungarianPassive = function checkHungarianPassive(word, verbRootsList, prefixes, suffixes) {
	return verbRootsList.some(root => {
		return suffixes.some(function (suffix) {
			const rootAndSuffix = root + suffix;

			if (word.endsWith(rootAndSuffix)) {
				const beforeRoot = word.slice(0, word.indexOf(rootAndSuffix));

				return beforeRoot === "" || prefixes.includes(beforeRoot);
			}
		});
	});
};

const determineSentenceIsPassiveHungarian = function determineSentenceIsPassiveHungarian(sentence) {
	const words = (0, _getWords2.default)(sentence);
	const passiveVerbs1 = _odikVerbs2.default.odikVerbStems1;
	const passiveVerbs2 = _odikVerbs2.default.odikVerbStems2;

	for (const word of words) {
		const checkPassiveVerb1 = checkHungarianPassive(word, passiveVerbs1, _morphologicalPassiveAffixes.verbPrefixes, _morphologicalPassiveAffixes.odikSuffixes1);
		if (checkPassiveVerb1) {
			return true;
		}

		const checkPassiveVerbs2 = checkHungarianPassive(word, passiveVerbs2, _morphologicalPassiveAffixes.verbPrefixes, _morphologicalPassiveAffixes.odikSuffixes2);
		if (checkPassiveVerbs2) {
			return true;
		}
	}

	return false;
};
