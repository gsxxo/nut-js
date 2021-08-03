import * as cv from "opencv4nodejs-prebuilt";
import { Image } from "../../image.class";
import { Region } from "../../region.class";
/**
 * fromImageWithAlphaChannel should provide a way to create a library specific
 * image with alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
export declare const fromImageWithAlphaChannel: (img: Image, roi?: Region | undefined) => Promise<cv.Mat>;
/**
 * fromImageWithoutAlphaChannel should provide a way to create a library specific
 * image without alpha channel from an abstract Image object holding raw data and image dimension
 *
 * @param {Image} img The input Image
 * @param {Region} [roi] An optional Region to specify a ROI
 * @returns {Promise<any>} An image
 * @memberof VisionProviderInterface
 */
export declare const fromImageWithoutAlphaChannel: (img: Image, roi?: Region | undefined) => Promise<cv.Mat>;
//# sourceMappingURL=image-processor.class.d.ts.map