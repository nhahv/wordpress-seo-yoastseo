"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.detectAndStemRegularParticiple = detectAndStemRegularParticiple;

var _exceptionsParticiplesActive = require("../../researches/german/passiveVoice/exceptionsParticiplesActive");

var _exceptionsParticiplesActive2 = _interopRequireDefault(_exceptionsParticiplesActive);

var _regex = require("../../researches/german/passiveVoice/regex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const detectAndStemParticiplesWithoutPrefixes = function detectAndStemParticiplesWithoutPrefixes(morphologyDataVerbs, word) {
	const geStemTParticipleRegex = new RegExp("^" + morphologyDataVerbs.participleStemmingClasses[1].regex);
	const geStemEtParticipleRegex = new RegExp("^" + morphologyDataVerbs.participleStemmingClasses[0].regex);

	if (geStemEtParticipleRegex.test(word)) {
		return word.slice(2, word.length - 2);
	}

	if (geStemTParticipleRegex.test(word)) {
		return word.slice(2, word.length - 1);
	}

	return null;
};

const detectAndStemParticiplePerPrefixClass = function detectAndStemParticiplePerPrefixClass(word, prefixes, regexPart, startStem, endStem) {
	for (const currentPrefix of prefixes) {
		const participleRegex = new RegExp("^" + currentPrefix + regexPart);

		if (participleRegex.test(word)) {
			const wordWithoutPrefix = word.slice(currentPrefix.length - word.length);
			const wordWithoutParticipleAffixes = wordWithoutPrefix.slice(startStem, wordWithoutPrefix.length - endStem);

			return currentPrefix + wordWithoutParticipleAffixes;
		}
	}

	return null;
};

const detectAndStemParticiplesWithPrefixes = function detectAndStemParticiplesWithPrefixes(morphologyDataVerbs, word) {
	const prefixesSeparableOrInseparable = morphologyDataVerbs.prefixes.separableOrInseparable;

	for (const participleClass of morphologyDataVerbs.participleStemmingClasses) {
		const regex = participleClass.regex;
		const startStem = participleClass.startStem;
		const endStem = participleClass.endStem;
		const separable = participleClass.separable;

		const prefixes = separable ? morphologyDataVerbs.prefixes.separable : morphologyDataVerbs.prefixes.inseparable;

		let stem = detectAndStemParticiplePerPrefixClass(word, prefixes, regex, startStem, endStem);

		if (stem) {
			return stem;
		}

		stem = detectAndStemParticiplePerPrefixClass(word, prefixesSeparableOrInseparable, regex, startStem, endStem);

		if (stem) {
			return stem;
		}
	}

	return null;
};

function detectAndStemRegularParticiple(morphologyDataVerbs, word) {
	if ((0, _regex.exceptions)(word).length > 0 || (0, _exceptionsParticiplesActive2.default)().includes(word)) {
		return "";
	}

	let stem = detectAndStemParticiplesWithoutPrefixes(morphologyDataVerbs, word);

	if (stem) {
		return stem;
	}

	stem = detectAndStemParticiplesWithPrefixes(morphologyDataVerbs, word);

	if (stem) {
		return stem;
	}

	return null;
}
