"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _core = require("tokenizer2/core");

var _core2 = _interopRequireDefault(_core);

var _quotes = require("../stringProcessing/quotes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fullStop = ".";

const sentenceDelimiters = "?!;\u2026\u06d4\u061f";

const fullStopRegex = new RegExp("^[" + fullStop + "]$");
const sentenceDelimiterRegex = new RegExp("^[" + sentenceDelimiters + "]$");
const sentenceRegex = new RegExp("^[^" + fullStop + sentenceDelimiters + "<\\(\\)\\[\\]]+$");
const smallerThanContentRegex = /^<[^><]*$/;
const htmlStartRegex = /^<([^>\s/]+)[^>]*>$/mi;
const htmlEndRegex = /^<\/([^>\s]+)[^>]*>$/mi;

const blockStartRegex = /^\s*[[({]\s*$/;
const blockEndRegex = /^\s*[\])}]\s*$/;

const sentenceEndRegex = new RegExp("[" + fullStop + sentenceDelimiters + "]$");

class SentenceTokenizer {
	isNumber(character) {
		return !(0, _lodashEs.isNaN)(parseInt(character, 10));
	}

	isBreakTag(htmlTag) {
		return (/<br/.test(htmlTag)
		);
	}

	isQuotation(character) {
		character = (0, _quotes.normalize)(character);

		return "'" === character || "\"" === character;
	}

	isPunctuation(character) {
		return "¿" === character || "¡" === character;
	}

	removeDuplicateWhitespace(text) {
		return text.replace(/\s+/, " ");
	}

	isCapitalLetter(character) {
		return character !== character.toLocaleLowerCase();
	}

	isSmallerThanSign(character) {
		return character === "<";
	}

	getNextTwoCharacters(nextTokens) {
		let next = "";

		if (!(0, _lodashEs.isUndefined)(nextTokens[0])) {
			next += nextTokens[0].src;
		}

		if (!(0, _lodashEs.isUndefined)(nextTokens[1])) {
			next += nextTokens[1].src;
		}

		next = this.removeDuplicateWhitespace(next);

		return next;
	}

	isLetterfromRTLLanguage(letter) {
		const ltrLetterRanges = [/^[\u0590-\u05fe]+$/i, /^[\u0600-\u06FF]+$/i, /^[\uFB8A\u067E\u0686\u06AF]+$/i];

		return ltrLetterRanges.some(ltrLetterRange => ltrLetterRange.test(letter));
	}

	isValidSentenceBeginning(sentenceBeginning) {
		return this.isCapitalLetter(sentenceBeginning) || this.isLetterfromRTLLanguage(sentenceBeginning) || this.isNumber(sentenceBeginning) || this.isQuotation(sentenceBeginning) || this.isPunctuation(sentenceBeginning) || this.isSmallerThanSign(sentenceBeginning);
	}

	isSentenceStart(token) {
		return !(0, _lodashEs.isUndefined)(token) && ("html-start" === token.type || "html-end" === token.type || "block-start" === token.type);
	}

	isSentenceEnding(token) {
		return !(0, _lodashEs.isUndefined)(token) && (token.type === "full-stop" || token.type === "sentence-delimiter");
	}

	tokenizeSmallerThanContent(token, tokenSentences, currentSentence) {
		const localText = token.src.substring(1);

		const tokenizerResult = this.createTokenizer();
		this.tokenize(tokenizerResult.tokenizer, localText);
		const localSentences = this.getSentencesFromTokens(tokenizerResult.tokens, false);

		localSentences[0] = (0, _lodashEs.isUndefined)(localSentences[0]) ? "<" : "<" + localSentences[0];

		if (this.isValidSentenceBeginning(localSentences[0])) {
			tokenSentences.push(currentSentence);
			currentSentence = "";
		}
		currentSentence += localSentences[0];

		if (localSentences.length > 1) {
			tokenSentences.push(currentSentence);
			currentSentence = "";

			localSentences.shift();

			const lastSentence = localSentences.pop();

			localSentences.forEach(sentence => {
				tokenSentences.push(sentence);
			});

			if (lastSentence.match(sentenceEndRegex)) {
				tokenSentences.push(lastSentence);
			} else {
				currentSentence = lastSentence;
			}
		}
		return {
			tokenSentences,
			currentSentence
		};
	}

	createTokenizer() {
		const tokens = [];
		const tokenizer = (0, _core2.default)(function (token) {
			tokens.push(token);
		});

		tokenizer.addRule(fullStopRegex, "full-stop");
		tokenizer.addRule(smallerThanContentRegex, "smaller-than-sign-content");
		tokenizer.addRule(htmlStartRegex, "html-start");
		tokenizer.addRule(htmlEndRegex, "html-end");
		tokenizer.addRule(blockStartRegex, "block-start");
		tokenizer.addRule(blockEndRegex, "block-end");
		tokenizer.addRule(sentenceDelimiterRegex, "sentence-delimiter");
		tokenizer.addRule(sentenceRegex, "sentence");

		return {
			tokenizer,
			tokens
		};
	}

	tokenize(tokenizer, text) {
		tokenizer.onText(text);

		try {
			tokenizer.end();
		} catch (e) {
			console.error("Tokenizer end error:", e, e.tokenizer2);
		}
	}

	getSentencesFromTokens(tokenArray, trimSentences = true) {
		let tokenSentences = [],
		    currentSentence = "",
		    nextSentenceStart,
		    sliced;

		do {
			sliced = false;
			const firstToken = tokenArray[0];
			const lastToken = tokenArray[tokenArray.length - 1];

			if (firstToken && lastToken && firstToken.type === "html-start" && lastToken.type === "html-end") {
				tokenArray = tokenArray.slice(1, tokenArray.length - 1);

				sliced = true;
			}
		} while (sliced && tokenArray.length > 1);

		tokenArray.forEach((token, i) => {
			let hasNextSentence, nextCharacters, tokenizeResults;
			const nextToken = tokenArray[i + 1];
			const previousToken = tokenArray[i - 1];
			const secondToNextToken = tokenArray[i + 2];

			switch (token.type) {
				case "html-start":
				case "html-end":
					if (this.isBreakTag(token.src)) {
						tokenSentences.push(currentSentence);
						currentSentence = "";
					} else {
						currentSentence += token.src;
					}
					break;

				case "smaller-than-sign-content":
					tokenizeResults = this.tokenizeSmallerThanContent(token, tokenSentences, currentSentence);
					tokenSentences = tokenizeResults.tokenSentences;
					currentSentence = tokenizeResults.currentSentence;
					break;
				case "sentence":
					currentSentence += token.src;
					break;
				case "sentence-delimiter":
					currentSentence += token.src;

					if (!(0, _lodashEs.isUndefined)(nextToken) && "block-end" !== nextToken.type && "sentence-delimiter" !== nextToken.type) {
						tokenSentences.push(currentSentence);
						currentSentence = "";
					}
					break;

				case "full-stop":
					currentSentence += token.src;

					nextCharacters = this.getNextTwoCharacters([nextToken, secondToNextToken]);

					hasNextSentence = nextCharacters.length >= 2;
					nextSentenceStart = hasNextSentence ? nextCharacters[1] : "";

					if (hasNextSentence && this.isNumber(nextCharacters[0])) {
						break;
					}

					if (hasNextSentence && this.isValidSentenceBeginning(nextSentenceStart) || this.isSentenceStart(nextToken)) {
						tokenSentences.push(currentSentence);
						currentSentence = "";
					}
					break;

				case "block-start":
					currentSentence += token.src;
					break;

				case "block-end":
					currentSentence += token.src;

					nextCharacters = this.getNextTwoCharacters([nextToken, secondToNextToken]);

					hasNextSentence = nextCharacters.length >= 2;
					nextSentenceStart = hasNextSentence ? nextCharacters[0] : "";

					if (hasNextSentence && this.isNumber(nextCharacters[0]) || this.isSentenceEnding(previousToken) && !(this.isValidSentenceBeginning(nextSentenceStart) || this.isSentenceStart(nextToken))) {
						break;
					}

					if (this.isSentenceEnding(previousToken) && (this.isValidSentenceBeginning(nextSentenceStart) || this.isSentenceStart(nextToken))) {
						tokenSentences.push(currentSentence);
						currentSentence = "";
					}
					break;
			}
		});

		if ("" !== currentSentence) {
			tokenSentences.push(currentSentence);
		}

		if (trimSentences) {
			tokenSentences = (0, _lodashEs.map)(tokenSentences, function (sentence) {
				return sentence.trim();
			});
		}

		return tokenSentences;
	}
}
exports.default = SentenceTokenizer;
