"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashEs = require("lodash-es");

var addClass = function addClass(element, className) {
  var classes = element.className.split(" ");

  if (-1 === classes.indexOf(className)) {
    classes.push(className);
  }

  element.className = classes.join(" ");
};

var removeClass = function removeClass(element, className) {
  var classes = element.className.split(" ");
  var foundClass = classes.indexOf(className);

  if (-1 !== foundClass) {
    classes.splice(foundClass, 1);
  }

  element.className = classes.join(" ");
};

var removeClasses = function removeClasses(element, classes) {
  (0, _lodashEs.forEach)(classes, this.removeClass.bind(null, element));
};

var hasClass = function hasClass(element, className) {
  return element.className.indexOf(className) > -1;
};

exports.default = {
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  removeClasses: removeClasses
};
