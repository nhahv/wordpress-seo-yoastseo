"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = stem;

var _exceptionListHelpers = require("../morphoHelpers/exceptionListHelpers");

var _regexHelpers = require("../morphoHelpers/regexHelpers");

const determineRs = function determineRs(word, rIntervalsData) {
	let rvIndex = -1;

	if (word.search(new RegExp(rIntervalsData.rvRegex1)) !== -1 || word.search(new RegExp(rIntervalsData.rvRegex2)) !== -1) {
		rvIndex = 3;
	} else {
		rvIndex = word.substring(1).search(new RegExp(rIntervalsData.rvRegex3));

		if (rvIndex === -1) {
			rvIndex = word.length;
		} else {
			rvIndex += 2;
		}
	}

	const r1Regex = new RegExp(rIntervalsData.r1Regex);
	let r1Index = word.search(r1Regex);
	let r1 = "";
	if (r1Index === -1) {
		r1Index = word.length;
	} else {
		r1Index += 2;
		r1 = word.substring(r1Index);
	}

	let r2Index = -1;
	if (r1Index !== -1) {
		r2Index = r1.search(r1Regex);
		if (r2Index === -1) {
			r2Index = word.length;
		} else {
			r2Index += 2;
			r2Index += r1Index;
		}
	}
	if (r1Index !== -1 && r1Index < 3) {
		r1Index = 3;
	}

	return [r1Index, r2Index, rvIndex];
};

