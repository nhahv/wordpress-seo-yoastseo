"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBasicWordForms = createBasicWordForms;
function createBasicWordForms(word) {
	const prefixes = ["ل", "ب", "ك", "و", "ف", "س", "أ", "ال", "وب", "ول", "لل", "فس", "فب", "فل", "وس", "وال", "بال", "فال", "كال", "ولل", "وبال"];

	const forms = [];

	forms.push(...prefixes.map(prefix => prefix + word));

	let stemmedWord = "";

	for (const prefix of prefixes) {
		if (word.startsWith(prefix)) {
			stemmedWord = word.slice(prefix.length);
		}
	}

	if (stemmedWord.length > 0) {
		forms.push(stemmedWord);
		forms.push(...prefixes.map(prefix => prefix + stemmedWord));
	}

	return forms;
}
