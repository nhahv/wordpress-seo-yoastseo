export default KeyphraseLengthAssessment;
/**
 * Assessment to check whether the keyphrase has a good length.
 */
declare class KeyphraseLengthAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {boolean} useCustomConfig Whether product page scoring is used or not.
     * @param {number} [config.parameters.recommendedMinimum] The recommended minimum length of the keyphrase (in words).
     * @param {number} [config.parameters.acceptableMaximum] The acceptable maximum length of the keyphrase (in words).
     * @param {number} [config.scores.veryBad] The score to return if the length of the keyphrase is below recommended minimum.
     * @param {number} [config.scores.consideration] The score to return if the length of the keyphrase is above acceptable maximum.
     *
     * @returns {void}
     */
    constructor(config?: Object | undefined, useCustomConfig?: boolean);
    defaultConfig: {
        parameters: {
            recommendedMinimum: number;
            recommendedMaximum: number;
            acceptableMaximum: number;
        };
        parametersNoFunctionWordSupport: {
            recommendedMaximum: number;
            acceptableMaximum: number;
        };
        scores: {
            veryBad: number;
            bad: number;
            okay: number;
            good: number;
        };
        urlTitle: string;
        urlCallToAction: string;
        isRelatedKeyphrase: boolean;
    };
    identifier: string;
    _config: {
        parameters: {
            recommendedMinimum: number;
            recommendedMaximum: number;
            acceptableMaximum: number;
        };
        parametersNoFunctionWordSupport: {
            recommendedMaximum: number;
            acceptableMaximum: number;
        };
        scores: {
            veryBad: number;
            bad: number;
            okay: number;
            good: number;
        };
        urlTitle: string;
        urlCallToAction: string;
        isRelatedKeyphrase: boolean;
    } & Object;
    _useCustomConfig: boolean;
    _keyphraseLengthData: any;
    _configToUse: Object | undefined;
    _boundaries: any;
    /**
     * Checks which configuration to use.
     *
     * @param {Researcher} researcher The researcher used for calling research.
     *
     * @returns {Object} Configuration to use.
     */
    getConfig(researcher: any): Object;
    /**
     * Calculates the result based on the keyphraseLength research.
     *
     * @returns {Object} Object with score and text.
     */
    calculateResult(): Object;
}
import Assessment from "../assessment";
