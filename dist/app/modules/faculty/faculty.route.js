"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const faculty_zodSchema_1 = require("./faculty.zodSchema");
const faculty_controller_1 = require("./faculty.controller");
const FacultyRouter = (0, express_1.Router)();
FacultyRouter.post('/create-faculty', (0, validateRequest_1.default)(faculty_zodSchema_1.facultyCreationSchema), faculty_controller_1.FacultyControllers.createFaculty);
FacultyRouter.get('/', faculty_controller_1.FacultyControllers.getAllFaculties);
FacultyRouter.get('/:id', faculty_controller_1.FacultyControllers.getSingleFaculty);
FacultyRouter.patch('/:id', (0, validateRequest_1.default)(faculty_zodSchema_1.updateFacultySchema), faculty_controller_1.FacultyControllers.updateFaculty);
exports.default = FacultyRouter;
