"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

const matchWithRegexAndReplace = function matchWithRegexAndReplace(word, regexAndReplacement) {
	return word.replace(new RegExp(regexAndReplacement[0]), regexAndReplacement[1]);
};

const checkWordsWithRemovedLastLetter = function checkWordsWithRemovedLastLetter(word, morphologyData) {
	const externalStemmer = morphologyData.externalStemmer;
	const characters = externalStemmer.characters;

	if (externalStemmer.wordsWithLastAlefRemoved.includes(word)) {
		return word + characters.alef;
	}
	if (externalStemmer.wordsWithLastHamzaRemoved.includes(word)) {
		return word + characters.alef_hamza_above;
	}
	if (externalStemmer.wordsWithLastMaksoraRemoved.includes(word)) {
		return word + characters.yeh_maksorah;
	}
	if (externalStemmer.wordsWithLastYehRemoved.includes(word)) {
		return word + characters.yeh;
	}
};

const checkWordsWithRemovedFirstLetter = function checkWordsWithRemovedFirstLetter(word, morphologyData) {
	const externalStemmer = morphologyData.externalStemmer;
	const characters = externalStemmer.characters;

	if (externalStemmer.wordsWithFirstWawRemoved.includes(word)) {
		return characters.waw + word;
	}
	if (externalStemmer.wordsWithFirstYehRemoved.includes(word)) {
		return characters.yeh + word;
	}
};

const checkWordsWithRemovedMiddleLetter = function checkWordsWithRemovedMiddleLetter(word, morphologyData) {
	const externalStemmer = morphologyData.externalStemmer;
	const characters = externalStemmer.characters;

	if (externalStemmer.wordsWithMiddleWawRemoved.includes(word)) {
		return word[0] + characters.waw + word[1];
	}
	if (externalStemmer.wordsWithMiddleYehRemoved.includes(word)) {
		return word[0] + characters.yeh + word[1];
	}
};

const processTwoLetterWords = function processTwoLetterWords(word, morphologyData) {
	if (morphologyData.externalStemmer.wordsWithRemovedDuplicateLetter.includes(word)) {
		return word + word.substring(1);
	}

	const wordAfterLastLetterCheck = checkWordsWithRemovedLastLetter(word, morphologyData);
	if (wordAfterLastLetterCheck) {
		return wordAfterLastLetterCheck;
	}
	const wordAfterFirstLetterCheck = checkWordsWithRemovedFirstLetter(word, morphologyData);
	if (wordAfterFirstLetterCheck) {
		return wordAfterFirstLetterCheck;
	}
	const wordAfterMiddleLetterCheck = checkWordsWithRemovedMiddleLetter(word, morphologyData);
	if (wordAfterMiddleLetterCheck) {
		return wordAfterMiddleLetterCheck;
	}

	return word;
};

const processThreeLetterWordsWithWeakLetterOrHamza = function processThreeLetterWordsWithWeakLetterOrHamza(word, morphologyData, replacementPattern, functionToRunToGetRoot) {
	const wordAfterRemovingWeakLetterOrHamza = word.replace(new RegExp(replacementPattern[0]), replacementPattern[1]);
	if (wordAfterRemovingWeakLetterOrHamza !== word) {
		return functionToRunToGetRoot(wordAfterRemovingWeakLetterOrHamza, morphologyData);
	}
};

