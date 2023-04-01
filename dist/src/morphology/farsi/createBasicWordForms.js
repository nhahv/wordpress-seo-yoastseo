"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBasicWordForms = createBasicWordForms;

var _regexHelpers = require("../morphoHelpers/regexHelpers");

const createForms = function createForms(word) {
	const prefix = "ن";

	const suffixes1 = ["مان", "شان", "تان", "ش", "ت", "م", "ی"];

	const suffixes2 = ["یی", "یم", "یت", "یش"];

	const suffixes3 = ["‌ای", "‌یی", "‌ام", "‌ات", "‌اش"];

	const suffixes4 = ["یی", "ی"];

	const createdForms = [];

	createdForms.push(prefix + word);

	if (word.endsWith("ها")) {
		createdForms.push(...suffixes4.map(suffix => word + suffix));
	} else if (/([^وای]ه)$/i.test(word)) {
		createdForms.push(...suffixes3.map(suffix => word + suffix));
	} else if (/([وا])$/i.test(word)) {
		createdForms.push(...suffixes2.map(suffix => word + suffix));
	} else {
		if (word.endsWith("ی")) {
			createdForms.push(word + "‌ای");
		}
		createdForms.push(...suffixes1.map(suffix => word + suffix));
	}
	return createdForms;
};

const stemWord = function stemWord(word) {
	const prefix = "ن";
	const suffixesAndReplacements = [["(و|ا)(یش|یت|یم|یی)$", "$1"], ["([^وای]ه)(‌یی|‌ای|‌اش|‌ات|‌ام)$", "$1"], ["(ی)‌ای$", "$1"], ["(ها)یی$", "$1"], ["(مان|شان|تان|ش|ت|م|ی)$", ""]];

	if (word.startsWith(prefix)) {
		return word.slice(1, word.length);
	}

	return (0, _regexHelpers.searchAndReplaceWithRegex)(word, suffixesAndReplacements);
};

function createBasicWordForms(word) {
	const forms = [];

	forms.push(...createForms(word));

	const stemmedWord = stemWord(word);
	if (stemmedWord) {
		forms.push(stemmedWord);
		forms.push(...createForms(stemmedWord));
	}
	return forms;
}
