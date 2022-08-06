"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _autop = require("@wordpress/autop");

var _featureFlag = require("@yoast/feature-flag");

var _jed = require("jed");

var _jed2 = _interopRequireDefault(_jed);

var _lodashEs = require("lodash-es");

var _loglevel = require("loglevel");

var _assessments = require("../assessments");

var assessments = _interopRequireWildcard(_assessments);

var _bundledPlugins = require("../bundledPlugins");

var bundledPlugins = _interopRequireWildcard(_bundledPlugins);

var _helpers = require("../helpers");

var helpers = _interopRequireWildcard(_helpers);

var _markers = require("../markers");

var markers = _interopRequireWildcard(_markers);

var _stringProcessing = require("../stringProcessing");

var string = _interopRequireWildcard(_stringProcessing);

var _interpreters = require("../interpreters");

var interpreters = _interopRequireWildcard(_interpreters);

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var _assessor = require("../assessor");

var _assessor2 = _interopRequireDefault(_assessor);

var _assessment = require("../assessment");

var _assessment2 = _interopRequireDefault(_assessment);

var _seoAssessor = require("../seoAssessor");

var _seoAssessor2 = _interopRequireDefault(_seoAssessor);

var _contentAssessor = require("../contentAssessor");

var _contentAssessor2 = _interopRequireDefault(_contentAssessor);

var _taxonomyAssessor = require("../taxonomyAssessor");

var _taxonomyAssessor2 = _interopRequireDefault(_taxonomyAssessor);

var _pluggable = require("../pluggable");

var _pluggable2 = _interopRequireDefault(_pluggable);

var _researcher = require("../researcher");

var _researcher2 = _interopRequireDefault(_researcher);

var _snippetPreview = require("../snippetPreview");

var _snippetPreview2 = _interopRequireDefault(_snippetPreview);

