export default relatedKeywordAssessor;
/**
 * Creates the Assessor
 *
 * @param {object} researcher       The researcher used for the analysis.
 * @param {Object} options          The options for this assessor.
 * @param {Object} options.marker   The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class relatedKeywordAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (IntroductionKeyword | KeyphraseLength | KeywordDensity | MetaDescriptionKeyword | TextCompetingLinks | ImageKeyphrase | FunctionWordsInKeyphrase)[];
}
import IntroductionKeyword from "../assessments/seo/IntroductionKeywordAssessment.js";
import KeyphraseLength from "../assessments/seo/KeyphraseLengthAssessment.js";
import KeywordDensity from "../assessments/seo/KeywordDensityAssessment.js";
import MetaDescriptionKeyword from "../assessments/seo/MetaDescriptionKeywordAssessment.js";
import TextCompetingLinks from "../assessments/seo/TextCompetingLinksAssessment.js";
import ImageKeyphrase from "../assessments/seo/KeyphraseInImageTextAssessment.js";
import FunctionWordsInKeyphrase from "../assessments/seo/FunctionWordsInKeyphraseAssessment.js";
