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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const user_model_1 = require("../user/user.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const student_constants_1 = require("./student.constants");
class StudentServices {
    static getAllStudentsFromDB(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentQuery = new queryBuilder_1.default(student_model_1.StudentModel.find()
                .populate('admissionSemester')
                .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                },
            }), query)
                .search(student_constants_1.studentSearchableFields)
                .filter()
                .sort()
                .paginate()
                .fields();
            const result = yield studentQuery.getQuery;
            return result;
        });
    }
    static getSingleStudentFromDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield student_model_1.StudentModel.findById(id)
                .populate('admissionSemester')
                .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                },
            });
            return result;
        });
    }
    static deleteStudentFromDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const deletedStudent = yield student_model_1.StudentModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
                if (!deletedStudent) {
                    throw new Error('failed to delete student');
                }
                const deletedUser = yield user_model_1.UserModel.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
                if (!deletedUser) {
                    throw new Error('failed to delete user');
                }
                yield session.commitTransaction();
                yield session.endSession();
                return deletedStudent;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        });
    }
}
exports.StudentServices = StudentServices;
