"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const button_enum_1 = require("../../button.enum");
const point_class_1 = require("../../point.class");
class MouseAction {
    constructor() {
    }
    static buttonLookup(btn) {
        return this.ButtonLookupMap.get(btn);
    }
    setMouseDelay(delay) {
        libnut.setMouseDelay(delay);
    }
    setMousePosition(p) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.moveMouse(p.x, p.y);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    currentMousePosition() {
        return new Promise(((resolve, reject) => {
            try {
                const position = libnut.getMousePos();
                resolve(new point_class_1.Point(position.x, position.y));
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    leftClick() {
        return new Promise(((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(button_enum_1.Button.LEFT));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    rightClick() {
        return new Promise(((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(button_enum_1.Button.RIGHT));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    middleClick() {
        return new Promise(((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(button_enum_1.Button.MIDDLE));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    pressButton(btn) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.mouseToggle("down", MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    releaseButton(btn) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.mouseToggle("up", MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    scrollUp(amount) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.scrollMouse(0, amount);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    scrollDown(amount) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.scrollMouse(0, -amount);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    scrollLeft(amount) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.scrollMouse(-amount, 0);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
    scrollRight(amount) {
        return new Promise(((resolve, reject) => {
            try {
                libnut.scrollMouse(amount, 0);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        }));
    }
}
exports.default = MouseAction;
MouseAction.ButtonLookupMap = new Map([[button_enum_1.Button.LEFT, "left"], [button_enum_1.Button.MIDDLE, "middle"], [button_enum_1.Button.RIGHT, "right"]]);
//# sourceMappingURL=libnut-mouse-action.class.js.map