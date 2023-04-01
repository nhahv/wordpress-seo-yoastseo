'use strict';

;(function () {
  var undefined;

  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  var root = freeGlobal || freeSelf || Function('return this')();

  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  var undefined;

  var VERSION = '4.17.4';

  var INFINITY = 1 / 0;

  var nullTag = '[object Null]',
      symbolTag = '[object Symbol]',
      undefinedTag = '[object Undefined]';

  var reUnescapedHtml = /[&<>"']/g,
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  var root = freeGlobal || freeSelf || Function('return this')();

  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  function basePropertyOf(object) {
    return function (key) {
      return object == null ? undefined : object[key];
    };
  }

  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  var objectProto = Object.prototype;

  var hasOwnProperty = objectProto.hasOwnProperty;

  var nativeObjectToString = objectProto.toString;

  var Symbol = root.Symbol,
      symToStringTag = Symbol ? Symbol.toStringTag : undefined;

  var realNames = {};

  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }

  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    if (isArray(value)) {
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  var isArray = Array.isArray;

  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }

  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  function escape(string) {
    string = toString(string);
    return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
  }

  var _ = { 'escape': escape };

  var templates = {
    'assessmentPresenterResult': {},
    'hiddenSpan': {},
    'relevantWords': {},
    'snippetEditor': {}
  };

  templates['assessmentPresenterResult'] = function (obj) {
    obj || (obj = {});
    var _obj = obj;
    const scores = _obj.scores,
          markerButtonsDisabled = _obj.markerButtonsDisabled,
          i18n = _obj.i18n,
          activeMarker = _obj.activeMarker;

    var __t,
        __p = '',
        __e = _.escape,
        __j = Array.prototype.join;
    function print() {
      __p += __j.call(arguments, '');
    }
    __p += '<ul class="wpseoanalysis assessment-results">\n    ';
    for (var i in scores) {
      __p += '\n        <li class="score">\n            <span class="assessment-results__mark-container">\n                ';
      if (scores[i].marker) {
        __p += '\n                    <button type="button" ';
        if (markerButtonsDisabled) {
          __p += ' disabled="disabled" ';
        }
        __p += '\n                        aria-label="';
        if (markerButtonsDisabled) {
          __p += (__t = i18n.disabledMarkText) == null ? '' : __t;
        } else if (scores[i].identifier === activeMarker) {
          __p += (__t = i18n.removeMarksInText) == null ? '' : __t;
        } else {
          __p += (__t = i18n.markInText) == null ? '' : __t;
        }
        __p += '"\n                        class="assessment-results__mark ';

        if (markerButtonsDisabled) {
          __p += ' icon-eye-disabled ';
        } else if (scores[i].identifier === activeMarker) {
          __p += '\n                            icon-eye-active\n                        ';
        } else {
          __p += '\n                            icon-eye-inactive\n                        ';
        }
        __p += '\n                        js-assessment-results__mark-' + ((__t = scores[i].identifier) == null ? '' : __t) + ' yoast-tooltip yoast-tooltip-s">\n                        <span class="screen-reader-text">';
        if (markerButtonsDisabled) {
          __p += (__t = i18n.disabledMarkText) == null ? '' : __t;
        } else if (scores[i].identifier === activeMarker) {
          __p += (__t = i18n.removeMarksInText) == null ? '' : __t;
        } else {
          __p += (__t = i18n.markInText) == null ? '' : __t;
        }
        __p += '\n                        </span></button>\n                ';
      }
      __p += '\n            </span>\n            <span class="wpseo-score-icon ' + __e(scores[i].className) + '"></span>\n            <span class="screen-reader-text">' + ((__t = scores[i].screenReaderText) == null ? '' : __t) + '</span>\n            <span class="wpseo-score-text">' + ((__t = scores[i].text) == null ? '' : __t) + '</span>\n        </li>\n    ';
    }
    __p += '\n</ul>\n';
    return __p;
  };

  templates['hiddenSpan'] = function (obj) {
    obj || (obj = {});
    var _obj2 = obj;
    const whiteSpace = _obj2.whiteSpace,
          width = _obj2.width;

    var __t,
        __p = '',
        __e = _.escape,
        __j = Array.prototype.join;
    function print() {
      __p += __j.call(arguments, '');
    }
    __p += '<span aria-hidden="true" style="width: ' + __e(width) + '; height: auto; position: absolute; visibility: hidden; ';
    if ("" !== whiteSpace) {
      __p += 'white-space: ' + __e(whiteSpace);
    }
    __p += '">\n\n</span>\n';
    return __p;
  };

  templates['relevantWords'] = function (obj) {
    obj || (obj = {});
    var _obj3 = obj;
    const words = _obj3.words;

    var __t,
        __p = '',
        __j = Array.prototype.join;
    function print() {
      __p += __j.call(arguments, '');
    }
    __p += '<table>\n    <tr>\n        <th>Word</th>\n        <th>Density</th>\n        <th>Occurrences</th>\n        <th>Length</th>\n        <th>Relevant word percentage</th>\n        <th>Length bonus</th>\n        <th>Multiplier</th>\n        <th>Relevance</th>\n    </tr>\n    ';
    for (var i in words) {
      __p += '\n        <tr>\n            <td>' + ((__t = words[i].word) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].density) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].occurrences) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].length) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].relevantWordPercentage) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].lengthBonus) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].multiplier) == null ? '' : __t) + '</td>\n            <td>' + ((__t = words[i].relevance) == null ? '' : __t) + '</td>\n        </tr>\n    ';
    }
    __p += '\n</table>\n';
    return __p;
  };

  templates['snippetEditor'] = function (obj) {
    obj || (obj = {});
    var _obj4 = obj;
    const i18n = _obj4.i18n,
          rendered = _obj4.rendered,
          metaDescriptionDate = _obj4.metaDescriptionDate,
          raw = _obj4.raw,
          placeholder = _obj4.placeholder;

    var __t,
        __p = '',
        __e = _.escape,
        __j = Array.prototype.join;
    function print() {
      __p += __j.call(arguments, '');
    }
    __p += '<div id="snippet_preview" class="yoast-section">\n	<section class="snippet-editor__preview">\n		<h3 class="snippet-editor__heading snippet-editor__heading-icon snippet-editor__heading-icon-eye">' + __e(i18n.snippetPreview) + '</h3>\n	<p class="screen-reader-text">' + __e(i18n.snippetPreviewDescription) + '</p>\n\n		<div id="snippet-preview-view" class="snippet-editor__view">\n			<div class="snippet_container snippet_container__title snippet-editor__container" id="title_container">\n				<span class="screen-reader-text">' + __e(i18n.titleLabel) + '</span>\n				<span class="title" id="render_title_container">\n					<span id="snippet_title">\n						' + __e(rendered.title) + '\n					</span>\n				</span>\n				<span class="title" id="snippet_sitename"></span>\n			</div>\n			<div class="snippet_container snippet_container__url snippet-editor__container" id="url_container">\n				<span class="screen-reader-text">' + __e(i18n.slugLabel) + '</span>\n				<span class="urlFull">\n					<cite class="url urlBase" id="snippet_citeBase">\n						' + __e(rendered.baseUrl) + '\n					</cite><cite class="url" id="snippet_cite">\n						' + __e(rendered.snippetCite) + '\n					</cite>\n				</span><span class="down_arrow"></span>\n			</div>\n			<div class="snippet_container snippet_container__meta snippet-editor__container" id="meta_container">\n				<span class="screen-reader-text">' + __e(i18n.metaDescriptionLabel) + '</span>\n				';
    if ("" !== metaDescriptionDate) {
      __p += '\n					<span class="snippet-editor__date">\n						' + __e(metaDescriptionDate) + ' -\n					</span>\n				';
    }
    __p += '\n				<span class="desc" id="snippet_meta">\n					' + __e(rendered.meta) + '\n				</span>\n			</div>\n		</div>\n\n		<div class="snippet-editor__is-scrollable-hintwrapper">\n			<span class=\'snippet-editor__is-scrollable-hint\' aria-hidden=\'true\'>' + __e(i18n.isScrollableHint) + '</span>\n		</div>\n\n		<div class="snippet-editor__view-toggle">\n			<button class="snippet-editor__view-icon snippet-editor__view-icon-mobile yoast-tooltip yoast-tooltip-se" type="button" data-type="mobile" aria-label="' + __e(i18n.mobilePreviewMode) + '" />\n			<button class="snippet-editor__view-icon snippet-editor__view-icon-desktop yoast-tooltip yoast-tooltip-se" type="button" data-type="desktop" aria-label="' + __e(i18n.desktopPreviewMode) + '" />\n		</div>\n		<button class="snippet-editor__button snippet-editor__edit-button" type="button" aria-expanded="false">\n			' + __e(i18n.edit) + '\n		</button>\n	</section>\n\n	<div class="snippet-editor__form snippet-editor--hidden">\n		<label for="snippet-editor-title" class="snippet-editor__label">\n			' + __e(i18n.title) + '\n			<input type="text" class="snippet-editor__input snippet-editor__title js-snippet-editor-title" id="snippet-editor-title" value="' + __e(raw.title) + '" placeholder="' + __e(placeholder.title) + '" />\n		</label>\n		<progress value="0.0" class="snippet-editor__progress snippet-editor__progress-title" aria-hidden="true">\n			<div class="snippet-editor__progress-bar"></div>\n		</progress>\n		<label for="snippet-editor-slug" class="snippet-editor__label">\n			' + __e(i18n.slug) + '\n			<input type="text" class="snippet-editor__input snippet-editor__slug js-snippet-editor-slug" id="snippet-editor-slug" value="' + __e(raw.snippetCite) + '" placeholder="' + __e(placeholder.urlPath) + '" />\n		</label>\n		<label for="snippet-editor-meta-description" class="snippet-editor__label">\n			' + __e(i18n.metaDescription) + '\n			<textarea class="snippet-editor__input snippet-editor__meta-description js-snippet-editor-meta-description" id="snippet-editor-meta-description" placeholder="' + __e(placeholder.metaDesc) + '">' + __e(raw.meta) + '</textarea>\n		</label>\n		<progress value="0.0" class="snippet-editor__progress snippet-editor__progress-meta-description" aria-hidden="true">\n			<div class="snippet-editor__progress-bar"></div>\n		</progress>\n\n		<button class="snippet-editor__submit snippet-editor__button" type="button">' + __e(i18n.save) + '</button>\n	</div>\n</div>\n';
    return __p;
  };

  if (freeModule) {
    (freeModule.exports = templates).templates = templates;
    freeExports.templates = templates;
  } else {
    root.templates = templates;
  }
}).call(undefined);
