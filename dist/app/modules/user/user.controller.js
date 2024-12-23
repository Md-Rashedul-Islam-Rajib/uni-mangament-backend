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
exports.UserControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const user_service_1 = require("./user.service");
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
class UserControllers {
}
exports.UserControllers = UserControllers;
_a = UserControllers;
UserControllers.createStudent = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, student } = req.body;
    const result = yield user_service_1.UserServices.createStudentIntoDB(password, student);
    (0, sendResponse_1.default)(res, 201, true, 'User created successfully', result);
}));
UserControllers.createFacultyMember = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, facultyMember } = req.body;
    const result = yield user_service_1.UserServices.createFacultyMemberIntoDb(password, facultyMember);
    (0, sendResponse_1.default)(res, 201, true, 'Faculty is created successfully', result);
}));
UserControllers.createAdmin = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, admin } = req.body;
    const result = yield user_service_1.UserServices.createAdmin(password, admin);
    (0, sendResponse_1.default)(res, 201, true, 'Admin is created successfully', result);
}));
