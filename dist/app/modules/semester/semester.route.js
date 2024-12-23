"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const semester_controller_1 = require("./semester.controller");
const express_1 = require("express");
const semester_zodSchema_1 = require("./semester.zodSchema");
const SemesterRouter = (0, express_1.Router)();
SemesterRouter.post('/create-semester', (0, validateRequest_1.default)(semester_zodSchema_1.createSemesterValidationSchema), semester_controller_1.SemesterControllers.createSemester);
SemesterRouter.get('/', semester_controller_1.SemesterControllers.getAllSemester);
SemesterRouter.get('/:id', semester_controller_1.SemesterControllers.getSingleSemester);
SemesterRouter.patch('/:id', (0, validateRequest_1.default)(semester_zodSchema_1.updateSemesterValidationSchema), semester_controller_1.SemesterControllers.updateSemester);
exports.default = SemesterRouter;
