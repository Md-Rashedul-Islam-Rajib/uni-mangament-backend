"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const course_zodSchema_1 = require("./course.zodSchema");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const CourseRouter = (0, express_1.Router)();
CourseRouter.post('/create-course', (0, validateRequest_1.default)(course_zodSchema_1.createCourseValidationSchema), course_service_1.CourseServices.createCourse);
CourseRouter.get('/', course_controller_1.CourseControllers.getAllCourses);
CourseRouter.post('/:id', course_service_1.CourseServices.getSingleCourse);
CourseRouter.patch('/:id', (0, validateRequest_1.default)(course_zodSchema_1.updateCourseValidationSchema), course_controller_1.CourseControllers.updateCourse);
CourseRouter.delete('/:id', course_controller_1.CourseControllers.deleteCourse);
CourseRouter.put('/:id/assign-faculties', (0, validateRequest_1.default)(course_zodSchema_1.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.assignFacultiesToACourse);
CourseRouter.delete('/:id/remove-faculties', (0, validateRequest_1.default)(course_zodSchema_1.facultiesWithCourseValidationSchema), course_controller_1.CourseControllers.removeFacultiesFromCourse);
exports.default = CourseRouter;
