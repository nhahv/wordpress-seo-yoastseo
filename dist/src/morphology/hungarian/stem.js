"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

const isVowel = function isVowel(morphologyData, word) {
	const vowels = morphologyData.externalStemmer.vowels;
	const regex = new RegExp(vowels);
	return word.search(regex);
};

const consonantOrDigraphPosition = function consonantOrDigraphPosition(morphologyData, word) {
	const digraphRegex = new RegExp(morphologyData.externalStemmer.digraphs);
	const consonantRegex = new RegExp(morphologyData.externalStemmer.consonants);
	const digraphPosition = word.search(digraphRegex);
	const consonantPosition = word.search(consonantRegex);
	if (digraphPosition === consonantPosition) {
		return digraphPosition + 1;
	}
	return consonantPosition;
};

const findR1Position = function findR1Position(morphologyData, word) {
	const vowelPosition = isVowel(morphologyData, word);
	if (vowelPosition === 0) {
		const consonantOrDigraph = consonantOrDigraphPosition(morphologyData, word);
		return consonantOrDigraph + 1;
	}
	return vowelPosition + 1;
};

const stemSuffixes1 = function stemSuffixes1(word, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix = word.search(new RegExp(morphologyData.externalStemmer.suffixes1));
	if (suffix >= r1Position) {
		let wordAfterStemming = word.slice(0, -2);

		const doubleConsonantRegex = new RegExp(morphologyData.externalStemmer.doubleConsonants);
		const checkIfWordEndsOnDoubleConsonant = wordAfterStemming.search(doubleConsonantRegex);
		if (checkIfWordEndsOnDoubleConsonant !== -1) {
			wordAfterStemming = wordAfterStemming.slice(0, -1);
		}

		const tripleConsonantsRegex = new RegExp(morphologyData.externalStemmer.tripleDoubleConsonants);
		const checkIfWordEndsOnTripleDoubleConsonant = wordAfterStemming.search(tripleConsonantsRegex);
		if (checkIfWordEndsOnTripleDoubleConsonant !== -1) {
			wordAfterStemming = wordAfterStemming.slice(0, -2) + wordAfterStemming.charAt(wordAfterStemming.length - 1);
		}

		if (wordAfterStemming.length !== word.slice(0, -2).length) {
			return wordAfterStemming;
		}
	}
	return word;
};

const stemSuffixes2 = function stemSuffixes2(word, suffixes2, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix2 = word.search(new RegExp(suffixes2));
	if (suffix2 >= r1Position) {
		let wordAfterStemming = word.substring(0, suffix2);
		const checkIfWordEndsOnAccentedEorE = wordAfterStemming.endsWith("á") || wordAfterStemming.endsWith("é");
		if (checkIfWordEndsOnAccentedEorE) {
			wordAfterStemming = wordAfterStemming.replace(/á$/i, "a" || /é$/i, "e");
		}
		return wordAfterStemming;
	}
	return word;
};

const stemSuffixes3 = function stemSuffixes3(word, suffixes3, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix3a = word.search(new RegExp(suffixes3.suffixes3a));
	if (suffix3a >= r1Position) {
		return word.substring(0, suffix3a) + "a";
	}
	const suffix3b = word.search(new RegExp(suffixes3.suffixes3b));
	if (suffix3b >= r1Position) {
		return word.substring(0, suffix3b) + "e";
	}
	return word;
};

const stemSuffixes4 = function stemSuffixes4(word, suffixes4, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix4 = word.search(new RegExp(suffixes4));
	if (suffix4 >= r1Position) {
		return word.substring(0, suffix4);
	}
	return word;
};

const stemSuffixes5 = function stemSuffixes5(word, suffixes5, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix5a = word.search(new RegExp(suffixes5.suffixes5a));
	if (suffix5a >= r1Position) {
		return word.substring(0, suffix5a) + "a";
	}
	const suffix5b = word.search(new RegExp(suffixes5.suffixes5b));
	if (suffix5b >= r1Position) {
		return word.substring(0, suffix5b) + "e";
	}
	return word;
};

const stemSuffixes6 = function stemSuffixes6(word, suffixes6, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix6 = word.search(new RegExp(suffixes6));
	if (suffix6 >= r1Position) {
		let wordAfterStemming = word.slice(0, -1);
		const doubleConsonantRegex = new RegExp(morphologyData.externalStemmer.doubleConsonants);
		const checkIfWordEndsOnDoubleConsonant = wordAfterStemming.search(doubleConsonantRegex);
		if (checkIfWordEndsOnDoubleConsonant !== -1) {
			wordAfterStemming = wordAfterStemming.slice(0, -1);
		}
		return wordAfterStemming;
	}
	return word;
};

const stemSuffixes7 = function stemSuffixes7(word, suffixes7, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix7 = word.search(new RegExp(suffixes7));
	if (suffix7 >= r1Position) {
		return word.substring(0, suffix7);
	}
	return word;
};