const processStandardSuffixes = function processStandardSuffixes(word, standardSuffixData, r1Index, r2Index, rvIndex) {
	const a1Index = word.search(new RegExp(standardSuffixData.standardSuffixes1)),
	      a2Index = word.search(new RegExp(standardSuffixData.standardSuffixes2)),
	      a3Index = word.search(new RegExp(standardSuffixData.standardSuffixes3[0])),
	      a4Index = word.search(new RegExp(standardSuffixData.standardSuffixes4[0])),
	      a5Index = word.search(new RegExp(standardSuffixData.standardSuffixes5[0])),
	      a6Index = word.search(new RegExp(standardSuffixData.standardSuffixes6)),
	      a7Index = word.search(new RegExp(standardSuffixData.standardSuffixes7)),
	      a8Index = word.search(new RegExp(standardSuffixData.standardSuffixes8)),
	      a9Index = word.search(new RegExp(standardSuffixData.standardSuffixes9[0])),
	      a10Index = word.search(new RegExp(standardSuffixData.standardSuffixes10[0])),
	      a11Index = word.search(new RegExp(standardSuffixData.standardSuffixes11[0])),
	      a12Index = word.search(new RegExp(standardSuffixData.standardSuffixes12)),
	      a13Index = word.search(new RegExp(standardSuffixData.standardSuffixes13[0])),
	      a14Index = word.search(new RegExp(standardSuffixData.standardSuffixes14[0])),
	      a15Index = word.search(new RegExp(standardSuffixData.standardSuffixes15));

	if (a1Index !== -1 && a1Index >= r2Index) {
		word = word.substring(0, a1Index);
	} else if (a2Index !== -1 && a2Index >= r2Index) {
		word = word.substring(0, a2Index);
		const a2Index2 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar1[0]));

		if (a2Index2 !== -1 && a2Index2 >= r2Index) {
			word = word.substring(0, a2Index2);
		} else {
			word = word.replace(new RegExp(standardSuffixData.suffixesPrecedingChar1[0]), standardSuffixData.suffixesPrecedingChar1[1]);
		}
	} else if (a3Index !== -1 && a3Index >= r2Index) {
		word = word.slice(0, a3Index) + standardSuffixData.standardSuffixes3[1];
	} else if (a4Index !== -1 && a4Index >= r2Index) {
		word = word.slice(0, a4Index) + standardSuffixData.standardSuffixes4[1];
	} else if (a5Index !== -1 && a5Index >= r2Index) {
		word = word.slice(0, a5Index) + standardSuffixData.standardSuffixes5[1];
	} else if (a12Index !== -1 && a12Index >= r1Index) {
		word = word.substring(0, a12Index + 1);
	} else if (a6Index !== -1 && a6Index >= rvIndex) {
		word = word.substring(0, a6Index);

		const precedingCharacter2 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar2[0]));
		const a6Index2 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar4[0]));
		const precedingCharacter5 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar5[0]));
		const precedingCharacter6 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar6[0]));
		if (precedingCharacter2 >= r2Index) {
			word = word.slice(0, precedingCharacter2) + standardSuffixData.suffixesPrecedingChar2[1];

			const precedingCharacter3 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar3[0]));
			if (precedingCharacter3 >= r2Index) {
				word = word.slice(0, precedingCharacter3) + standardSuffixData.suffixesPrecedingChar3[1];
			}
		} else if (word.search(new RegExp(standardSuffixData.suffixesPrecedingChar4[0])) !== -1) {
			if (a6Index2 >= r2Index) {
				word = word.substring(0, a6Index2);
			} else if (a6Index2 >= r1Index) {
				word = word.substring(0, a6Index2) + standardSuffixData.suffixesPrecedingChar4[1];
			}
		} else if (precedingCharacter5 >= r2Index) {
			word = word.slice(0, precedingCharacter5) + standardSuffixData.suffixesPrecedingChar5[1];
		} else if (precedingCharacter6 >= rvIndex) {
			word = word.slice(0, precedingCharacter6) + standardSuffixData.suffixesPrecedingChar6[1];
		}
	} else if (a7Index !== -1 && a7Index >= r2Index) {
		word = word.substring(0, a7Index);

		const a7Index2 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar7[0]));
		const a7Index3 = word.search(new RegExp(standardSuffixData.suffixesPrecedingChar1[0]));
		if (a7Index2 !== -1) {
			if (a7Index2 >= r2Index) {
				word = word.substring(0, a7Index2);
			} else {
				word = word.substring(0, a7Index2) + standardSuffixData.suffixesPrecedingChar7[1];
			}
		} else if (a7Index3 !== -1) {
			if (a7Index3 !== -1 && a7Index3 >= r2Index) {
				word = word.substring(0, a7Index3);
			} else {
				word = word.substring(0, a7Index3) + standardSuffixData.suffixesPrecedingChar1[1];
			}
		} else if (word.search(new RegExp(standardSuffixData.suffixesPrecedingChar2[0])) !== r2Index) {
			word = word.replace(new RegExp(standardSuffixData.suffixesPrecedingChar2[0]), standardSuffixData.suffixesPrecedingChar2[1]);
		}
	} else if (a8Index !== -1 && a8Index >= r2Index) {
		word = word.substring(0, a8Index);

		if (word.search(new RegExp(standardSuffixData.suffixesPrecedingChar3[0])) >= r2Index) {
			word = word.replace(new RegExp(standardSuffixData.suffixesPrecedingChar3[0]), standardSuffixData.suffixesPrecedingChar3[1]);

			if (word.search(new RegExp(standardSuffixData.suffixesPrecedingChar1[0])) >= r2Index) {
				word = word.replace(new RegExp(standardSuffixData.suffixesPrecedingChar1[0]), "");
			} else {
				word = word.replace(new RegExp(standardSuffixData.suffixesPrecedingChar1[0]), standardSuffixData.suffixesPrecedingChar1[1]);
			}
		}
	} else if (a9Index !== -1) {
		word = word.replace(new RegExp(standardSuffixData.standardSuffixes9[0]), standardSuffixData.standardSuffixes9[1]);
	} else if (a10Index >= r1Index) {
		word = word.replace(new RegExp(standardSuffixData.standardSuffixes10[0]), standardSuffixData.standardSuffixes10[1]);
	} else if (a11Index !== -1) {
		const a11Index2 = word.search(new RegExp(standardSuffixData.standardSuffixes11[0]));

		if (a11Index2 >= r2Index) {
			word = word.substring(0, a11Index2);
		} else if (a11Index2 >= r1Index) {
			word = word.substring(0, a11Index2) + standardSuffixData.standardSuffixes11[1];
		}
	} else if (a13Index !== -1 && a13Index >= rvIndex) {
		word = word.replace(new RegExp(standardSuffixData.standardSuffixes13[0]), standardSuffixData.standardSuffixes13[1]);
	} else if (a14Index !== -1 && a14Index >= rvIndex) {
		word = word.replace(new RegExp(standardSuffixData.standardSuffixes14[0]), standardSuffixData.standardSuffixes14[1]);
	} else if (a15Index !== -1 && a15Index >= rvIndex) {
		word = word.substring(0, a15Index + 1);
	}

	return word;
};

