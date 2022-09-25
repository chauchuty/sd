"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralPreferences {
    logger(message) {
        console.log(`[${new Date().toLocaleTimeString()}] - ${message}`);
    }
}
exports.default = GeneralPreferences;
