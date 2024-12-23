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
exports.DepartmentModel = void 0;
const mongoose_1 = require("mongoose");
const departmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
    },
}, {
    timestamps: true,
    versionKey: false,
});
departmentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const departmentExists = yield exports.DepartmentModel.findOne({
            name: this.name,
        });
        if (departmentExists) {
            throw new Error(` Department with ${this.name} is already exists!`);
        }
        next();
    });
});
departmentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const departmentExists = yield exports.DepartmentModel.findOne(query);
        if (!departmentExists) {
            throw new Error('This department does not exist!');
        }
        next();
    });
});
exports.DepartmentModel = (0, mongoose_1.model)('Department', departmentSchema);
