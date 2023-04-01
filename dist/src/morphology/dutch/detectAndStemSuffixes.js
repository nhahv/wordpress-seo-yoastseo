"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = detectAndStemSuffixes;

var _stemModificationHelpers = require("./stemModificationHelpers");

const determineR1 = function determineR1(word) {
	let r1Index = word.search(/[aeiouyèäüëïöáéíóú][^aeiouyèäüëïöáéíóú]/);

	if (r1Index !== -1) {
		r1Index += 2;
	}

	if (r1Index !== -1 && r1Index < 3) {
		r1Index = 3;
	}

	return r1Index;
};

const findSuffix = function findSuffix(word, suffixStep, r1Index) {
	for (const suffixClass in suffixStep) {
		if (suffixStep.hasOwnProperty(suffixClass)) {
			const suffixes = suffixStep[suffixClass].suffixes;

			const matchedRegex = suffixes.find(suffixRegex => new RegExp(suffixRegex).exec(word));

			if (matchedRegex) {
				const matched = new RegExp(matchedRegex).exec(word);
				const suffix = matched[matched.length - 1];
				const suffixIndex = word.lastIndexOf(suffix);

				if (r1Index !== -1 && suffixIndex >= r1Index) {
					return {
						suffixIndex: suffixIndex,
						stemModification: suffixStep[suffixClass].stemModification
					};
				}
			}
		}
	}
};

const deleteSuffixAndModifyStem = function deleteSuffixAndModifyStem(word, suffixStep, suffixIndex, stemModification, morphologyDataNL) {
	if (stemModification === "hedenToHeid") {
		return (0, _stemModificationHelpers.modifyStem)(word, morphologyDataNL.regularStemmer.stemModifications.hedenToHeid);
	}
	word = word.substring(0, suffixIndex);
	if (stemModification === "changeIedtoId") {
		return (0, _stemModificationHelpers.modifyStem)(word, morphologyDataNL.regularStemmer.stemModifications.iedToId);
	} else if (stemModification === "changeInktoIng" && word.endsWith("ink")) {
		return (0, _stemModificationHelpers.modifyStem)(word, morphologyDataNL.regularStemmer.stemModifications.inkToIng);
	} else if (stemModification === "vowelDoubling" && (0, _stemModificationHelpers.isVowelDoublingAllowed)(word, morphologyDataNL.regularStemmer.stemModifications.exceptionsStemModifications, morphologyDataNL.pastParticipleStemmer.compoundVerbsPrefixes)) {
		return (0, _stemModificationHelpers.modifyStem)(word, morphologyDataNL.regularStemmer.stemModifications.doubleVowel);
	}
	return word;
};

const findAndDeleteSuffix = function findAndDeleteSuffix(word, suffixStep, r1Index, morphologyDataNL) {
	const foundSuffix = findSuffix(word, suffixStep, r1Index);
	if (typeof foundSuffix !== "undefined") {
		word = deleteSuffixAndModifyStem(word, suffixStep, foundSuffix.suffixIndex, foundSuffix.stemModification, morphologyDataNL);
	}

	return word;
};

const findAndDeleteSuffixes = function findAndDeleteSuffixes(word, suffixSteps, r1Index, morphologyDataNL) {
	for (const suffixStep in suffixSteps) {
		if (suffixSteps.hasOwnProperty(suffixStep)) {
			word = findAndDeleteSuffix(word, suffixSteps[suffixStep], r1Index, morphologyDataNL);
		}
	}

	return word;
};

function detectAndStemSuffixes(word, morphologyDataNL) {
	word = (0, _stemModificationHelpers.modifyStem)(word, morphologyDataNL.regularStemmer.stemModifications.IAndYToUppercase);

	const r1Index = determineR1(word);

	const suffixSteps = morphologyDataNL.regularStemmer.suffixes;

	word = findAndDeleteSuffixes(word, suffixSteps, r1Index, morphologyDataNL);

	return (0, _stemModificationHelpers.modifyStem)(word, morphologyDataNL.regularStemmer.stemModifications.finalChanges);
}
