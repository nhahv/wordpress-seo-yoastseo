export default FleschReadingEaseAssessment;
/**
 * Assessment to check how readable the text is, based on the Flesch reading ease test.
 */
declare class FleschReadingEaseAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} config The configuration to use.
     * @returns {void}
     */
    constructor(config: Object);
    identifier: string;
    _config: any;
    /**
     * The assessment that runs the FleschReading on the paper.
     *
     * @param {Object} paper The paper to run this assessment on.
     * @param {Object} researcher The researcher used for the assessment.
     * @param {Object} i18n The i18n-object used for parsing translations.
     *
     * @returns {Object} An assessmentResult with the score and formatted text.
     */
    getResult(paper: Object, researcher: Object, i18n: Object): Object;
    fleschReadingResult: any;
    /**
     * Calculates the assessment result based on the fleschReadingScore.
     *
     * @param {Object} i18n The i18n-object used for parsing translations.
     *
     * @returns {Object} Object with score and resultText.
     */
    calculateResult(i18n: Object): Object;
    /**
     * Checks if Flesch reading analysis is available for the language of the paper.
     *
     * @param {Object} paper The paper to have the Flesch score to be calculated for.
     * @returns {boolean} Returns true if the language is available and the paper is not empty.
     */
    isApplicable(paper: Object): boolean;
}
import Assessment from "../../assessment";
