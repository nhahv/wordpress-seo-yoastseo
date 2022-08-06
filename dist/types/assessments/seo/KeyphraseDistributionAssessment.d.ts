export default KeyphraseDistributionAssessment;
/**
 * Returns a score based on the largest percentage of text in
 * which no keyword occurs.
 */
declare class KeyphraseDistributionAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.parameters.goodDistributionScore]
     *      The average distribution score that needs to be received from the step function to get a GOOD result.
     * @param {number} [config.parameters.acceptableDistributionScore]
     *      The average distribution score that needs to be received from the step function to get an OKAY result.
     * @param {number} [config.scores.good]             The score to return if keyword occurrences are evenly distributed.
     * @param {number} [config.scores.okay]             The score to return if keyword occurrences are somewhat unevenly distributed.
     * @param {number} [config.scores.bad]              The score to return if there is way too much text between keyword occurrences.
     * @param {number} [config.scores.consideration]    The score to return if there are no keyword occurrences.
     * @param {string} [config.url]                     The URL to the relevant KB article.
     *
     * @returns {void}
     */
    constructor(config?: Object);
    identifier: string;
    _config: any;
    /**
     * Runs the keyphraseDistribution research and based on this returns an assessment result.
     *
     * @param {Paper}      paper      The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed}        i18n       The object used for translations.
     *
     * @returns {AssessmentResult} The assessment result.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    _keyphraseDistribution: any;
    /**
     * Calculates the result based on the keyphraseDistribution research.
     *
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {Object} Object with score and feedback text.
     */
    calculateResult(i18n: Jed): Object;
    /**
     * Creates a marker for all content words in keyphrase and synonyms.
     *
     * @returns {Array} All markers for the current text.
     */
    getMarks(): any[];
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
