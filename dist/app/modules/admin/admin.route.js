"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_zodSchema_1 = require("./admin.zodSchema");
const AdminRouter = (0, express_1.Router)();
AdminRouter.get('/', admin_controller_1.AdminControllers.getAllAdmins);
AdminRouter.get('/:id', admin_controller_1.AdminControllers.getSingleAdmin);
AdminRouter.patch('/:id', (0, validateRequest_1.default)(admin_zodSchema_1.updateAdminValidationSchema), admin_controller_1.AdminControllers.updateAdmin);
AdminRouter.delete('/:id', admin_controller_1.AdminControllers.deleteAdmin);
exports.default = AdminRouter;
