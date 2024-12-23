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
exports.SemesterControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const semester_service_1 = require("./semester.service");
class SemesterControllers {
}
exports.SemesterControllers = SemesterControllers;
_a = SemesterControllers;
SemesterControllers.createSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield semester_service_1.SemesterServices.createSemesterIntoDB(req.body);
    (0, sendResponse_1.default)(res, 201, true, 'Semester created successfully', result);
}));
SemesterControllers.getAllSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semesters = yield semester_service_1.SemesterServices.getAllSemester();
    (0, sendResponse_1.default)(res, 200, true, 'Semesters are retrieved successfully', semesters);
}));
SemesterControllers.getSingleSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semester = yield semester_service_1.SemesterServices.getSingleSemester(req.params.id);
    if (!semester) {
        throw new Error('Semester not found');
    }
    (0, sendResponse_1.default)(res, 200, true, 'Semester is retrieved successfully', semester);
}));
SemesterControllers.updateSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semester = yield semester_service_1.SemesterServices.updateSemester(req.params.id, req.body);
    if (!semester) {
        throw new Error('Semester not updatable');
    }
    (0, sendResponse_1.default)(res, 200, true, 'Semester is updated successfully', semester);
}));
