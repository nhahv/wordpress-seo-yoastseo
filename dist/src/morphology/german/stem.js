"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = stem;

const determineR1 = function determineR1(word) {
	let r1Index = word.search(/[aeiouyäöü][^aeiouyäöü]/);

	if (r1Index !== -1) {
		r1Index += 2;
	}

	if (r1Index !== -1 && r1Index < 3) {
		r1Index = 3;
	}

	return r1Index;
};

const findSuffixStep1 = function findSuffixStep1(word) {
	const a1Index = word.search(/(em|ern|er)$/g);
	const b1Index = word.search(/(e|en|es)$/g);
	let c1Index = word.search(/([bdfghklmnrt]s)$/g);

	if (c1Index !== -1) {
		c1Index++;
	}
	let optionUsed1 = "";
	let index1 = 10000;
	if (a1Index !== -1) {
		optionUsed1 = "a";
		index1 = a1Index;

		return { index1, optionUsed1 };
	} else if (b1Index !== -1) {
		optionUsed1 = "b";
		index1 = b1Index;

		return { index1, optionUsed1 };
	} else if (c1Index !== -1) {
		optionUsed1 = "c";
		index1 = c1Index;

		return { index1, optionUsed1 };
	}

	return { index1, optionUsed1 };
};

const findSuffixStep2 = function findSuffixStep2(word) {
	const a2Index = word.search(/(en|er|est)$/g);
	let b2Index = word.search(/(.{3}[bdfghklmnt]st)$/g);

	if (b2Index !== -1) {
		b2Index += 4;
	}
	let index2 = 10000;
	if (a2Index !== -1) {
		index2 = a2Index;
	} else if (b2Index !== -1) {
		index2 = b2Index;
	}

	return index2;
};

const deleteSuffix1 = function deleteSuffix1(word, index1, optionUsed1, r1Index) {
	if (index1 !== 10000 && r1Index !== -1) {
		if (index1 >= r1Index) {
			word = word.substring(0, index1);
			if (optionUsed1 === "b") {
				if (word.search(/niss$/) !== -1) {
					word = word.substring(0, word.length - 1);
				}
			}
		}
	}
	return word;
};

const deleteSuffix2 = function deleteSuffix2(word, index2, r1Index) {
	if (index2 !== 10000 && r1Index !== -1) {
		if (index2 >= r1Index) {
			word = word.substring(0, index2);
		}
	}
	return word;
};

const stemIrregularVerbs = function stemIrregularVerbs(morphologyDataVerbs, word) {
	const irregularVerbs = morphologyDataVerbs.veryIrregularVerbs;

	const matchedParadigm = irregularVerbs.find(paradigm => {
		const forms = paradigm.forms;
		return forms.includes(word);
	});

	if (matchedParadigm) {
		return matchedParadigm.stem;
	}

	return null;
};

function stem(morphologyDataVerbs, word) {
	const veryIrregularVerbStem = stemIrregularVerbs(morphologyDataVerbs, word);

	if (veryIrregularVerbStem) {
		return veryIrregularVerbStem;
	}

	word = word.replace(/([aeiouyäöü])u([aeiouyäöü])/g, "$1U$2");
	word = word.replace(/([aeiouyäöü])y([aeiouyäöü])/g, "$1Y$2");
	word = word.replace(/([aeiouyäöü])i([aeiouyäöü])/g, "$1I$2");
	word = word.replace(/([aeiouyäöü])e([aeiouyäöü])/g, "$1E$2");

	const r1Index = determineR1(word);

	const index1 = findSuffixStep1(word).index1;
	const optionUsed1 = findSuffixStep1(word).optionUsed1;

	word = deleteSuffix1(word, index1, optionUsed1, r1Index);

	const index2 = findSuffixStep2(word);

	word = deleteSuffix2(word, index2, r1Index);

	word = word.replace(/U/g, "u");
	word = word.replace(/Y/g, "y");
	word = word.replace(/I/g, "i");
	word = word.replace(/E/g, "e");

	return word;
}
