"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProtocolRequest {
    constructor(operation, params) {
        this.operacao = operation;
        this.params = params;
    }
    fromJson(json) {
        return new ProtocolRequest(json['operacao'], json['params']);
    }
    toJson() {
        return JSON.stringify(this);
    }
}
exports.default = ProtocolRequest;
