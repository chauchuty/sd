"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environments = {
    development: {
        api: {
            server: {
                websocket: {
                    host: 'localhost',
                    port: 8081
                },
            },
            client: {
                socket: {
                    host: 'localhost',
                    port: 8082
                },
            }
        }
    },
    production: {
        api: {
            websocketserver: {
                host: '51.81.87.67',
                port: 8081
            },
            socketclient: {
                host: '51.81.87.67',
                port: 8082
            },
        }
    }
};
exports.default = environments.development; // Development or Production