const removeVerbSuffixesStartingWithI = function removeVerbSuffixesStartingWithI(word, originalWord, rvIndex, verbSuffixesWithIBeginning) {
	let step2aDone = false;
	if (originalWord === word.toLowerCase() || (0, _exceptionListHelpers.checkIfWordEndingIsOnExceptionList)(originalWord, verbSuffixesWithIBeginning.exceptions)) {
		step2aDone = true;

		const b1Regex = new RegExp(verbSuffixesWithIBeginning.suffixes[0]);
		if (word.search(b1Regex) >= rvIndex) {
			word = word.replace(b1Regex, verbSuffixesWithIBeginning.suffixes[1]);
		}
	}

	return { word, step2aDone };
};

const removeOtherVerbSuffixes = function removeOtherVerbSuffixes(word, step2aDone, wordAfterStep1, r2Index, rvIndex, morphologyData) {
	const otherVerbSuffixes = morphologyData.regularStemmer.otherVerbSuffixes;

	if (step2aDone && wordAfterStep1 === word) {
		const suffixIons = new RegExp(otherVerbSuffixes[0]);
		if (word.search(suffixIons) >= r2Index) {
			return word.replace(suffixIons, "");
		}

		for (let i = 1; i < otherVerbSuffixes.length; i++) {
			const regex = new RegExp(otherVerbSuffixes[i]);
			if (word.search(regex) >= rvIndex) {
				return word.replace(regex, "");
			}
		}

		if (word.endsWith("ions")) {
			return word;
		}

		const verbSuffixOns = new RegExp(morphologyData.regularStemmer.verbSuffixOns);
		if (word.search(verbSuffixOns) >= rvIndex) {
			word = word.replace(verbSuffixOns, "");
		}
	}

	return word;
};

const removeResidualSuffixes = function removeResidualSuffixes(word, rvIndex, r2Index, morphologyDataRegularStemmer) {
	const residualSuffixes = morphologyDataRegularStemmer.residualSuffixes;
	if (word.search(new RegExp(residualSuffixes.residualSuffixes1[0])) >= rvIndex) {
		word = word.replace(new RegExp(residualSuffixes.residualSuffixes1[0]), residualSuffixes.residualSuffixes1[1]);
	}

	const e1Index = word.search(new RegExp(residualSuffixes.residualSuffix2));

	if (e1Index >= r2Index && word.search(new RegExp(residualSuffixes.residualSuffix3)) >= rvIndex) {
		word = word.substring(0, e1Index);
	} else {
		let e2Index = word.search(new RegExp(residualSuffixes.residualSuffixes4[0]));

		if (e2Index >= rvIndex) {
			word = word.substring(0, e2Index) + residualSuffixes.residualSuffixes4[1];
		} else {
			e2Index = word.search(new RegExp(residualSuffixes.residualSuffix5));
			if (e2Index >= rvIndex) {
				word = word.substring(0, e2Index);
			} else {
				e2Index = word.search(new RegExp(residualSuffixes.residualSuffix6[0]));
				if (e2Index >= rvIndex) {
					word = word.substring(0, e2Index) + residualSuffixes.residualSuffix6[1];
				}
			}
		}
	}

	return word;
};

const checkWordInFullFormExceptions = function checkWordInFullFormExceptions(word, exceptions) {
	for (const paradigm of exceptions) {
		if (paradigm[1].includes(word)) {
			return paradigm[0];
		}
	}
	return null;
};

const canonicalizeStem = function canonicalizeStem(stemmedWord, stemsThatBelongToOneWord) {
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
};