const processThreeLetterWords = function processThreeLetterWords(word, morphologyData) {
	const characters = morphologyData.externalStemmer.characters;

	if (morphologyData.externalStemmer.threeLetterRoots.includes(word)) {
		return word;
	}

	if (word[0] === characters.alef || word[0] === characters.waw_hamza || word[0] === characters.yeh_hamza) {
		word = characters.alef_hamza_above + word.slice(1);
	}

	const wordAfterLastWeakLetterOrHamzaCheck = processThreeLetterWordsWithWeakLetterOrHamza(word, morphologyData, morphologyData.externalStemmer.regexRemoveLastWeakLetterOrHamza, checkWordsWithRemovedLastLetter);
	if (wordAfterLastWeakLetterOrHamzaCheck) {
		return wordAfterLastWeakLetterOrHamzaCheck;
	}

	const wordAfterMiddleWeakLetterOrHamzaCheck = processThreeLetterWordsWithWeakLetterOrHamza(word, morphologyData, morphologyData.externalStemmer.regexRemoveMiddleWeakLetterOrHamza, checkWordsWithRemovedMiddleLetter);
	if (wordAfterMiddleWeakLetterOrHamzaCheck) {
		return wordAfterMiddleWeakLetterOrHamzaCheck;
	}

	const regexReplaceMiddleLetterWithAlef = morphologyData.externalStemmer.regexReplaceMiddleLetterWithAlef;
	const regexReplaceMiddleLetterWithAlefWithHamza = morphologyData.externalStemmer.regexReplaceMiddleLetterWithAlefWithHamza;

	const wordAfterReplacingMiddleLetterWithAlef = word.replace(new RegExp(regexReplaceMiddleLetterWithAlef[0]), regexReplaceMiddleLetterWithAlef[1]);
	if (wordAfterReplacingMiddleLetterWithAlef === word) {
		word = word.replace(new RegExp(regexReplaceMiddleLetterWithAlefWithHamza[0]), regexReplaceMiddleLetterWithAlefWithHamza[1]);
	} else {
		word = wordAfterReplacingMiddleLetterWithAlef;
	}

	const regexRemoveShaddaAndDuplicateLastLetter = morphologyData.externalStemmer.regexRemoveShaddaAndDuplicateLastLetter;
	word = word.replace(new RegExp(regexRemoveShaddaAndDuplicateLastLetter[0]), regexRemoveShaddaAndDuplicateLastLetter[1]);

	return word;
};

const checkFirstPatternAndGetRoot = function checkFirstPatternAndGetRoot(word, numberSameLetters, morphologyData) {
	if (word.length === 6 && word[3] === word[5] && numberSameLetters === 2) {
		return processThreeLetterWords(word.substring(1, 4), morphologyData);
	}
	return word;
};

const checkSecondPatternAndGetRoot = function checkSecondPatternAndGetRoot(word, pattern, numberSameLetters, morphologyData) {
	const characters = morphologyData.externalStemmer.characters;

	if (word.length - 3 <= numberSameLetters) {
		let root = "";
		for (let i = 0; i < word.length; i++) {
			if (pattern[i] === characters.feh || pattern[i] === characters.aen || pattern[i] === characters.lam) {
				root = root.concat(word[i]);
			}
		}
		if (root.length === 3) {
			return processThreeLetterWords(root, morphologyData);
		}
	}
	return word;
};

const countSharedLettersBetweenWordAndPattern = function countSharedLettersBetweenWordAndPattern(word, pattern, morphologyData) {
	const characters = morphologyData.externalStemmer.characters;

	let numberSameLetters = 0;
	for (let i = 0; i < word.length; i++) {
		if (pattern[i] === word[i] && pattern[i] !== characters.feh && pattern[i] !== characters.aen && pattern[i] !== characters.lam) {
			numberSameLetters++;
		}
	}
	return numberSameLetters;
};

const checkPatterns = function checkPatterns(word, morphologyData) {
	const wordAfterModification = matchWithRegexAndReplace(word, morphologyData.externalStemmer.regexReplaceFirstHamzaWithAlef);

	for (const pattern of morphologyData.externalStemmer.patterns) {
		if (pattern.length === wordAfterModification.length) {
			const numberSameLetters = countSharedLettersBetweenWordAndPattern(wordAfterModification, pattern, morphologyData);

			const wordAfterCheckingFirstPattern = checkFirstPatternAndGetRoot(wordAfterModification, numberSameLetters, morphologyData);
			if (wordAfterCheckingFirstPattern !== wordAfterModification) {
				return { word: wordAfterCheckingFirstPattern, rootFound: true };
			}

			const wordAfterCheckingSecondPattern = checkSecondPatternAndGetRoot(wordAfterModification, pattern, numberSameLetters, morphologyData);
			if (wordAfterCheckingSecondPattern !== wordAfterModification) {
				return { word: wordAfterCheckingSecondPattern, rootFound: true };
			}
		}
	}

	if (wordAfterModification !== word) {
		return { word: wordAfterModification, rootFound: false };
	}
};

