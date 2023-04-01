/**
 * Represents the assessment that checks whether there is enough text in the paper.
 */
export default class TextPresenceAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {object} config The configuration to use.
     *
     * @returns {void}
     */
    constructor(config?: object);
    identifier: string;
    _config: {
        urlTitle: string;
        urlCallToAction: string;
    } & object;
}
import Assessment from "../assessment";
