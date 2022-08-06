export default PreviouslyUsedKeyword;
/**
 * @param {object} app The app
 * @param {object} args An arguments object with usedKeywords, searchUrl, postUrl,
 * @param {object} args.usedKeywords An object with keywords and ids where they are used.
 * @param {string} args.searchUrl The url used to link to a search page when multiple usages of the keyword are found.
 * @param {string} args.postUrl The url used to link to a post when 1 usage of the keyword is found.
 * @constructor
 */
declare class PreviouslyUsedKeyword {
    constructor(app: any, args: any);
    app: any;
    usedKeywords: any;
    searchUrl: any;
    postUrl: any;
    urlTitle: string;
    urlCallToAction: string;
    /**
     * Registers the assessment with the assessor.
     *
     * @returns {void}
     */
    registerPlugin(): void;
    /**
     * Updates the usedKeywords.
     *
     * @param {object} usedKeywords An object with keywords and ids where they are used.
     * @returns {void}
     */
    updateKeywordUsage(usedKeywords: object): void;
    /**
     * Scores the previously used keyword assessment based on the count.
     *
     * @param {object} previouslyUsedKeywords The result of the previously used keywords research
     * @param {Paper} paper The paper object to research.
     * @returns {object} the scoreobject with text and score.
     */
    scoreAssessment(previouslyUsedKeywords: object, paper: any): object;
    /**
     * Researches the previously used keywords, based on the used keywords and the keyword in the paper.
     *
     * @param {Paper} paper The paper object to research.
     * @returns {{id: number, count: number}} The object with the count and the id of the previously used keyword
     */
    researchPreviouslyUsedKeywords(paper: any): {
        id: number;
        count: number;
    };
    /**
     * The assessment for the previously used keywords.
     *
     * @param {Paper} paper The Paper object to assess.
     * @returns {AssessmentResult} The assessment result of the assessment
     */
    assess(paper: any): AssessmentResult;
}
import AssessmentResult from "../values/AssessmentResult";
