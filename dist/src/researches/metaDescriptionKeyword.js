"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (paper, researcher) {
	const description = paper.getDescription();
	const locale = paper.getLocale();

	const topicForms = researcher.getResearch("morphology");

	const sentences = (0, _getSentences2.default)(description);

	const sentenceMatches = sentences.map(sentence => matchPerSentence(sentence, topicForms, locale));

	return sentenceMatches.reduce((sum, count) => sum + count, 0);
};

var _matchTextWithArray = require("../stringProcessing/matchTextWithArray");

var _matchTextWithArray2 = _interopRequireDefault(_matchTextWithArray);

var _getSentences = require("../stringProcessing/getSentences");

var _getSentences2 = _interopRequireDefault(_getSentences);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const replaceFoundKeywordForms = function replaceFoundKeywordForms(description, matchedKeywordForms, maxToRemove) {
	matchedKeywordForms.forEach(keywordForm => keywordForm.matches.slice(0, maxToRemove).forEach(match => {
		description = description.replace(match, "");
	}));
	return description;
};

const matchPerSentence = function matchPerSentence(sentence, topicForms, locale) {
	const matchesKeyphrase = topicForms.keyphraseForms.map(keywordForms => (0, _matchTextWithArray2.default)(sentence, keywordForms, locale));

	const fullKeyphraseMatches = Math.min(...matchesKeyphrase.map(match => match.count));

	sentence = replaceFoundKeywordForms(sentence, matchesKeyphrase, fullKeyphraseMatches);

	const fullSynonymsMatches = topicForms.synonymsForms.map(synonymForms => {
		const matches = synonymForms.map(keywordForms => (0, _matchTextWithArray2.default)(sentence, keywordForms, locale));

		const fullSynonymMatches = Math.min(...matches.map(match => match.count));

		sentence = replaceFoundKeywordForms(sentence, matchesKeyphrase, fullSynonymMatches);
		return fullSynonymMatches;
	});

	return [fullKeyphraseMatches, ...fullSynonymsMatches].reduce((sum, count) => sum + count, 0);
};
