"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _Task = require("./Task");

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_CONFIGURATION = {
	pollTime: 50
};

class Scheduler {
	constructor(configuration = {}) {
		this._configuration = (0, _lodashEs.merge)(DEFAULT_CONFIGURATION, configuration);
		this._tasks = {
			standard: [],
			extensions: [],
			analyze: [],
			analyzeRelatedKeywords: []
		};
		this._pollHandle = null;
		this._started = false;

		this.startPolling = this.startPolling.bind(this);
		this.stopPolling = this.stopPolling.bind(this);
		this.tick = this.tick.bind(this);
	}

	startPolling() {
		if (this._started) {
			return;
		}

		this._started = true;

		this.tick();
	}

	tick() {
		this.executeNextTask().then(() => {
			this._pollHandle = setTimeout(this.tick, this._configuration.pollTime);
		});
	}

	stopPolling() {
		clearTimeout(this._pollHandle);
		this._pollHandle = null;
		this._started = false;
	}

	schedule({ id, execute, done, data, type }) {
		const task = new _Task2.default(id, execute, done, data, type);
		switch (type) {
			case "customMessage":
			case "loadScript":
				this._tasks.extensions.push(task);
				break;
			case "analyze":
				this._tasks.analyze = [task];
				break;
			case "analyzeRelatedKeywords":
				this._tasks.analyzeRelatedKeywords = [task];
				break;
			default:
				this._tasks.standard.push(task);
		}
	}

	getNextTask() {
		if (this._tasks.extensions.length > 0) {
			return this._tasks.extensions.shift();
		}

		if (this._tasks.analyze.length > 0) {
			return this._tasks.analyze.shift();
		}

		if (this._tasks.analyzeRelatedKeywords.length > 0) {
			return this._tasks.analyzeRelatedKeywords.shift();
		}

		if (this._tasks.standard.length > 0) {
			return this._tasks.standard.shift();
		}

		return null;
	}

	executeNextTask() {
		const task = this.getNextTask();
		if (task === null) {
			return Promise.resolve(null);
		}

		return Promise.resolve().then(() => {
			return task.execute(task.id, task.data);
		}).then(result => {
			task.done(task.id, result);

			return result;
		});
	}
}
exports.default = Scheduler;
