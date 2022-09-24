"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environments = {
    development: {
        api: {
            host: 'localhost',
            port: 8082
        }
    },
    production: {
        api: {
            host: '',
            port: 0
        }
    }
};
exports.default = environments.development; // Development or Production
