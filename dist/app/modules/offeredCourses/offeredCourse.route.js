"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const offeredCourse_zodSchema_1 = require("./offeredCourse.zodSchema");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const OfferedCourseRouter = (0, express_1.Router)();
OfferedCourseRouter.post('/create-offered-course', (0, validateRequest_1.default)(offeredCourse_zodSchema_1.createOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseControllers.createOfferedCourse);
OfferedCourseRouter.get('/', offeredCourse_controller_1.OfferedCourseControllers.getAllOfferedCourse);
OfferedCourseRouter.get('/:id', offeredCourse_controller_1.OfferedCourseControllers.getSingleOfferedCourse);
OfferedCourseRouter.patch('/:id', (0, validateRequest_1.default)(offeredCourse_zodSchema_1.updateOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseControllers.updateOfferedCourse);
OfferedCourseRouter.delete("/:id", offeredCourse_controller_1.OfferedCourseControllers.deleteOfferedCourse);
exports.default = OfferedCourseRouter;
