"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _createWordRegex = require("./stringProcessing/createWordRegex.js");

var _createWordRegex2 = _interopRequireDefault(_createWordRegex);

var _stripHTMLTags = require("./stringProcessing/stripHTMLTags.js");

var _stripSpaces = require("./stringProcessing/stripSpaces.js");

var _stripSpaces2 = _interopRequireDefault(_stripSpaces);

var _replaceDiacritics = require("./stringProcessing/replaceDiacritics.js");

var _replaceDiacritics2 = _interopRequireDefault(_replaceDiacritics);

var _transliterate = require("./stringProcessing/transliterate.js");

var _transliterate2 = _interopRequireDefault(_transliterate);

var _templates = require("./templates.js");

var _templates2 = _interopRequireDefault(_templates);

var _snippetPreviewToggler = require("./snippetPreviewToggler");

var _snippetPreviewToggler2 = _interopRequireDefault(_snippetPreviewToggler);

var _domManipulation = require("./helpers/domManipulation.js");

var _domManipulation2 = _interopRequireDefault(_domManipulation);

var _config = require("./config/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var snippetEditorTemplate = _templates2.default.snippetEditor;
var hiddenElement = _templates2.default.hiddenSpan;

var defaults = {
	data: {
		title: "",
		metaDesc: "",
		urlPath: "",
		titleWidth: 0,
		metaHeight: 0
	},
	placeholder: {
		title: "This is an example title - edit by clicking here",
		metaDesc: "Modify your meta description by editing it right here",
		urlPath: "example-post/"
	},
	defaultValue: {
		title: "",
		metaDesc: ""
	},
	baseURL: "http://example.com/",
	callbacks: {
		saveSnippetData: function saveSnippetData() {}
	},
	addTrailingSlash: true,
	metaDescriptionDate: "",
	previewMode: "desktop"

};

var titleMaxLength = 600;
const maximumMetaDescriptionLength = _config2.default.maxMeta;

var inputPreviewBindings = [{
	preview: "title_container",
	inputField: "title"
}, {
	preview: "url_container",
	inputField: "urlPath"
}, {
	preview: "meta_container",
	inputField: "metaDesc"
}];

var getBaseURL = function getBaseURL() {
	var baseURL = this.opts.baseURL;

	if (this.hasApp() && !(0, _lodashEs.isEmpty)(this.refObj.rawData.baseUrl) && this.opts.baseURL === defaults.baseURL) {
		baseURL = this.refObj.rawData.baseUrl;
	}

	return baseURL;
};

function retrieveUnformattedText(key) {
	return this.data[key];
}

function updateUnformattedText(key, value) {
	this.element.input[key].value = value;

	this.data[key] = value;
}

function hasTrailingSlash(url) {
	return url.indexOf("/") === url.length - 1;
}

function hasProgressSupport() {
	var progressElement = document.createElement("progress");

	return !(0, _lodashEs.isUndefined)(progressElement.max);
}

function rateTitleLength(titleLength) {
	var rating;

	switch (true) {
		case titleLength > 0 && titleLength <= 399:
		case titleLength > 600:
			rating = "ok";
			break;

		case titleLength >= 400 && titleLength <= 600:
			rating = "good";
			break;

		default:
			rating = "bad";
			break;
	}

	return rating;
}

function rateMetaDescLength(metaDescLength) {
	var rating;

	switch (true) {
		case metaDescLength > 0 && metaDescLength < 120:
		case metaDescLength > maximumMetaDescriptionLength:
			rating = "ok";
			break;

		case metaDescLength >= 120 && metaDescLength <= maximumMetaDescriptionLength:
			rating = "good";
			break;

		default:
			rating = "bad";
			break;
	}

	return rating;
}

function updateProgressBar(element, value, maximum, rating) {
	var barElement,
	    progress,
	    allClasses = ["snippet-editor__progress--bad", "snippet-editor__progress--ok", "snippet-editor__progress--good"];

	element.value = value;
	_domManipulation2.default.removeClasses(element, allClasses);
	_domManipulation2.default.addClass(element, "snippet-editor__progress--" + rating);

	if (!this.hasProgressSupport) {
		barElement = element.getElementsByClassName("snippet-editor__progress-bar")[0];
		progress = value / maximum * 100;

		barElement.style.width = progress + "%";
	}
}

var SnippetPreview = function SnippetPreview(opts) {
	(0, _lodashEs.defaultsDeep)(opts, defaults);

	this.data = opts.data;

	if (!(0, _lodashEs.isUndefined)(opts.analyzerApp)) {
		this.refObj = opts.analyzerApp;
		this.i18n = this.refObj.i18n;

		this.data = {
			title: this.refObj.rawData.snippetTitle || "",
			urlPath: this.refObj.rawData.snippetCite || "",
			metaDesc: this.refObj.rawData.snippetMeta || ""
		};

		if (!(0, _lodashEs.isEmpty)(this.refObj.rawData.metaTitle)) {
			opts.placeholder.title = this.refObj.rawData.metaTitle;
		}
	}

	if (!(0, _lodashEs.isUndefined)(opts.i18n)) {
		this.i18n = opts.i18n;
	}

	if (!(0, _lodashEs.isElement)(opts.targetElement)) {
		throw new Error("The snippet preview requires a valid target element");
	}

	this.opts = opts;
	this._currentFocus = null;
	this._currentHover = null;

	this.unformattedText = {};
	Object.defineProperty(this.unformattedText, "snippet_cite", {
		get: retrieveUnformattedText.bind(this, "urlPath"),
		set: updateUnformattedText.bind(this, "urlPath")
	});
	Object.defineProperty(this.unformattedText, "snippet_meta", {
		get: retrieveUnformattedText.bind(this, "metaDesc"),
		set: updateUnformattedText.bind(this, "metaDesc")
	});
	Object.defineProperty(this.unformattedText, "snippet_title", {
		get: retrieveUnformattedText.bind(this, "title"),
		set: updateUnformattedText.bind(this, "title")
	});
};

SnippetPreview.prototype.renderTemplate = function () {
	var targetElement = this.opts.targetElement;

	targetElement.innerHTML = snippetEditorTemplate({
		raw: {
			title: this.data.title,
			snippetCite: this.data.urlPath,
			meta: this.data.metaDesc
		},
		rendered: {
			title: this.formatTitle(),
			baseUrl: this.formatUrl(),
			snippetCite: this.formatCite(),
			meta: this.formatMeta()
		},
		metaDescriptionDate: this.opts.metaDescriptionDate,
		placeholder: this.opts.placeholder,
		i18n: {
			edit: this.i18n.dgettext("js-text-analysis", "Edit snippet"),
			title: this.i18n.dgettext("js-text-analysis", "SEO title"),
			slug: this.i18n.dgettext("js-text-analysis", "Slug"),
			metaDescription: this.i18n.dgettext("js-text-analysis", "Meta description"),
			save: this.i18n.dgettext("js-text-analysis", "Close snippet editor"),
			snippetPreview: this.i18n.dgettext("js-text-analysis", "Google preview"),
			titleLabel: this.i18n.dgettext("js-text-analysis", "SEO title preview:"),
			slugLabel: this.i18n.dgettext("js-text-analysis", "Slug preview:"),
			metaDescriptionLabel: this.i18n.dgettext("js-text-analysis", "Meta description preview:"),
			snippetPreviewDescription: this.i18n.dgettext("js-text-analysis", "You can click on each element in the preview to jump to the Snippet Editor."),
			desktopPreviewMode: this.i18n.dgettext("js-text-analysis", "Desktop preview"),
			mobilePreviewMode: this.i18n.dgettext("js-text-analysis", "Mobile preview"),
			isScrollableHint: this.i18n.dgettext("js-text-analysis", "Scroll to see the preview content.")
		}
	});

	this.element = {
		measurers: {
			metaHeight: null
		},
		rendered: {
			title: document.getElementById("snippet_title"),
			urlBase: document.getElementById("snippet_citeBase"),
			urlPath: document.getElementById("snippet_cite"),
			metaDesc: document.getElementById("snippet_meta")
		},
		input: {
			title: targetElement.getElementsByClassName("js-snippet-editor-title")[0],
			urlPath: targetElement.getElementsByClassName("js-snippet-editor-slug")[0],
			metaDesc: targetElement.getElementsByClassName("js-snippet-editor-meta-description")[0]
		},
		progress: {
			title: targetElement.getElementsByClassName("snippet-editor__progress-title")[0],
			metaDesc: targetElement.getElementsByClassName("snippet-editor__progress-meta-description")[0]
		},
		container: document.getElementById("snippet_preview"),
		formContainer: targetElement.getElementsByClassName("snippet-editor__form")[0],
		editToggle: targetElement.getElementsByClassName("snippet-editor__edit-button")[0],
		closeEditor: targetElement.getElementsByClassName("snippet-editor__submit")[0],
		formFields: targetElement.getElementsByClassName("snippet-editor__form-field")
	};

	this.element.label = {
		title: this.element.input.title.parentNode,
		urlPath: this.element.input.urlPath.parentNode,
		metaDesc: this.element.input.metaDesc.parentNode
	};

	this.element.preview = {
		title: this.element.rendered.title.parentNode,
		urlPath: this.element.rendered.urlPath.parentNode,
		metaDesc: this.element.rendered.metaDesc.parentNode
	};

	this.hasProgressSupport = hasProgressSupport();

	if (this.hasProgressSupport) {
		this.element.progress.title.max = titleMaxLength;
		this.element.progress.metaDesc.max = maximumMetaDescriptionLength;
	} else {
		(0, _lodashEs.forEach)(this.element.progress, function (progressElement) {
			_domManipulation2.default.addClass(progressElement, "snippet-editor__progress--fallback");
		});
	}

	this.initPreviewToggler();
	this.setInitialView();

	this.opened = false;
	this.createMeasurementElements();
	this.updateProgressBars();
};

SnippetPreview.prototype.initPreviewToggler = function () {
	this.snippetPreviewToggle = new _snippetPreviewToggler2.default(this.opts.previewMode, this.opts.targetElement.getElementsByClassName("snippet-editor__view-icon"));
	this.snippetPreviewToggle.initialize();
	this.snippetPreviewToggle.bindEvents();
};

SnippetPreview.prototype.refresh = function () {
	this.output = this.htmlOutput();
	this.renderOutput();
	this.renderSnippetStyle();
	this.measureTitle();
	this.measureMetaDescription();
	this.updateProgressBars();
};

function getAnalyzerTitle() {
	var title = this.data.title;

	if ((0, _lodashEs.isEmpty)(title)) {
		title = this.opts.defaultValue.title;
	}

	if (this.hasPluggable()) {
		title = this.refObj.pluggable._applyModifications("data_page_title", title);
	}

	return (0, _stripSpaces2.default)(title);
}

var getAnalyzerMetaDesc = function getAnalyzerMetaDesc() {
	var metaDesc = this.data.metaDesc;

	if ((0, _lodashEs.isEmpty)(metaDesc)) {
		metaDesc = this.opts.defaultValue.metaDesc;
	}

	if (this.hasPluggable()) {
		metaDesc = this.refObj.pluggable._applyModifications("data_meta_desc", metaDesc);
	}

	if (!(0, _lodashEs.isEmpty)(this.opts.metaDescriptionDate) && !(0, _lodashEs.isEmpty)(metaDesc)) {
		metaDesc = this.opts.metaDescriptionDate + " - " + this.data.metaDesc;
	}

	return (0, _stripSpaces2.default)(metaDesc);
};

SnippetPreview.prototype.getAnalyzerData = function () {
	return {
		title: getAnalyzerTitle.call(this),
		url: this.data.urlPath,
		metaDesc: getAnalyzerMetaDesc.call(this)
	};
};

SnippetPreview.prototype.callRegisteredEventBinder = function () {
	if (this.hasApp()) {
		this.refObj.callbacks.bindElementEvents(this.refObj);
	}
};

SnippetPreview.prototype.init = function () {
	if (this.hasApp() && this.refObj.rawData.metaTitle !== null && this.refObj.rawData.cite !== null) {
		this.refresh();
	}
};

SnippetPreview.prototype.htmlOutput = function () {
	var html = {};
	html.title = this.formatTitle();
	html.cite = this.formatCite();
	html.meta = this.formatMeta();
	html.url = this.formatUrl();
	return html;
};

SnippetPreview.prototype.formatTitle = function () {
	var title = this.data.title;

	if ((0, _lodashEs.isEmpty)(title)) {
		title = this.opts.defaultValue.title;
	}

	if ((0, _lodashEs.isEmpty)(title)) {
		title = this.opts.placeholder.title;
	}

	if (this.hasPluggable() && this.refObj.pluggable.loaded) {
		title = this.refObj.pluggable._applyModifications("data_page_title", title);
	}

	title = (0, _stripHTMLTags.stripFullTags)(title);

	if ((0, _lodashEs.isEmpty)(title)) {
		title = this.i18n.dgettext("js-text-analysis", "Please provide an SEO title by editing the snippet below.");
	}

	return title;
};

SnippetPreview.prototype.formatUrl = function () {
	var url = getBaseURL.call(this);

	return url.replace(/http:\/\//ig, "");
};

SnippetPreview.prototype.formatCite = function () {
	var cite = this.data.urlPath;

	cite = (0, _replaceDiacritics2.default)((0, _stripHTMLTags.stripFullTags)(cite));

	if ((0, _lodashEs.isEmpty)(cite)) {
		cite = this.opts.placeholder.urlPath;
	}

	if (this.hasApp() && !(0, _lodashEs.isEmpty)(this.refObj.rawData.keyword)) {
		cite = this.formatKeywordUrl(cite);
	}

	if (this.opts.addTrailingSlash && !hasTrailingSlash(cite)) {
		cite = cite + "/";
	}

	cite = cite.replace(/\s/g, "-");

	cite = cite.replace(/\?|#/g, "");

	return cite;
};

SnippetPreview.prototype.formatMeta = function () {
	var meta = this.data.metaDesc;

	if ((0, _lodashEs.isEmpty)(meta)) {
		meta = this.getMetaText();
	}

	if (this.hasPluggable() && this.refObj.pluggable.loaded) {
		meta = this.refObj.pluggable._applyModifications("data_meta_desc", meta);
	}

	meta = (0, _stripHTMLTags.stripFullTags)(meta);

	meta = meta.substring(0, maximumMetaDescriptionLength);

	if (this.hasApp() && !(0, _lodashEs.isEmpty)(this.refObj.rawData.keyword)) {
		meta = this.formatKeyword(meta);
	}

	if ((0, _lodashEs.isEmpty)(meta)) {
		meta = this.i18n.dgettext("js-text-analysis", "Please provide a meta description by editing the snippet below.");
	}

	return meta;
};

SnippetPreview.prototype.getMetaText = function () {
	var metaText = this.opts.defaultValue.metaDesc;

	if (this.hasApp() && !(0, _lodashEs.isUndefined)(this.refObj.rawData.excerpt) && (0, _lodashEs.isEmpty)(metaText)) {
		metaText = this.refObj.rawData.excerpt;
	}

	if (this.hasApp() && !(0, _lodashEs.isUndefined)(this.refObj.rawData.text) && (0, _lodashEs.isEmpty)(metaText)) {
		metaText = this.refObj.rawData.text;

		if (this.hasPluggable() && this.refObj.pluggable.loaded) {
			metaText = this.refObj.pluggable._applyModifications("content", metaText);
		}
	}

	metaText = (0, _stripHTMLTags.stripFullTags)(metaText);

	return metaText.substring(0, maximumMetaDescriptionLength);
};

SnippetPreview.prototype.getIndexMatches = function () {
	var indexMatches = [];
	var i = 0;

	var match = this.refObj.rawData.text.indexOf(this.refObj.rawData.keyword, i);

	while (match > -1) {
		indexMatches.push(match);

		i = match + this.refObj.rawData.keyword.length;
		match = this.refObj.rawData.text.indexOf(this.refObj.rawData.keyword, i);
	}
	return indexMatches;
};

SnippetPreview.prototype.getPeriodMatches = function () {
	var periodMatches = [0];
	var match;
	var i = 0;
	while ((match = this.refObj.rawData.text.indexOf(".", i)) > -1) {
		periodMatches.push(match);
		i = match + 1;
	}
	return periodMatches;
};

SnippetPreview.prototype.formatKeyword = function (textString) {
	var keyword = this.refObj.rawData.keyword;

	var keywordRegex = (0, _createWordRegex2.default)(keyword, "", false);

	textString = textString.replace(keywordRegex, function (str) {
		return "<strong>" + str + "</strong>";
	});

	var transliterateKeyword = (0, _transliterate2.default)(keyword, this.refObj.rawData.locale);
	if (transliterateKeyword !== keyword) {
		keywordRegex = (0, _createWordRegex2.default)(transliterateKeyword, "", false);
		textString = textString.replace(keywordRegex, function (str) {
			return "<strong>" + str + "</strong>";
		});
	}
	return textString;
};

SnippetPreview.prototype.formatKeywordUrl = function (textString) {
	var keyword = this.refObj.rawData.keyword;
	keyword = (0, _transliterate2.default)(keyword, this.refObj.rawData.locale);
	keyword = keyword.replace(/'/, "");

	var dashedKeyword = keyword.replace(/\s/g, "-");

	var keywordRegex = (0, _createWordRegex2.default)(dashedKeyword, "\\-");

	return textString.replace(keywordRegex, function (str) {
		return "<strong>" + str + "</strong>";
	});
};

SnippetPreview.prototype.renderOutput = function () {
	this.element.rendered.title.innerHTML = this.output.title;
	this.element.rendered.urlPath.innerHTML = this.output.cite;
	this.element.rendered.urlBase.innerHTML = this.output.url;
	this.element.rendered.metaDesc.innerHTML = this.output.meta;
};

SnippetPreview.prototype.renderSnippetStyle = function () {
	var metaDescElement = this.element.rendered.metaDesc;
	var metaDesc = getAnalyzerMetaDesc.call(this);

	if ((0, _lodashEs.isEmpty)(metaDesc)) {
		_domManipulation2.default.addClass(metaDescElement, "desc-render");
		_domManipulation2.default.removeClass(metaDescElement, "desc-default");
	} else {
		_domManipulation2.default.addClass(metaDescElement, "desc-default");
		_domManipulation2.default.removeClass(metaDescElement, "desc-render");
	}
};

SnippetPreview.prototype.reRender = function () {
	this.init();
};

SnippetPreview.prototype.checkTextLength = function (event) {
	var text = event.currentTarget.textContent;
	switch (event.currentTarget.id) {
		case "snippet_meta":
			event.currentTarget.className = "desc";
			if (text.length > maximumMetaDescriptionLength) {
				YoastSEO.app.snippetPreview.unformattedText.snippet_meta = event.currentTarget.textContent;

				event.currentTarget.textContent = text.substring(0, maximumMetaDescriptionLength);
			}
			break;
		case "snippet_title":
			event.currentTarget.className = "title";
			if (text.length > titleMaxLength) {
				YoastSEO.app.snippetPreview.unformattedText.snippet_title = event.currentTarget.textContent;

				event.currentTarget.textContent = text.substring(0, titleMaxLength);
			}
			break;
		default:
			break;
	}
};

SnippetPreview.prototype.getUnformattedText = function (event) {
	var currentElement = event.currentTarget.id;
	if (typeof this.unformattedText[currentElement] !== "undefined") {
		event.currentTarget.textContent = this.unformattedText[currentElement];
	}
};

SnippetPreview.prototype.setUnformattedText = function (event) {
	var elem = event.currentTarget.id;
	this.unformattedText[elem] = document.getElementById(elem).textContent;
};

SnippetPreview.prototype.validateFields = function () {
	var metaDescription = getAnalyzerMetaDesc.call(this);
	var title = getAnalyzerTitle.call(this);

	if (metaDescription.length > maximumMetaDescriptionLength) {
		_domManipulation2.default.addClass(this.element.input.metaDesc, "snippet-editor__field--invalid");
	} else {
		_domManipulation2.default.removeClass(this.element.input.metaDesc, "snippet-editor__field--invalid");
	}

	if (title.length > titleMaxLength) {
		_domManipulation2.default.addClass(this.element.input.title, "snippet-editor__field--invalid");
	} else {
		_domManipulation2.default.removeClass(this.element.input.title, "snippet-editor__field--invalid");
	}
};

SnippetPreview.prototype.updateProgressBars = function () {
	var metaDescriptionRating, titleRating, metaDescription;

	metaDescription = getAnalyzerMetaDesc.call(this);

	titleRating = rateTitleLength(this.data.titleWidth);
	metaDescriptionRating = rateMetaDescLength(metaDescription.length);

	updateProgressBar.call(this, this.element.progress.title, this.data.titleWidth, titleMaxLength, titleRating);

	updateProgressBar.call(this, this.element.progress.metaDesc, metaDescription.length, maximumMetaDescriptionLength, metaDescriptionRating);
};

SnippetPreview.prototype.setInitialView = function () {
	var previewWidth = document.getElementById("snippet_preview").getBoundingClientRect().width;
	this.snippetPreviewToggle.setVisibility(previewWidth);
};

SnippetPreview.prototype.handleWindowResizing = (0, _lodashEs.debounce)(function () {
	var previewWidth = document.getElementById("snippet_preview").getBoundingClientRect().width;
	this.snippetPreviewToggle.setScrollHintVisibility(previewWidth);
}, 25);

SnippetPreview.prototype.bindEvents = function () {
	var targetElement,
	    elems = ["title", "slug", "meta-description"];

	(0, _lodashEs.forEach)(elems, function (elem) {
		targetElement = document.getElementsByClassName("js-snippet-editor-" + elem)[0];

		targetElement.addEventListener("keydown", this.changedInput.bind(this));
		targetElement.addEventListener("keyup", this.changedInput.bind(this));

		targetElement.addEventListener("input", this.changedInput.bind(this));
		targetElement.addEventListener("focus", this.changedInput.bind(this));
		targetElement.addEventListener("blur", this.changedInput.bind(this));
	}.bind(this));

	this.element.editToggle.addEventListener("click", this.toggleEditor.bind(this));
	this.element.closeEditor.addEventListener("click", this.closeEditor.bind(this));

	window.addEventListener("resize", this.handleWindowResizing.bind(this));

	(0, _lodashEs.forEach)(inputPreviewBindings, function (binding) {
		var previewElement = document.getElementById(binding.preview);
		var inputElement = this.element.input[binding.inputField];

		previewElement.addEventListener("click", function () {
			this.openEditor();
			inputElement.focus();
		}.bind(this));

		inputElement.addEventListener("focus", function () {
			this._currentFocus = binding.inputField;

			this._updateFocusCarets();
		}.bind(this));

		inputElement.addEventListener("blur", function () {
			this._currentFocus = null;

			this._updateFocusCarets();
		}.bind(this));

		previewElement.addEventListener("mouseover", function () {
			this._currentHover = binding.inputField;

			this._updateHoverCarets();
		}.bind(this));

		previewElement.addEventListener("mouseout", function () {
			this._currentHover = null;

			this._updateHoverCarets();
		}.bind(this));
	}.bind(this));
};

SnippetPreview.prototype.changedInput = (0, _lodashEs.debounce)(function () {
	this.updateDataFromDOM();
	this.validateFields();
	this.updateProgressBars();

	this.refresh();

	if (this.hasApp()) {
		this.refObj.refresh();
	}
}, 25);

SnippetPreview.prototype.updateDataFromDOM = function () {
	this.data.title = this.element.input.title.value;
	this.data.urlPath = this.element.input.urlPath.value;
	this.data.metaDesc = this.element.input.metaDesc.value;

	this.opts.callbacks.saveSnippetData((0, _lodashEs.clone)(this.data));
};

SnippetPreview.prototype.openEditor = function () {
	this.element.editToggle.setAttribute("aria-expanded", "true");

	_domManipulation2.default.removeClass(this.element.formContainer, "snippet-editor--hidden");

	this.opened = true;
};

SnippetPreview.prototype.closeEditor = function () {
	_domManipulation2.default.addClass(this.element.formContainer, "snippet-editor--hidden");

	this.element.editToggle.setAttribute("aria-expanded", "false");
	this.element.editToggle.focus();

	this.opened = false;
};

SnippetPreview.prototype.toggleEditor = function () {
	if (this.opened) {
		this.closeEditor();
	} else {
		this.openEditor();
	}
};

SnippetPreview.prototype._updateFocusCarets = function () {
	var focusedLabel, focusedPreview;

	(0, _lodashEs.forEach)(this.element.label, function (element) {
		_domManipulation2.default.removeClass(element, "snippet-editor__label--focus");
	});

	(0, _lodashEs.forEach)(this.element.preview, function (element) {
		_domManipulation2.default.removeClass(element, "snippet-editor__container--focus");
	});

	if (null !== this._currentFocus) {
		focusedLabel = this.element.label[this._currentFocus];
		focusedPreview = this.element.preview[this._currentFocus];

		_domManipulation2.default.addClass(focusedLabel, "snippet-editor__label--focus");
		_domManipulation2.default.addClass(focusedPreview, "snippet-editor__container--focus");
	}
};

SnippetPreview.prototype._updateHoverCarets = function () {
	var hoveredLabel;

	(0, _lodashEs.forEach)(this.element.label, function (element) {
		_domManipulation2.default.removeClass(element, "snippet-editor__label--hover");
	});

	if (null !== this._currentHover) {
		hoveredLabel = this.element.label[this._currentHover];

		_domManipulation2.default.addClass(hoveredLabel, "snippet-editor__label--hover");
	}
};

SnippetPreview.prototype.setTitle = function (title) {
	this.element.input.title.value = title;

	this.changedInput();
};

SnippetPreview.prototype.setUrlPath = function (urlPath) {
	this.element.input.urlPath.value = urlPath;

	this.changedInput();
};

SnippetPreview.prototype.setMetaDescription = function (metaDesc) {
	this.element.input.metaDesc.value = metaDesc;

	this.changedInput();
};

SnippetPreview.prototype.createMeasurementElements = function () {
	var metaDescriptionElement, spanHolder;
	metaDescriptionElement = hiddenElement({
		width: document.getElementById("meta_container").offsetWidth + "px",
		whiteSpace: ""
	});

	spanHolder = document.createElement("div");
	spanHolder.className = "yoast-measurement-elements-holder";

	spanHolder.innerHTML = metaDescriptionElement;

	document.body.appendChild(spanHolder);

	this.element.measurers.metaHeight = spanHolder.childNodes[0];
};

SnippetPreview.prototype.measureTitle = function () {
	if (this.element.rendered.title.offsetWidth !== 0 || this.element.rendered.title.textContent === "") {
		this.data.titleWidth = this.element.rendered.title.offsetWidth;
	}
};

SnippetPreview.prototype.measureMetaDescription = function () {
	var metaHeightElement = this.element.measurers.metaHeight;

	metaHeightElement.innerHTML = this.element.rendered.metaDesc.innerHTML;

	this.data.metaHeight = metaHeightElement.offsetHeight;
};

SnippetPreview.prototype.getTitleWidth = function () {
	return this.data.titleWidth;
};

SnippetPreview.prototype.setTitleWidth = function (titleWidth) {
	this.data.titleWidth = titleWidth;
};

SnippetPreview.prototype.hasApp = function () {
	return !(0, _lodashEs.isUndefined)(this.refObj);
};

SnippetPreview.prototype.hasPluggable = function () {
	return !(0, _lodashEs.isUndefined)(this.refObj) && !(0, _lodashEs.isUndefined)(this.refObj.pluggable);
};

SnippetPreview.prototype.disableEnter = function (ev) {};

SnippetPreview.prototype.textFeedback = function (ev) {};

SnippetPreview.prototype.showEditIcon = function (ev) {};

SnippetPreview.prototype.hideEditIcon = function () {};

SnippetPreview.prototype.setFocus = function (ev) {};

exports.default = SnippetPreview;
