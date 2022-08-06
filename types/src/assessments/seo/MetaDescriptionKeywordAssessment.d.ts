export default MetaDescriptionKeywordAssessment;
/**
 * Assessment for checking the keyword matches in the meta description.
 */
declare class MetaDescriptionKeywordAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.parameters.recommendedMinimum] The recommended minimum of keyword occurrences in the meta description.
     * @param {number} [config.scores.good] The score to return if there are enough keyword occurrences in the meta description.
     * @param {number} [config.scores.bad] The score to return if there aren't enough keyword occurrences in the meta description.
     * @param {string} [config.url] The URL to the relevant article on Yoast.com.
     *
     * @returns {void}
     */
    constructor(config?: any);
    identifier: string;
    _config: any;
    /**
     * Runs the metaDescriptionKeyword researcher and based on this, returns an assessment result with score.
     *
     * @param {Paper}      paper      The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed}        i18n       The object used for translations.
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    _keyphraseCounts: any;
    /**
     * Returns the result object based on the number of keyword matches in the meta description.
     *
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {Object} Result object with score and text.
     */
    calculateResult(i18n: Jed): any;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
//# sourceMappingURL=MetaDescriptionKeywordAssessment.d.ts.map