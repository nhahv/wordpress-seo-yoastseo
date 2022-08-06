export default StorePostsAndPagesCornerstoneSEOAssessor;
/**
 * Creates the Assessor
 *
 * @param {object} researcher       The researcher used for the analysis.
 * @param {Object} options          The options for this assessor.
 * @param {Object} options.marker   The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class StorePostsAndPagesCornerstoneSEOAssessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: (KeyphraseDistribution | IntroductionKeywordAssessment | KeyphraseLengthAssessment | KeywordDensityAssessment | MetaDescriptionKeywordAssessment | MetaDescriptionLength | SubheadingsKeyword | TextCompetingLinksAssessment | ImageKeyphrase | ImageCount | TextLength | OutboundLinks | TitleKeywordAssessment | InternalLinksAssessment | TitleWidth | UrlKeywordAssessment | FunctionWordsInKeyphrase | SingleH1Assessment)[];
}
import KeyphraseDistribution from "../../assessments/seo/KeyphraseDistributionAssessment";
import IntroductionKeywordAssessment from "../../assessments/seo/IntroductionKeywordAssessment";
import KeyphraseLengthAssessment from "../../assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "../../assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "../../assessments/seo/MetaDescriptionKeywordAssessment";
import MetaDescriptionLength from "../../assessments/seo/MetaDescriptionLengthAssessment";
import SubheadingsKeyword from "../../assessments/seo/SubHeadingsKeywordAssessment";
import TextCompetingLinksAssessment from "../../assessments/seo/TextCompetingLinksAssessment";
import ImageKeyphrase from "../../assessments/seo/KeyphraseInImageTextAssessment";
import ImageCount from "../../assessments/seo/ImageCountAssessment";
import TextLength from "../../assessments/seo/TextLengthAssessment";
import OutboundLinks from "../../assessments/seo/OutboundLinksAssessment";
import TitleKeywordAssessment from "../../assessments/seo/TitleKeywordAssessment";
import InternalLinksAssessment from "../../assessments/seo/InternalLinksAssessment";
import TitleWidth from "../../assessments/seo/PageTitleWidthAssessment";
import UrlKeywordAssessment from "../../assessments/seo/UrlKeywordAssessment";
import FunctionWordsInKeyphrase from "../../assessments/seo/FunctionWordsInKeyphraseAssessment";
import SingleH1Assessment from "../../assessments/seo/SingleH1Assessment";
