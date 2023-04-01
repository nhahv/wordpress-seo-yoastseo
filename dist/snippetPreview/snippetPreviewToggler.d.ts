export default SnippetPreviewToggler;
/**
 * Constructs the snippet preview toggle.
 *
 * @param {string}    previewMode    The default preview mode.
 * @param {Element[]} previewToggles Array with toggle elements.
 *
 * @property {string}    previewMode    The current preview mode.
 * @property {Element[]} previewToggles The array with toggle elements.
 * @property {Element}   viewElement    The target element.
 * @constructor
 */
declare class SnippetPreviewToggler {
    constructor(previewMode: any, previewToggles: any);
    previewMode: any;
    previewToggles: any;
    viewElement: HTMLElement | null;
    /**
     * Initializes the object by setting the current previewMode as the active one.
     *
     * @returns {void}
     */
    initialize(): void;
    /**
     * Binds a function on the click event of the preview toggle.
     *
     * @param {string} previewToggle The previewToggle to bind the click event on.
     *
     * @returns {void}
     */
    bindClickEvent(previewToggle: string): void;
    /**
     * Binds a function on the mouseleave event of the preview toggle.
     *
     * @param {string} previewToggle The previewToggle to bind the mouseleave event on.
     *
     * @returns {void}
     */
    bindMouseleaveEvent(previewToggle: string): void;
    /**
     * Binds a function on the blur event of the preview toggle.
     *
     * @param {string} previewToggle The previewToggle to bind the blur event on.
     *
     * @returns {void}
     */
    bindBlurEvent(previewToggle: string): void;
    /**
     * Binds a function on the mouseenter event of the preview toggle.
     *
     * @param {string} previewToggle The previewToggle to bind the mouseenter event on.
     *
     * @returns {void}
     */
    bindMouseenterEvent(previewToggle: string): void;
    /**
     * Sets the events for the preview toggles to switch between the preview modes and handle the tooltips.
     *
     * @returns {void}
     */
    bindEvents(): void;
    /**
     * Returns the element by given mode.
     *
     * @param {string} previewMode The mode used to find the element.
     * @returns {Element} The found element.
     * @private
     */
    private _findElementByMode;
    /**
     * Sets the preview mode.
     *
     * @param {string}  previewMode   The preview mode that has to be set.
     * @param {Element} toggleElement The element that has been triggered.
     *
     * @returns {void}
     * @private
     */
    private _setPreviewMode;
    /**
     * Sets the Snippet Preview Toggler to desktop mode.
     *
     * @returns {void}
     */
    setDesktopMode(): void;
    /**
     * Sets the Snippet Preview Toggler to mobile mode.
     *
     * @returns {void}
     */
    setMobileMode(): void;
    /**
     * Sets the initial view to desktop or mobile based on the width of the Snippet Preview container.
     *
     * @param {number} previewWidth the width of the Snippet Preview container.
     *
     * @returns {void}
     */
    setVisibility(previewWidth: number): void;
    /**
     * When the window is resized, sets the visibility of the Scroll Hint message.
     *
     * @param {number} previewWidth the width of the Snippet Preview container.
     *
     * @returns {void}
     */
    setScrollHintVisibility(previewWidth: number): void;
    /**
     * Removes all active state for the preview toggles.
     *
     * @returns {void}
     * @private
     */
    private _removeActiveStates;
    /**
     * Removes the active state for the given element.
     *
     * @param {Element} previewToggle The element to remove its state for.
     * @returns {void}
     * @private
     */
    private _removeActiveState;
    /**
     * Makes an element tooltip hidden.
     *
     * @param {Element} previewToggle The element on which the tooltip should be hidden.
     * @returns {void}
     */
    removeTooltipAbility(previewToggle: Element): void;
    /**
     * Makes an element tooltip visible.
     *
     * @param {Element} previewToggle The element on which the tooltip should be visible.
     * @returns {void}
     */
    restoreTooltipAbility(previewToggle: Element): void;
    /**
     * Adds active state to the given element.
     *
     * @param {Element} elementToActivate The element that will be activated.
     * @returns {void}
     * @private
     */
    private _setActiveState;
}
