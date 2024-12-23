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
exports.CourseControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const course_service_1 = require("./course.service");
class CourseControllers {
}
exports.CourseControllers = CourseControllers;
_a = CourseControllers;
CourseControllers.createCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.createCourse(req.body);
    (0, sendResponse_1.default)(res, 201, true, 'Course is created successfully', result);
}));
CourseControllers.getAllCourses = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.getAllCourse(req.query);
    (0, sendResponse_1.default)(res, 200, true, 'Courses are retrieved successfully', result);
}));
CourseControllers.getSingleCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.getSingleCourse(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Course is retrieved successfully', result);
}));
CourseControllers.updateCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.updateCourse(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Course is updated successfully', result);
}));
CourseControllers.deleteCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.deleteCourse(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Course is deleted successfully', result);
}));
CourseControllers.assignFacultiesToACourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.assignFacultiesToACourse(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Faculties assigned successfully', result);
}));
CourseControllers.removeFacultiesFromCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_service_1.CourseServices.removeFacultiesFromCourse(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Faculties removed successfully', result);
}));
