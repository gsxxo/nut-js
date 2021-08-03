import { Assert } from "./lib/assert.class";
import { Clipboard } from "./lib/clipboard.class";
import { Keyboard } from "./lib/keyboard.class";
import { Mouse } from "./lib/mouse.class";
import { Screen } from "./lib/screen.class";
export { jestMatchers } from "./lib/expect/jest.matcher.function";
export { sleep } from "./lib/sleep.function";
export { Image } from "./lib/image.class";
export { Key } from "./lib/key.enum";
export { Button } from "./lib/button.enum";
export { centerOf, randomPointIn } from "./lib/location.function";
export { LocationParameters } from "./lib/locationparameters.class";
export { OptionalSearchParameters } from "./lib/optionalsearchparameters.class";
export { linear } from "./lib/movementtype.function";
export { Point } from "./lib/point.class";
export { Region } from "./lib/region.class";
export { Window } from "./lib/window.class";
declare const clipboard: Clipboard;
declare const keyboard: Keyboard;
declare const mouse: Mouse;
declare const screen: Screen;
declare const assert: Assert;
declare const straightTo: (target: import("./lib/point.class").Point | Promise<import("./lib/point.class").Point>) => Promise<import("./lib/point.class").Point[]>, up: (px: number) => Promise<import("./lib/point.class").Point[]>, down: (px: number) => Promise<import("./lib/point.class").Point[]>, left: (px: number) => Promise<import("./lib/point.class").Point[]>, right: (px: number) => Promise<import("./lib/point.class").Point[]>;
declare const getWindows: () => Promise<import("./lib/window.class").Window[]>, getActiveWindow: () => Promise<import("./lib/window.class").Window>;
export { clipboard, keyboard, mouse, screen, assert, straightTo, up, down, left, right, getWindows, getActiveWindow, };
//# sourceMappingURL=index.d.ts.map