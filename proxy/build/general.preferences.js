"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralPreferences {
    constructor(entity) {
        this.entity = entity;
    }
    logger(message) {
        console.log(`[${new Date().toLocaleTimeString()}] [${this.entity}]- ${message}`);
    }
}
exports.default = GeneralPreferences;
