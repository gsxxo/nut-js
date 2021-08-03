"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libnut_screen_action_class_1 = __importDefault(require("../provider/native/libnut-screen-action.class"));
const image_writer_class_1 = require("../provider/opencv/image-writer.class");
const template_matching_finder_class_1 = __importDefault(require("../provider/opencv/template-matching-finder.class"));
/**
 * {@link VisionAdapter} serves as an abstraction layer for all image based interactions.
 *
 * This allows to provide a high level interface for image based actions,
 * without having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve screenshots / images are bundled in this adapter.
 */
class VisionAdapter {
    /**
     * {@link VisionAdapter} class constructor
     * @param finder A {@link FinderInterface} instance used for on-screen image detection (Default: {@link TemplateMatchingFinder})
     * @param screen A {@link ScreenActionProvider} instance used to retrieve screen data (Default: {@link ScreenAction})
     * @param dataSink A {@link DataSink} instance used to write output data to disk (Default: {@link ImageWriter})
     */
    constructor(finder = new template_matching_finder_class_1.default(), screen = new libnut_screen_action_class_1.default(), dataSink = new image_writer_class_1.ImageWriter()) {
        this.finder = finder;
        this.screen = screen;
        this.dataSink = dataSink;
    }
    /**
     * {@link grabScreen} will return an {@link Image} containing the current screen image
     *
     * @returns An {@link Image} which will contain screenshot data as well as dimensions
     */
    grabScreen() {
        return this.screen.grabScreen();
    }
    /**
     * {@link grabScreenRegion} essentially does the same as grabScreen, but only returns a specified {@link Region}
     *
     * @param region The screen {@link Region} we want to grab
     * @returns An {@link Image} which will contain screenshot data of the specified {@link Region} as well as dimensions
     */
    grabScreenRegion(region) {
        return this.screen.grabScreenRegion(region);
    }
    /**
     * {@link highlightScreenRegion} highlights a screen {@link Region} for a given duration by overlaying it with an opaque window
     *
     * @param region The {@link Region} to highlight
     * @param duration The highlight duration
     * @param opacity Overlay opacity
     */
    highlightScreenRegion(region, duration, opacity) {
        return this.screen.highlightScreenRegion(region, duration, opacity);
    }
    /**
     * {@link findOnScreenRegion} will search for a given pattern inside a {@link Region} of the main screen
     * If multiple possible occurrences are found, the one with the highest probability is returned.
     * For matchProbability < 0.99 the search will be performed on grayscale images.
     *
     * @param matchRequest A {@link MatchRequest} which holds all required matching data
     * @returns {@link MatchResult} containing location and probability of a possible match
     */
    async findOnScreenRegion(matchRequest) {
        return new Promise(async (resolve, reject) => {
            try {
                const matchResult = await this.finder.findMatch(matchRequest);
                resolve(matchResult);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link screenWidth} returns the main screens width as reported by the OS.
     * Please notice that on e.g. Apples Retina display the reported width
     * and the actual pixel size may differ
     *
     * @returns The main screens width as reported by the OS
     */
    screenWidth() {
        return this.screen.screenWidth();
    }
    /**
     * {@link screenHeight} returns the main screens height as reported by the OS.
     * Please notice that on e.g. Apples Retina display the reported width
     * and the actual pixel size may differ
     *
     * @returns The main screens height as reported by the OS
     */
    screenHeight() {
        return this.screen.screenHeight();
    }
    /**
     * {@link screenSize} returns a {@link Region} object with the main screens size.
     * Please note that on e.g. Apples Retina display the reported width
     * and the actual pixel size may differ
     *
     * @returns A {@link Region} object representing the size of a systems main screen
     */
    screenSize() {
        return this.screen.screenSize();
    }
    /**
     * {@link saveImage} saves an {@link Image} to a given path on disk.
     *
     * @param image The {@link Image} to store
     * @param path The path where to store the image
     */
    saveImage(image, path) {
        return this.dataSink.store(image, path);
    }
}
exports.VisionAdapter = VisionAdapter;
//# sourceMappingURL=vision.adapter.class.js.map