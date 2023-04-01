export default ProductContentAssessor;
/**
 * Creates the Assessor
 *
 * @param {object} researcher   The researcher to use for the analysis.
 * @param {Object} options      The options for this assessor.
 *
 * @constructor
 */
declare class ProductContentAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (SubheadingDistributionTooLong | ParagraphTooLong | SentenceLengthInText | TransitionWords | PassiveVoice | TextPresence | ListsPresence)[];
}
import SubheadingDistributionTooLong from "../assessments/readability/SubheadingDistributionTooLongAssessment";
import ParagraphTooLong from "../assessments/readability/ParagraphTooLongAssessment";
import SentenceLengthInText from "../assessments/readability/SentenceLengthInTextAssessment";
import TransitionWords from "../assessments/readability/TransitionWordsAssessment";
import PassiveVoice from "../assessments/readability/PassiveVoiceAssessment";
import TextPresence from "../assessments/readability/TextPresenceAssessment";
import ListsPresence from "../assessments/readability/ListAssessment";
