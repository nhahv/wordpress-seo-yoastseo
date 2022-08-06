export default StorePostsAndPagesCornerstoneContentAssessor;
/**
 * Creates the Assessor
 *
 * @param {object} researcher       The researcher used for the analysis.
 * @param {Object} options          The options for this assessor.
 * @param {Object} options.marker   The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class StorePostsAndPagesCornerstoneContentAssessor {
    constructor(researcher: any, options?: {});
    type: string;
    _assessments: (SubheadingDistributionTooLong | ParagraphTooLong | SentenceLengthInText | TransitionWords | PassiveVoice | TextPresence | SentenceBeginnings)[];
}
import SubheadingDistributionTooLong from "../../assessments/readability/SubheadingDistributionTooLongAssessment";
import ParagraphTooLong from "../../assessments/readability/ParagraphTooLongAssessment";
import SentenceLengthInText from "../../assessments/readability/SentenceLengthInTextAssessment";
import TransitionWords from "../../assessments/readability/TransitionWordsAssessment";
import PassiveVoice from "../../assessments/readability/PassiveVoiceAssessment";
import TextPresence from "../../assessments/readability/TextPresenceAssessment";
import SentenceBeginnings from "../../assessments/readability/SentenceBeginningsAssessment";
