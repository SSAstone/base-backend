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
exports.loginUser = void 0;
const error_response_1 = __importDefault(require("../../../lib/api_response/error_response"));
const user_1 = __importDefault(require("../model/user"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);
        if (!username || !email || !password) {
            return res.status(400).json(new error_response_1.default(400, 'Username or email or password is required'));
        }
        const findUser = yield user_1.default.findOne({ email });
        if (!findUser) {
            return res.status(400).json(new error_response_1.default(400, 'User not found'));
        }
        if (!findUser.isVerified) {
            return res.status(400).json(new error_response_1.default(400, 'User not verified'));
        }
        const userPasswordCorrect = yield findUser.isPasswordCorrect(password);
        if (!userPasswordCorrect) {
            return res.status(400).json(new error_response_1.default(400, 'Invalid credentials'));
        }
        findUser.username = username;
        findUser.refreshToken = findUser.generateRefreshToken();
        yield findUser.save({ validateBeforeSave: false });
        res.status(200).json({
            username: findUser.username,
            email: findUser.email,
            role: findUser.role,
            _id: findUser._id,
            createAt: findUser.createdAt,
            updatedAt: findUser.updatedAt,
            accessToken: findUser.generateAccessToken()
        });
    }
    catch (error) {
        res.status(400).json(new error_response_1.default(400, 'Invalid request'));
    }
});
exports.loginUser = loginUser;
