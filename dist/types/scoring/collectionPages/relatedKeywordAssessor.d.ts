export default CollectionRelatedKeywordAssessor;
/**
 * Creates the Assessor used for collection pages.
 *
 * @param {object}  researcher  The researcher to use for the analysis.
 * @param {Object}  options     The options for this assessor.
 *
 * @constructor
 */
declare class CollectionRelatedKeywordAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (IntroductionKeywordAssessment | KeyphraseLengthAssessment | KeywordDensityAssessment | MetaDescriptionKeywordAssessment | FunctionWordsInKeyphrase)[];
}
import IntroductionKeywordAssessment from "../assessments/seo/IntroductionKeywordAssessment";
import KeyphraseLengthAssessment from "../assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "../assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "../assessments/seo/MetaDescriptionKeywordAssessment";
import FunctionWordsInKeyphrase from "../assessments/seo/FunctionWordsInKeyphraseAssessment";
