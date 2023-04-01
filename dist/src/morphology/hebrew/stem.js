"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

const removePrefix = function removePrefix(word, prefixes) {
	if (prefixes.some(prefix => word.startsWith(prefix))) {
		return word.slice(1);
	}
	return word;
};

function stem(word, morphologyData) {
	const dictionaryStemmer = morphologyData.dictionary;

	let stemmedWord = dictionaryStemmer[word];
	if (stemmedWord) {
		return stemmedWord;
	}

	const wordAfterRemovingPrefix = removePrefix(word, morphologyData.prefixes);
	if (wordAfterRemovingPrefix !== word) {
		stemmedWord = dictionaryStemmer[wordAfterRemovingPrefix];
		if (stemmedWord) {
			return stemmedWord;
		}

		const wordAfterRemovingSecondPrefix = removePrefix(wordAfterRemovingPrefix, morphologyData.prefixes);
		if (wordAfterRemovingSecondPrefix !== wordAfterRemovingPrefix) {
			stemmedWord = dictionaryStemmer[wordAfterRemovingSecondPrefix];
			if (stemmedWord) {
				return stemmedWord;
			}
		}
	}
	return word;
}
