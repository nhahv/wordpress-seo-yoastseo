export default NorwegianClause;
/**
 * Creates a Clause object for the Norwegian language.
 */
declare class NorwegianClause {
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
     * Checks if any exceptions are applicable to this participle that would result in the clause not being passive.
     * If no exceptions are found, the clause is passive.
     *
     * @returns { void }
     */
    checkParticiples(): void;
}
