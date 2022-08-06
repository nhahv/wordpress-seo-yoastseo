"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (morphologyDataNL, word) {
	const exceptionListWithFullForms = morphologyDataNL.stemExceptions.stemmingExceptionStemsWithFullForms;

	let stem = checkVerbFullFormsList(word, exceptionListWithFullForms.verbs, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes);
	if (stem) {
		return stem;
	}

	stem = checkEndingMatchFullFormsList(word, exceptionListWithFullForms.endingMatch);
	if (stem) {
		return stem;
	}

	stem = checkExactMatchFullFormsList(word, exceptionListWithFullForms.exactMatch);
	if (stem) {
		return stem;
	}

	return null;
};

var _lodashEs = require("lodash-es");

var _flattenSortLength = require("./flattenSortLength");

const checkVerbFullFormsList = function checkVerbFullFormsList(word, verbFullFormsList, compoundVerbPrefixes) {
	const prefixes = (0, _flattenSortLength.flattenSortLength)(compoundVerbPrefixes);

	const foundPrefix = prefixes.find(prefix => word.startsWith(prefix));

	if (typeof foundPrefix === "string") {
		word = word.slice(foundPrefix.length);
	}

	for (let i = 0; i < verbFullFormsList.length; i++) {
		const stemAndForms = (0, _lodashEs.flatten)(verbFullFormsList[i]);
		for (let j = 0; j < stemAndForms.length; j++) {
			if (stemAndForms.includes(word)) {
				if (typeof foundPrefix === "string") {
					return foundPrefix + stemAndForms[0];
				}
				return stemAndForms[0];
			}
		}
	}
	return null;
};

const checkEndingMatchFullFormsList = function checkEndingMatchFullFormsList(word, endingMatchFullFormsList) {
	for (let i = 0; i < endingMatchFullFormsList.length; i++) {
		const stemAndForms = (0, _lodashEs.flatten)(endingMatchFullFormsList[i]);
		for (let j = 0; j < stemAndForms.length; j++) {
			if (word.endsWith(stemAndForms[j])) {
				const precedingLexicalMaterial = word.slice(0, -stemAndForms[j].length);

				if (precedingLexicalMaterial.length === 1) {
					return null;
				}

				if (precedingLexicalMaterial.length > 1) {
					return precedingLexicalMaterial + stemAndForms[0];
				}
				return stemAndForms[0];
			}
		}
	}
	return null;
};

const checkExactMatchFullFormsList = function checkExactMatchFullFormsList(word, exactMatchFullFormsList) {
	for (let i = 0; i < exactMatchFullFormsList.length; i++) {
		const stemAndForms = (0, _lodashEs.flatten)(exactMatchFullFormsList[i]);
		for (let j = 0; j < stemAndForms.length; j++) {
			if (stemAndForms.includes(word)) {
				return stemAndForms[0];
			}
		}
	}
	return null;
};
