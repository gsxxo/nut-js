"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clipboardy_clipboard_action_class_1 = __importDefault(require("../provider/native/clipboardy-clipboard-action.class"));
const libnut_keyboard_action_class_1 = __importDefault(require("../provider/native/libnut-keyboard-action.class"));
const libnut_mouse_action_class_1 = __importDefault(require("../provider/native/libnut-mouse-action.class"));
const libnut_window_action_class_1 = __importDefault(require("../provider/native/libnut-window-action.class"));
/**
 * {@link NativeAdapter} serves as an abstraction layer for all OS level interactions.
 *
 * This allows to provide a high level interface for native actions,
 * without having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve the OS are bundled in this adapter.
 */
class NativeAdapter {
    /**
     * {@link NativeAdapter} class constructor
     * @param clipboard {@link ClipboardActionProvider} instance used to interact with a systems clipboard (Default: {@link ClipboardAction})
     * @param keyboard {@link KeyboardActionProvider} instance used to interact with a systems keybaord (Default: {@link KeyboardAction})
     * @param mouse {@link MouseActionProvider} instance used to interact with a systems mouse (Default: {@link MouseAction})
     * @param window {@link WindowActionProvider} instance used to interact with a systems windows (Default: {@link WindowAction})
     */
    constructor(clipboard = new clipboardy_clipboard_action_class_1.default(), keyboard = new libnut_keyboard_action_class_1.default(), mouse = new libnut_mouse_action_class_1.default(), window = new libnut_window_action_class_1.default()) {
        this.clipboard = clipboard;
        this.keyboard = keyboard;
        this.mouse = mouse;
        this.window = window;
    }
    /**
     * {@link setMouseDelay} configures mouse speed for movement
     *
     * @param delay Mouse delay in milliseconds
     */
    setMouseDelay(delay) {
        this.mouse.setMouseDelay(delay);
    }
    /**
     * {@link setKeyboardDelay} configures keyboard delay between key presses
     *
     * @param delay The keyboard delay in milliseconds
     */
    setKeyboardDelay(delay) {
        this.keyboard.setKeyboardDelay(delay);
    }
    /**
     * {@link setMousePosition} changes the current mouse cursor position to a given {@link Point}
     *
     * @param p The new cursor position at {@link Point} p
     */
    setMousePosition(p) {
        return this.mouse.setMousePosition(p);
    }
    /**
     * {@link currentMousePosition} returns the current mouse position
     *
     * @returns Current cursor position at a certain {@link Point}
     */
    currentMousePosition() {
        return this.mouse.currentMousePosition();
    }
    /**
     * {@link leftClick} triggers a native left-click event via OS API
     */
    leftClick() {
        return this.mouse.leftClick();
    }
    /**
     * {@link rightClick} triggers a native right-click event via OS API
     */
    rightClick() {
        return this.mouse.rightClick();
    }
    /**
     * {@link middleClick} triggers a native middle-click event via OS API
     */
    middleClick() {
        return this.mouse.middleClick();
    }
    /**
     * {@link pressButton} presses and holds a mouse {@link Button}
     *
     * @param btn The mouse {@link Button} to press
     */
    pressButton(btn) {
        return this.mouse.pressButton(btn);
    }
    /**
     * {@link releaseButton} releases a mouse {@link Button} previously clicked via {@link pressButton}
     *
     * @param btn The mouse {@link Button} to release
     */
    releaseButton(btn) {
        return this.mouse.releaseButton(btn);
    }
    /**
     * {@link type} types a given string via native keyboard events
     *
     * @param input The text to type
     */
    type(input) {
        return this.keyboard.type(input);
    }
    /**
     * {@link click} clicks a {@link Key} via native keyboard event
     *
     * @param keys Array of {@link Key}s to click
     */
    click(...keys) {
        return this.keyboard.click(...keys);
    }
    /**
     * {@link pressKey} presses and holds a given {@link Key}
     *
     * @param keys Array of {@link Key}s to press and hold
     */
    pressKey(...keys) {
        return this.keyboard.pressKey(...keys);
    }
    /**
     * {@link releaseKey} releases a {@link Key} previously presses via {@link pressKey}
     *
     * @param keys Array of {@link Key}s to release
     */
    releaseKey(...keys) {
        return this.keyboard.releaseKey(...keys);
    }
    /**
     * {@link scrollUp} triggers an upwards mouse wheel scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollUp(amount) {
        return this.mouse.scrollUp(amount);
    }
    /**
     * {@link scrollDown} triggers a downward mouse wheel scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollDown(amount) {
        return this.mouse.scrollDown(amount);
    }
    /**
     * {@link scrollLeft} triggers a left mouse scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollLeft(amount) {
        return this.mouse.scrollLeft(amount);
    }
    /**
     * {@link scrollRight} triggers a right mouse scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollRight(amount) {
        return this.mouse.scrollRight(amount);
    }
    /**
     * {@link copy} copies a given text to the system clipboard
     *
     * @param text The text to copy
     */
    copy(text) {
        return this.clipboard.copy(text);
    }
    /**
     * {@link paste} pastes the current text on the system clipboard
     *
     * @returns The clipboard text
     */
    paste() {
        return this.clipboard.paste();
    }
    getWindows() {
        return this.window.getWindows();
    }
    /**
     * {@link getActiveWindow} returns the window handle of the currently active foreground window
     *
     * @returns The handle to the currently active foreground window
     */
    getActiveWindow() {
        return this.window.getActiveWindow();
    }
    /**
     * {@link getWindowTitle} returns the title of a window addressed via its window handle
     *
     * @returns A string representing the title of a window addressed via its window handle
     */
    getWindowTitle(windowHandle) {
        return this.window.getWindowTitle(windowHandle);
    }
    /**
     * {@link getWindowRegion} returns a {@link Region} object representing the size and position of the window addressed via its window handle
     *
     * @returns The {@link Region} occupied by the window addressed via its window handle
     */
    getWindowRegion(windowHandle) {
        return this.window.getWindowRegion(windowHandle);
    }
}
exports.NativeAdapter = NativeAdapter;
//# sourceMappingURL=native.adapter.class.js.map