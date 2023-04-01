"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

function DeviationFragment(options) {
	this._location = options.location;
	this._fragment = options.word;
	this._syllables = options.syllables;
	this._regex = null;

	this._options = (0, _lodashEs.pick)(options, ["notFollowedBy", "alsoFollowedBy"]);
}

DeviationFragment.prototype.createRegex = function () {
	var regexString = "";
	var options = this._options;

	var fragment = this._fragment;

	if (!(0, _lodashEs.isUndefined)(options.notFollowedBy)) {
		fragment += "(?![" + options.notFollowedBy.join("") + "])";
	}

	if (!(0, _lodashEs.isUndefined)(options.alsoFollowedBy)) {
		fragment += "[" + options.alsoFollowedBy.join("") + "]?";
	}

	switch (this._location) {
		case "atBeginning":
			regexString = "^" + fragment;
			break;

		case "atEnd":
			regexString = fragment + "$";
			break;

		case "atBeginningOrEnd":
			regexString = "(^" + fragment + ")|(" + fragment + "$)";
			break;

		default:
			regexString = fragment;
			break;
	}

	this._regex = new RegExp(regexString);
};

DeviationFragment.prototype.getRegex = function () {
	if (null === this._regex) {
		this.createRegex();
	}

	return this._regex;
};

DeviationFragment.prototype.occursIn = function (word) {
	var regex = this.getRegex();

	return regex.test(word);
};

DeviationFragment.prototype.removeFrom = function (word) {
	return word.replace(this._fragment, " ");
};

DeviationFragment.prototype.getSyllables = function () {
	return this._syllables;
};

exports.default = DeviationFragment;
