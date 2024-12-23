"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const student_zodSchema_1 = require("../student/student.zodSchema");
const member_zodSchema_1 = require("../facultyMember/member.zodSchema");
const admin_zodSchema_1 = require("../admin/admin.zodSchema");
const UserRouter = (0, express_1.Router)();
UserRouter.post('/create-student', (0, validateRequest_1.default)(student_zodSchema_1.createStudentValidationSchema), user_controller_1.UserControllers.createStudent);
UserRouter.post('/create-faculty-member', (0, validateRequest_1.default)(member_zodSchema_1.createFacultyMemberValidationSchema), user_controller_1.UserControllers.createFacultyMember);
UserRouter.post('/create-admin', (0, validateRequest_1.default)(admin_zodSchema_1.createAdminValidationSchema), user_controller_1.UserControllers.createAdmin);
exports.default = UserRouter;
