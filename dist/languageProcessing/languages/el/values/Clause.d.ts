export default GreekClause;
/**
 * Creates a Clause object for the Greek language.
 */
declare class GreekClause {
    /**
     * Constructor.
     *
     * @param {string} clauseText   The text of the clause.
     * @param {Array} auxiliaries   The auxiliaries.
     *
     * @constructor
     */
    constructor(clauseText: string, auxiliaries: any[]);
    _participles: any[];
    /**
     * Sets the passiveness of a clause based on whether the matched participle is a valid one.
     * We only process clauses that have an auxiliary in this check.
     *
     * @returns {void}
     */
    checkParticiples(): void;
}
