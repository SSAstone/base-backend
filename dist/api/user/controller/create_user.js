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
exports.createUser = void 0;
const data_response_1 = __importDefault(require("../../../lib/api_response/data_response"));
const error_response_1 = __importDefault(require("../../../lib/api_response/error_response"));
const user_1 = __importDefault(require("../model/user"));
const otp_1 = __importDefault(require("../model/otp"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(new error_response_1.default(400, 'Email and password is required'));
        }
        const findUser = yield user_1.default.findOne({ email });
        if (findUser) {
            if (!findUser.isVerified) {
                const otp = yield otp_1.default.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    yield otp_1.default.deleteOne({ email });
                    console.log('OTP deleted after one minutes');
                }), 1 * 60 * 1000);
                return res.status(201).json(new data_response_1.default(201, 'User created otp send'));
            }
            return res.status(400).json(new error_response_1.default(400, 'User already exists'));
        }
        const user = yield user_1.default.create({
            email, password
        });
        if (!user) {
            return res.status(400).json(new error_response_1.default(400, 'User not created'));
        }
        const otp = yield otp_1.default.create({ email, otp: Math.floor(100000 + Math.random() * 900000).toString() });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield otp_1.default.deleteOne({ email });
            console.log('OTP deleted after one minutes');
        }), 1 * 60 * 1000);
        res.status(201).json(new data_response_1.default(201, 'User created otp send'));
    }
    catch (error) {
        console.log(error);
    }
});
exports.createUser = createUser;
