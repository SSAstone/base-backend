"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
exports.default = ErrorResponse;
