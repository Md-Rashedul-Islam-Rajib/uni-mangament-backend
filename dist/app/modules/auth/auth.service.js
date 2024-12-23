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
exports.AuthServices = void 0;
const user_model_1 = require("../user/user.model");
const auth_utilities_1 = require("./auth.utilities");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthServices {
    static loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth_utilities_1.preValidatingUser)(payload.id);
            const passwordMatched = yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
            if (!passwordMatched) {
                throw new Error('password did not matched');
            }
            const jwtPayload = {
                userId: user === null || user === void 0 ? void 0 : user.id,
                role: user === null || user === void 0 ? void 0 : user.role
            };
            const accessToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
            const refreshToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
            return {
                accessToken,
                refreshToken,
                needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange
            };
        });
    }
    ;
    static changePassword(userData, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, auth_utilities_1.preValidatingUser)(userData.userId);
            const passwordMatched = yield user_model_1.UserModel.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
            if (!passwordMatched) {
                throw new Error('password didn\'t matched');
            }
            const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
            yield user_model_1.UserModel.findOneAndUpdate({
                id: userData.userId,
                role: userData.role
            }, {
                password: newHashedPassword,
                needsPasswordChange: false,
                passwordChangedAt: new Date()
            });
            return null;
        });
    }
    ;
    static refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = (0, auth_utilities_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
            const user = yield (0, auth_utilities_1.preValidatingUser)(decoded === null || decoded === void 0 ? void 0 : decoded.userId, decoded === null || decoded === void 0 ? void 0 : decoded.iat);
            const jwtPayload = {
                userId: user.id,
                role: user.role
            };
            const accessToken = (0, auth_utilities_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
            return { accessToken };
        });
    }
    ;
}
exports.AuthServices = AuthServices;