var _Paper = require("../values/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _AssessmentResult = require("../values/AssessmentResult");

var _AssessmentResult2 = _interopRequireDefault(_AssessmentResult);

var _relatedKeywordAssessor = require("../relatedKeywordAssessor");

var _relatedKeywordAssessor2 = _interopRequireDefault(_relatedKeywordAssessor);

var _contentAssessor3 = require("../cornerstone/contentAssessor");

var _contentAssessor4 = _interopRequireDefault(_contentAssessor3);

var _relatedKeywordAssessor3 = require("../cornerstone/relatedKeywordAssessor");

var _relatedKeywordAssessor4 = _interopRequireDefault(_relatedKeywordAssessor3);

var _seoAssessor3 = require("../cornerstone/seoAssessor");

var _seoAssessor4 = _interopRequireDefault(_seoAssessor3);

var _invalidType = require("../errors/invalidType");

var _invalidType2 = _interopRequireDefault(_invalidType);

var _includesAny = require("../helpers/includesAny");

var _includesAny2 = _interopRequireDefault(_includesAny);

var _shortlinker = require("../helpers/shortlinker");

var _relatedKeywordTaxonomyAssessor = require("../relatedKeywordTaxonomyAssessor");

var _relatedKeywordTaxonomyAssessor2 = _interopRequireDefault(_relatedKeywordTaxonomyAssessor);

var _scheduler = require("./scheduler");

var _scheduler2 = _interopRequireDefault(_scheduler);

var _transporter = require("./transporter");

var _transporter2 = _interopRequireDefault(_transporter);

var _wrapTryCatchAroundAction = require("./wrapTryCatchAroundAction");

var _wrapTryCatchAroundAction2 = _interopRequireDefault(_wrapTryCatchAroundAction);

var _scoreAggregators = require("../parsedPaper/assess/scoreAggregators");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const YoastSEO = {
	Assessor: _assessor2.default,
	Assessment: _assessment2.default,
	SEOAssessor: _seoAssessor2.default,
	ContentAssessor: _contentAssessor2.default,
	TaxonomyAssessor: _taxonomyAssessor2.default,
	Pluggable: _pluggable2.default,
	Researcher: _researcher2.default,
	SnippetPreview: _snippetPreview2.default,
	RelatedKeywordAssessor: _relatedKeywordAssessor2.default,

	Paper: _Paper2.default,
	AssessmentResult: _AssessmentResult2.default,

	assessments,
	bundledPlugins,
	helpers,
	markers,
	string,
	interpreters,
	config
};

const keyphraseDistribution = new assessments.seo.KeyphraseDistributionAssessment();

const logger = (0, _loglevel.getLogger)("yoast-analysis-worker");
logger.setDefaultLevel("error");

class AnalysisWebWorker {
	constructor(scope) {
		this._scope = scope;

		this._configuration = {
			contentAnalysisActive: true,
			keywordAnalysisActive: true,
			useCornerstone: false,
			useTaxonomy: false,
			useKeywordDistribution: false,

			locale: "en_US"
		};

		this._scheduler = new _scheduler2.default();

		this._paper = null;
		this._relatedKeywords = {};

		this._i18n = AnalysisWebWorker.createI18n();
		this._researcher = new _researcher2.default(this._paper);

		this._contentAssessor = null;
		this._seoAssessor = null;
		this._relatedKeywordAssessor = null;

		this._results = {
			readability: {
				results: [],
				score: 0
			},
			seo: {
				"": {
					results: [],
					score: 0
				}
			}
		};
		this._registeredAssessments = [];
		this._registeredMessageHandlers = {};
		this._registeredParsers = [];

		this.setupTreeAnalysis();

		this.bindActions();

		this.assessRelatedKeywords = this.assessRelatedKeywords.bind(this);

		this.registerAssessment = this.registerAssessment.bind(this);
		this.registerMessageHandler = this.registerMessageHandler.bind(this);
		this.refreshAssessment = this.refreshAssessment.bind(this);

		this.handleMessage = this.handleMessage.bind(this);

		this.analyzeRelatedKeywords = (0, _wrapTryCatchAroundAction2.default)(logger, this.analyze, "An error occurred while running the related keywords analysis.");

		this.analyze = (0, _wrapTryCatchAroundAction2.default)(logger, this.analyze, "An error occurred while running the analysis.");
		this.runResearch = (0, _wrapTryCatchAroundAction2.default)(logger, this.runResearch, "An error occurred after running the '%%name%%' research.");
	}

	bindActions() {
		this.analyze = this.analyze.bind(this);
		this.analyzeDone = this.analyzeDone.bind(this);
		this.analyzeRelatedKeywordsDone = this.analyzeRelatedKeywordsDone.bind(this);
		this.loadScript = this.loadScript.bind(this);
		this.loadScriptDone = this.loadScriptDone.bind(this);
		this.customMessage = this.customMessage.bind(this);
		this.customMessageDone = this.customMessageDone.bind(this);
		this.clearCache = this.clearCache.bind(this);
		this.runResearch = this.runResearch.bind(this);
		this.runResearchDone = this.runResearchDone.bind(this);
	}

	setupTreeAnalysis() {
		this._treeResearcher = null;

		this._contentTreeAssessor = null;
		this._seoTreeAssessor = null;
		this._relatedKeywordTreeAssessor = null;

		this._registeredTreeAssessments = [];

		this._seoScoreAggregator = new _scoreAggregators.SEOScoreAggregator();
		this._contentScoreAggregator = new _scoreAggregators.ReadabilityScoreAggregator();

		this._tree = null;

		this._treeBuilder = null;
	}

	register() {
		this._scope.onmessage = this.handleMessage;
		this._scope.analysisWorker = {
			registerAssessment: this.registerAssessment,
			registerParser: this.registerParser,
			registerMessageHandler: this.registerMessageHandler,
			refreshAssessment: this.refreshAssessment
		};
		this._scope.yoast = this._scope.yoast || {};
		this._scope.yoast.analysis = YoastSEO;
	}

	handleMessage({ data: { type, id, payload } }) {
		payload = _transporter2.default.parse(payload);

		logger.debug("AnalysisWebWorker incoming:", type, id, payload);

		switch (type) {
			case "initialize":
				this.initialize(id, payload);
				this._scheduler.startPolling();
				break;
			case "analyze":
				this._scheduler.schedule({
					id,
					execute: this.analyze,
					done: this.analyzeDone,
					data: payload,
					type: type
				});
				break;
			case "analyzeRelatedKeywords":
				this._scheduler.schedule({
					id,
					execute: this.analyzeRelatedKeywords,
					done: this.analyzeRelatedKeywordsDone,
					data: payload,
					type: type
				});
				break;
			case "loadScript":
				this._scheduler.schedule({
					id,
					execute: this.loadScript,
					done: this.loadScriptDone,
					data: payload,
					type: type
				});
				break;
			case "runResearch":
				this._scheduler.schedule({
					id,
					execute: this.runResearch,
					done: this.runResearchDone,
					data: payload
				});
				break;
			case "customMessage":
				{
					const name = payload.name;
					if (name && this._registeredMessageHandlers[name]) {
						this._scheduler.schedule({
							id,
							execute: this.customMessage,
							done: this.customMessageDone,
							data: payload,
							type: type
						});
						break;
					}
					this.customMessageDone(id, { error: new Error("No message handler registered for messages with name: " + name) });
					break;
				}
			default:
				console.warn("AnalysisWebWorker unrecognized action:", type);
		}
	}

	static createI18n(translations) {
		translations = translations || {
			domain: "js-text-analysis",

			locale_data: {
				"js-text-analysis": {
					"": {}
				}
			}
		};

		return new _jed2.default(translations);
	}

	createContentAssessor() {
		var _configuration = this._configuration;
		const contentAnalysisActive = _configuration.contentAnalysisActive,
		      useCornerstone = _configuration.useCornerstone,
		      locale = _configuration.locale;


		if (contentAnalysisActive === false) {
			return null;
		}

		const assessor = useCornerstone === true ? new _contentAssessor4.default(this._i18n, { locale }) : new _contentAssessor2.default(this._i18n, { locale });

		return assessor;
	}

	createSEOAssessor() {
		var _configuration2 = this._configuration;
		const keywordAnalysisActive = _configuration2.keywordAnalysisActive,
		      useCornerstone = _configuration2.useCornerstone,
		      useKeywordDistribution = _configuration2.useKeywordDistribution,
		      useTaxonomy = _configuration2.useTaxonomy,
		      locale = _configuration2.locale;


		if (keywordAnalysisActive === false) {
			return null;
		}

		let assessor;

		if (useTaxonomy === true) {
			assessor = new _taxonomyAssessor2.default(this._i18n, { locale: locale, researcher: this._researcher });
		} else {
			assessor = useCornerstone === true ? new _seoAssessor4.default(this._i18n, { locale: locale, researcher: this._researcher }) : new _seoAssessor2.default(this._i18n, { locale: locale, researcher: this._researcher });
		}

		if (useKeywordDistribution && (0, _lodashEs.isUndefined)(assessor.getAssessment("keyphraseDistribution"))) {
			assessor.addAssessment("keyphraseDistribution", keyphraseDistribution);
		}

		this._registeredAssessments.forEach(({ name, assessment }) => {
			if ((0, _lodashEs.isUndefined)(assessor.getAssessment(name))) {
				assessor.addAssessment(name, assessment);
			}
		});

		return assessor;
	}

	createRelatedKeywordsAssessor() {
		var _configuration3 = this._configuration;
		const keywordAnalysisActive = _configuration3.keywordAnalysisActive,
		      useCornerstone = _configuration3.useCornerstone,
		      useTaxonomy = _configuration3.useTaxonomy,
		      locale = _configuration3.locale;


		if (keywordAnalysisActive === false) {
			return null;
		}

		let assessor;

		if (useTaxonomy === true) {
			assessor = new _relatedKeywordTaxonomyAssessor2.default(this._i18n, { locale: locale, researcher: this._researcher });
		} else {
			assessor = useCornerstone === true ? new _relatedKeywordAssessor4.default(this._i18n, { locale: locale, researcher: this._researcher }) : new _relatedKeywordAssessor2.default(this._i18n, { locale: locale, researcher: this._researcher });
		}

		this._registeredAssessments.forEach(({ name, assessment }) => {
			if ((0, _lodashEs.isUndefined)(assessor.getAssessment(name))) {
				assessor.addAssessment(name, assessment);
			}
		});

		return assessor;
	}

	send(type, id, payload = {}) {
		logger.debug("AnalysisWebWorker outgoing:", type, id, payload);

		payload = _transporter2.default.serialize(payload);

		this._scope.postMessage({
			type,
			id,
			payload
		});
	}

	static shouldAssessorsUpdate(configuration, contentAssessor = null, seoAssessor = null) {
		const readability = ["contentAnalysisActive", "useCornerstone", "locale", "translations"];
		const seo = ["keywordAnalysisActive", "useCornerstone", "useTaxonomy", "useKeywordDistribution", "locale", "translations", "researchData"];
		const configurationKeys = Object.keys(configuration);

		return {
			readability: (0, _lodashEs.isNull)(contentAssessor) || (0, _includesAny2.default)(configurationKeys, readability),
			seo: (0, _lodashEs.isNull)(seoAssessor) || (0, _includesAny2.default)(configurationKeys, seo)
		};
	}

	initialize(id, configuration) {
		const update = AnalysisWebWorker.shouldAssessorsUpdate(configuration, this._contentAssessor, this._seoAssessor);

		if ((0, _lodashEs.has)(configuration, "translations")) {
			this._i18n = AnalysisWebWorker.createI18n(configuration.translations);
			delete configuration.translations;
		}

		if ((0, _lodashEs.has)(configuration, "researchData")) {
			(0, _lodashEs.forEach)(configuration.researchData, (data, research) => {
				this._researcher.addResearchData(research, data);
			});
			delete configuration.researchData;
		}

		if ((0, _lodashEs.has)(configuration, "defaultQueryParams")) {
			(0, _shortlinker.configureShortlinker)({ params: configuration.defaultQueryParams });
			delete configuration.defaultQueryParams;
		}

		if ((0, _lodashEs.has)(configuration, "logLevel")) {
			logger.setLevel(configuration.logLevel, false);
			delete configuration.logLevel;
		}

		if ((0, _lodashEs.has)(configuration, "enabledFeatures")) {
			(0, _featureFlag.enableFeatures)(configuration.enabledFeatures);
			delete configuration.enabledFeatures;
		}

		this._configuration = (0, _lodashEs.merge)(this._configuration, configuration);

		if (update.readability) {
			this._contentAssessor = this.createContentAssessor();

			this._contentTreeAssessor = null;
		}
		if (update.seo) {
			this._seoAssessor = this.createSEOAssessor();
			this._relatedKeywordAssessor = this.createRelatedKeywordsAssessor();
		}

		this.clearCache();

		this.send("initialize:done", id);
	}

	registerAssessment(name, assessment, pluginName) {
		if (!(0, _lodashEs.isString)(name)) {
			throw new _invalidType2.default("Failed to register assessment for plugin " + pluginName + ". Expected parameter `name` to be a string.");
		}

		if (!(0, _lodashEs.isObject)(assessment)) {
			throw new _invalidType2.default("Failed to register assessment for plugin " + pluginName + ". Expected parameter `assessment` to be a function.");
		}

		if (!(0, _lodashEs.isString)(pluginName)) {
			throw new _invalidType2.default("Failed to register assessment for plugin " + pluginName + ". Expected parameter `pluginName` to be a string.");
		}

		const combinedName = pluginName + "-" + name;

		if (this._seoAssessor !== null) {
			this._seoAssessor.addAssessment(combinedName, assessment);
		}
		this._registeredAssessments.push({ combinedName, assessment });

		this.refreshAssessment(name, pluginName);

		return true;
	}

	registerMessageHandler(name, handler, pluginName) {
		if (!(0, _lodashEs.isString)(name)) {
			throw new _invalidType2.default("Failed to register handler for plugin " + pluginName + ". Expected parameter `name` to be a string.");
		}

		if (!(0, _lodashEs.isObject)(handler)) {
			throw new _invalidType2.default("Failed to register handler for plugin " + pluginName + ". Expected parameter `handler` to be a function.");
		}

		if (!(0, _lodashEs.isString)(pluginName)) {
			throw new _invalidType2.default("Failed to register handler for plugin " + pluginName + ". Expected parameter `pluginName` to be a string.");
		}

		name = pluginName + "-" + name;

		this._registeredMessageHandlers[name] = handler;
	}

	refreshAssessment(name, pluginName) {
		if (!(0, _lodashEs.isString)(name)) {
			throw new _invalidType2.default("Failed to refresh assessment for plugin " + pluginName + ". Expected parameter `name` to be a string.");
		}

		if (!(0, _lodashEs.isString)(pluginName)) {
			throw new _invalidType2.default("Failed to refresh assessment for plugin " + pluginName + ". Expected parameter `pluginName` to be a string.");
		}

		this.clearCache();
	}

	registerParser(parser) {
		if (typeof parser.isApplicable !== "function") {
			throw new _invalidType2.default("Failed to register the custom parser. Expected parameter 'parser' to have a method 'isApplicable'.");
		}
		if (typeof parser.parse !== "function") {
			throw new _invalidType2.default("Failed to register the custom parser. Expected parameter 'parser' to have a method 'parse'.");
		}

		this._registeredParsers.push(parser);
	}

	clearCache() {
		this._paper = null;
	}

	setLocale(locale) {
		if (this._configuration.locale === locale) {
			return;
		}
		this._configuration.locale = locale;
		this._contentAssessor = this.createContentAssessor();
	}

	shouldReadabilityUpdate(paper) {
		if (this._paper === null) {
			return true;
		}

		if (this._paper.getText() !== paper.getText()) {
			return true;
		}

		return this._paper.getLocale() !== paper.getLocale();
	}

	shouldSeoUpdate(key, { keyword, synonyms }) {
		if ((0, _lodashEs.isUndefined)(this._relatedKeywords[key])) {
			return true;
		}

		if (this._relatedKeywords[key].keyword !== keyword) {
			return true;
		}

		return this._relatedKeywords[key].synonyms !== synonyms;
	}

	async analyze(id, { paper, relatedKeywords = {} }) {
		paper._text = (0, _autop.autop)(paper._text);
		paper._text = string.removeHtmlBlocks(paper._text);
		const paperHasChanges = this._paper === null || !this._paper.equals(paper);
		const shouldReadabilityUpdate = this.shouldReadabilityUpdate(paper);

		if (paperHasChanges) {
			this._paper = paper;
			this._researcher.setPaper(this._paper);

			try {} catch (exception) {
				logger.debug("Yoast SEO and readability analysis: " + "An error occurred during the building of the tree structure used for some assessments.\n\n", exception);
				this._tree = null;
			}

			this.setLocale(this._paper.getLocale());
		}

		if (this._configuration.keywordAnalysisActive && this._seoAssessor) {
			if (paperHasChanges) {
				this._results.seo[""] = await this.assess(this._paper, this._tree, {
					oldAssessor: this._seoAssessor,
					treeAssessor: this._seoTreeAssessor,
					scoreAggregator: this._seoScoreAggregator
				});
			}

			if (!(0, _lodashEs.isEmpty)(relatedKeywords)) {
				const requestedRelatedKeywordKeys = Object.keys(relatedKeywords);

				const relatedKeyphraseResults = await this.assessRelatedKeywords(paper, this._tree, relatedKeywords);

				relatedKeyphraseResults.forEach(result => {
					this._results.seo[result.key] = result.results;
				});

				if (requestedRelatedKeywordKeys.length > 1) {
					this._results.seo = (0, _lodashEs.pickBy)(this._results.seo, (relatedKeyword, key) => (0, _lodashEs.includes)(requestedRelatedKeywordKeys, key));
				}
			}
		}

		if (this._configuration.contentAnalysisActive && this._contentAssessor && shouldReadabilityUpdate) {
			const analysisCombination = {
				oldAssessor: this._contentAssessor,
				treeAssessor: this._contentTreeAssessor,
				scoreAggregator: this._contentScoreAggregator
			};

			analysisCombination.scoreAggregator.setLocale(this._configuration.locale);
			this._results.readability = await this.assess(this._paper, this._tree, analysisCombination);
		}

		return this._results;
	}

	async assess(paper, tree, analysisCombination) {
		const oldAssessor = analysisCombination.oldAssessor,
		      scoreAggregator = analysisCombination.scoreAggregator;

		oldAssessor.assess(paper);
		const oldAssessmentResults = oldAssessor.results;

		const treeAssessmentResults = [];

		const results = [...treeAssessmentResults, ...oldAssessmentResults];

		const score = scoreAggregator.aggregate(results);

		return {
			results: results,
			score: score
		};
	}

	generateAssessmentError(assessment) {
		const result = new _AssessmentResult2.default();

		result.setScore(-1);
		result.setText(this._i18n.sprintf(this._i18n.dgettext("js-text-analysis", "An error occurred in the '%1$s' assessment"), assessment.name));

		return result;
	}

	async assessRelatedKeywords(paper, tree, relatedKeywords) {
		const keywordKeys = Object.keys(relatedKeywords);
		return await Promise.all(keywordKeys.map(key => {
			this._relatedKeywords[key] = relatedKeywords[key];

			const relatedPaper = _Paper2.default.parse(_extends({}, paper.serialize(), {
				keyword: this._relatedKeywords[key].keyword,
				synonyms: this._relatedKeywords[key].synonyms
			}));

			const analysisCombination = {
				oldAssessor: this._relatedKeywordAssessor,
				treeAssessor: this._relatedKeywordTreeAssessor,
				scoreAggregator: this._seoScoreAggregator
			};

			return this.assess(relatedPaper, tree, analysisCombination).then(results => ({ key: key, results: results }));
		}));
	}

	loadScript(id, { url }) {
		if ((0, _lodashEs.isUndefined)(url)) {
			return { loaded: false, url, message: "Load Script was called without an URL." };
		}

		try {
			this._scope.importScripts(url);
		} catch (error) {
			return { loaded: false, url, message: error.message };
		}

		return { loaded: true, url };
	}

	loadScriptDone(id, result) {
		if (!result.loaded) {
			this.send("loadScript:failed", id, result);
			return;
		}

		this.send("loadScript:done", id, result);
	}

	analyzeDone(id, result) {
		if (result.error) {
			this.send("analyze:failed", id, result);
			return;
		}
		this.send("analyze:done", id, result);
	}

	analyzeRelatedKeywordsDone(id, result) {
		if (result.error) {
			this.send("analyzeRelatedKeywords:failed", id, result);
			return;
		}
		this.send("analyzeRelatedKeywords:done", id, result);
	}

	customMessage(id, { name, data }) {
		try {
			return {
				success: true,
				data: this._registeredMessageHandlers[name](data)
			};
		} catch (error) {
			return { error };
		}
	}

	customMessageDone(id, result) {
		if (result.success) {
			this.send("customMessage:done", id, result.data);
			return;
		}
		this.send("customMessage:failed", result.error);
	}

	runResearch(id, { name, paper = null }) {
		const morphologyData = this._researcher.getData("morphology");

		let researcher = this._researcher;

		if (paper !== null) {
			researcher = new _researcher2.default(paper);
			researcher.addResearchData("morphology", morphologyData);
		}

		return researcher.getResearch(name);
	}

	runResearchDone(id, result) {
		if (result.error) {
			this.send("runResearch:failed", id, result);
			return;
		}
		this.send("runResearch:done", id, result);
	}
}
exports.default = AnalysisWebWorker;
