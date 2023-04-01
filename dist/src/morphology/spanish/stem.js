"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

var _buildFormRule = require("../morphoHelpers/buildFormRule");

var _createRulesFromMorphologyData = require("../morphoHelpers/createRulesFromMorphologyData");

var _createRulesFromMorphologyData2 = _interopRequireDefault(_createRulesFromMorphologyData);

var _findMatchingEndingInArray = require("../morphoHelpers/findMatchingEndingInArray");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isVowel = function isVowel(c) {
	const regex = /[aeiouáéíóú]/gi;

	return regex.test(c);
};

const nextVowelPosition = function nextVowelPosition(word, start = 0) {
	const length = word.length;

	for (let position = start; position < length; position++) {
		if (isVowel(word[position])) {
			return position;
		}
	}

	return length;
};

const nextConsonantPosition = function nextConsonantPosition(word, start = 0) {
	const length = word.length;

	for (let position = start; position < length; position++) {
		if (!isVowel(word[position])) {
			return position;
		}
	}

	return length;
};

const removeAccent = function removeAccent(word) {
	const accentedVowels = ["á", "é", "í", "ó", "ú"];
	const vowels = ["a", "e", "i", "o", "u"];

	for (let i = 0; i < accentedVowels.length; i++) {
		word = word.replace(accentedVowels[i], vowels[i]);
	}

	return word;
};

const endsIn = function endsIn(word, suffix) {
	if (word.length < suffix.length) {
		return false;
	}

	return word.slice(-suffix.length) === suffix;
};

const checkWordInFullFormExceptions = function checkWordInFullFormExceptions(word, exceptions) {
	for (const paradigm of exceptions) {
		if (paradigm[1].includes(word)) {
			return paradigm[0];
		}
	}
	return null;
};

const tryStemAsMente = function tryStemAsMente(word, r1Text, menteStemming) {
	const suffix = endsIn(r1Text, "mente");

	if (suffix === "" || menteStemming.notMenteAdverbs.includes(word)) {
		return word;
	}

	return (0, _buildFormRule.buildOneFormFromRegex)(word, (0, _createRulesFromMorphologyData2.default)(menteStemming.menteToStem)) || word;
};

const tryStemAsSuperlative = function tryStemAsSuperlative(word, r1Text, superlativesStemming) {
	const superlativeSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r1Text, superlativesStemming.superlativeSuffixes);

	if (superlativeSuffix === "" || superlativesStemming.notSuperlatives.includes(word)) {
		return word;
	}

	return (0, _buildFormRule.buildOneFormFromRegex)(word, (0, _createRulesFromMorphologyData2.default)(superlativesStemming.superlativeToStem)) || word;
};

const tryStemAsDiminutive = function tryStemAsDiminutive(word, diminutivesStemming) {
	const diminutiveSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(word, ["ito", "ita", "itos", "itas", "íto", "íta", "ítos", "ítas"]);

	if (diminutiveSuffix === "" || diminutivesStemming.notDiminutives.includes(word)) {
		return word;
	}

	const wordWithoutEnding = word.endsWith("s") ? word.slice(0, word.length - 2) : word.slice(0, word.length - 1);

	for (const paradigm of diminutivesStemming.irregularDiminutives) {
		if (paradigm[1].includes(wordWithoutEnding)) {
			return paradigm[0];
		}
	}

	return (0, _buildFormRule.buildOneFormFromRegex)(word, (0, _createRulesFromMorphologyData2.default)(diminutivesStemming.diminutiveToStem)) || word;
};

const canonicalizeStem = function canonicalizeStem(stemmedWord, stemsThatBelongToOneWord) {
	for (const paradigm of stemsThatBelongToOneWord.nouns) {
		if (paradigm.includes(stemmedWord)) {
			return paradigm[0];
		}
	}

	for (const paradigm of stemsThatBelongToOneWord.adjectives) {
		if (paradigm.includes(stemmedWord)) {
			return paradigm[0];
		}
	}

	for (const paradigm of stemsThatBelongToOneWord.verbs) {
		if (paradigm.includes(stemmedWord)) {
			return paradigm[0];
		}
	}
	return null;
};

