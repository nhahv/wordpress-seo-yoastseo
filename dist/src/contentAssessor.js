"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assessor = require("./assessor.js");

var _assessor2 = _interopRequireDefault(_assessor);

var _fleschReadingEaseAssessment = require("./assessments/readability/fleschReadingEaseAssessment.js");

var _fleschReadingEaseAssessment2 = _interopRequireDefault(_fleschReadingEaseAssessment);

var _paragraphTooLongAssessment = require("./assessments/readability/paragraphTooLongAssessment.js");

var _paragraphTooLongAssessment2 = _interopRequireDefault(_paragraphTooLongAssessment);

var _sentenceLengthInTextAssessment = require("./assessments/readability/sentenceLengthInTextAssessment.js");

var _sentenceLengthInTextAssessment2 = _interopRequireDefault(_sentenceLengthInTextAssessment);

var _subheadingDistributionTooLongAssessment = require("./assessments/readability/subheadingDistributionTooLongAssessment.js");

var _subheadingDistributionTooLongAssessment2 = _interopRequireDefault(_subheadingDistributionTooLongAssessment);

var _transitionWordsAssessment = require("./assessments/readability/transitionWordsAssessment.js");

var _transitionWordsAssessment2 = _interopRequireDefault(_transitionWordsAssessment);

var _passiveVoiceAssessment = require("./assessments/readability/passiveVoiceAssessment.js");

var _passiveVoiceAssessment2 = _interopRequireDefault(_passiveVoiceAssessment);

var _sentenceBeginningsAssessment = require("./assessments/readability/sentenceBeginningsAssessment.js");

var _sentenceBeginningsAssessment2 = _interopRequireDefault(_sentenceBeginningsAssessment);

var _textPresenceAssessment = require("./assessments/readability/textPresenceAssessment.js");

var _textPresenceAssessment2 = _interopRequireDefault(_textPresenceAssessment);

var _combinedConfig = require("./config/content/combinedConfig.js");

var _combinedConfig2 = _interopRequireDefault(_combinedConfig);

var _scoreToRating = require("./interpreters/scoreToRating");

var _scoreToRating2 = _interopRequireDefault(_scoreToRating);

var _lodashEs = require("lodash-es");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ContentAssessor = function ContentAssessor(i18n, options = {}) {
	_assessor2.default.call(this, i18n, options);
	this.type = "ContentAssessor";
	const locale = options.hasOwnProperty("locale") ? options.locale : "en_US";

	this._assessments = [new _fleschReadingEaseAssessment2.default((0, _combinedConfig2.default)(locale).fleschReading), new _subheadingDistributionTooLongAssessment2.default(), _paragraphTooLongAssessment2.default, new _sentenceLengthInTextAssessment2.default((0, _combinedConfig2.default)(locale).sentenceLength), _transitionWordsAssessment2.default, _passiveVoiceAssessment2.default, _textPresenceAssessment2.default, _sentenceBeginningsAssessment2.default];
};

require("util").inherits(ContentAssessor, _assessor2.default);

ContentAssessor.prototype.calculatePenaltyPointsFullSupport = function (rating) {
	switch (rating) {
		case "bad":
			return 3;
		case "ok":
			return 2;
		default:
		case "good":
			return 0;
	}
};

ContentAssessor.prototype.calculatePenaltyPointsPartialSupport = function (rating) {
	switch (rating) {
		case "bad":
			return 4;
		case "ok":
			return 2;
		default:
		case "good":
			return 0;
	}
};

ContentAssessor.prototype._allAssessmentsSupported = function () {
	const numberOfAssessments = 8;
	const applicableAssessments = this.getApplicableAssessments();
	return applicableAssessments.length === numberOfAssessments;
};

ContentAssessor.prototype.calculatePenaltyPoints = function () {
	const results = this.getValidResults();

	const penaltyPoints = (0, _lodashEs.map)(results, function (result) {
		const rating = (0, _scoreToRating2.default)(result.getScore());

		if (this._allAssessmentsSupported()) {
			return this.calculatePenaltyPointsFullSupport(rating);
		}

		return this.calculatePenaltyPointsPartialSupport(rating);
	}.bind(this));

	return (0, _lodashEs.sum)(penaltyPoints);
};

ContentAssessor.prototype._ratePenaltyPoints = function (totalPenaltyPoints) {
	if (this.getValidResults().length === 1) {
		return 30;
	}

	if (this._allAssessmentsSupported()) {
		if (totalPenaltyPoints > 6) {
			return 30;
		}

		if (totalPenaltyPoints > 4) {
			return 60;
		}
	} else {
		if (totalPenaltyPoints > 4) {
			return 30;
		}

		if (totalPenaltyPoints > 2) {
			return 60;
		}
	}

	return 90;
};

ContentAssessor.prototype.calculateOverallScore = function () {
	const results = this.getValidResults();

	if (results.length === 0) {
		return 30;
	}

	const totalPenaltyPoints = this.calculatePenaltyPoints();

	return this._ratePenaltyPoints(totalPenaltyPoints);
};

exports.default = ContentAssessor;
