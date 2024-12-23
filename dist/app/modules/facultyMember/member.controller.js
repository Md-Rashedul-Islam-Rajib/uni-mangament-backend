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
exports.FacultyMemberControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const member_service_1 = require("./member.service");
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
class FacultyMemberControllers {
}
exports.FacultyMemberControllers = FacultyMemberControllers;
_a = FacultyMemberControllers;
FacultyMemberControllers.getAllFacultyMembers = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.FacultymemberServices.getAllFacultyMembers(req.query);
    (0, sendResponse_1.default)(res, 200, true, 'Faculty members are retrieved successfully', result);
}));
FacultyMemberControllers.getSingleFacultyMember = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.FacultymemberServices.getSingleFacultyMember(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Faculty member is retrieved successfully', result);
}));
FacultyMemberControllers.updateFacultyMember = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.FacultymemberServices.updateFacultyMember(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'Faculty member is updated successfully', result);
}));
FacultyMemberControllers.deleteFacultyMember = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.FacultymemberServices.deleteFacultyMember(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Faculty member is deleted successfully', result);
}));
