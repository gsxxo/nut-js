"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const key_enum_1 = require("../../key.enum");
class KeyboardAction {
    constructor() {
    }
    static keyLookup(key) {
        return this.KeyLookupMap.get(key);
    }
    static mapModifierKeys(...keys) {
        return keys
            .map(modifier => KeyboardAction.keyLookup(modifier))
            .filter(modifierKey => modifierKey != null && modifierKey.length > 1);
    }
    static key(key, event, ...modifiers) {
        return new Promise((resolve, reject) => {
            try {
                const nativeKey = KeyboardAction.keyLookup(key);
                const modifierKeys = this.mapModifierKeys(...modifiers);
                if (nativeKey) {
                    libnut.keyToggle(nativeKey, event, modifierKeys);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    type(input) {
        return new Promise((resolve, reject) => {
            try {
                libnut.typeString(input);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    click(...keys) {
        return new Promise((resolve, reject) => {
            try {
                keys.reverse();
                const [key, ...modifiers] = keys;
                const nativeKey = KeyboardAction.keyLookup(key);
                const modifierKeys = KeyboardAction.mapModifierKeys(...modifiers);
                if (nativeKey) {
                    libnut.keyTap(nativeKey, modifierKeys);
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    pressKey(...keys) {
        return new Promise(async (resolve, reject) => {
            try {
                keys.reverse();
                const [key, ...modifiers] = keys;
                await KeyboardAction.key(key, "down", ...modifiers);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    releaseKey(...keys) {
        return new Promise(async (resolve, reject) => {
            try {
                keys.reverse();
                const [key, ...modifiers] = keys;
                await KeyboardAction.key(key, "up", ...modifiers);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    setKeyboardDelay(delay) {
        libnut.setKeyboardDelay(delay);
    }
}
exports.default = KeyboardAction;
KeyboardAction.KeyLookupMap = new Map([
    [key_enum_1.Key.A, "a"],
    [key_enum_1.Key.B, "b"],
    [key_enum_1.Key.C, "c"],
    [key_enum_1.Key.D, "d"],
    [key_enum_1.Key.E, "e"],
    [key_enum_1.Key.F, "f"],
    [key_enum_1.Key.G, "g"],
    [key_enum_1.Key.H, "h"],
    [key_enum_1.Key.I, "i"],
    [key_enum_1.Key.J, "j"],
    [key_enum_1.Key.K, "k"],
    [key_enum_1.Key.L, "l"],
    [key_enum_1.Key.M, "m"],
    [key_enum_1.Key.N, "n"],
    [key_enum_1.Key.O, "o"],
    [key_enum_1.Key.P, "p"],
    [key_enum_1.Key.Q, "q"],
    [key_enum_1.Key.R, "r"],
    [key_enum_1.Key.S, "s"],
    [key_enum_1.Key.T, "t"],
    [key_enum_1.Key.U, "u"],
    [key_enum_1.Key.V, "v"],
    [key_enum_1.Key.W, "w"],
    [key_enum_1.Key.X, "x"],
    [key_enum_1.Key.Y, "y"],
    [key_enum_1.Key.Z, "z"],
    [key_enum_1.Key.F1, "f1"],
    [key_enum_1.Key.F2, "f2"],
    [key_enum_1.Key.F3, "f3"],
    [key_enum_1.Key.F4, "f4"],
    [key_enum_1.Key.F5, "f5"],
    [key_enum_1.Key.F6, "f6"],
    [key_enum_1.Key.F7, "f7"],
    [key_enum_1.Key.F8, "f8"],
    [key_enum_1.Key.F9, "f9"],
    [key_enum_1.Key.F10, "f10"],
    [key_enum_1.Key.F11, "f11"],
    [key_enum_1.Key.F12, "f12"],
    [key_enum_1.Key.Num0, "0"],
    [key_enum_1.Key.Num1, "1"],
    [key_enum_1.Key.Num2, "2"],
    [key_enum_1.Key.Num3, "3"],
    [key_enum_1.Key.Num4, "4"],
    [key_enum_1.Key.Num5, "5"],
    [key_enum_1.Key.Num6, "6"],
    [key_enum_1.Key.Num7, "7"],
    [key_enum_1.Key.Num8, "8"],
    [key_enum_1.Key.Num9, "9"],
    [key_enum_1.Key.NumPad0, "numpad_0"],
    [key_enum_1.Key.NumPad1, "numpad_1"],
    [key_enum_1.Key.NumPad2, "numpad_2"],
    [key_enum_1.Key.NumPad3, "numpad_3"],
    [key_enum_1.Key.NumPad4, "numpad_4"],
    [key_enum_1.Key.NumPad5, "numpad_5"],
    [key_enum_1.Key.NumPad6, "numpad_6"],
    [key_enum_1.Key.NumPad7, "numpad_7"],
    [key_enum_1.Key.NumPad8, "numpad_8"],
    [key_enum_1.Key.NumPad9, "numpad_9"],
    [key_enum_1.Key.Space, "space"],
    [key_enum_1.Key.Escape, "escape"],
    [key_enum_1.Key.Tab, "tab"],
    [key_enum_1.Key.LeftAlt, "alt"],
    [key_enum_1.Key.LeftControl, "control"],
    [key_enum_1.Key.RightAlt, "alt"],
    [key_enum_1.Key.RightControl, "control"],
    [key_enum_1.Key.LeftShift, "shift"],
    [key_enum_1.Key.LeftSuper, "command"],
    [key_enum_1.Key.RightShift, "space"],
    [key_enum_1.Key.RightSuper, "command"],
    [key_enum_1.Key.Grave, "~"],
    [key_enum_1.Key.Minus, "-"],
    [key_enum_1.Key.Equal, "="],
    [key_enum_1.Key.Backspace, "backspace"],
    [key_enum_1.Key.LeftBracket, "["],
    [key_enum_1.Key.RightBracket, "]"],
    [key_enum_1.Key.Backslash, "\\"],
    [key_enum_1.Key.Semicolon, ";"],
    [key_enum_1.Key.Quote, "'"],
    [key_enum_1.Key.Return, "enter"],
    [key_enum_1.Key.Comma, ","],
    [key_enum_1.Key.Period, "."],
    [key_enum_1.Key.Slash, "/"],
    [key_enum_1.Key.Left, "left"],
    [key_enum_1.Key.Up, "up"],
    [key_enum_1.Key.Right, "right"],
    [key_enum_1.Key.Down, "down"],
    [key_enum_1.Key.Print, "printscreen"],
    [key_enum_1.Key.Pause, null],
    [key_enum_1.Key.Insert, "insert"],
    [key_enum_1.Key.Delete, null],
    [key_enum_1.Key.Home, "home"],
    [key_enum_1.Key.End, "end"],
    [key_enum_1.Key.PageUp, "pageup"],
    [key_enum_1.Key.PageDown, "pagedown"],
    [key_enum_1.Key.Add, null],
    [key_enum_1.Key.Subtract, null],
    [key_enum_1.Key.Multiply, null],
    [key_enum_1.Key.Divide, null],
    [key_enum_1.Key.Decimal, null],
    [key_enum_1.Key.Enter, "enter"],
    [key_enum_1.Key.CapsLock, null],
    [key_enum_1.Key.ScrollLock, null],
    [key_enum_1.Key.NumLock, null],
]);
//# sourceMappingURL=libnut-keyboard-action.class.js.map