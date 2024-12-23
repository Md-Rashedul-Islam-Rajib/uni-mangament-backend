"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_zodSchema_1 = require("./member.zodSchema");
const express_1 = require("express");
const faculty_controller_1 = require("../faculty/faculty.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const member_controller_1 = require("./member.controller");
const FacultyMemberRouter = (0, express_1.Router)();
FacultyMemberRouter.get('/', faculty_controller_1.FacultyControllers.getAllFaculties);
FacultyMemberRouter.get('/:id', faculty_controller_1.FacultyControllers.getSingleFaculty);
FacultyMemberRouter.patch('/:id', (0, validateRequest_1.default)(member_zodSchema_1.updateFacultyMemberValidationSchema), member_controller_1.FacultyMemberControllers.updateFacultyMember);
FacultyMemberRouter.delete('/:id', member_controller_1.FacultyMemberControllers.deleteFacultyMember);
exports.default = FacultyMemberRouter;
