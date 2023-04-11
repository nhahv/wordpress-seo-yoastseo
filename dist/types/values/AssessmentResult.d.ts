export default AssessmentResult;
/**
 * Construct the AssessmentResult value object.
 *
 * @param {Object} [values] The values for this assessment result.
 *
 * @constructor
 */
declare class AssessmentResult {
    /**
     * Parses the object to an AssessmentResult.
     *
     * @param {Object} serialized The serialized object.
     *
     * @returns {AssessmentResult} The parsed AssessmentResult.
     */
    static parse(serialized: Object): AssessmentResult;
    constructor(values: any);
    _hasScore: boolean;
    _identifier: string;
    _hasMarks: boolean;
    _marker: () => any[];
    score: number;
    text: string;
    marks: any[];
    /**
     * Check if a score is available.
     * @returns {boolean} Whether or not a score is available.
     */
    hasScore(): boolean;
    /**
     * Get the available score
     * @returns {number} The score associated with the AssessmentResult.
     */
    getScore(): number;
    /**
     * Set the score for the assessment.
     * @param {number} score The score to be used for the score property
     * @returns {void}
     */
    setScore(score: number): void;
    /**
     * Check if a text is available.
     * @returns {boolean} Whether or not a text is available.
     */
    hasText(): boolean;
    /**
     * Get the available text
     * @returns {string} The text associated with the AssessmentResult.
     */
    getText(): string;
    /**
     * Set the text for the assessment.
     * @param {string} text The text to be used for the text property
     * @returns {void}
     */
    setText(text: string): void;
    /**
     * Gets the available marks.
     *
     * @returns {array} The marks associated with the AssessmentResult.
     */
    getMarks(): any;
    /**
     * Sets the marks for the assessment.
     *
     * @param {array} marks The marks to be used for the marks property
     *
     * @returns {void}
     */
    setMarks(marks: any): void;
    /**
     * Sets the identifier
     *
     * @param {string} identifier An alphanumeric identifier for this result.
     * @returns {void}
     */
    setIdentifier(identifier: string): void;
    /**
     * Gets the identifier
     *
     * @returns {string} An alphanumeric identifier for this result.
     */
    getIdentifier(): string;
    /**
     * Sets the marker, a pure function that can return the marks for a given Paper
     *
     * @param {Function} marker The marker to set.
     * @returns {void}
     */
    setMarker(marker: Function): void;
    /**
     * Returns whether or not this result has a marker that can be used to mark for a given Paper
     *
     * @returns {boolean} Whether or this result has a marker.
     */
    hasMarker(): boolean;
    /**
     * Gets the marker, a pure function that can return the marks for a given Paper
     *
     * @returns {Function} The marker.
     */
    getMarker(): Function;
    /**
     * Sets the value of _hasMarks to determine if there is something to mark.
     *
     * @param {boolean} hasMarks Is there something to mark.
     * @returns {void}
     */
    setHasMarks(hasMarks: boolean): void;
    /**
     * Returns the value of _hasMarks to determine if there is something to mark.
     *
     * @returns {boolean} Is there something to mark.
     */
    hasMarks(): boolean;
    /**
     * Serializes the AssessmentResult instance to an object.
     *
     * @returns {Object} The serialized AssessmentResult.
     */
    serialize(): Object;
}
