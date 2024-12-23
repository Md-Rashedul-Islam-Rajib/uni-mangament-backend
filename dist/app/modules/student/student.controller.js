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
exports.StudentControllers = void 0;
const student_service_1 = require("./student.service");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
class StudentControllers {
}
exports.StudentControllers = StudentControllers;
_a = StudentControllers;
StudentControllers.getSingleStudent = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.getSingleStudentFromDB(studentId);
    (0, sendResponse_1.default)(res, 200, true, 'Student is retrieved successfully', result);
}));
StudentControllers.getAllStudents = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_service_1.StudentServices.getAllStudentsFromDB(req.query);
    (0, sendResponse_1.default)(res, 200, true, 'Student is retrieved successfully', result);
}));
StudentControllers.deleteStudent = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const result = yield student_service_1.StudentServices.deleteStudentFromDB(studentId);
    (0, sendResponse_1.default)(res, 200, true, 'Student is deleted successfully', result);
}));
