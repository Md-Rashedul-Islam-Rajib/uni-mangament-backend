"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const dept_zodSchema_1 = require("./dept.zodSchema");
const dept_controller_1 = require("./dept.controller");
const dept_service_1 = require("./dept.service");
const DepartmentRouter = (0, express_1.Router)();
DepartmentRouter.post('/create-department', (0, validateRequest_1.default)(dept_zodSchema_1.departmentCreationSchema), dept_controller_1.DepartmentControllers.createDepartment);
DepartmentRouter.get('/', dept_controller_1.DepartmentControllers.getAllDepartment);
DepartmentRouter.get('/:id', dept_service_1.DepartmentServices.getSingleDepartment);
DepartmentRouter.patch('/:id', (0, validateRequest_1.default)(dept_zodSchema_1.departmentUpdateSchema), dept_controller_1.DepartmentControllers.updateDepartment);
exports.default = DepartmentRouter;
