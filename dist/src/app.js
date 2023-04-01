"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

require("./config/config.js");

var _snippetPreview = require("./snippetPreview.js");

var _snippetPreview2 = _interopRequireDefault(_snippetPreview);

var _lodashEs = require("lodash-es");

var _missingArgument = require("./errors/missingArgument");

var _missingArgument2 = _interopRequireDefault(_missingArgument);

var _jed = require("jed");

var _jed2 = _interopRequireDefault(_jed);

var _seoAssessor = require("./seoAssessor.js");

var _seoAssessor2 = _interopRequireDefault(_seoAssessor);

var _KeyphraseDistributionAssessment = require("./assessments/seo/KeyphraseDistributionAssessment.js");

var _KeyphraseDistributionAssessment2 = _interopRequireDefault(_KeyphraseDistributionAssessment);

var _contentAssessor = require("./contentAssessor.js");

var _contentAssessor2 = _interopRequireDefault(_contentAssessor);

var _seoAssessor3 = require("./cornerstone/seoAssessor.js");

var _seoAssessor4 = _interopRequireDefault(_seoAssessor3);

var _contentAssessor3 = require("./cornerstone/contentAssessor.js");

var _contentAssessor4 = _interopRequireDefault(_contentAssessor3);

var _researcher = require("./researcher.js");

var _researcher2 = _interopRequireDefault(_researcher);

var _AssessorPresenter = require("./renderers/AssessorPresenter.js");

var _AssessorPresenter2 = _interopRequireDefault(_AssessorPresenter);

var _pluggable = require("./pluggable.js");

var _pluggable2 = _interopRequireDefault(_pluggable);

var _Paper = require("./values/Paper.js");

var _Paper2 = _interopRequireDefault(_Paper);

var _createMeasurementElement = require("./helpers/createMeasurementElement.js");

var _htmlParser = require("./stringProcessing/htmlParser.js");

