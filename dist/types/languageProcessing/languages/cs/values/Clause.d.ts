export default CzechClause;
/**
 * Creates a Clause object for the Czech language.
 */
declare class CzechClause {
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
     * Sets the clause passiveness to true if there is a participle present in the clause, otherwise sets it to false.
     *
     * @returns {void}
     */
    checkParticiples(): void;
}
