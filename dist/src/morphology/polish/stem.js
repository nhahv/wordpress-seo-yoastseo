"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

const endsInArr = function endsInArr(word, endings) {
	const matches = [];
	for (const i in endings) {
		if (word.endsWith(endings[i])) {
			matches.push(endings[i]);
		}
	}

	const longest = matches.sort(function (a, b) {
		return b.length - a.length;
	})[0];

	if (longest) {
		return longest;
	}
	return "";
};

const findSuffixInGroupAndStem = function findSuffixInGroupAndStem(word, wordLength, wordEndings, suffixLength) {
	if (word.length > wordLength) {
		const longestMatchedWordEnding = endsInArr(word, wordEndings);

		if (longestMatchedWordEnding !== "") {
			return word.slice(0, -suffixLength);
		}
	}
};

const findSuffixInClassAndStem = function findSuffixInClassAndStem(word, suffixClass) {
	for (const suffixGroup in suffixClass) {
		if (suffixClass.hasOwnProperty(suffixGroup)) {
			const wordShouldBeLongerThan = suffixClass[suffixGroup].wordShouldBeLongerThan;
			const wordEndings = suffixClass[suffixGroup].wordEndings;
			const suffixLength = suffixClass[suffixGroup].suffixLength;

			const stemmedWord = findSuffixInGroupAndStem(word, wordShouldBeLongerThan, wordEndings, suffixLength);

			if (stemmedWord) {
				return stemmedWord;
			}
		}
	}
};

const stemAdjectivesAndAdverbs = function stemAdjectivesAndAdverbs(word, ruleBasedStemmerData) {
	const stemmedWord = findSuffixInClassAndStem(word, ruleBasedStemmerData.adjectiveAndAdverbSuffixes);

	if (stemmedWord) {
		if (word.startsWith(ruleBasedStemmerData.superlativePrefix)) {
			return stemmedWord.slice(3);
		}
		return stemmedWord;
	}
};

function stem(word, morphologyData) {
	const ruleBasedStemmerData = morphologyData.externalStemmer;
	const dictionaryStemmer = morphologyData.dictionary.stems;

	let stemmedWord = dictionaryStemmer[word];
	if (stemmedWord) {
		word = stemmedWord;
	}

	word.toLowerCase();

	if (word.length < 4) {
		return word;
	}

	stemmedWord = findSuffixInClassAndStem(word, ruleBasedStemmerData.diminutiveSuffixes);

	if (!stemmedWord) {
		stemmedWord = findSuffixInClassAndStem(word, ruleBasedStemmerData.nounSuffixes);
	}

	if (!stemmedWord) {
		stemmedWord = findSuffixInClassAndStem(word, ruleBasedStemmerData.verbSuffixes);
	}

	if (!stemmedWord) {
		stemmedWord = stemAdjectivesAndAdverbs(word, ruleBasedStemmerData);
	}

	if (stemmedWord) {
		word = stemmedWord;
	}

	stemmedWord = findSuffixInClassAndStem(word, ruleBasedStemmerData.generalSuffixes);

	if (stemmedWord) {
		return stemmedWord;
	}

	return word;
}