var _htmlParser2 = _interopRequireDefault(_htmlParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const keyphraseDistribution = new _KeyphraseDistributionAssessment2.default();

var inputDebounceDelay = 800;

var defaults = {
	callbacks: {
		bindElementEvents: function bindElementEvents() {},
		updateSnippetValues: function updateSnippetValues() {},
		saveScores: function saveScores() {},
		saveContentScore: function saveContentScore() {},
		updatedContentResults: function updatedContentResults() {},
		updatedKeywordsResults: function updatedKeywordsResults() {}
	},
	sampleText: {
		baseUrl: "example.org/",
		snippetCite: "example-post/",
		title: "This is an example title - edit by clicking here",
		keyword: "Choose a focus keyword",
		meta: "Modify your meta description by editing it right here",
		text: "Start writing your text!"
	},
	queue: ["wordCount", "keywordDensity", "subHeadings", "stopwords", "fleschReading", "linkCount", "imageCount", "urlKeyword", "urlLength", "metaDescription", "pageTitleKeyword", "pageTitleWidth", "firstParagraph", "'keywordDoubles"],
	typeDelay: 3000,
	typeDelayStep: 1500,
	maxTypeDelay: 5000,
	dynamicDelay: true,
	locale: "en_US",
	translations: {
		domain: "js-text-analysis",

		locale_data: {
			"js-text-analysis": {
				"": {}
			}
		}
	},
	replaceTarget: [],
	resetTarget: [],
	elementTarget: [],
	marker: function marker() {},
	keywordAnalysisActive: true,
	contentAnalysisActive: true,
	hasSnippetPreview: true,
	debounceRefresh: true
};

function createDefaultSnippetPreview() {
	var targetElement = document.getElementById(this.config.targets.snippet);

	return new _snippetPreview2.default({
		analyzerApp: this,
		targetElement: targetElement,
		callbacks: {
			saveSnippetData: this.config.callbacks.saveSnippetData
		}
	});
}

function isValidSnippetPreview(snippetPreview) {
	return !(0, _lodashEs.isUndefined)(snippetPreview) && _snippetPreview2.default.prototype.isPrototypeOf(snippetPreview);
}

function verifyArguments(args) {
	if (!(0, _lodashEs.isObject)(args.callbacks.getData)) {
		throw new _missingArgument2.default("The app requires an object with a getdata callback.");
	}

	if (!(0, _lodashEs.isObject)(args.targets)) {
		throw new _missingArgument2.default("`targets` is a required App argument, `targets` is not an object.");
	}

	if (args.hasSnippetPreview && !isValidSnippetPreview(args.snippetPreview) && !(0, _lodashEs.isString)(args.targets.snippet)) {
		throw new _missingArgument2.default("A snippet preview is required. When no SnippetPreview object isn't passed to " + "the App, the `targets.snippet` is a required App argument. `targets.snippet` is not a string.");
	}
}

var App = function App(args) {
	if (!(0, _lodashEs.isObject)(args)) {
		args = {};
	}

	(0, _lodashEs.defaultsDeep)(args, defaults);

	verifyArguments(args);

	this.config = args;

	if (args.debouncedRefresh === true) {
		this.refresh = (0, _lodashEs.debounce)(this.refresh.bind(this), inputDebounceDelay);
	}
	this._pureRefresh = (0, _lodashEs.throttle)(this._pureRefresh.bind(this), this.config.typeDelay);

	this.callbacks = this.config.callbacks;
	this.i18n = this.constructI18n(this.config.translations);

	this.initializeAssessors(args);

	this.pluggable = new _pluggable2.default(this);

	this.getData();

	this.defaultOutputElement = this.getDefaultOutputElement(args);

	if (this.defaultOutputElement !== "") {
		this.showLoadingDialog();
	}

	if (isValidSnippetPreview(args.snippetPreview)) {
		this.snippetPreview = args.snippetPreview;

		if (this.snippetPreview.refObj !== this) {
			this.snippetPreview.refObj = this;
			this.snippetPreview._i18n = this.i18n;
		}
	} else if (args.hasSnippetPreview) {
		this.snippetPreview = createDefaultSnippetPreview.call(this);
	}

	this._assessorOptions = {
		useCornerStone: false,
		useKeywordDistribution: false
	};

	this.initSnippetPreview();
	this.initAssessorPresenters();
};

App.prototype.getDefaultOutputElement = function (args) {
	if (args.keywordAnalysisActive) {
		return args.targets.output;
	}

	if (args.contentAnalysisActive) {
		return args.targets.contentOutput;
	}

	return "";
};

App.prototype.changeAssessorOptions = function (assessorOptions) {
	this._assessorOptions = (0, _lodashEs.merge)(this._assessorOptions, assessorOptions);

	this.seoAssessor = this.getSeoAssessor();
	this.contentAssessor = this.getContentAssessor();

	this.initAssessorPresenters();
	this.refresh();
};

App.prototype.getSeoAssessor = function () {
	var _assessorOptions = this._assessorOptions;
	const useCornerStone = _assessorOptions.useCornerStone,
	      useKeywordDistribution = _assessorOptions.useKeywordDistribution;


	const assessor = useCornerStone ? this.cornerStoneSeoAssessor : this.defaultSeoAssessor;
	if (useKeywordDistribution && (0, _lodashEs.isUndefined)(assessor.getAssessment("keyphraseDistribution"))) {
		assessor.addAssessment("keyphraseDistribution", keyphraseDistribution);
	}

	return assessor;
};

App.prototype.getContentAssessor = function () {
	const useCornerStone = this._assessorOptions.useCornerStone;


	if (useCornerStone) {
		return this.cornerStoneContentAssessor;
	}

	return this.defaultContentAssessor;
};

App.prototype.initializeAssessors = function (args) {
	this.initializeSEOAssessor(args);
	this.initializeContentAssessor(args);
};

App.prototype.initializeSEOAssessor = function (args) {
	if (!args.keywordAnalysisActive) {
		return;
	}

	this.defaultSeoAssessor = new _seoAssessor2.default(this.i18n, { marker: this.config.marker });
	this.cornerStoneSeoAssessor = new _seoAssessor4.default(this.i18n, { marker: this.config.marker });

	if ((0, _lodashEs.isUndefined)(args.seoAssessor)) {
		this.seoAssessor = this.defaultSeoAssessor;
	} else {
		this.seoAssessor = args.seoAssessor;
	}
};

App.prototype.initializeContentAssessor = function (args) {
	if (!args.contentAnalysisActive) {
		return;
	}

	this.defaultContentAssessor = new _contentAssessor2.default(this.i18n, { marker: this.config.marker, locale: this.config.locale });
	this.cornerStoneContentAssessor = new _contentAssessor4.default(this.i18n, { marker: this.config.marker, locale: this.config.locale });

	if ((0, _lodashEs.isUndefined)(args._contentAssessor)) {
		this.contentAssessor = this.defaultContentAssessor;
	} else {
		this.contentAssessor = args._contentAssessor;
	}
};

App.prototype.extendConfig = function (args) {
	args.sampleText = this.extendSampleText(args.sampleText);
	args.locale = args.locale || "en_US";

	return args;
};

App.prototype.extendSampleText = function (sampleText) {
	var defaultSampleText = defaults.sampleText;

	if ((0, _lodashEs.isUndefined)(sampleText)) {
		return defaultSampleText;
	}

	for (var key in sampleText) {
		if ((0, _lodashEs.isUndefined)(sampleText[key])) {
			sampleText[key] = defaultSampleText[key];
		}
	}

	return sampleText;
};

App.prototype.constructI18n = function (translations) {
	var defaultTranslations = {
		domain: "js-text-analysis",

		locale_data: {
			"js-text-analysis": {
				"": {}
			}
		}
	};

	translations = translations || defaultTranslations;

	return new _jed2.default(translations);
};

App.prototype.registerCustomDataCallback = function (callback) {
	if (!this.callbacks.custom) {
		this.callbacks.custom = [];
	}

	if ((0, _lodashEs.isFunction)(callback)) {
		this.callbacks.custom.push(callback);
	}
};

App.prototype.getData = function () {
	this.rawData = this.callbacks.getData();

	if ((0, _lodashEs.isArray)(this.callbacks.custom)) {
		this.callbacks.custom.forEach(customCallback => {
			const customData = customCallback();

			this.rawData = (0, _lodashEs.merge)(this.rawData, customData);
		});
	}

	if (this.hasSnippetPreview()) {
		var data = this.snippetPreview.getAnalyzerData();

		this.rawData.metaTitle = data.title;
		this.rawData.url = data.url;
		this.rawData.meta = data.metaDesc;
	}

	if (this.pluggable.loaded) {
		this.rawData.metaTitle = this.pluggable._applyModifications("data_page_title", this.rawData.metaTitle);
		this.rawData.meta = this.pluggable._applyModifications("data_meta_desc", this.rawData.meta);
	}

	this.rawData.titleWidth = (0, _createMeasurementElement.measureTextWidth)(this.rawData.metaTitle);

	this.rawData.locale = this.config.locale;
};

App.prototype.refresh = function () {
	if (!this.pluggable.loaded) {
		return;
	}

	this._pureRefresh();
};

App.prototype._pureRefresh = function () {
	this.getData();
	this.runAnalyzer();
};

App.prototype.hasSnippetPreview = function () {
	return this.snippetPreview !== null && !(0, _lodashEs.isUndefined)(this.snippetPreview);
};

App.prototype.initSnippetPreview = function () {
	if (this.hasSnippetPreview()) {
		this.snippetPreview.renderTemplate();
		this.snippetPreview.callRegisteredEventBinder();
		this.snippetPreview.bindEvents();
		this.snippetPreview.init();
	}
};

App.prototype.initAssessorPresenters = function () {
	if (!(0, _lodashEs.isUndefined)(this.config.targets.output)) {
		this.seoAssessorPresenter = new _AssessorPresenter2.default({
			targets: {
				output: this.config.targets.output
			},
			assessor: this.seoAssessor,
			i18n: this.i18n
		});
	}

	if (!(0, _lodashEs.isUndefined)(this.config.targets.contentOutput)) {
		this.contentAssessorPresenter = new _AssessorPresenter2.default({
			targets: {
				output: this.config.targets.contentOutput
			},
			assessor: this.contentAssessor,
			i18n: this.i18n
		});
	}
};

App.prototype.bindInputEvent = function () {
	for (var i = 0; i < this.config.elementTarget.length; i++) {
		var elem = document.getElementById(this.config.elementTarget[i]);
		elem.addEventListener("input", this.refresh.bind(this));
	}
};

App.prototype.reloadSnippetText = function () {
	if (this.hasSnippetPreview()) {
		this.snippetPreview.reRender();
	}
};

App.prototype.startTime = function () {
	this.startTimestamp = new Date().getTime();
};

App.prototype.endTime = function () {
	this.endTimestamp = new Date().getTime();
	if (this.endTimestamp - this.startTimestamp > this.config.typeDelay) {
		if (this.config.typeDelay < this.config.maxTypeDelay - this.config.typeDelayStep) {
			this.config.typeDelay += this.config.typeDelayStep;
		}
	}
};

App.prototype.runAnalyzer = function () {
	if (this.pluggable.loaded === false) {
		return;
	}

	if (this.config.dynamicDelay) {
		this.startTime();
	}

	this.analyzerData = this.modifyData(this.rawData);

	if (this.hasSnippetPreview()) {
		this.snippetPreview.refresh();
	}

	let text = this.analyzerData.text;

	text = (0, _htmlParser2.default)(text);

	let titleWidth = this.analyzerData.titleWidth;
	if (this.hasSnippetPreview()) {
		titleWidth = this.snippetPreview.getTitleWidth();
	}

	this.paper = new _Paper2.default(text, {
		keyword: this.analyzerData.keyword,
		synonyms: this.analyzerData.synonyms,
		description: this.analyzerData.meta,
		url: this.analyzerData.url,
		title: this.analyzerData.metaTitle,
		titleWidth: titleWidth,
		locale: this.config.locale,
		permalink: this.analyzerData.permalink
	});

	if ((0, _lodashEs.isUndefined)(this.researcher)) {
		this.researcher = new _researcher2.default(this.paper);
	} else {
		this.researcher.setPaper(this.paper);
	}

	this.runKeywordAnalysis();

	this.runContentAnalysis();

	this._renderAnalysisResults();

	if (this.config.dynamicDelay) {
		this.endTime();
	}

	if (this.hasSnippetPreview()) {
		this.snippetPreview.reRender();
	}
};

App.prototype.runKeywordAnalysis = function () {
	if (this.config.keywordAnalysisActive) {
		this.seoAssessor.assess(this.paper);
		const overallSeoScore = this.seoAssessor.calculateOverallScore();

		if (!(0, _lodashEs.isUndefined)(this.callbacks.updatedKeywordsResults)) {
			this.callbacks.updatedKeywordsResults(this.seoAssessor.results, overallSeoScore);
		}

		if (!(0, _lodashEs.isUndefined)(this.callbacks.saveScores)) {
			this.callbacks.saveScores(overallSeoScore, this.seoAssessorPresenter);
		}
	}
};

App.prototype.runContentAnalysis = function () {
	if (this.config.contentAnalysisActive) {
		this.contentAssessor.assess(this.paper);
		const overallContentScore = this.contentAssessor.calculateOverallScore();

		if (!(0, _lodashEs.isUndefined)(this.callbacks.updatedContentResults)) {
			this.callbacks.updatedContentResults(this.contentAssessor.results, overallContentScore);
		}

		if (!(0, _lodashEs.isUndefined)(this.callbacks.saveContentScore)) {
			this.callbacks.saveContentScore(overallContentScore, this.contentAssessorPresenter);
		}
	}
};

App.prototype.modifyData = function (data) {
	data = JSON.parse(JSON.stringify(data));

	data.text = this.pluggable._applyModifications("content", data.text);
	data.metaTitle = this.pluggable._applyModifications("title", data.metaTitle);

	return data;
};

App.prototype.pluginsLoaded = function () {
	this.removeLoadingDialog();
	this.refresh();
};

App.prototype.showLoadingDialog = function () {
	var outputElement = document.getElementById(this.defaultOutputElement);

	if (this.defaultOutputElement !== "" && !(0, _lodashEs.isEmpty)(outputElement)) {
		var dialogDiv = document.createElement("div");
		dialogDiv.className = "YoastSEO_msg";
		dialogDiv.id = "YoastSEO-plugin-loading";
		document.getElementById(this.defaultOutputElement).appendChild(dialogDiv);
	}
};

App.prototype.updateLoadingDialog = function (plugins) {
	var outputElement = document.getElementById(this.defaultOutputElement);

	if (this.defaultOutputElement === "" || (0, _lodashEs.isEmpty)(outputElement)) {
		return;
	}

	var dialog = document.getElementById("YoastSEO-plugin-loading");
	dialog.textContent = "";

	(0, _lodashEs.forEach)(plugins, function (plugin, pluginName) {
		dialog.innerHTML += "<span class=left>" + pluginName + "</span><span class=right " + plugin.status + ">" + plugin.status + "</span><br />";
	});

	dialog.innerHTML += "<span class=bufferbar></span>";
};

App.prototype.removeLoadingDialog = function () {
	var outputElement = document.getElementById(this.defaultOutputElement);
	var loadingDialog = document.getElementById("YoastSEO-plugin-loading");

	if (this.defaultOutputElement !== "" && !(0, _lodashEs.isEmpty)(outputElement) && !(0, _lodashEs.isEmpty)(loadingDialog)) {
		document.getElementById(this.defaultOutputElement).removeChild(document.getElementById("YoastSEO-plugin-loading"));
	}
};

App.prototype.registerPlugin = function (pluginName, options) {
	return this.pluggable._registerPlugin(pluginName, options);
};

App.prototype.pluginReady = function (pluginName) {
	return this.pluggable._ready(pluginName);
};

App.prototype.pluginReloaded = function (pluginName) {
	return this.pluggable._reloaded(pluginName);
};

App.prototype.registerModification = function (modification, callable, pluginName, priority) {
	return this.pluggable._registerModification(modification, callable, pluginName, priority);
};

App.prototype.registerAssessment = function (name, assessment, pluginName) {
	if (!(0, _lodashEs.isUndefined)(this.seoAssessor)) {
		return this.pluggable._registerAssessment(this.defaultSeoAssessor, name, assessment, pluginName) && this.pluggable._registerAssessment(this.cornerStoneSeoAssessor, name, assessment, pluginName);
	}
};

App.prototype.disableMarkers = function () {
	if (!(0, _lodashEs.isUndefined)(this.seoAssessorPresenter)) {
		this.seoAssessorPresenter.disableMarker();
	}

	if (!(0, _lodashEs.isUndefined)(this.contentAssessorPresenter)) {
		this.contentAssessorPresenter.disableMarker();
	}
};

App.prototype._renderAnalysisResults = function () {
	if (this.config.contentAnalysisActive && !(0, _lodashEs.isUndefined)(this.contentAssessorPresenter)) {
		this.contentAssessorPresenter.renderIndividualRatings();
	}
	if (this.config.keywordAnalysisActive && !(0, _lodashEs.isUndefined)(this.seoAssessorPresenter)) {
		this.seoAssessorPresenter.setKeyword(this.paper.getKeyword());
		this.seoAssessorPresenter.render();
	}
};

App.prototype.analyzeTimer = function () {
	this.refresh();
};

App.prototype.registerTest = function () {
	console.error("This function is deprecated, please use registerAssessment");
};

App.prototype.createSnippetPreview = function () {
	this.snippetPreview = createDefaultSnippetPreview.call(this);
	this.initSnippetPreview();
};

App.prototype.switchAssessors = function (useCornerStone) {
	console.warn("Switch assessor is deprecated since YoastSEO.js version 1.35.0");

	this.changeAssessorOptions({
		useCornerStone
	});
};

exports.default = App;
