export default UrlLengthAssessment;
/**
 * Assessment that checks if the url is long enough.
 */
declare class UrlLengthAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     *
     * @returns {void}
     *
     * @deprecated since 1.48. We have removed it from the assessments since we do not consider it an important SEO factor anymore.
     */
    constructor(config?: Object);
    identifier: string;
    _config: any;
    /**
     * Checks the length of the url.
     *
     * @param {Paper} paper The paper to run this assessment on.
     * @param {Researcher} researcher The researcher used for the assessment.
     * @param {Jed} i18n The i18n-object used for parsing translations.
     *
     * @returns {AssessmentResult} an AssessmentResult with the score and the formatted text.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    /**
     * Calculates the score based on the url length.
     *
     * @param {boolean} urlIsTooLong True when the URL is too long.
     *
     * @returns {number|null} The calculated score.
     */
    calculateScore(urlIsTooLong: boolean): number | null;
    /**
     * Translates the score to a message the user can understand.
     *
     * @param {boolean} urlIsTooLong True when the URL is too long.
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {string} The translated string.
     */
    translateScore(urlIsTooLong: boolean, i18n: Jed): string;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
