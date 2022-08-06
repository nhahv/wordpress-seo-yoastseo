export function getTextLengthAssessment(): TextLengthAssessment;
export default TaxonomyAssessor;
import TextLengthAssessment from "./assessments/seo/TextLengthAssessment";
/**
 * Creates the Assessor used for taxonomy pages.
 *
 * @param {object} researcher   The researcher used for the analysis.
 * @param {Object} options      The options for this assessor.
 * @constructor
 */
declare class TaxonomyAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (IntroductionKeywordAssessment | KeyphraseLengthAssessment | KeywordDensityAssessment | MetaDescriptionKeywordAssessment | MetaDescriptionLengthAssessment | TextLengthAssessment | TitleKeywordAssessment | PageTitleWidthAssessment | UrlKeywordAssessment | FunctionWordsInKeyphrase | SingleH1Assessment)[];
}
import IntroductionKeywordAssessment from "./assessments/seo/IntroductionKeywordAssessment";
import KeyphraseLengthAssessment from "./assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "./assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "./assessments/seo/MetaDescriptionKeywordAssessment";
import MetaDescriptionLengthAssessment from "./assessments/seo/MetaDescriptionLengthAssessment";
import TitleKeywordAssessment from "./assessments/seo/TitleKeywordAssessment";
import PageTitleWidthAssessment from "./assessments/seo/PageTitleWidthAssessment";
import UrlKeywordAssessment from "./assessments/seo/UrlKeywordAssessment";
import FunctionWordsInKeyphrase from "./assessments/seo/FunctionWordsInKeyphraseAssessment";
import SingleH1Assessment from "./assessments/seo/SingleH1Assessment";
