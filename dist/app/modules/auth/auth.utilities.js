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
exports.preValidatingUser = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const createToken = (jwtPayload, secret, expiresIn) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn,
    });
};
exports.createToken = createToken;
const verifyToken = (secret, token) => {
    if (!token) {
        throw new Error("You're not authorized");
    }
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (_error) {
        throw new Error('The provided token is invalid or expired');
    }
};
exports.verifyToken = verifyToken;
const preValidatingUser = (userId, iat) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.isUserExistsByCustomId(userId);
    if (!user) {
        throw new Error('this user is not found');
    }
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new Error('this user is deleted');
    }
    if (user.status === 'blocked') {
        throw new Error('this user is blocked');
    }
    if (user.passwordChangedAt && user_model_1.UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new Error('you are not authorized');
    }
    return user;
});
exports.preValidatingUser = preValidatingUser;
