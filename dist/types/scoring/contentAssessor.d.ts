export default ContentAssessor;
/**
 * Creates the Assessor
 *
 * @param {object}  researcher      The researcher to use for the analysis.
 * @param {Object}  options         The options for this assessor.
 * @param {Object}  options.marker  The marker to pass the list of marks to.
 *
 * @constructor
 */
declare class ContentAssessor extends Assessor {
    constructor(researcher: any, options?: {});
    /**
     * Calculates the weighted rating for languages that have all assessments based on a given rating.
     *
     * @param {number} rating The rating to be weighted.
     * @returns {number} The weighted rating.
     */
    calculatePenaltyPointsFullSupport(rating: number): number;
    /**
     * Calculates the weighted rating for languages that don't have all assessments based on a given rating.
     *
     * @param {number} rating The rating to be weighted.
     * @returns {number} The weighted rating.
     */
    calculatePenaltyPointsPartialSupport(rating: number): number;
    /**
     * Determines whether a language is fully supported. If a language supports 8 content assessments
     * it is fully supported
     *
     * @returns {boolean} True if fully supported.
     */
    _allAssessmentsSupported(): boolean;
    /**
     * Calculates the penalty points based on the assessment results.
     *
     * @returns {number} The total penalty points for the results.
     */
    calculatePenaltyPoints(): number;
    /**
     * Rates the penalty points
     *
     * @param {number} totalPenaltyPoints The amount of penalty points.
     * @returns {number} The score based on the amount of penalty points.
     *
     * @private
     */
    private _ratePenaltyPoints;
}
import Assessor from "./assessor.js";
