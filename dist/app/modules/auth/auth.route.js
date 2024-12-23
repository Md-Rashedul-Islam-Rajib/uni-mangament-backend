"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_zodSchema_1 = require("./auth.zodSchema");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/login', (0, validateRequest_1.default)(auth_zodSchema_1.loginValidationSchema), auth_controller_1.AuthControllers.loginUser);
AuthRouter.post('/refresh-token', (0, validateRequest_1.default)(auth_zodSchema_1.refreshTokenValidationSchema), auth_controller_1.AuthControllers.refreshToken);
AuthRouter.post('/change-password', (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.faculty, user_constants_1.USER_ROLE.student), (0, validateRequest_1.default)(auth_zodSchema_1.changePasswordValidationSchema), auth_controller_1.AuthControllers.changePassword);
exports.default = AuthRouter;
