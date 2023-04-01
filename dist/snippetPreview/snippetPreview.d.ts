export default SnippetPreview;
/**
 * @module snippetPreview
 */
/**
 * Defines the config and outputTarget for the SnippetPreview
 *
 * @param {Object}         opts                           - Snippet preview options.
 * @param {App}            opts.analyzerApp               - The app object the Snippet Preview is part of.
 * @param {Object}         opts.placeholder               - The placeholder values for the fields, will be shown as
 * actual placeholders in the inputs and as a fallback for the preview.
 * @param {string}         opts.placeholder.title         - The placeholder title.
 * @param {string}         opts.placeholder.metaDesc      - The placeholder meta description.
 * @param {string}         opts.placeholder.urlPath       - The placeholder url.
 *
 * @param {Object}         opts.defaultValue              - The default value for the fields, if the user has not
 * changed a field, this value will be used for the analyzer, preview and the progress bars.
 * @param {string}         opts.defaultValue.title        - The default title.
 * @param {string}         opts.defaultValue.metaDesc     - The default meta description.
 * it.
 *
 * @param {string}         opts.baseURL                   - The basic URL as it will be displayed in google.
 * @param {HTMLElement}    opts.targetElement             - The target element that contains this snippet editor.
 *
 * @param {Object}         opts.callbacks                 - Functions that are called on specific instances.
 * @param {Function}       opts.callbacks.saveSnippetData - Function called when the snippet data is changed.
 *
 * @param {boolean}        opts.addTrailingSlash          - Whether or not to add a trailing slash to the URL.
 * @param {string}         opts.metaDescriptionDate       - The date to display before the meta description.
 *
 * @param {string}         opts.previewMode               - The current preview mode.
 *
 * @property {App}         refObj                         - The connected app object.
 *
 * @property {HTMLElement} targetElement                  - The target element that contains this snippet editor.
 *
 * @property {Object}      element                        - The elements for this snippet editor.
 * @property {Object}      element.rendered               - The rendered elements.
 * @property {HTMLElement} element.rendered.title         - The rendered title element.
 * @property {HTMLElement} element.rendered.urlPath       - The rendered url path element.
 * @property {HTMLElement} element.rendered.urlBase       - The rendered url base element.
 * @property {HTMLElement} element.rendered.metaDesc      - The rendered meta description element.
 *
 * @property {HTMLElement} element.measurers.titleWidth   - The rendered title width element.
 * @property {HTMLElement} element.measurers.metaHeight   - The rendered meta height element.
 *
 * @property {Object}      element.input                  - The input elements.
 * @property {HTMLElement} element.input.title            - The title input element.
 * @property {HTMLElement} element.input.urlPath          - The url path input element.
 * @property {HTMLElement} element.input.metaDesc         - The meta description input element.
 *
 * @property {HTMLElement} element.container              - The main container element.
 * @property {HTMLElement} element.formContainer          - The form container element.
 * @property {HTMLElement} element.editToggle             - The button that toggles the editor form.
 *
 * @property {Object}      data                           - The data for this snippet editor.
 * @property {string}      data.title                     - The title.
 * @property {string}      data.urlPath                   - The url path.
 * @property {string}      data.metaDesc                  - The meta description.
 * @property {int}         data.titleWidth                - The width of the title in pixels.
 * @property {int}         data.metaHeight                - The height of the meta description in pixels.
 *
 * @property {string}      baseURL                        - The basic URL as it will be displayed in google.
 *
 * @property {boolean}     hasProgressSupport             - Whether this browser supports the <progress> element.
 *
 * @constructor
 */
