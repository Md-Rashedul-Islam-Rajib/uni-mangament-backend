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
exports.SemesterServices = void 0;
const semester_constans_1 = require("./semester.constans");
const semester_model_1 = require("./semester.model");
class SemesterServices {
    static createSemesterIntoDB(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check semester name-code combination
            if (semester_constans_1.semesterNameCodeMapper[payload.name] !== payload.code) {
                throw new Error('Invalid Semester Code!');
            }
            const result = yield semester_model_1.SemesterModel.create(payload);
            return result;
        });
    }
    static getAllSemester() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield semester_model_1.SemesterModel.find();
            return result;
        });
    }
    static getSingleSemester(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield semester_model_1.SemesterModel.findById(id);
            return result;
        });
    }
    static updateSemester(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.name &&
                payload.code &&
                semester_constans_1.semesterNameCodeMapper[payload.name] !== payload.code) {
                throw new Error(`Invalid semester code. ${payload.code} doesn't align with ${payload.name} semester`);
            }
            const result = yield semester_model_1.SemesterModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
            return result;
        });
    }
}
exports.SemesterServices = SemesterServices;
