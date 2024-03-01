"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataResponse {
    constructor(status = 200, message = "", data = {}) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.default = DataResponse;
