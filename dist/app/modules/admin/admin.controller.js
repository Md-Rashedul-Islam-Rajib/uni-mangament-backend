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
exports.AdminControllers = void 0;
const catchAsyncFn_1 = __importDefault(require("../../utilities/catchAsyncFn"));
const sendResponse_1 = __importDefault(require("../../utilities/sendResponse"));
const admin_service_1 = require("./admin.service");
class AdminControllers {
}
exports.AdminControllers = AdminControllers;
_a = AdminControllers;
AdminControllers.getAllAdmins = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.getAllAdmin(req.query);
    (0, sendResponse_1.default)(res, 200, true, 'admins are retrieved successfully', result);
}));
AdminControllers.getSingleAdmin = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.getSingleAdmin(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'admin is retrieved successfully', result);
}));
AdminControllers.updateAdmin = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.updateAdmin(req.params.id, req.body);
    (0, sendResponse_1.default)(res, 200, true, 'admin is updated successfully', result);
}));
AdminControllers.deleteAdmin = (0, catchAsyncFn_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminServices.deleteAdmin(req.params.id);
    (0, sendResponse_1.default)(res, 200, true, 'Admin is deleted successfully', result);
}));