const stemSuffixes8 = function stemSuffixes8(word, suffixes8, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix8a = word.search(new RegExp(suffixes8.suffixes8a));
	if (suffix8a >= r1Position) {
		return word.substring(0, suffix8a) + "a";
	}
	const suffix8b = word.search(new RegExp(suffixes8.suffixes8b));
	if (suffix8b >= r1Position) {
		return word.substring(0, suffix8b) + "e";
	}
	return word;
};

const stemSuffixes9 = function stemSuffixes9(word, suffixes9, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix9 = word.search(new RegExp(suffixes9));
	if (suffix9 >= r1Position) {
		return word.substring(0, suffix9);
	}
	return word;
};

const stemSuffixes10 = function stemSuffixes10(word, suffixes10, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix10 = word.search(new RegExp(suffixes10));
	if (suffix10 >= r1Position) {
		return word.substring(0, suffix10);
	}
	return word;
};

const stemSuffixes11 = function stemSuffixes11(word, suffixes11, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffixes11a = word.search(new RegExp(suffixes11.suffixes11a));
	if (suffixes11a >= r1Position) {
		return word.substring(0, suffixes11a) + "a";
	}
	const suffixes11b = word.search(new RegExp(suffixes11.suffixes11b));
	if (suffixes11b >= r1Position) {
		return word.substring(0, suffixes11b) + "e";
	}
	return word;
};

const stemSuffixes12 = function stemSuffixes12(word, suffixes12, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix12a = word.search(new RegExp(suffixes12.suffixes12a));
	if (suffix12a >= r1Position) {
		return word.substring(0, suffix12a) + "a";
	}
	const suffix12b = word.search(new RegExp(suffixes12.suffixes12b));
	if (suffix12b >= r1Position) {
		return word.substring(0, suffix12b) + "e";
	}
	return word;
};

const stemSuffixes13 = function stemSuffixes13(word, suffixes13, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix13a = word.search(new RegExp(suffixes13.suffixes13a));
	if (suffix13a >= r1Position) {
		return word.slice(0, -2) + "a";
	}
	const suffix13b = word.search(new RegExp(suffixes13.suffixes13b));
	if (suffix13b >= r1Position) {
		return word.slice(0, -2) + "e";
	}
	return word;
};

const stemSuffixes14 = function stemSuffixes14(word, suffixes14, morphologyData) {
	if (word.length < 3) {
		return word;
	}
	const r1Position = findR1Position(morphologyData, word);
	const suffix14 = word.search(new RegExp(suffixes14));
	if (suffix14 >= r1Position) {
		return word.substring(0, suffix14);
	}
	return word;
};

function stem(word, morphologyData) {
	const wordAfterSuffixes1 = stemSuffixes1(word, morphologyData);
	const wordAfterSuffixes2 = stemSuffixes2(wordAfterSuffixes1, morphologyData.externalStemmer.suffixes2, morphologyData);
	const wordAfterSuffixes3 = stemSuffixes3(wordAfterSuffixes2, morphologyData.externalStemmer.suffixes3, morphologyData);
	const wordAfterSuffixes4 = stemSuffixes4(wordAfterSuffixes3, morphologyData.externalStemmer.suffixes4, morphologyData);
	const wordAfterSuffixes5 = stemSuffixes5(wordAfterSuffixes4, morphologyData.externalStemmer.suffixes5, morphologyData);
	const wordAfterSuffixes6 = stemSuffixes6(wordAfterSuffixes5, morphologyData.externalStemmer.suffixes6, morphologyData);
	const wordAfterSuffixes7 = stemSuffixes7(wordAfterSuffixes6, morphologyData.externalStemmer.suffixes7, morphologyData);
	const wordAfterSuffixes8 = stemSuffixes8(wordAfterSuffixes7, morphologyData.externalStemmer.suffixes8, morphologyData);
	const wordAfterSuffixes9 = stemSuffixes9(wordAfterSuffixes8, morphologyData.externalStemmer.suffixes9, morphologyData);
	const wordAfterSuffixes10 = stemSuffixes10(wordAfterSuffixes9, morphologyData.externalStemmer.suffixes10, morphologyData);
	const wordAfterSuffixes11 = stemSuffixes11(wordAfterSuffixes10, morphologyData.externalStemmer.suffixes11, morphologyData);
	const wordAfterSuffixes12 = stemSuffixes12(wordAfterSuffixes11, morphologyData.externalStemmer.suffixes12, morphologyData);
	const wordAfterSuffixes13 = stemSuffixes13(wordAfterSuffixes12, morphologyData.externalStemmer.suffixes13, morphologyData);

	return stemSuffixes14(wordAfterSuffixes13, morphologyData.externalStemmer.suffixes14, morphologyData);
}
