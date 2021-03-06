"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * {@link OptionalSearchParameters} serves as a data class holding location parameters for image search
 */
class OptionalSearchParameters {
    /**
     * {@link OptionalSearchParameters} class constructor
     * @param searchRegion Optional {@link Region} to limit the search space to
     * @param confidence Optional confidence value to configure image match confidence
     * @param searchMultipleScales Optional flag to indicate if the search should be conducted at different scales
     * @param abort An {@link AbortSignal} to cancel an ongoing call to `waitFor`
     */
    constructor(searchRegion, confidence, searchMultipleScales, abort) {
        this.searchRegion = searchRegion;
        this.confidence = confidence;
        this.searchMultipleScales = searchMultipleScales;
        this.abort = abort;
    }
}
exports.OptionalSearchParameters = OptionalSearchParameters;
//# sourceMappingURL=optionalsearchparameters.class.js.map