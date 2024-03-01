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
exports.resetPassword = void 0;
const data_response_1 = __importDefault(require("../../../lib/api_response/data_response"));
const error_response_1 = __importDefault(require("../../../lib/api_response/error_response"));
const user_1 = __importDefault(require("../model/user"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, confirmPassword, email } = req.body;
        if (password !== confirmPassword) {
            res.status(400).json(new error_response_1.default(400, 'Password and confirm password does not match'));
        }
        ;
        const findUser = yield user_1.default.findOne({ email });
        if (!findUser) {
            return res.status(400).json(new error_response_1.default(400, 'User not found'));
        }
        ;
        if (!findUser.isVerified) {
            return res.status(400).json(new error_response_1.default(400, 'User not verified'));
        }
        ;
        findUser.password = password;
        yield findUser.save();
        res.status(201).json(new data_response_1.default(201, 'Password reset successfully'));
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetPassword = resetPassword;
