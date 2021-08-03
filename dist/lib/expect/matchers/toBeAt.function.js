"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBeAt = async (received, position) => {
    const currentPosition = await received.getPosition();
    const success = currentPosition.x === position.x && currentPosition.y === position.y;
    if (success) {
        return {
            message: () => `Expected cursor to not be at position ${position.toString()}`,
            pass: true,
        };
    }
    return {
        message: () => `Cursor should be at position ${position.toString()} but is at ${currentPosition.toString()}`,
        pass: false,
    };
};
//# sourceMappingURL=toBeAt.function.js.map