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
exports.SemesterModel = void 0;
const mongoose_1 = require("mongoose");
const semester_constans_1 = require("./semester.constans");
const semesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: semester_constans_1.semesterName,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: semester_constans_1.semesterCode,
        required: true,
    },
    startMonth: {
        type: String,
        enum: semester_constans_1.months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: semester_constans_1.months,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
semesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExists = yield exports.SemesterModel.findOne({
            year: this.year,
            name: this.year,
        });
        if (isSemesterExists) {
            throw new Error('Semester is already exists');
        }
        next();
    });
});
exports.SemesterModel = (0, mongoose_1.model)('Semester', semesterSchema);
