export default MissingArgumentError;
/**
 * Error that means that an argument should be passed that wasn't passed.
 *
 * @constructor
 *
 * @param {string} message The message for this error.
 *
 * @returns {void}
 */
declare class MissingArgumentError {
    constructor(message: any);
    name: string;
    message: any;
}
