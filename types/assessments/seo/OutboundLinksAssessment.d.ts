/**
 * Assessment for calculating the outbound links in the text.
 */
export default class OutboundLinksAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: Object);
    identifier: string;
    _config: any;
    /**
     * Runs the getLinkStatistics module, based on this returns an assessment result with score.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed} i18n The object used for translations
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    /**
     * Returns a score based on the linkStatistics object.
     *
     * @param {object} linkStatistics The object with all link statistics.
     *
     * @returns {number|null} The calculated score.
     */
    calculateScore(linkStatistics: object): number | null;
    /**
     * Translates the score to a message the user can understand.
     *
     * @param {Object} linkStatistics The object with all link statistics.
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {string} The translated string.
     */
    translateScore(linkStatistics: Object, i18n: Jed): string;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