const checkIfWordIsRoot = function checkIfWordIsRoot(word, morphologyData) {
	if (word.length === 2) {
		return processTwoLetterWords(word, morphologyData);
	}

	if (word.length === 3) {
		if (morphologyData.externalStemmer.threeLetterRoots.includes(word)) {
			return word;
		}

		const wordAfterThreeLetterProcessing = processThreeLetterWords(word, morphologyData);
		if (wordAfterThreeLetterProcessing) {
			return wordAfterThreeLetterProcessing;
		}
	}

	if (word.length === 4) {
		if (morphologyData.externalStemmer.fourLetterRoots.includes(word)) {
			return word;
		}
	}
};

const removeSuffix = function removeSuffix(word, suffixes) {
	for (const suffix of suffixes) {
		if (word.endsWith(suffix)) {
			return word.slice(0, -suffix.length);
		}
	}
	return word;
};

const removePrefix = function removePrefix(word, prefixes) {
	for (const prefix of prefixes) {
		if (word.startsWith(prefix)) {
			return word.substring(prefix.length, word.length);
		}
	}
	return word;
};

const processWordWithSuffix = function processWordWithSuffix(word, morphologyData) {
	if (word.length <= 3) {
		return null;
	}

	const wordAfterRemovingSuffix = removeSuffix(word, morphologyData.externalStemmer.suffixes);
	if (wordAfterRemovingSuffix !== word) {
		const root = checkIfWordIsRoot(wordAfterRemovingSuffix, morphologyData);
		if (root) {
			return { word: root, rootFound: true };
		}

		if (word.length > 2) {
			const outputAfterCheckingPatterns = checkPatterns(wordAfterRemovingSuffix, morphologyData);
			if (outputAfterCheckingPatterns) {
				return outputAfterCheckingPatterns;
			}
		}
	}
};

const processWordWithPrefix = function processWordWithPrefix(word, morphologyData) {
	if (word.length <= 3) {
		return null;
	}

	let wordAfterRemovingPrefix = removePrefix(word, morphologyData.externalStemmer.prefixes);
	if (wordAfterRemovingPrefix !== word) {
		const root = checkIfWordIsRoot(wordAfterRemovingPrefix, morphologyData);
		if (root) {
			return { word: root, rootFound: true };
		}

		if (wordAfterRemovingPrefix.length > 2) {
			const outputAfterCheckingPatterns = checkPatterns(wordAfterRemovingPrefix, morphologyData);
			if (outputAfterCheckingPatterns) {
				if (outputAfterCheckingPatterns.rootFound === true) {
					return outputAfterCheckingPatterns;
				}
				wordAfterRemovingPrefix = outputAfterCheckingPatterns.word;
			}
		}

		const outputAfterCheckingForSuffixes = processWordWithSuffix(wordAfterRemovingPrefix, morphologyData);
		if (outputAfterCheckingForSuffixes) {
			return outputAfterCheckingForSuffixes;
		}
	}
};

