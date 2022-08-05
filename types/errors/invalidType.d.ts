export default InvalidTypeError;
/**
 * Throws an invalid type error
 *
 * @param {string} message The message to show when the error is thrown
 *
 * @returns {void}
 */
declare class InvalidTypeError {
    constructor(message: any);
    name: string;
    message: any;
}
