"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _invalidType = require("./errors/invalidType");

var _invalidType2 = _interopRequireDefault(_invalidType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pluggable = function Pluggable(app) {
	this.app = app;
	this.loaded = false;
	this.preloadThreshold = 3000;
	this.plugins = {};
	this.modifications = {};
	this.customTests = [];

	setTimeout(this._pollLoadingPlugins.bind(this), 1500);
};

Pluggable.prototype._registerPlugin = function (pluginName, options) {
	if (typeof pluginName !== "string") {
		console.error("Failed to register plugin. Expected parameter `pluginName` to be a string.");
		return false;
	}

	if (!(0, _lodashEs.isUndefined)(options) && typeof options !== "object") {
		console.error("Failed to register plugin " + pluginName + ". Expected parameters `options` to be a object.");
		return false;
	}

	if (this._validateUniqueness(pluginName) === false) {
		console.error("Failed to register plugin. Plugin with name " + pluginName + " already exists");
		return false;
	}

	this.plugins[pluginName] = options;

	return true;
};

Pluggable.prototype._ready = function (pluginName) {
	if (typeof pluginName !== "string") {
		console.error("Failed to modify status for plugin " + pluginName + ". Expected parameter `pluginName` to be a string.");
		return false;
	}

	if ((0, _lodashEs.isUndefined)(this.plugins[pluginName])) {
		console.error("Failed to modify status for plugin " + pluginName + ". The plugin was not properly registered.");
		return false;
	}

	this.plugins[pluginName].status = "ready";

	return true;
};

Pluggable.prototype._reloaded = function (pluginName) {
	if (typeof pluginName !== "string") {
		console.error("Failed to reload Content Analysis for " + pluginName + ". Expected parameter `pluginName` to be a string.");
		return false;
	}

	if ((0, _lodashEs.isUndefined)(this.plugins[pluginName])) {
		console.error("Failed to reload Content Analysis for plugin " + pluginName + ". The plugin was not properly registered.");
		return false;
	}

	this.app.refresh();
	return true;
};

Pluggable.prototype._registerModification = function (modification, callable, pluginName, priority) {
	if (typeof modification !== "string") {
		console.error("Failed to register modification for plugin " + pluginName + ". Expected parameter `modification` to be a string.");
		return false;
	}

	if (typeof callable !== "function") {
		console.error("Failed to register modification for plugin " + pluginName + ". Expected parameter `callable` to be a function.");
		return false;
	}

	if (typeof pluginName !== "string") {
		console.error("Failed to register modification for plugin " + pluginName + ". Expected parameter `pluginName` to be a string.");
		return false;
	}

	if (this._validateOrigin(pluginName) === false) {
		console.error("Failed to register modification for plugin " + pluginName + ". The integration has not finished loading yet.");
		return false;
	}

	var prio = typeof priority === "number" ? priority : 10;

	var callableObject = {
		callable: callable,
		origin: pluginName,
		priority: prio
	};

	if ((0, _lodashEs.isUndefined)(this.modifications[modification])) {
		this.modifications[modification] = [];
	}

	this.modifications[modification].push(callableObject);

	return true;
};

Pluggable.prototype._registerTest = function () {
	console.error("This function is deprecated, please use _registerAssessment");
};

Pluggable.prototype._registerAssessment = function (assessor, name, assessment, pluginName) {
	if (!(0, _lodashEs.isString)(name)) {
		throw new _invalidType2.default("Failed to register test for plugin " + pluginName + ". Expected parameter `name` to be a string.");
	}

	if (!(0, _lodashEs.isObject)(assessment)) {
		throw new _invalidType2.default("Failed to register assessment for plugin " + pluginName + ". Expected parameter `assessment` to be a function.");
	}

	if (!(0, _lodashEs.isString)(pluginName)) {
		throw new _invalidType2.default("Failed to register assessment for plugin " + pluginName + ". Expected parameter `pluginName` to be a string.");
	}

	name = pluginName + "-" + name;

	assessor.addAssessment(name, assessment);

	return true;
};

Pluggable.prototype._pollLoadingPlugins = function (pollTime) {
	pollTime = (0, _lodashEs.isUndefined)(pollTime) ? 0 : pollTime;
	if (this._allReady() === true) {
		this.loaded = true;
		this.app.pluginsLoaded();
	} else if (pollTime >= this.preloadThreshold) {
		this._pollTimeExceeded();
	} else {
		pollTime += 50;
		setTimeout(this._pollLoadingPlugins.bind(this, pollTime), 50);
	}
};

Pluggable.prototype._allReady = function () {
	return (0, _lodashEs.reduce)(this.plugins, function (allReady, plugin) {
		return allReady && plugin.status === "ready";
	}, true);
};

Pluggable.prototype._pollTimeExceeded = function () {
	(0, _lodashEs.forEach)(this.plugins, function (plugin, pluginName) {
		if (!(0, _lodashEs.isUndefined)(plugin.options) && plugin.options.status !== "ready") {
			console.error("Error: Plugin " + pluginName + ". did not finish loading in time.");
			delete this.plugins[pluginName];
		}
	});
	this.loaded = true;
	this.app.pluginsLoaded();
};

Pluggable.prototype._applyModifications = function (modification, data, context) {
	var callChain = this.modifications[modification];

	if (callChain instanceof Array && callChain.length > 0) {
		callChain = this._stripIllegalModifications(callChain);

		callChain.sort(function (a, b) {
			return a.priority - b.priority;
		});
		(0, _lodashEs.forEach)(callChain, function (callableObject) {
			var callable = callableObject.callable;
			var newData = callable(data, context);
			if (typeof newData === typeof data) {
				data = newData;
			} else {
				console.error("Modification with name " + modification + " performed by plugin with name " + callableObject.origin + " was ignored because the data that was returned by it was of a different type than the data we had passed it.");
			}
		});
	}
	return data;
};

Pluggable.prototype._addPluginTests = function (analyzer) {
	this.customTests.map(function (customTest) {
		this._addPluginTest(analyzer, customTest);
	}, this);
};

Pluggable.prototype._addPluginTest = function (analyzer, pluginTest) {
	analyzer.addAnalysis({
		name: pluginTest.name,
		callable: pluginTest.analysis
	});

	analyzer.analyzeScorer.addScoring({
		name: pluginTest.name,
		scoring: pluginTest.scoring
	});
};

Pluggable.prototype._stripIllegalModifications = function (callChain) {
	(0, _lodashEs.forEach)(callChain, function (callableObject, index) {
		if (this._validateOrigin(callableObject.origin) === false) {
			delete callChain[index];
		}
	}.bind(this));

	return callChain;
};

Pluggable.prototype._validateOrigin = function (pluginName) {
	if (this.plugins[pluginName].status !== "ready") {
		return false;
	}
	return true;
};

Pluggable.prototype._validateUniqueness = function (pluginName) {
	if (!(0, _lodashEs.isUndefined)(this.plugins[pluginName])) {
		return false;
	}
	return true;
};

exports.default = Pluggable;
