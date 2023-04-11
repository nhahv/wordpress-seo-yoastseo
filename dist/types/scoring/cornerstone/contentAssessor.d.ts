export default CornerStoneContentAssessor;
/**
 * Creates the Assessor
 *
 * @param {object} researcher       The researcher used for the analysis.
 * @param {Object} options          The options for this assessor.
 * @param {Object} options.marker   The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class CornerStoneContentAssessor {
    constructor(researcher: any, options?: {});
    type: string;
    _assessments: ({
        identifier: string;
        getResult: (paper: any, researcher: any) => Object;
        isApplicable: (paper: any, researcher: any) => boolean;
    } | SubheadingDistributionTooLong | ParagraphTooLong | SentenceLengthInText | TransitionWords | PassiveVoice | SentenceBeginnings)[];
}
import SubheadingDistributionTooLong from "../assessments/readability/SubheadingDistributionTooLongAssessment.js";
import ParagraphTooLong from "../assessments/readability/ParagraphTooLongAssessment.js";
import SentenceLengthInText from "../assessments/readability/SentenceLengthInTextAssessment.js";
import TransitionWords from "../assessments/readability/TransitionWordsAssessment.js";
import PassiveVoice from "../assessments/readability/PassiveVoiceAssessment.js";
import SentenceBeginnings from "../assessments/readability/SentenceBeginningsAssessment.js";
