/**
 * Configures the Shortlinker instance.
 *
 * @param {Object} config             The configuration.
 * @param {Object} [config.params={}] The default params for in the url.
 *
 * @returns {void}
 */
export function configureShortlinker(config: {
    params?: any;
}): void;
/**
 * Creates a link by combining the params from the config and appending them to the url.
 *
 * @param {string} url         The url.
 * @param {Object} [params={}] Optional extra params for in the url.
 *
 * @returns {string} The url with query string.
 */
export function createShortlink(url: string, params?: any): string;
/**
 * Creates an anchor opening tag.
 *
 * @param {string} url         The url.
 * @param {Object} [params={}] Optional extra params for in the url.
 *
 * @returns {string} The anchor opening tag.
 */
export function createAnchorOpeningTag(url: string, params?: any): string;
//# sourceMappingURL=singleton.d.ts.map