declare class SnippetPreview {
    constructor(opts: any);
    data: any;
    refObj: any;
    opts: any;
    _currentFocus: any;
    _currentHover: any;
    unformattedText: {};
    /**
     * Renders snippet editor and adds it to the targetElement
     * @returns {void}
     */
    renderTemplate(): void;
    element: {
        measurers: {
            metaHeight: null;
        };
        rendered: {
            title: HTMLElement | null;
            urlBase: HTMLElement | null;
            urlPath: HTMLElement | null;
            metaDesc: HTMLElement | null;
        };
        input: {
            title: any;
            urlPath: any;
            metaDesc: any;
        };
        progress: {
            title: any;
            metaDesc: any;
        };
        container: HTMLElement | null;
        formContainer: any;
        editToggle: any;
        closeEditor: any;
        formFields: any;
    } | undefined;
    hasProgressSupport: boolean | undefined;
    opened: boolean | undefined;
    /**
     * Initializes the Snippet Preview Toggler.
     *
     * @returns {void}
     */
    initPreviewToggler(): void;
    snippetPreviewToggle: SnippetPreviewToggler | undefined;
    /**
     * Refreshes the snippet editor rendered HTML
     * @returns {void}
     */
    refresh(): void;
    output: Object | undefined;
    /**
     * Returns the data from the Snippet Preview.
     *
     * @returns {Object} The collected data for the analyzer.
     */
    getAnalyzerData(): Object;
    /**
     * Calls the event binder that has been registered using the callbacks option in the arguments of the App.
     *
     * @returns {void}
     */
    callRegisteredEventBinder(): void;
    /**
     *  Checks if title and url are set so they can be rendered in the Snippet Preview.
     *
     *  @returns {void}
     */
    init(): void;
    /**
     * Creates html object to contain the strings for the Snippet Preview.
     *
     * @returns {Object} The HTML output of the collected data.
     */
    htmlOutput(): Object;
    /**
     * Formats the title for the Snippet Preview. If title and pageTitle are empty, sampletext is used.
     *
     * @returns {string} The correctly formatted title.
     */
    formatTitle(): string;
    /**
     * Formats the base url for the Snippet Preview. Removes the protocol name from the URL.
     *
     * @returns {string} Formatted base url for the Snippet Preview.
     */
    formatUrl(): string;
    /**
     * Formats the url for the Snippet Preview.
     *
     * @returns {string} Formatted URL for the Snippet Preview.
     */
    formatCite(): string;
    /**
     * Formats the meta description for the Snippet Preview, if it's empty retrieves it using getMetaText.
     *
     * @returns {string} Formatted meta description.
     */
    formatMeta(): string;
    /**
     * Generates a meta description with an educated guess based on the passed text and excerpt.
     * It uses the keyword to select an appropriate part of the text. If the keyword isn't present it takes the maximum
     * meta description length of the text. If both the keyword, text and excerpt are empty this function returns the
     * sample text.
     *
     * @returns {string} A generated meta description.
     */
    getMetaText(): string;
    /**
     * Builds an array with all indexes of the keyword.
     *
     * @returns {Array} Array with matches
     */
    getIndexMatches(): any[];
    /**
     * Builds an array with indexes of all sentence ends (select on .).
     *
     * @returns {Array} Array with sentences.
     */
    getPeriodMatches(): any[];
    /**
     * Formats the keyword for use in the snippetPreview by adding <strong>-tags
     * strips unwanted characters that could break the regex or give unwanted results.
     *
     * @param {string} textString The keyword string that needs to be formatted.
     *
     * @returns {string} The formatted keyword.
     */
    formatKeyword(textString: string): string;
    /**
     * Formats the keyword for use in the URL by accepting - and _ instead of spaces and by adding <strong>-tags.
     * Strips unwanted characters that could break the regex or give unwanted results.
     *
     * @param {string} textString The keyword string that needs to be formatted.
     *
     * @returns {XML|string|void} The formatted keyword string to be used in the URL.
     */
    formatKeywordUrl(textString: string): any | string | void;
    /**
     * Renders the outputs to the elements on the page.
     *
     * @returns {void}
     */
    renderOutput(): void;
    /**
     * Makes the rendered meta description gray if no meta description has been set by the user.
     *
     * @returns {void}
     */
    renderSnippetStyle(): void;
    /**
     * Function to call init, to rerender the Snippet Preview.
     *
     * @returns {void}
     */
    reRender(): void;
    /**
     * Checks text length of the snippetmeta and snippet title, shortens it if it is too long.
     * @param {Object} event The event to check the text length from.
     *
     * @returns {void}
     */
    checkTextLength(event: Object): void;
    /**
     * Get the unformatted text.
     *
     * When clicking on an element in the Snippet Preview, this checks and fills the textContent with the data from the
     * unformatted text. This removes the keyword highlighting and modified data so the original content can be editted.
     *
     * @param {Object} event The event to get the unformatted text from.
     *
     * @returns {void}
     */
    getUnformattedText(event: Object): void;
    /**
     * Sets the unformatted text.
     *
     * When text is entered into the snippetPreview elements, the text is set in the unformattedText object.
     * This allows the visible data to be editted in the snippetPreview.
     *
     * @param {Object} event The event to set the unformatted text from.
     *
     * @returns {void}
     */
    setUnformattedText(event: Object): void;
    /**
     * Validates all fields and highlights errors.
     *
     * @returns {void}
     */
    validateFields(): void;
    /**
     * Updates progress bars based on the available data.
     *
     * @returns {void}
     */
    updateProgressBars(): void;
    /**
     * Gets the width of the Snippet Preview to set its initial view to desktop or mobile.
     *
     * @returns {void}
     */
    setInitialView(): void;
    /**
     * Binds the reloadSnippetText function to the blur of the snippet inputs.
     *
     * @returns {void}
     */
    bindEvents(): void;
    /**
     * Updates our data object from the DOM.
     *
     * @returns {void}
     */
    updateDataFromDOM(): void;
    /**
     * Opens the snippet editor.
     *
     * @returns {void}
     */
    openEditor(): void;
    /**
     * Closes the snippet editor.
     *
     * @returns {void}
     */
    closeEditor(): void;
    /**
     * Toggles the snippet editor.
     *
     * @returns {void}
     */
    toggleEditor(): void;
    /**
     * Updates carets before the preview and input fields.
     *
     * @private
     *
     * @returns {void}
     */
    private _updateFocusCarets;
    /**
     * Updates hover carets before the input fields.
     *
     * @private
     *
     * @returns {void}
     */
    private _updateHoverCarets;
    /**
     * Updates the title data and the title input field. This also means the snippet editor view is updated.
     *
     * @param {string} title The title to use in the input field.
     *
     * @returns {void}
     */
    setTitle(title: string): void;
    /**
     * Updates the url path data and the url path input field. This also means the snippet editor view is updated.
     *
     * @param {string} urlPath the URL path to use in the input field.
     *
     * @returns {void}
     */
    setUrlPath(urlPath: string): void;
    /**
     * Updates the meta description data and the meta description input field. This also means the snippet editor view is updated.
     *
     * @param {string} metaDesc the meta description to use in the input field.
     *
     * @returns {void}
     */
    setMetaDescription(metaDesc: string): void;
    /**
     * Creates elements with the purpose to calculate the sizes of elements and puts these elements to the body.
     *
     * @returns {void}
     */
    createMeasurementElements(): void;
    /**
     * Copies the title text to the title measure element to calculate the width in pixels.
     *
     * @returns {void}
     */
    measureTitle(): void;
    /**
     * Copies the metadescription text to the metadescription measure element to calculate the height in pixels.
     *
     * @returns {void}
     */
    measureMetaDescription(): void;
    /**
     * Returns the width of the title in pixels.
     *
     * @returns {Number} The width of the title in pixels.
     */
    getTitleWidth(): number;
    /**
     * Allows to manually set the title width.
     *
     * This may be useful in setups where the title field will not always be rendered.
     *
     * @param {Number} titleWidth The width of the title in pixels.
     *
     * @returns {void}
     */
    setTitleWidth(titleWidth: number): void;
    /**
     * Returns whether or not an app object is present.
     *
     * @returns {boolean} Whether or not there is an App object present.
     */
    hasApp(): boolean;
    /**
     * Returns whether or not a pluggable object is present.
     *
     * @returns {boolean} Whether or not there is a Pluggable object present.
     */
    hasPluggable(): boolean;
    /**
     * Disables Enter as input.
     *
     * Used to disable enter as input. Returns false to prevent enter, and preventDefault and
     * cancelBubble to prevent other elements from capturing this event.
     *
     * @deprecated
     *
     * @param {KeyboardEvent} ev The keyboard event.
     */
    disableEnter(ev: KeyboardEvent): void;
    /**
     * Adds and removes the tooLong class when a text is too long.
     *
     * @deprecated
     * @param ev The event.
     */
    textFeedback(ev: any): void;
    /**
     * Shows the edit icon corresponding to the hovered element.
     *
     * @deprecated
     *
     * @param ev The event.
     */
    showEditIcon(ev: any): void;
    /**
     * Removes all editIcon-classes, sets to snippet_container.
     *
     * @deprecated
     */
    hideEditIcon(): void;
    /**
     * Sets focus on child element of the snippet_container that is clicked. Hides the editicon.
     *
     * @deprecated
     *
     * @param ev The event.
     */
    setFocus(ev: any): void;
    /**
     * When the window is resized, gets the width of the Snippet Preview to set the Scroll Hint visibility.
     *
     * @returns {void}
     */
    handleWindowResizing: import("lodash").DebouncedFunc<() => void>;
    /**
     * Updates Snippet Preview on changed input. It's debounced so that we can call this function as much as we want.
     *
     * @returns {void}
     */
    changedInput: import("lodash").DebouncedFunc<() => void>;
}
import SnippetPreviewToggler from "./snippetPreviewToggler";