const stemVerbSuffixes = function stemVerbSuffixes(word, wordAfter1, rvText, rv) {
	const suf = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, ["ya", "ye", "yan", "yen", "yeron", "yendo", "yo", "yó", "yas", "yes", "yais", "yamos"]);

	if (suf !== "" && word.slice(-suf.length - 1, -suf.length) === "u") {
		word = word.slice(0, -suf.length);
	}

	if (word !== wordAfter1) {
		rvText = word.slice(rv);
	}

	if (word === wordAfter1) {
		const suf11 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, ["arían", "arías", "arán", "arás", "aríais", "aría", "aréis", "aríamos", "aremos", "ará", "aré", "erían", "erías", "erán", "erás", "eríais", "ería", "eréis", "eríamos", "eremos", "erá", "eré", "irían", "irías", "irán", "irás", "iríais", "iría", "iréis", "iríamos", "iremos", "irá", "iré", "aba", "ada", "ida", "ía", "ara", "iera", "ad", "ed", "id", "ase", "iese", "aste", "iste", "an", "aban", "ían", "aran", "ieran", "asen", "iesen", "aron", "ieron", "ado", "ido", "ando", "iendo", "ió", "ar", "er", "ir", "as", "abas", "adas", "idas", "ías", "aras", "ieras", "ases", "ieses", "ís", "áis", "abais", "íais", "arais", "ierais", "  aseis", "ieseis", "asteis", "isteis", "ados", "idos", "amos", "ábamos", "íamos", "imos", "áramos", "iéramos", "iésemos", "ásemos"]);
		const suf12 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, ["en", "es", "éis", "emos"]);
		if (suf11 !== "") {
			word = word.slice(0, -suf11.length);
		} else if (suf12 !== "") {
			word = word.slice(0, -suf12.length);
			if (endsIn(word, "gu")) {
				word = word.slice(0, -1);
			}
		}
	}

	return word;
};

