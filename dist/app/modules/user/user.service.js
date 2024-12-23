"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const semester_model_1 = require("../semester/semester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utilities_1 = require("./user.utilities");
const dept_model_1 = require("../department/dept.model");
const mongoose_1 = __importStar(require("mongoose"));
const member_model_1 = require("../facultyMember/member.model");
const admin_model_1 = require("../admin/admin.model");
class UserServices {
    static createStudentIntoDB(password, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // checking user existence
            const userExists = yield user_model_1.UserModel.findById(payload.id);
            if (userExists) {
                throw new Error('User with this id already exists');
            }
            //creating a user object
            const userData = {};
            //using default password if password is not provided
            userData.password = password || config_1.default.default_password;
            // setting student role
            userData.role = 'student';
            const semester = yield semester_model_1.SemesterModel.findById(payload.admissionSemester);
            if (!semester) {
                throw new Error('Semester is not found');
            }
            const department = yield dept_model_1.DepartmentModel.findById(payload.academicDepartment);
            if (!department) {
                throw new Error('Department is not found');
            }
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                // setting id
                userData.id = yield (0, user_utilities_1.generateStudentId)(semester, department);
                // creating user
                const newUser = yield user_model_1.UserModel.create([userData], { session });
                // creating a student
                if (newUser.length) {
                    payload.id = (_a = newUser[0]) === null || _a === void 0 ? void 0 : _a.id;
                    payload.user = (_b = newUser[0]) === null || _b === void 0 ? void 0 : _b._id;
                }
                const newStudent = yield student_model_1.StudentModel.create([payload], {
                    session,
                });
                yield session.commitTransaction();
                session.endSession();
                return newStudent[0];
            }
            catch (error) {
                yield session.abortTransaction();
                session.endSession();
                throw error;
            }
        });
    }
    static createFacultyMemberIntoDb(password, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {};
            userData.password = password || config_1.default.default_password;
            userData.role = 'faculty';
            const department = yield dept_model_1.DepartmentModel.findById(payload.academicDepartment);
            if (!department) {
                throw new Error('department is not found');
            }
            const session = yield (0, mongoose_1.startSession)();
            session.startTransaction();
            try {
                userData.id = yield (0, user_utilities_1.generateFacultyMemberID)(department);
                const newUser = yield user_model_1.UserModel.create([userData], { session });
                if (!newUser.length) {
                    throw new Error('Failed to create user');
                }
                payload.id = newUser[0].id;
                payload.user = newUser[0]._id;
                const newFacultyMember = yield member_model_1.FacultyMemberModel.create([payload], { session });
                if (!newFacultyMember) {
                    throw new Error('Failed to create faculty');
                }
                yield session.commitTransaction();
                yield session.endSession();
                return newFacultyMember;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        });
    }
    static createAdmin(password, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {};
            userData.password = password || config_1.default.default_password;
            userData.role = 'admin';
            const admin = yield admin_model_1.AdminModel.findOne(payload.user);
            if (!admin) {
                throw new Error('admin is not found');
            }
            const session = yield (0, mongoose_1.startSession)();
            session.startTransaction();
            try {
                userData.id = yield (0, user_utilities_1.generateAdminId)(admin);
                const newUser = yield user_model_1.UserModel.create([userData], { session });
                if (!newUser.length) {
                    throw new Error('failed to create user');
                }
                payload.id = newUser[0].id;
                payload.user = newUser[0]._id;
                const newAdmin = yield admin_model_1.AdminModel.create([payload], { session });
                if (!newAdmin) {
                    throw new Error('failed to create admin');
                }
                yield session.commitTransaction();
                yield session.endSession();
                return newAdmin;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        });
    }
}
exports.UserServices = UserServices;
