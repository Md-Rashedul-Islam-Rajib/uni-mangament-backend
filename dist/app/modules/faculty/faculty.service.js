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
exports.FacultyServices = void 0;
const faculty_model_1 = require("./faculty.model");
class FacultyServices {
    static createFaculty(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield faculty_model_1.FacultyModel.create(payload);
            return result;
        });
    }
    static getAllFaculties() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield faculty_model_1.FacultyModel.find();
            return result;
        });
    }
    static getSingleFaculty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield faculty_model_1.FacultyModel.findById(id);
            return result;
        });
    }
    static updateFaculty(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield faculty_model_1.FacultyModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
            return result;
        });
    }
}
exports.FacultyServices = FacultyServices;
