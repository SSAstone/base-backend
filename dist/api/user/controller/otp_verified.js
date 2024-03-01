"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerified = void 0;
const data_response_1 = __importDefault(require("../../../lib/api_response/data_response"));
const error_response_1 = __importDefault(require("../../../lib/api_response/error_response"));
const user_1 = __importDefault(require("../model/user"));
const otp_1 = __importDefault(require("../model/otp"));
const userVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const findOtp = yield otp_1.default.findOne({ otp });
        if (!findOtp) {
            return res.status(400).json(new error_response_1.default(400, 'Invalid otp'));
        }
        const user = yield user_1.default.findOne({ email: findOtp === null || findOtp === void 0 ? void 0 : findOtp.email });
        user.isVerified = true;
        user.save();
        res.status(201).json(new data_response_1.default(201, 'User verified', user.email));
    }
    catch (error) {
        console.log(error);
    }
});
exports.userVerified = userVerified;
