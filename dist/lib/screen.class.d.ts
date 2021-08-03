import { VisionAdapter } from "./adapter/vision.adapter.class";
import { FileType } from "./file-type.enum";
import { LocationParameters } from "./locationparameters.class";
import { MatchResult } from "./match-result.class";
import { Region } from "./region.class";
export declare type FindHookCallback = (target: MatchResult) => Promise<void>;
/**
 * {@link Screen} class provides methods to access screen content of a systems main display
 */
export declare class Screen {
    private vision;
    private findHooks;
    /**
     * Config object for {@link Screen} class
     */
    config: {
        /**
         * Configures the required matching percentage for template images to be declared as a match
         */
        confidence: number;
        /**
         * Configure whether to auto highlight all search results or not
         */
        autoHighlight: boolean;
        /**
         * Configure highlighting duration
         */
        highlightDurationMs: number;
        /**
         * Configure opacity of highlight window
         */
        highlightOpacity: number;
        /**
         * Configures the path from which template images are loaded from
         */
        resourceDirectory: string;
    };
    /**
     * {@link Screen} class constructor
     * @param vision {@link VisionAdapter} instance which bundles access to screen and / or computer vision related APIs
     * @param findHooks A {@link Map} of {@link FindHookCallback} methods assigned to a template image filename
     */
    constructor(vision: VisionAdapter, findHooks?: Map<string, FindHookCallback[]>);
    /**
     * {@link width} returns the main screen width
     * This refers to the hardware resolution.
     * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher width in in actual pixels
     */
    width(): Promise<number>;
    /**
     * {@link height} returns the main screen height
     * This refers to the hardware resolution.
     * Screens with higher pixel density (e.g. retina displays in MacBooks) might have a higher height in in actual pixels
     */
    height(): Promise<number>;
    /**
     * {@link find} will search for a template image on a systems main screen
     * @param templateImageFilename Filename of the template image, relative to {@link Screen.config.resourceDirectory}
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    find(templateImageFilename: string, params?: LocationParameters): Promise<Region>;
    /**
     * {@link highlight} highlights a screen {@link Region} for a certain duration by overlaying it with an opaque highlight window
     * @param regionToHighlight The {@link Region} to highlight
     */
    highlight(regionToHighlight: Region | Promise<Region>): Promise<Region>;
    /**
     * {@link waitFor} searches for a template image for a specified duration
     * @param templateImageFilename Filename of the template image, relative to {@link Screen.config.resourceDirectory}
     * @param timeoutMs Timeout in milliseconds after which {@link waitFor} fails
     * @param params {@link LocationParameters} which are used to fine tune search region and / or match confidence
     */
    waitFor(templateImageFilename: string, timeoutMs?: number, params?: LocationParameters): Promise<Region>;
    /**
     * {@link on} registeres a callback which is triggered once a certain template image is found
     * @param templateImageFilename Template image to trigger the callback on
     * @param callback The {@link FindHookCallback} function to trigger
     */
    on(templateImageFilename: string, callback: FindHookCallback): void;
    /**
     * {@link capture} captures a screenshot of a systems main display
     * @param fileName Basename for the generated screenshot
     * @param fileFormat The {@link FileType} for the generated screenshot
     * @param filePath The output path for the generated screenshot (Default: {@link cwd})
     * @param fileNamePrefix Filename prefix for the generated screenshot (Default: empty)
     * @param fileNamePostfix Filename postfix for the generated screenshot (Default: empty)
     */
    capture(fileName: string, fileFormat?: FileType, filePath?: string, fileNamePrefix?: string, fileNamePostfix?: string): Promise<string>;
    /**
     * {@link captureRegion} captures a screenshot of a region on the systems main display
     * @param fileName Basename for the generated screenshot
     * @param regionToCapture The region of the screen to capture in the screenshot
     * @param fileFormat The {@link FileType} for the generated screenshot
     * @param filePath The output path for the generated screenshot (Default: {@link cwd})
     * @param fileNamePrefix Filename prefix for the generated screenshot (Default: empty)
     * @param fileNamePostfix Filename postfix for the generated screenshot (Default: empty)
     */
    captureRegion(fileName: string, regionToCapture: Region, fileFormat?: FileType, filePath?: string, fileNamePrefix?: string, fileNamePostfix?: string): Promise<string>;
    private saveImage;
}
//# sourceMappingURL=screen.class.d.ts.map