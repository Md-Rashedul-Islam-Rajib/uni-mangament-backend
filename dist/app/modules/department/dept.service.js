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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentServices = void 0;
const dept_model_1 = require("./dept.model");
class DepartmentServices {
    static createDepartment(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dept_model_1.DepartmentModel.create(payload);
            return result;
        });
    }
    static getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dept_model_1.DepartmentModel.find().populate('academicFaculty');
            return result;
        });
    }
    static getSingleDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dept_model_1.DepartmentModel.findById(id).populate('academicFaculty');
            return result;
        });
    }
    static updateDepartment(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield dept_model_1.DepartmentModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
            return result;
        });
    }
}
exports.DepartmentServices = DepartmentServices;