const checkShortWordsExceptionList = function checkShortWordsExceptionList(word, shortWordsAndStems) {
	for (const wordStemPair of shortWordsAndStems.cannotTakeExtraSuffixS) {
		if (wordStemPair[0] === word) {
			return wordStemPair[1];
		}
	}

	if (word.endsWith("s")) {
		word = word.slice(0, -1);
	}
	for (const wordStemPair of shortWordsAndStems.canTakeExtraSuffixS) {
		if (wordStemPair[0] === word) {
			return wordStemPair[1];
		}
	}
};

function stem(word, morphologyData) {
	word = word.toLowerCase();
	const originalWord = word;

	const wordAfterShortWordsCheck = checkShortWordsExceptionList(word, morphologyData.shortWordsAndStems);
	if (wordAfterShortWordsCheck) {
		return wordAfterShortWordsCheck;
	}

	const ifException = checkWordInFullFormExceptions(word, morphologyData.exceptionStemsWithFullForms);
	if (ifException) {
		return ifException;
	}

	if (word.endsWith("x")) {
		const pluralsWithXSuffix = morphologyData.pluralsWithXSuffix;
		if (pluralsWithXSuffix.includes(word)) {
			return word.slice(0, -1);
		}
	}

	if (word.endsWith("s")) {
		const sShouldNotBeStemmed = morphologyData.sShouldNotBeStemmed;
		if (sShouldNotBeStemmed.includes(word)) {
			return word;
		}
	}

	const nonVerbsOnEnt = morphologyData.nonVerbsOnEnt;
	if (word.endsWith("ent")) {
		if (nonVerbsOnEnt.includes(word)) {
			return word;
		}
	}
	if (word.endsWith("ents")) {
		if (nonVerbsOnEnt.includes(word.slice(0, -1))) {
			return word.slice(0, -1);
		}
	}

	const nonVerbsOnOns = morphologyData.nonVerbsOnOns;
	if (word.endsWith("ons")) {
		if (nonVerbsOnOns.includes(word)) {
			return word.slice(0, -1);
		}
	}

	word = (0, _regexHelpers.applyAllReplacements)(word, morphologyData.regularStemmer.preProcessingStepsRegexes);

	var _determineRs = determineRs(word, morphologyData.regularStemmer.rIntervals),
	    _determineRs2 = _slicedToArray(_determineRs, 3);

	const r1Index = _determineRs2[0],
	      r2Index = _determineRs2[1],
	      rvIndex = _determineRs2[2];

	word = processStandardSuffixes(word, morphologyData.regularStemmer.standardSuffixes, r1Index, r2Index, rvIndex);
	const wordAfterStep1 = word;

	const verbSuffixesStartingWithIRemoved = removeVerbSuffixesStartingWithI(word, originalWord, rvIndex, morphologyData.regularStemmer.verbSuffixesWithIBeginning);
	word = verbSuffixesStartingWithIRemoved.word;
	const step2aDone = verbSuffixesStartingWithIRemoved.step2aDone;

	if (!nonVerbsOnEnt.includes(word)) {
		word = removeOtherVerbSuffixes(word, step2aDone, wordAfterStep1, r2Index, rvIndex, morphologyData);
	}

	if (originalWord === word.toLowerCase()) {
		word = removeResidualSuffixes(word, rvIndex, r2Index, morphologyData.regularStemmer);
	} else {
		const yEnding = morphologyData.regularStemmer.yAndSoftCEndingAndReplacement.yEndingAndReplacement;
		const softCEnding = morphologyData.regularStemmer.yAndSoftCEndingAndReplacement.softCEndingAndReplacement;
		if (word.endsWith(yEnding[0])) {
			word = word.slice(0, -1) + yEnding[1];
		} else if (word.endsWith(softCEnding[0])) {
			word = word.slice(0, -1) + softCEnding[1];
		}
	}

	word = (0, _regexHelpers.applyAllReplacements)(word, morphologyData.regularStemmer.finalConsonantUndoubling);

	const unaccentE = morphologyData.regularStemmer.unaccentERegex;
	word = word.replace(new RegExp(unaccentE[0]), unaccentE[1]);
	word = word.toLowerCase();

	const canonicalStem = canonicalizeStem(word, morphologyData.stemsThatBelongToOneWord);
	if (canonicalStem) {
		return canonicalStem;
	}

	return word;
}
