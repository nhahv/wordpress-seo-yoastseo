"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getDistraction = exports.keyphraseDistributionResearcher = exports.maximizeSentenceScores = exports.computeScoresPerSentenceLongTopic = exports.computeScoresPerSentenceShortTopic = undefined;

var _getSentences = require("../stringProcessing/getSentences");

var _getSentences2 = _interopRequireDefault(_getSentences);

var _mergeListItems = require("../stringProcessing/mergeListItems");

var _findKeywordFormsInString = require("./findKeywordFormsInString");

var _lodashEs = require("lodash-es");

var _markWordsInSentences = require("../stringProcessing/markWordsInSentences");

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const computeScoresPerSentenceLongTopic = function computeScoresPerSentenceLongTopic(topic, sentences, locale) {
	const sentenceScores = Array(sentences.length);

	for (let i = 0; i < sentences.length; i++) {
		const foundInCurrentSentence = (0, _findKeywordFormsInString.findWordFormsInString)(topic, sentences[i], locale);

		if (foundInCurrentSentence.percentWordMatches >= 50) {
			sentenceScores[i] = 9;
		} else {
			sentenceScores[i] = 3;
		}
	}

	return sentenceScores;
};

const computeScoresPerSentenceShortTopic = function computeScoresPerSentenceShortTopic(topic, sentences, locale) {
	const sentenceScores = Array(sentences.length);

	for (let i = 0; i < sentences.length; i++) {
		const currentSentence = sentences[i];
		const foundInCurrentSentence = (0, _findKeywordFormsInString.findWordFormsInString)(topic, currentSentence, locale);
		if (foundInCurrentSentence.percentWordMatches === 100) {
			sentenceScores[i] = 9;
		} else {
			sentenceScores[i] = 3;
		}
	}
	return sentenceScores;
};

const maximizeSentenceScores = function maximizeSentenceScores(sentenceScores) {
	const sentenceScoresTransposed = sentenceScores[0].map(function (col, i) {
		return sentenceScores.map(function (row) {
			return row[i];
		});
	});

	return sentenceScoresTransposed.map(function (scoresForOneSentence) {
		return (0, _lodashEs.max)(scoresForOneSentence);
	});
};

const getDistraction = function getDistraction(sentenceScores) {
	const numberOfSentences = sentenceScores.length;
	const allTopicSentencesIndices = [];

	for (let i = 0; i < numberOfSentences; i++) {
		if (sentenceScores[i] > 3) {
			allTopicSentencesIndices.push(i);
		}
	}

	const numberOfTopicSentences = allTopicSentencesIndices.length;

	if (numberOfTopicSentences === 0) {
		return numberOfSentences;
	}

	allTopicSentencesIndices.unshift(-1);
	allTopicSentencesIndices.push(numberOfSentences);

	const distances = [];

	for (let i = 1; i < numberOfTopicSentences + 2; i++) {
		distances.push(allTopicSentencesIndices[i] - allTopicSentencesIndices[i - 1] - 1);
	}

	return (0, _lodashEs.max)(distances);
};

const getSentenceScores = function getSentenceScores(sentences, topicFormsInOneArray, locale) {
	const topicNumber = topicFormsInOneArray.length;

	const sentenceScores = Array(topicNumber);

	const language = (0, _getLanguage2.default)(locale);

	if ((0, _lodashEs.indexOf)(["en", "de", "nl", "fr", "es", "it", "pt", "ru", "pl", "sv", "id", "ar", "he", "fa"], language) >= 0) {
		for (let i = 0; i < topicNumber; i++) {
			const topic = topicFormsInOneArray[i];
			if (topic.length < 4) {
				sentenceScores[i] = computeScoresPerSentenceShortTopic(topic, sentences, locale);
			} else {
				sentenceScores[i] = computeScoresPerSentenceLongTopic(topic, sentences, locale);
			}
		}
	} else {
		for (let i = 0; i < topicNumber; i++) {
			const topic = topicFormsInOneArray[i];
			sentenceScores[i] = computeScoresPerSentenceShortTopic(topic, sentences, locale);
		}
	}

	const maximizedSentenceScores = maximizeSentenceScores(sentenceScores);

	const sentencesWithMaximizedScores = (0, _lodashEs.zipWith)(sentences, maximizedSentenceScores, (sentence, score) => {
		return { sentence, score };
	});

	const sentencesWithTopic = sentencesWithMaximizedScores.filter(sentenceObject => sentenceObject.score > 3);

	return {
		maximizedSentenceScores: maximizedSentenceScores,
		sentencesWithTopic: sentencesWithTopic.map(sentenceObject => sentenceObject.sentence)
	};
};

const keyphraseDistributionResearcher = function keyphraseDistributionResearcher(paper, researcher) {
	let text = paper.getText();
	text = (0, _mergeListItems.mergeListItems)(text);
	const sentences = (0, _getSentences2.default)(text);
	const topicForms = researcher.getResearch("morphology");
	const locale = paper.getLocale();
	const topicFormsInOneArray = [topicForms.keyphraseForms];

	topicForms.synonymsForms.forEach(function (synonym) {
		topicFormsInOneArray.push(synonym);
	});

	const allTopicWords = (0, _lodashEs.uniq)((0, _lodashEs.flattenDeep)(topicFormsInOneArray)).sort((a, b) => b.length - a.length);

	const sentenceScores = getSentenceScores(sentences, topicFormsInOneArray, locale);
	const maximizedSentenceScores = sentenceScores.maximizedSentenceScores;
	const maxLengthDistraction = getDistraction(maximizedSentenceScores);

	return {
		sentencesToHighlight: (0, _markWordsInSentences.markWordsInSentences)(allTopicWords, sentenceScores.sentencesWithTopic, locale),
		keyphraseDistributionScore: maxLengthDistraction / sentences.length * 100
	};
};

exports.computeScoresPerSentenceShortTopic = computeScoresPerSentenceShortTopic;
exports.computeScoresPerSentenceLongTopic = computeScoresPerSentenceLongTopic;
exports.maximizeSentenceScores = maximizeSentenceScores;
exports.keyphraseDistributionResearcher = keyphraseDistributionResearcher;
exports.getDistraction = getDistraction;
