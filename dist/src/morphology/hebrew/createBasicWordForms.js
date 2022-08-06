"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBasicWordForms = createBasicWordForms;
function createBasicWordForms(word) {
	const prefixes = ["ב", "ה", "ו", "כ", "ל", "מ", "ש"];
	const forms = [];

	forms.push(...prefixes.map(prefix => prefix + word));

	let stemmedWord = "";

	if (prefixes.some(prefix => word.startsWith(prefix))) {
		stemmedWord = word.slice(1);
	}

	if (stemmedWord.length > 0) {
		forms.push(stemmedWord);
		forms.push(...prefixes.map(prefix => prefix + stemmedWord));
	}

	return forms;
}
