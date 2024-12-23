"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const StudentRouter = (0, express_1.Router)();
StudentRouter.get('/:studentId', student_controller_1.StudentControllers.getSingleStudent);
StudentRouter.delete('/:studentId', student_controller_1.StudentControllers.deleteStudent);
StudentRouter.get('/', student_controller_1.StudentControllers.getAllStudents);
exports.default = StudentRouter;
