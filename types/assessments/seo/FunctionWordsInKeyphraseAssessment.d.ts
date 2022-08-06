export default FunctionWordsInKeyphraseAssessment;
/**
 * Assessment to check whether the keyphrase only contains function words.
 */
declare class FunctionWordsInKeyphraseAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.scores.onlyFunctionWords] The score to return if the keyphrase contains only function words.
     * @param {string} [config.urlTitle] The URL to the relevant KB article.
     * @param {string} [config.urlCallToAction] The URL to the call-to-action article.
     *
     * @returns {void}
     */
    constructor(config?: Object);
    identifier: string;
    _config: any;
    /**
     * Runs the functionWordsInKeyphrase researcher, based on this returns an assessment result with score.
     *
     * @param {Paper} paper The paper to use for the assessment.
     * @param {Researcher} researcher The researcher used for calling research.
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {AssessmentResult} The result of the assessment.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    _functionWordsInKeyphrase: any;
    _keyword: any;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
