"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const regSemester_zodSchema_1 = require("./regSemester.zodSchema");
const regSemester_controller_1 = require("./regSemester.controller");
const RegSemesterRouter = (0, express_1.Router)();
RegSemesterRouter.post('/create-semester-registration', (0, validateRequest_1.default)(regSemester_zodSchema_1.createRegSemesterValidationSchema), regSemester_controller_1.RegSemesterControllers.createRegSemester);
RegSemesterRouter.get('/', regSemester_controller_1.RegSemesterControllers.getAllRegSemester);
RegSemesterRouter.get('/:id', regSemester_controller_1.RegSemesterControllers.getSingleRegSemester);
RegSemesterRouter.patch('/:id', (0, validateRequest_1.default)(regSemester_zodSchema_1.upadateRegSemesterValidationSchema), regSemester_controller_1.RegSemesterControllers.updateRegSemester);
RegSemesterRouter.delete('/:id', regSemester_controller_1.RegSemesterControllers.deleteRegSemester);
exports.default = RegSemesterRouter;
