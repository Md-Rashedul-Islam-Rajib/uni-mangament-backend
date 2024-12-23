"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const dept_service_1 = require("./dept.service");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
class DepartmentControllers {
}
exports.DepartmentControllers = DepartmentControllers;
_a = DepartmentControllers;
DepartmentControllers.createDepartment = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dept_service_1.DepartmentServices.createDepartment(req.body);
    (0, sendResponse_1.default)(res, 201, true, 'Department created successfully', result);
}));
DepartmentControllers.getAllDepartment = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dept_service_1.DepartmentServices.getAllDepartments();
    (0, sendResponse_1.default)(res, 200, true, 'Departments are retrieved successfully', result);
}));
DepartmentControllers.getSingleDepartment = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dept_service_1.DepartmentServices.getSingleDepartment(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Department are retrieved successfully', result);
}));
DepartmentControllers.updateDepartment = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dept_service_1.DepartmentServices.updateDepartment(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Department is updated successfully', result);
}));
