export default TextCompetingLinksAssessment;
/**
 * Assessment to check whether you're linking to a different page with the keyword from this page.
 */
declare class TextCompetingLinksAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.parameters.recommendedMaximum] The recommended maximum number of links using the same keyword as this paper.
     * @param {string} [config.scores.bad] The score to return if there are more links with the same keyword than the recommended maximum.
     * @param {string} [config.url] The URL to the relevant article on Yoast.com.
     *
     * @returns {void}
     */
    constructor(config?: Object);
    identifier: string;
    _config: any;
    /**
     * Runs the linkCount module, based on this returns an assessment result with score.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {Object} The AssessmentResult.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): Object;
    linkCount: any;
    /**
     * Returns a result based on the number of links.
     *
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {Object} ResultObject with score and text.
     */
    calculateResult(i18n: Jed): Object;
}
import Assessment from "../../assessment";
