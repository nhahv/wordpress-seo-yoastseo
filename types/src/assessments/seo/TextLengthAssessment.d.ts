/**
 * Assessment that will test if the text is long enough.
 */
export default class TextLengthAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: any);
    identifier: string;
    _config: any;
    /**
     * Execute the Assessment and return a result.
     *
     * @param {Paper} paper The Paper object to assess.
     * @param {Researcher} researcher The Researcher object containing all available researches.
     * @param {Jed} i18n The locale object.
     *
     * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
     */
    getResult(paper: Paper, researcher: Researcher, i18n: Jed): AssessmentResult;
    /**
     * Returns the score and the appropriate feedback string based on the current word count.
     *
     * @param {number} wordCount The amount of words to be checked against.
     * @param {Jed} i18n The locale object.
     *
     * @returns {Object} The score and the feedback string.
     */
    calculateResult(wordCount: number, i18n: Jed): any;
}
import Assessment from "../../assessment";
import AssessmentResult from "../../values/AssessmentResult";
//# sourceMappingURL=TextLengthAssessment.d.ts.map