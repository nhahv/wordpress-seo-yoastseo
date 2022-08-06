export function getTextLengthAssessment(): TextLengthAssessment;
export default CollectionSEOAssessor;
import TextLengthAssessment from "../assessments/seo/TextLengthAssessment";
/**
 * Creates the Assessor used for collection pages.
 *
 * @param {object} researcher   The researcher used for the analysis.
 * @param {Object} options      The options for this assessor.
 * @constructor
 */
declare class CollectionSEOAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (KeyphraseDistribution | IntroductionKeywordAssessment | KeyphraseLengthAssessment | KeywordDensityAssessment | MetaDescriptionKeywordAssessment | MetaDescriptionLengthAssessment | TextLengthAssessment | TitleKeywordAssessment | PageTitleWidthAssessment | UrlKeywordAssessment | FunctionWordsInKeyphrase | SingleH1Assessment)[];
}
import KeyphraseDistribution from "../assessments/seo/KeyphraseDistributionAssessment";
import IntroductionKeywordAssessment from "../assessments/seo/IntroductionKeywordAssessment";
import KeyphraseLengthAssessment from "../assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "../assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "../assessments/seo/MetaDescriptionKeywordAssessment";
import MetaDescriptionLengthAssessment from "../assessments/seo/MetaDescriptionLengthAssessment";
import TitleKeywordAssessment from "../assessments/seo/TitleKeywordAssessment";
import PageTitleWidthAssessment from "../assessments/seo/PageTitleWidthAssessment";
import UrlKeywordAssessment from "../assessments/seo/UrlKeywordAssessment";
import FunctionWordsInKeyphrase from "../assessments/seo/FunctionWordsInKeyphraseAssessment";
import SingleH1Assessment from "../assessments/seo/SingleH1Assessment";
