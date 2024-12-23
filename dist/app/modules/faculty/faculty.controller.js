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
exports.FacultyControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const faculty_service_1 = require("./faculty.service");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
class FacultyControllers {
}
exports.FacultyControllers = FacultyControllers;
_a = FacultyControllers;
FacultyControllers.createFaculty = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_service_1.FacultyServices.createFaculty(req.body);
    (0, sendResponse_1.default)(res, 201, true, 'Faculty is created successfully', result);
}));
FacultyControllers.getAllFaculties = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_service_1.FacultyServices.getAllFaculties();
    (0, sendResponse_1.default)(res, 200, true, 'Faculties are retrieved successfully', result);
}));
FacultyControllers.getSingleFaculty = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_service_1.FacultyServices.getSingleFaculty(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Faculty is retrieved successfully', result);
}));
FacultyControllers.updateFaculty = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield faculty_service_1.FacultyServices.updateFaculty(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Faculty updated successfully', result);
}));