function stem(word, morphologyData) {
	word.toLowerCase();

	const ifException = checkWordInFullFormExceptions(word, morphologyData.exceptionStemsWithFullForms);
	if (ifException) {
		return ifException;
	}

	const nonPluralsOnS = morphologyData.wordsThatLookLikeButAreNot.nonPluralsOnS;
	if (nonPluralsOnS.includes(word)) {
		return removeAccent(word);
	}

	const length = word.length;
	if (length < 2) {
		return removeAccent(word);
	}

	let r1 = length;
	let r2 = length;
	let rv = length;

	for (let i = 0; i < length - 1 && r1 === length; i++) {
		if (isVowel(word[i]) && !isVowel(word[i + 1])) {
			r1 = i + 2;
		}
	}

	for (let i = r1; i < length - 1 && r2 === length; i++) {
		if (isVowel(word[i]) && !isVowel(word[i + 1])) {
			r2 = i + 2;
		}
	}

	if (length > 3) {
		if (!isVowel(word[1])) {
			rv = nextVowelPosition(word, 2) + 1;
		} else if (isVowel(word[0]) && isVowel(word[1])) {
			rv = nextConsonantPosition(word, 2) + 1;
		} else {
			rv = 3;
		}
	}

	let r1Text = word.slice(r1);
	let r2Text = word.slice(r2);
	let rvText = word.slice(rv);
	const originalWord = word;

	const pronounSuffix = ["me", "se", "sela", "selo", "selas", "selos", "la", "le", "lo", "las", "les", "los", "nos"];
	const pronounSuffixPre1 = ["iéndo", "ándo", "ár", "ér", "ír"];
	const pronounSuffixPre2 = ["iendo", "ando", "ar", "er", "ir"];

	const suffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(word, pronounSuffix);

	if (suffix !== "" && !morphologyData.wordsThatLookLikeButAreNot.notVerbsEndingInPersonalPronouns.includes(word)) {
		let preSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText.slice(0, -suffix.length), pronounSuffixPre1);

		if (preSuffix === "") {
			preSuffix = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText.slice(0, -suffix.length), pronounSuffixPre2);

			if (preSuffix !== "" || endsIn(word.slice(0, -suffix.length), "uyendo")) {
				word = word.slice(0, -suffix.length);
			}
		} else {
			word = removeAccent(word.slice(0, -suffix.length));
		}
	}

	if (word !== originalWord) {
		r1Text = word.slice(r1);
		r2Text = word.slice(r2);
		rvText = word.slice(rv);
	}

	const wordAfter0 = word;

	const suf1 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["anza", "anzas", "ico", "ica", "icos", "icas", "ismo", "ismos", "able", "ables", "ible", "ibles", "ista", "istas", "oso", "osa", "osos", "osas", "amiento", "amientos", "imiento", "imientos"]);
	const suf2 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["icadora", "icador", "icación", "icadoras", "icadores", "icaciones", "icante", "icantes", "icancia", "icancias", "adora", "ador", "ación", "adoras", "adores", "aciones", "ante", "antes", "ancia", "ancias"]);
	const suf3 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["logía", "logías"]);
	const suf4 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["ución", "uciones"]);
	const suf5 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["encia", "encias"]);
	const suf9 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["abilidad", "abilidades", "icidad", "icidades", "ividad", "ividades", "idad", "idades"]);
	const suf10 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(r2Text, ["ativa", "ativo", "ativas", "ativos", "iva", "ivo", "ivas", "ivos"]);

	if (suf1 !== "") {
		word = word.slice(0, -suf1.length);
	} else if (suf2 !== "") {
		word = word.slice(0, -suf2.length);
	} else if (suf3 !== "") {
		word = word.slice(0, -suf3.length) + "log";
	} else if (suf4 !== "") {
		word = word.slice(0, -suf4.length) + "u";
	} else if (suf5 !== "") {
		word = word.slice(0, -suf5.length) + "ente";
	} else if (suf9 !== "") {
		word = word.slice(0, -suf9.length);
	} else if (suf10 !== "") {
		word = word.slice(0, -suf10.length);
	}

	const ifMente = tryStemAsMente(word, r1Text, morphologyData.menteStemming);
	if (ifMente !== word) {
		return removeAccent(ifMente);
	}

	const ifSuperlative = tryStemAsSuperlative(word, r1Text, morphologyData.superlativesStemming);
	if (ifSuperlative !== word) {
		return removeAccent(ifSuperlative);
	}

	const ifDiminutive = tryStemAsDiminutive(word, morphologyData.diminutivesStemming);
	if (ifDiminutive !== word) {
		return removeAccent(ifDiminutive);
	}

	if (word !== wordAfter0) {
		rvText = word.slice(rv);
	}

	const wordAfter1 = word;

	const notVerbForms = morphologyData.wordsThatLookLikeButAreNot.notVerbForms;

	if (wordAfter0 === wordAfter1) {
		let wordWithoutS = word;
		if (word.endsWith("s")) {
			wordWithoutS = word.slice(0, -1);
		}

		if (notVerbForms.includes(wordWithoutS)) {
			word = wordWithoutS;
		} else {
			word = stemVerbSuffixes(word, wordAfter1, rvText, rv, morphologyData);
		}
	}

	rvText = word.slice(rv);

	const suf13 = (0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, ["os", "a", "o", "á", "í", "ó"]);
	if (suf13 !== "") {
		word = word.slice(0, -suf13.length);
	} else if ((0, _findMatchingEndingInArray.findMatchingEndingInArray)(rvText, ["e", "é"]) !== "") {
		word = word.slice(0, -1);
		rvText = word.slice(rv);
		if (endsIn(rvText, "u") && endsIn(word, "gu")) {
			word = word.slice(0, -1);
		}
	}

	const canonicalStem = canonicalizeStem(word, morphologyData.stemsThatBelongToOneWord);
	if (canonicalStem) {
		return canonicalStem;
	}

	return removeAccent(word);
}
