export default Assessor;
/**
 * Creates the Assessor.
 *
 * @param {Object} researcher       The researcher to use in the assessor.
 * @param {Object} options          The options for this assessor.
 * @param {Object} options.marker   The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class Assessor {
    constructor(researcher: any, options: any);
    type: string;
    _assessments: any[];
    _options: any;
    /**
     * Checks if the researcher is defined and sets it.
     *
     * @param   {Object} researcher The researcher to use in the assessor.
     *
     * @throws  {MissingArgument} Parameter needs to be a valid researcher object.
     * @returns {void}
     */
    setResearcher(researcher: Object): void;
    _researcher: Object | undefined;
    /**
     * Gets all available assessments.
     * @returns {object} assessment
     */
    getAvailableAssessments(): object;
    /**
     * Checks whether or not the Assessment is applicable.
     *
     * @param {Object} assessment The Assessment object that needs to be checked.
     * @param {Paper} paper The Paper object to check against.
     * @param {Researcher} [researcher] The Researcher object containing additional information.
     * @returns {boolean} Whether or not the Assessment is applicable.
     */
    isApplicable(assessment: Object, paper: any, researcher?: any): boolean;
    /**
     * Determines whether or not an assessment has a marker.
     *
     * @param {Object} assessment The assessment to check for.
     * @returns {boolean} Whether or not the assessment has a marker.
     */
    hasMarker(assessment: Object): boolean;
    /**
     * Returns the specific marker for this assessor.
     *
     * @returns {Function} The specific marker for this assessor.
     */
    getSpecificMarker(): Function;
    /**
     * Returns the paper that was most recently assessed.
     *
     * @returns {Paper} The paper that was most recently assessed.
     */
    getPaper(): any;
    /**
     * Returns the marker for a given assessment, composes the specific marker with the assessment getMarks function.
     *
     * @param {Object} assessment The assessment for which we are retrieving the composed marker.
     * @param {Paper} paper The paper to retrieve the marker for.
     * @param {Researcher} researcher The researcher for the paper.
     * @returns {Function} A function that can mark the given paper according to the given assessment.
     */
    getMarker(assessment: Object, paper: any, researcher: any): Function;
    /**
     * Runs the researches defined in the tasklist or the default researches.
     *
     * @param {Paper} paper The paper to run assessments on.
     * @returns {void}
     */
    assess(paper: any): void;
    results: any[] | undefined;
    _lastPaper: any;
    /**
     * Sets the value of has markers with a boolean to determine if there are markers.
     *
     * @param {boolean} hasMarkers True when there are markers, otherwise it is false.
     * @returns {void}
     */
    setHasMarkers(hasMarkers: boolean): void;
    _hasMarkers: boolean | undefined;
    /**
     * Returns true when there are markers.
     *
     * @returns {boolean} Are there markers
     */
    hasMarkers(): boolean;
    /**
     * Executes an assessment and returns the AssessmentResult.
     *
     * @param {Paper} paper The paper to pass to the assessment.
     * @param {Researcher} researcher The researcher to pass to the assessment.
     * @param {Object} assessment The assessment to execute.
     * @returns {AssessmentResult} The result of the assessment.
     */
    executeAssessment(paper: any, researcher: any, assessment: Object): AssessmentResult;
    /**
     * Filters out all assessmentresults that have no score and no text.
     *
     * @returns {Array<AssessmentResult>} The array with all the valid assessments.
     */
    getValidResults(): Array<AssessmentResult>;
    /**
     * Returns if an assessmentResult is valid.
     *
     * @param {object} assessmentResult The assessmentResult to validate.
     * @returns {boolean} whether or not the result is valid.
     */
    isValidResult(assessmentResult: object): boolean;
    /**
     * Returns the overallscore. Calculates the totalscore by adding all scores and dividing these
     * by the number of results times the ScoreRating.
     *
     * @returns {number} The overallscore
     */
    calculateOverallScore(): number;
    /**
     * Register an assessment to add it to the internal assessments object.
     *
     * @param {string} name The name of the assessment.
     * @param {object} assessment The object containing function to run as an assessment and it's requirements.
     * @returns {boolean} Whether registering the assessment was successful.
     * @private
     */
    private addAssessment;
    /**
     * Remove a specific Assessment from the list of Assessments.
     *
     * @param {string} name The Assessment to remove from the list of assessments.
     * @returns {void}
     */
    removeAssessment(name: string): void;
    /**
     * Returns an assessment by identifier
     *
     * @param {string} identifier The identifier of the assessment.
     * @returns {undefined|Object} The object if found, otherwise undefined.
     */
    getAssessment(identifier: string): undefined | Object;
    /**
     * Checks which of the available assessments are applicable and returns an array with applicable assessments.
     *
     * @returns {Array} The array with applicable assessments.
     */
    getApplicableAssessments(): any[];
}
import AssessmentResult from "../values/AssessmentResult";
