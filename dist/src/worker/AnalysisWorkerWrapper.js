"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

var _transporter = require("./transporter");

var _transporter2 = _interopRequireDefault(_transporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AnalysisWorkerWrapper {
	constructor(worker) {
		this._worker = worker;
		this._requests = {};
		this._autoIncrementedRequestId = -1;

		this.initialize = this.initialize.bind(this);
		this.analyze = this.analyze.bind(this);
		this.analyzeRelatedKeywords = this.analyzeRelatedKeywords.bind(this);
		this.loadScript = this.loadScript.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.runResearch = this.runResearch.bind(this);

		this.handleMessage = this.handleMessage.bind(this);
		this.handleMessageError = this.handleMessageError.bind(this);
		this.handleError = this.handleError.bind(this);

		this._worker.onmessage = this.handleMessage;
		this._worker.onmessageerror = this.handleMessageError;
		this._worker.onerror = this.handleError;
	}

	handleMessage({ data: { type, id, payload } }) {
		const request = this._requests[id];
		if (!request) {
			console.warn("AnalysisWebWorker unmatched response:", payload);
			return;
		}

		payload = _transporter2.default.parse(payload);

		switch (type) {
			case "initialize:done":
			case "loadScript:done":
			case "customMessage:done":
			case "runResearch:done":
			case "analyzeRelatedKeywords:done":
			case "analyze:done":
				request.resolve(payload);
				break;
			case "analyze:failed":
			case "loadScript:failed":
			case "customMessage:failed":
			case "runResearch:failed":
			case "analyzeRelatedKeywords:failed":
				request.reject(payload);
				break;
			default:
				console.warn("AnalysisWebWorker unrecognized action:", type);
		}

		delete this._requests[id];
	}

	handleMessageError(event) {
		console.warn("AnalysisWebWorker message error:", event);
	}

	handleError(event) {
		const requestKeys = Object.keys(this._requests);
		const lastRequestId = requestKeys[requestKeys.length - 1];
		const lastRequest = this._requests[lastRequestId];
		if (!lastRequest) {
			console.error("AnalysisWebWorker error:", event);
			return;
		}
		lastRequest.reject(event);
	}

	createRequestId() {
		this._autoIncrementedRequestId++;
		return this._autoIncrementedRequestId;
	}

	createRequestPromise(id, data = {}) {
		return new Promise((resolve, reject) => {
			this._requests[id] = new _request2.default(resolve, reject, data);
		});
	}

	sendRequest(action, payload, data = {}) {
		const id = this.createRequestId();
		const promise = this.createRequestPromise(id, data);

		this.send(action, id, payload);
		return promise;
	}

	send(type, id, payload = {}) {
		payload = _transporter2.default.serialize(payload);

		this._worker.postMessage({
			type,
			id,
			payload
		});
	}

	initialize(configuration) {
		return this.sendRequest("initialize", configuration);
	}

	analyzeRelatedKeywords(paper, relatedKeywords = {}) {
		return this.sendRequest("analyzeRelatedKeywords", { paper, relatedKeywords });
	}

	analyze(paper) {
		return this.sendRequest("analyze", { paper });
	}

	loadScript(url) {
		return this.sendRequest("loadScript", { url });
	}

	sendMessage(name, data, pluginName) {
		name = pluginName + "-" + name;
		return this.sendRequest("customMessage", { name, data }, data);
	}

	runResearch(name, paper = null) {
		return this.sendRequest("runResearch", { name, paper });
	}
}

exports.default = AnalysisWorkerWrapper;
