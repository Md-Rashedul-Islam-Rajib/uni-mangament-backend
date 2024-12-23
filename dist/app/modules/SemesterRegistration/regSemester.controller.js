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
exports.RegSemesterControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const regSemester_service_1 = require("./regSemester.service");
class RegSemesterControllers {
}
exports.RegSemesterControllers = RegSemesterControllers;
_a = RegSemesterControllers;
RegSemesterControllers.createRegSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield regSemester_service_1.RegSemesterServices.createRegSemester(req.body);
    (0, sendResponse_1.default)(res, 201, true, "semester registration is created successfully", result);
}));
RegSemesterControllers.getAllRegSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield regSemester_service_1.RegSemesterServices.getAllRegSemesters(req.query);
    (0, sendResponse_1.default)(res, 200, true, 'Semester Registration is retrieved successfully', result);
}));
RegSemesterControllers.getSingleRegSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield regSemester_service_1.RegSemesterServices.getSingleRegSemester(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Semester Registration is retrieved successfully', result);
}));
RegSemesterControllers.updateRegSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield regSemester_service_1.RegSemesterServices.updateRegSemester(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, "Semester registration is updated successfully", result);
}));
RegSemesterControllers.deleteRegSemester = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield regSemester_service_1.RegSemesterServices.deleteRegSemester(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, "Semester registration is deleted successfully");
}));
