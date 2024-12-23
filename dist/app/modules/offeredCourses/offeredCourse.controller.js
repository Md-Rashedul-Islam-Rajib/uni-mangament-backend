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
exports.OfferedCourseControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const offeredCourse_service_1 = require("./offeredCourse.service");
class OfferedCourseControllers {
}
exports.OfferedCourseControllers = OfferedCourseControllers;
_a = OfferedCourseControllers;
OfferedCourseControllers.createOfferedCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.createOfferedCourse(req.body);
    (0, sendResponse_1.default)(res, 201, true, "offered course is created successfully", result);
}));
OfferedCourseControllers.getAllOfferedCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.getAllOfferedCourses(req.query);
    (0, sendResponse_1.default)(res, 200, true, "offered course retrieved successfully", result);
}));
OfferedCourseControllers.getSingleOfferedCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.getSingleOfferedCourse(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, "offered course retrieved successfully", result);
}));
OfferedCourseControllers.updateOfferedCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.updateOfferedCourse(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, "offered course updated successfully", result);
}));
OfferedCourseControllers.deleteOfferedCourse = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield offeredCourse_service_1.OfferedCourseServices.deleteOfferedCourse(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'offered course deleted successfully', result);
}));
