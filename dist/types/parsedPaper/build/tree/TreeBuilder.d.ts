export default TreeBuilder;
/**
 * Builds a tree representation of a source text.
 *
 * Currently supported languages:
 *  - HTML (`"html"`)
 *
 * @memberOf module:parsedPaper/builder
 */
declare class TreeBuilder {
    /**
     * A registry holding the parse function to be called
     * for each supported formatting language.
     *
     * @type {Object<string,Function>}
     * @private
     */
    private _buildFunctions;
    /**
     * Parses the given source text to a tree representation.
     *
     * Chooses the right parser depending on the given formatting language in which the text has been written (defaults to HTML).
     *
     * @param {string} sourceText                The source text that needs to be parsed to a tree representation.
     * @param {Object} [options]                 Parse options.
     * @param {string} [options.language="html"] The formatting language in which the source text has been written, e.g. `"html"` for HTML.
     *
     * @returns {module:parsedPaper/structure.Node} The tree representation as parsed from the source text.
     */
    build(sourceText: string, options?: {
        language?: string;
    }): any;
    /**
     * Registers a build function for the given formatting language.
     *
     * Call this method if you want to add support for another formatting language.
     *
     * @example
     *   // Create a new build function.
     *   const myBuilder = sourceText => {
     *       const node = new Paragraph();
     *       node.textContainer.appendText( sourceText );
     *       return node;
     *   };
     *
     *   // Register the build function for the language "my-language".
     *   treeBuilder.register( "my-language", myBuilder );
     *
     *   // Build the tree using the registered builder.
     *   const tree = treeBuilder.build( "some input", { language: "my-language" } );
     *
     * @param {string}                                                            language      The language to register.
     * @param {function( sourceText: string ): module:parsedPaper/structure.Node} buildFunction The build function for the given language.
     *
     * @returns {void}
     */
    register(language: string, buildFunction: any): void;
}
