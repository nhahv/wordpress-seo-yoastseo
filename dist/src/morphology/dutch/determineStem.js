"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.determineStem = determineStem;

var _flattenSortLength = require("../morphoHelpers/flattenSortLength");

var _lodashEs = require("lodash-es");

var _stem = require("./stem");

var _stem2 = _interopRequireDefault(_stem);

var _stemTOrDFromEndOfWord = require("./stemTOrDFromEndOfWord");

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkStrongVerbExceptionList = function checkStrongVerbExceptionList(strongVerbsLists, stemmedWord) {
	for (const key of Object.keys(strongVerbsLists)) {
		for (const stemsSet of strongVerbsLists[key]) {
			const stems = (0, _lodashEs.flatten)(Object.values(stemsSet));
			if (stems.includes(stemmedWord)) {
				return stems[0];
			}
		}
	}
};

const findStemOnVerbExceptionList = function findStemOnVerbExceptionList(morphologyDataNL, stemmedWord) {
	const prefixes = (0, _flattenSortLength.flattenSortLength)(morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes);

	let foundPrefix = prefixes.find(prefix => stemmedWord.startsWith(prefix));
	const doNotStemPrefix = morphologyDataNL.stemExceptions.stemmingExceptionsWithMultipleStems.strongAndIrregularVerbs.doNotStemPrefix;
	const doNotStemPrefixException = doNotStemPrefix.find(exception => stemmedWord.endsWith(exception));
	let stemmedWordWithoutPrefix = "";

	if (doNotStemPrefixException) {
		foundPrefix = null;
	} else if (foundPrefix) {
		stemmedWordWithoutPrefix = stemmedWord.slice(foundPrefix.length, stemmedWord.length);

		if (stemmedWordWithoutPrefix.length > 2) {
			stemmedWord = stemmedWordWithoutPrefix;
		} else {
			foundPrefix = null;
		}
	}

	const strongVerbExceptions = morphologyDataNL.stemExceptions.stemmingExceptionsWithMultipleStems.strongAndIrregularVerbs.strongVerbStems;

	const strongVerbsExceptionLists = [strongVerbExceptions.irregularStrongVerbs, strongVerbExceptions.regularStrongVerbs, strongVerbExceptions.bothRegularAndIrregularStrongVerbs];
	for (let i = 0; i < strongVerbsExceptionLists.length; i++) {
		const checkIfWordIsException = checkStrongVerbExceptionList(strongVerbsExceptionLists[i], stemmedWord);
		if (checkIfWordIsException) {
			if (foundPrefix) {
				return foundPrefix + checkStrongVerbExceptionList(strongVerbsExceptionLists[i], stemmedWord);
			}

			return checkStrongVerbExceptionList(strongVerbsExceptionLists[i], stemmedWord);
		}
	}
};

function determineStem(word, morphologyDataNL) {
	const stemmedWord = (0, _stem2.default)(word, morphologyDataNL);

	let stemFromExceptionList = (0, _exceptionListHelpers.checkExceptionListWithTwoStems)(morphologyDataNL.stemExceptions.stemmingExceptionsWithMultipleStems.stemmingExceptionsWithTwoStems, stemmedWord);
	if (stemFromExceptionList) {
		return stemFromExceptionList;
	}
	stemFromExceptionList = findStemOnVerbExceptionList(morphologyDataNL, stemmedWord);
	if (stemFromExceptionList) {
		return stemFromExceptionList;
	}

	const ambiguousEndings = morphologyDataNL.ambiguousTAndDEndings.tAndDEndings;
	for (const ending of ambiguousEndings) {
		if (stemmedWord.endsWith(ending)) {
			const stemmedWordWithoutTOrD = (0, _stemTOrDFromEndOfWord.stemTOrDFromEndOfWord)(morphologyDataNL, stemmedWord, word);
			if (stemmedWordWithoutTOrD) {
				return stemmedWordWithoutTOrD;
			}
		}
	}

	return stemmedWord;
}