const findRoot = function findRoot(word, morphologyData) {
	const root = checkIfWordIsRoot(word, morphologyData);
	if (root) {
		return { word: root, rootFound: true };
	}
	if (word.length > 2) {
		const outputAfterCheckingPatterns = checkPatterns(word, morphologyData);
		if (outputAfterCheckingPatterns) {
			if (outputAfterCheckingPatterns.rootFound === true) {
				return outputAfterCheckingPatterns;
			}
			word = outputAfterCheckingPatterns.word;
		}
	}

	const outputAfterProcessingSuffix = processWordWithSuffix(word, morphologyData);
	if (outputAfterProcessingSuffix) {
		if (outputAfterProcessingSuffix.rootFound === true) {
			return outputAfterProcessingSuffix;
		}
		word = outputAfterProcessingSuffix.word;
	}
	const outputAfterRemovingPrefix = processWordWithPrefix(word, morphologyData);
	if (outputAfterRemovingPrefix) {
		return outputAfterRemovingPrefix;
	}
};

const processWordWithDefiniteArticle = function processWordWithDefiniteArticle(word, morphologyData) {
	let wordAfterRemovingDefiniteArticle = removePrefix(word, morphologyData.externalStemmer.definiteArticles);

	if (wordAfterRemovingDefiniteArticle !== word) {
		const outputAfterTryingToFindRoot = findRoot(wordAfterRemovingDefiniteArticle, morphologyData);
		if (outputAfterTryingToFindRoot) {
			if (outputAfterTryingToFindRoot.rootFound === true) {
				return outputAfterTryingToFindRoot;
			}
			wordAfterRemovingDefiniteArticle = outputAfterTryingToFindRoot.word;
		}

		if (wordAfterRemovingDefiniteArticle > 3) {
			return { word: wordAfterRemovingDefiniteArticle, rootFound: false };
		}
	}
};

const processWordWithPrefixWaw = function processWordWithPrefixWaw(word, morphologyData) {
	let wordAfterRemovingWaw = "";
	if (word.length > 3 && word.startsWith(morphologyData.externalStemmer.characters.waw)) {
		wordAfterRemovingWaw = word.substring(1);

		const outputAfterTryingToFindRoot = findRoot(wordAfterRemovingWaw, morphologyData);
		if (outputAfterTryingToFindRoot) {
			return outputAfterTryingToFindRoot;
		}
	}
};

function stem(word, morphologyData) {
	const regexRemovingDiacritics = morphologyData.externalStemmer.regexRemovingDiacritics;
	word.replace(new RegExp(regexRemovingDiacritics), "");

	const root = checkIfWordIsRoot(word, morphologyData);
	if (root) {
		return root;
	}

	const outputAfterCheckingPatterns = checkPatterns(word, morphologyData);
	if (outputAfterCheckingPatterns) {
		if (outputAfterCheckingPatterns.rootFound === true) {
			return outputAfterCheckingPatterns.word;
		}

		word = outputAfterCheckingPatterns.word;
	}

	const outputAfterProcessingDefiniteArticle = processWordWithDefiniteArticle(word, morphologyData);
	if (outputAfterProcessingDefiniteArticle) {
		if (outputAfterProcessingDefiniteArticle.rootFound === true) {
			return outputAfterProcessingDefiniteArticle.word;
		}


		word = outputAfterProcessingDefiniteArticle.word;
	}

	const outputAfterProcessingPrefixWaw = processWordWithPrefixWaw(word, morphologyData);
	if (outputAfterProcessingPrefixWaw) {
		if (outputAfterProcessingPrefixWaw.rootFound === true) {
			return outputAfterProcessingPrefixWaw.word;
		}

		word = outputAfterProcessingPrefixWaw.word;
	}

	const outputAfterProcessingSuffix = processWordWithSuffix(word, morphologyData);
	if (outputAfterProcessingSuffix) {
		if (outputAfterProcessingSuffix.rootFound === true) {
			return outputAfterProcessingSuffix.word;
		}

		word = outputAfterProcessingSuffix.word;
	}

	const wordAfterProcessingPrefix = processWordWithPrefix(word, morphologyData);
	if (wordAfterProcessingPrefix) {
		return wordAfterProcessingPrefix.word;
	}

	return word;
}
