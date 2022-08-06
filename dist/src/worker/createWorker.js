"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function createExceptionHandler(originalScript) {
	return `
		try {
			${originalScript}
		} catch ( error ) {
			console.log( "Error occured during worker initialization:" );
			console.log( error );
		}
	`;
}

function createBlobScript(url) {
	return `
		self.yoastOriginalUrl = '${url}';
		importScripts('${url}');
	`;
}

function isSameOrigin(urlA, urlB) {
	urlA = new URL(urlA, window.location.origin);
	urlB = new URL(urlB, window.location.origin);

	return urlA.hostname === urlB.hostname && urlA.port === urlB.port && urlA.protocol === urlB.protocol;
}

function createBlobURL(url) {
	const URL = window.URL || window.webkitURL;
	const BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

	const blobScript = createExceptionHandler(createBlobScript(url));

	let blob;
	try {
		blob = new Blob([blobScript], { type: "application/javascript" });
	} catch (e1) {
		const blobBuilder = new BlobBuilder();
		blobBuilder.append(blobScript);
		blob = blobBuilder.getBlob("application/javascript");
	}
	return URL.createObjectURL(blob);
}

function createWorkerFallback(url) {
	const blobUrl = createBlobURL(url);

	return new Worker(blobUrl);
}

function createWorker(url) {
	if (!isSameOrigin(window.location, url)) {
		return createWorkerFallback(url);
	}

	let worker = null;
	try {
		worker = new Worker(url);
	} catch (e) {
		try {
			worker = createWorkerFallback(url);
		} catch (e2) {
			throw e2;
		}
	}
	return worker;
}

exports.default = createWorker;
