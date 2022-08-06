export default RelatedKeywordTaxonomyAssessor;
/**
 * Creates the Assessor used for taxonomy pages.
 *
 * @param {object}  researcher  The researcher to use for the analysis.
 * @param {Object}  options     The options for this assessor.
 *
 * @constructor
 */
declare class RelatedKeywordTaxonomyAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (IntroductionKeywordAssessment | KeyphraseLengthAssessment | KeywordDensityAssessment | MetaDescriptionKeywordAssessment | FunctionWordsInKeyphrase)[];
}
import IntroductionKeywordAssessment from "./assessments/seo/IntroductionKeywordAssessment";
import KeyphraseLengthAssessment from "./assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "./assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "./assessments/seo/MetaDescriptionKeywordAssessment";
import FunctionWordsInKeyphrase from "./assessments/seo/FunctionWordsInKeyphraseAssessment";
