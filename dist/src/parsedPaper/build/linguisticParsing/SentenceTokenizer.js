"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodashEs = require("lodash-es");

var _core = require("tokenizer2/core");

var _core2 = _interopRequireDefault(_core);

var _quotes = require("../../../stringProcessing/quotes.js");

var _Sentence = require("./Sentence");

var _Sentence2 = _interopRequireDefault(_Sentence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fullStop = ".";

const sentenceDelimiters = "?!;\u2026";

const fullStopRegex = new RegExp("^[" + fullStop + "]$");
const sentenceDelimiterRegex = new RegExp("^[" + sentenceDelimiters + "]$");
const sentenceRegex = new RegExp("^[^" + fullStop + sentenceDelimiters + "\\(\\)\\[\\]]+$");

const blockStartRegex = /^\s*[[({]\s*$/;
const blockEndRegex = /^\s*[\])}]\s*$/;

const whiteSpaceStartRegex = /^\s*/;
const whiteSpaceEndRegex = /\s*$/;

class SentenceTokenizer {
	isNumber(character) {
		return !(0, _lodashEs.isNaN)(parseInt(character, 10));
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

	isValidSentenceBeginning(sentenceBeginning) {
		return this.isCapitalLetter(sentenceBeginning) || this.isNumber(sentenceBeginning) || this.isQuotation(sentenceBeginning) || this.isPunctuation(sentenceBeginning);
	}

	isSentenceStart(token) {
		return !(0, _lodashEs.isUndefined)(token) && ("html-start" === token.type || "html-end" === token.type || "block-start" === token.type);
	}

	createTokenizer() {
		const tokens = [];
		const tokenizer = (0, _core2.default)(function (token) {
			tokens.push(token);
		});

		tokenizer.addRule(fullStopRegex, "full-stop");
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

	determineIndices(sentences) {
		let currentIndex = 0;

		for (const sentence of sentences) {
			const startIndex = currentIndex;
			sentence.setStartIndex(currentIndex);
			const endIndex = startIndex + sentence.text.length - 1;
			sentence.setEndIndex(endIndex);
			currentIndex = endIndex + 1;
		}
	}

	trimWhiteSpaceAtStart(sentence) {
		const whiteSpaceLength = sentence.text.match(whiteSpaceStartRegex)[0].length;
		sentence.setText(sentence.getText().slice(whiteSpaceLength));
		sentence.setStartIndex(sentence.getStartIndex() + whiteSpaceLength);
	}

	trimWhiteSpaceAtEnd(sentence) {
		const whiteSpaceLength = sentence.text.match(whiteSpaceEndRegex)[0].length;
		sentence.setText(sentence.getText().slice(0, sentence.getText().length - whiteSpaceLength));
		sentence.setEndIndex(sentence.getEndIndex() - whiteSpaceLength);
	}

	trimWhiteSpaces(sentences) {
		for (const sentence of sentences) {
			this.trimWhiteSpaceAtStart(sentence);
			this.trimWhiteSpaceAtEnd(sentence);
		}
	}

	getSentencesFromTokens(tokenArray) {
		const tokenSentences = [];
		let currentSentence = new _Sentence2.default("", 0, 0),
		    nextSentenceStart;

		tokenArray.forEach((token, i) => {
			let hasNextSentence, nextCharacters;
			const nextToken = tokenArray[i + 1];
			const secondToNextToken = tokenArray[i + 2];

			switch (token.type) {
				case "sentence":
					currentSentence.appendText(token.src);
					break;

				case "sentence-delimiter":
					currentSentence.appendText(token.src);
					if (!(0, _lodashEs.isUndefined)(nextToken) && "block-end" !== nextToken.type && "sentence-delimiter" !== nextToken.type) {
						tokenSentences.push(currentSentence);
						currentSentence = new _Sentence2.default("");
					}
					break;

				case "full-stop":
					currentSentence.appendText(token.src);

					nextCharacters = this.getNextTwoCharacters([nextToken, secondToNextToken]);

					hasNextSentence = nextCharacters.length >= 2;
					nextSentenceStart = hasNextSentence ? nextCharacters[1] : "";

					if (hasNextSentence && this.isNumber(nextCharacters[0])) {
						break;
					}

					if (hasNextSentence && this.isValidSentenceBeginning(nextSentenceStart) || this.isSentenceStart(nextToken)) {
						tokenSentences.push(currentSentence);
						currentSentence = new _Sentence2.default("");
					}
					break;

				case "block-start":
					currentSentence.appendText(token.src);
					break;

				case "block-end":
					currentSentence.appendText(token.src);
					nextCharacters = this.getNextTwoCharacters([nextToken, secondToNextToken]);

					hasNextSentence = nextCharacters.length >= 2;
					nextSentenceStart = hasNextSentence ? nextCharacters[0] : "";

					if (hasNextSentence && this.isNumber(nextCharacters[0])) {
						break;
					}

					if (hasNextSentence && this.isValidSentenceBeginning(nextSentenceStart) || this.isSentenceStart(nextToken)) {
						tokenSentences.push(currentSentence);
						currentSentence = new _Sentence2.default("");
					}
					break;
			}
		});

		if (currentSentence.getText() !== "") {
			tokenSentences.push(currentSentence);
		}

		this.determineIndices(tokenSentences);

		this.trimWhiteSpaces(tokenSentences);

		return tokenSentences;
	}
}
exports.default = SentenceTokenizer;
