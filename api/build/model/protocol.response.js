"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProtocolResponse {
    constructor(status, message, response) {
        this.status = status;
        this.message = message;
        this.response = response;
    }
    fromJson(json) {
        return new ProtocolResponse(json['status'], json['message'], json['response']);
    }
    toJson() {
        return JSON.stringify(this);
    }
}
exports.default = ProtocolResponse;
