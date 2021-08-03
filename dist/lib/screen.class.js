"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = require("process");
const file_type_enum_1 = require("./file-type.enum");
const generate_output_path_function_1 = require("./generate-output-path.function");
const match_request_class_1 = require("./match-request.class");
const region_class_1 = require("./region.class");
const timeout_function_1 = require("./util/timeout.function");
/**
 * {@link Screen} class provides methods to access screen content of a systems main display
 */
class Screen {
    /**
     * {@link Screen} class constructor
     * @param vision {@link VisionAdapter} instance which bundles access to screen and / or computer vision related APIs
     * @param findHooks A {@link Map} of {@link FindHookCallback} methods assigned to a template image filename
     */
    constructor(vision, findHooks = new Map()) {
        this.vision = vision;
        this.findHooks = findHooks;
        /**
         * Config object for {@link Screen} class
         */
        this.config = {
            /**
             * Configures the required matching percentage for template images to be declared as a match
             */
            confidence: 0.99,
            /**
             * Configure whether to auto highlight all search results or not
             */
            autoHighlight: false,
            /**
             * Configure highlighting duration
             */
            highlightDurationMs: 500,
            /**
             * Configure opacity of highlight window
             */
            highlightOpacity: 0.25,
            /**
             * Configures the path from which template images are loaded from
             */
            resourceDirectory: process_1.cwd(),
        };
    }
    /**
     * {@link width} returns the main screen width
     * This refers to the hardware resolution.
     * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher width in in actual pixels
     */
    width() {
        return this.vision.screenWidth();
    }
    /**
     * {@link height} returns the main screen height
     * This refers to the hardware resolution.
     * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher height in in actual pixels
     */
    height() {
        return this.vision.screenHeight();
    }
    /**
     * {@link find} will search for a template image on a systems main screen
     * @param templateImageFilename Filename of the template image, relative to {@link Screen.config.resourceDirectory}
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    async find(templateImageFilename, params) {
        const minMatch = (params && params.confidence) || this.config.confidence;
        const screenSize = await this.vision.screenSize();
        const searchRegion = (params && params.searchRegion) || screenSize;
        const searchMultipleScales = (params && params.searchMultipleScales);
        const fullPathToNeedle = path_1.normalize(path_1.join(this.config.resourceDirectory, templateImageFilename));
        const screenImage = await this.vision.grabScreen();
        const matchRequest = new match_request_class_1.MatchRequest(screenImage, fullPathToNeedle, searchRegion, minMatch, searchMultipleScales);
        function validateSearchRegion(search, screen) {
            if (search.left < 0 || search.top < 0 || search.width < 0 || search.height < 0) {
                throw new Error(`Negative values in search region ${search}`);
            }
            if (isNaN(search.left) || isNaN(search.top) || isNaN(search.width) || isNaN(search.height)) {
                throw new Error(`NaN values in search region ${search}`);
            }
            if (search.width < 2 || search.height < 2) {
                throw new Error(`Search region ${search} is not large enough. Must be at least two pixels in both width and height.`);
            }
            if (search.left + search.width > screen.width || search.top + search.height > screen.height) {
                throw new Error(`Search region ${search} extends beyond screen boundaries (${screen.width}x${screen.height})`);
            }
        }
        return new Promise(async (resolve, reject) => {
            try {
                validateSearchRegion(searchRegion, screenSize);
                const matchResult = await this.vision.findOnScreenRegion(matchRequest);
                if (matchResult.confidence >= minMatch) {
                    const possibleHooks = this.findHooks.get(templateImageFilename) || [];
                    for (const hook of possibleHooks) {
                        await hook(matchResult);
                    }
                    const resultRegion = new region_class_1.Region(searchRegion.left + matchResult.location.left, searchRegion.top + matchResult.location.top, matchResult.location.width, matchResult.location.height);
                    if (this.config.autoHighlight) {
                        resolve(this.highlight(resultRegion));
                    }
                    else {
                        resolve(resultRegion);
                    }
                }
                else {
                    reject(`No match for ${templateImageFilename}. Required: ${minMatch}, given: ${matchResult.confidence}`);
                }
            }
            catch (e) {
                reject(`Searching for ${templateImageFilename} failed. Reason: '${e}'`);
            }
        });
    }
    /**
     * {@link highlight} highlights a screen {@link Region} for a certain duration by overlaying it with an opaque highlight window
     * @param regionToHighlight The {@link Region} to highlight
     */
    async highlight(regionToHighlight) {
        const highlightRegion = await regionToHighlight;
        await this.vision.highlightScreenRegion(highlightRegion, this.config.highlightDurationMs, this.config.highlightOpacity);
        return highlightRegion;
    }
    /**
     * {@link waitFor} searches for a template image for a specified duration
     * @param templateImageFilename Filename of the template image, relative to {@link Screen.config.resourceDirectory}
     * @param timeoutMs Timeout in milliseconds after which {@link waitFor} fails
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    async waitFor(templateImageFilename, timeoutMs = 5000, params) {
        return timeout_function_1.timeout(500, timeoutMs, () => this.find(templateImageFilename, params), { signal: params === null || params === void 0 ? void 0 : params.abort });
    }
    /**
     * {@link on} registeres a callback which is triggered once a certain template image is found
     * @param templateImageFilename Template image to trigger the callback on
     * @param callback The {@link FindHookCallback} function to trigger
     */
    on(templateImageFilename, callback) {
        const existingHooks = this.findHooks.get(templateImageFilename) || [];
        this.findHooks.set(templateImageFilename, [...existingHooks, callback]);
    }
    /**
     * {@link capture} captures a screenshot of a systems main display
     * @param fileName Basename for the generated screenshot
     * @param fileFormat The {@link FileType} for the generated screenshot
     * @param filePath The output path for the generated screenshot (Default: {@link cwd})
     * @param fileNamePrefix Filename prefix for the generated screenshot (Default: empty)
     * @param fileNamePostfix Filename postfix for the generated screenshot (Default: empty)
     */
    async capture(fileName, fileFormat = file_type_enum_1.FileType.PNG, filePath = process_1.cwd(), fileNamePrefix = "", fileNamePostfix = "") {
        const currentScreen = await this.vision.grabScreen();
        return this.saveImage(currentScreen, fileName, fileFormat, filePath, fileNamePrefix, fileNamePostfix);
    }
    /**
     * {@link captureRegion} captures a screenshot of a region on the systems main display
     * @param fileName Basename for the generated screenshot
     * @param regionToCapture The region of the screen to capture in the screenshot
     * @param fileFormat The {@link FileType} for the generated screenshot
     * @param filePath The output path for the generated screenshot (Default: {@link cwd})
     * @param fileNamePrefix Filename prefix for the generated screenshot (Default: empty)
     * @param fileNamePostfix Filename postfix for the generated screenshot (Default: empty)
     */
    async captureRegion(fileName, regionToCapture, fileFormat = file_type_enum_1.FileType.PNG, filePath = process_1.cwd(), fileNamePrefix = "", fileNamePostfix = "") {
        const regionImage = await this.vision.grabScreenRegion(regionToCapture);
        return this.saveImage(regionImage, fileName, fileFormat, filePath, fileNamePrefix, fileNamePostfix);
    }
    async saveImage(image, fileName, fileFormat, filePath, fileNamePrefix, fileNamePostfix) {
        const outputPath = generate_output_path_function_1.generateOutputPath(fileName, {
            path: filePath,
            postfix: fileNamePostfix,
            prefix: fileNamePrefix,
            type: fileFormat,
        });
        await this.vision.saveImage(image, outputPath);
        return outputPath;
    }
}
exports.Screen = Screen;
//# sourceMappingURL=screen.class.js.map