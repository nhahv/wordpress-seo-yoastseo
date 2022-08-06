"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var _domManipulation = require("./helpers/domManipulation.js");

var _domManipulation2 = _interopRequireDefault(_domManipulation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var previewModes = {
  desktop: "snippet-editor__view--desktop",
  mobile: "snippet-editor__view--mobile"
};

var minimumDesktopWidth = 640;

var SnippetPreviewToggler = function SnippetPreviewToggler(previewMode, previewToggles) {
  this.previewMode = previewMode;
  this.previewToggles = previewToggles;
  this.viewElement = document.getElementById("snippet-preview-view");
};

SnippetPreviewToggler.prototype.initialize = function () {
  this._setPreviewMode(this.previewMode, this._findElementByMode(this.previewMode));
};

SnippetPreviewToggler.prototype.bindClickEvent = function (previewToggle) {
  previewToggle.addEventListener("click", function () {
    this._setPreviewMode(previewToggle.getAttribute("data-type"), previewToggle);
    this.removeTooltipAbility(previewToggle);
  }.bind(this));
};

SnippetPreviewToggler.prototype.bindMouseleaveEvent = function (previewToggle) {
  previewToggle.addEventListener("mouseleave", function () {
    this.removeTooltipAbility(previewToggle);
  }.bind(this));
};

SnippetPreviewToggler.prototype.bindBlurEvent = function (previewToggle) {
  previewToggle.addEventListener("blur", function () {
    this.restoreTooltipAbility(previewToggle);
  }.bind(this));
};

SnippetPreviewToggler.prototype.bindMouseenterEvent = function (previewToggle) {
  previewToggle.addEventListener("mouseenter", function () {
    this.restoreTooltipAbility(previewToggle);
  }.bind(this));
};

SnippetPreviewToggler.prototype.bindEvents = function () {
  (0, _lodashEs.forEach)(this.previewToggles, function (previewToggle) {
    this.bindClickEvent(previewToggle);
    this.bindMouseleaveEvent(previewToggle);
    this.bindBlurEvent(previewToggle);
    this.bindMouseenterEvent(previewToggle);
  }.bind(this));
};

SnippetPreviewToggler.prototype._findElementByMode = function (previewMode) {
  return document.getElementsByClassName("snippet-editor__view-icon-" + previewMode)[0];
};

SnippetPreviewToggler.prototype._setPreviewMode = function (previewMode, toggleElement) {
  this._removeActiveStates();
  this._setActiveState(toggleElement);

  _domManipulation2.default.removeClass(this.viewElement, previewModes[this.previewMode]);
  _domManipulation2.default.addClass(this.viewElement, previewModes[previewMode]);

  this.previewMode = previewMode;
};

SnippetPreviewToggler.prototype.setDesktopMode = function () {
  this._setPreviewMode("desktop", this._findElementByMode("desktop"));
};

SnippetPreviewToggler.prototype.setMobileMode = function () {
  this._setPreviewMode("mobile", this._findElementByMode("mobile"));
};

SnippetPreviewToggler.prototype.setVisibility = function (previewWidth) {
  if (previewWidth < minimumDesktopWidth) {
    this.setMobileMode();

    _domManipulation2.default.addClass(this.viewElement, "snippet-editor__view--desktop-has-scroll");
  } else {
    this.setDesktopMode();
  }
};

SnippetPreviewToggler.prototype.setScrollHintVisibility = function (previewWidth) {
  _domManipulation2.default.removeClass(this.viewElement, "snippet-editor__view--desktop-has-scroll");
  if (previewWidth < minimumDesktopWidth) {
    _domManipulation2.default.addClass(this.viewElement, "snippet-editor__view--desktop-has-scroll");
  }
};

SnippetPreviewToggler.prototype._removeActiveStates = function () {
  (0, _lodashEs.forEach)(this.previewToggles, this._removeActiveState.bind(this));
};

SnippetPreviewToggler.prototype._removeActiveState = function (previewToggle) {
  _domManipulation2.default.removeClass(previewToggle, "snippet-editor__view-icon-" + previewToggle.getAttribute("data-type") + "--active");
  _domManipulation2.default.removeClass(previewToggle, "snippet-editor__view-icon--active");
  previewToggle.setAttribute("aria-pressed", "false");
};

SnippetPreviewToggler.prototype.removeTooltipAbility = function (previewToggle) {
  _domManipulation2.default.addClass(previewToggle, "yoast-tooltip-hidden");
};

SnippetPreviewToggler.prototype.restoreTooltipAbility = function (previewToggle) {
  _domManipulation2.default.removeClass(previewToggle, "yoast-tooltip-hidden");
};

SnippetPreviewToggler.prototype._setActiveState = function (elementToActivate) {
  _domManipulation2.default.addClass(elementToActivate, "snippet-editor__view-icon-" + elementToActivate.getAttribute("data-type") + "--active");
  _domManipulation2.default.addClass(elementToActivate, "snippet-editor__view-icon--active");
  elementToActivate.setAttribute("aria-pressed", "true");
};

exports.default = SnippetPreviewToggler;
