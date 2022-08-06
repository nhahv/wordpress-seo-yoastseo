"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.checkIfWordEndingIsOnExceptionList = checkIfWordEndingIsOnExceptionList;
exports.checkIfWordIsOnVerbExceptionList = checkIfWordIsOnVerbExceptionList;
exports.checkExceptionListWithTwoStems = checkExceptionListWithTwoStems;

var _flattenSortLength = require("../morphoHelpers/flattenSortLength");

function checkIfWordEndingIsOnExceptionList(word, exceptionList) {
	for (let i = 0; i < exceptionList.length; i++) {
		if (word.endsWith(exceptionList[i])) {
			return true;
		}
	}
	return false;
}

function checkIfWordIsOnVerbExceptionList(word, exceptionList, compoundVerbPrefixes) {
	const prefixes = (0, _flattenSortLength.flattenSortLength)(compoundVerbPrefixes);

	const foundPrefix = prefixes.find(prefix => word.startsWith(prefix));
	let stemmedWordWithoutPrefix = "";

	if (typeof foundPrefix === "string") {
		stemmedWordWithoutPrefix = word.slice(foundPrefix.length);

		if (stemmedWordWithoutPrefix.length > 2) {
			word = stemmedWordWithoutPrefix;
		}
	}

	return exceptionList.includes(word);
}

function checkExceptionListWithTwoStems(exceptionListWithTwoStems, word) {
	for (const stemSet of exceptionListWithTwoStems) {
		const foundStem = stemSet.find(stemWord => word.endsWith(stemWord));
		if (foundStem) {
			const precedingLexicalMaterial = word.slice(0, word.length - foundStem.length);

			return precedingLexicalMaterial + stemSet[0];
		}
	}
}
