"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _flattenDeep = require("lodash-es/flattenDeep");

var _flattenDeep2 = _interopRequireDefault(_flattenDeep);

var _filterFunctionWordsFromArray = require("../helpers/filterFunctionWordsFromArray");

var _filterFunctionWordsFromArray2 = _interopRequireDefault(_filterFunctionWordsFromArray);

var _getBasicWordForms = require("../helpers/getBasicWordForms");

var _getBasicWordForms2 = _interopRequireDefault(_getBasicWordForms);

var _getLanguage = require("../helpers/getLanguage");

var _getLanguage2 = _interopRequireDefault(_getLanguage);

var _retrieveStemmer = require("../helpers/retrieveStemmer");

var _retrieveStemmer2 = _interopRequireDefault(_retrieveStemmer);

var _getAlttagContent = require("../stringProcessing/getAlttagContent");

var _getAlttagContent2 = _interopRequireDefault(_getAlttagContent);

var _getWords = require("../stringProcessing/getWords");

var _getWords2 = _interopRequireDefault(_getWords);

var _imageInText = require("../stringProcessing/imageInText");

var _imageInText2 = _interopRequireDefault(_imageInText);

var _parseSlug = require("../stringProcessing/parseSlug");

var _parseSlug2 = _interopRequireDefault(_parseSlug);

var _quotes = require("../stringProcessing/quotes");

var _buildTopicStems = require("./buildTopicStems");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StemWithForms(stem, forms) {
	this.stem = stem;
	this.forms = forms;
}

function Result(keyphraseForms = [], synonymsForms = []) {
	this.keyphraseForms = keyphraseForms;
	this.synonymsForms = synonymsForms;
}

function getAllWordsFromPaper(paper, language) {
	const paperText = paper.getText();
	const altTagsInText = (0, _imageInText2.default)(paperText).map(image => (0, _getAlttagContent2.default)(image));

	const paperContent = [paperText, paper.getTitle(), (0, _parseSlug2.default)(paper.getUrl()), paper.getDescription(), altTagsInText.join(" ")].join(" ");

	return (0, _getWords2.default)(paperContent).map(word => (0, _quotes.normalizeSingle)((0, _lodashEs.escapeRegExp)(word.toLocaleLowerCase(language))));
}

function replaceStemWithForms(stemOriginalPair, paperWordsGroupedByStems, language) {
	const matchingStemFormPair = paperWordsGroupedByStems.find(element => element.stem === stemOriginalPair.stem);
	const originalSanitized = (0, _quotes.normalizeSingle)((0, _lodashEs.escapeRegExp)(stemOriginalPair.original.toLocaleLowerCase(language)));

	const forms = matchingStemFormPair ? [originalSanitized, ...matchingStemFormPair.forms] : [originalSanitized];

	if (Object.keys((0, _getBasicWordForms2.default)()).includes(language)) {
		const createBasicWordForms = (0, _getBasicWordForms2.default)()[language];
		forms.push(...createBasicWordForms(stemOriginalPair.original));
	}

	return (0, _lodashEs.uniq)(forms);
}

function extractStems(keyphrase, synonyms) {
	const keyphraseStemsOnly = keyphrase.stemOriginalPairs.length === 0 ? [] : keyphrase.getStems();

	const synonymsStemsOnly = synonyms.length === 0 ? [] : synonyms.map(topicPhrase => topicPhrase.getStems());

	return [...keyphraseStemsOnly, ...(0, _flattenDeep2.default)(synonymsStemsOnly)];
}

function constructTopicPhraseResult(topicPhrase, paperWordsGroupedByStems, language) {
	if (topicPhrase.stemOriginalPairs.length === 0) {
		return [];
	}

	if (topicPhrase.exactMatch) {
		return [[topicPhrase.stemOriginalPairs[0].stem]];
	}

	return topicPhrase.stemOriginalPairs.map(function (stemOriginalPair) {
		return replaceStemWithForms(stemOriginalPair, paperWordsGroupedByStems, language);
	});
}

function getWordForms(paper, researcher) {
	const language = (0, _getLanguage2.default)(paper.getLocale());
	const morphologyData = (0, _lodashEs.get)(researcher.getData("morphology"), language, false);
	const determineStem = (0, _retrieveStemmer2.default)(language, morphologyData);
	const topicPhrases = (0, _buildTopicStems.collectStems)(paper.getKeyword(), paper.getSynonyms(), language, morphologyData);
	const keyphrase = topicPhrases.keyphraseStems;
	const synonyms = topicPhrases.synonymsStems;

	if (keyphrase.stemOriginalPairs.length === 0 && synonyms.length === 0) {
		return new Result();
	}

	const allTopicPhrases = [keyphrase, ...synonyms];

	if (allTopicPhrases.every(topicPhrase => topicPhrase.exactMatch === true)) {
		return new Result([[keyphrase.stemOriginalPairs[0].stem]], synonyms.map(synonym => [[synonym.stemOriginalPairs[0].stem]]));
	}

	const topicStemsFlat = (0, _lodashEs.uniq)(extractStems(keyphrase, synonyms));

	let paperWords = getAllWordsFromPaper(paper, language);

	paperWords = (0, _filterFunctionWordsFromArray2.default)((0, _lodashEs.uniq)(paperWords), language);

	const paperWordsWithStems = paperWords.map(word => new _buildTopicStems.StemOriginalPair(determineStem(word, morphologyData), word)).filter(stemOriginalPair => topicStemsFlat.includes(stemOriginalPair.stem)).sort((a, b) => a.stem.localeCompare(b.stem));

	const paperWordsGroupedByStems = paperWordsWithStems.reduce(function (accumulator, stemOriginalPair) {
		const lastItem = accumulator[accumulator.length - 1];

		if (accumulator.length === 0 || lastItem.stem !== stemOriginalPair.stem) {
			accumulator.push(new StemWithForms(stemOriginalPair.stem, [stemOriginalPair.original]));
		} else {
			lastItem.forms.push(stemOriginalPair.original);
		}

		return accumulator;
	}, []);

	return new Result(constructTopicPhraseResult(keyphrase, paperWordsGroupedByStems, language), synonyms.map(synonym => constructTopicPhraseResult(synonym, paperWordsGroupedByStems, language)));
}

exports.default = getWordForms;
