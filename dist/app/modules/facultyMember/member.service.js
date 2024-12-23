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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultymemberServices = void 0;
const mongoose_1 = require("mongoose");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const member_constant_1 = require("./member.constant");
const member_model_1 = require("./member.model");
const user_model_1 = require("../user/user.model");
class FacultymemberServices {
    static getAllFacultyMembers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const facultyQuery = new queryBuilder_1.default(member_model_1.FacultyMemberModel.find().populate('academicDepartment'), query)
                .search(member_constant_1.FacultySearchableFields)
                .filter()
                .sort()
                .paginate()
                .fields();
            const result = facultyQuery.getQuery;
            return result;
        });
    }
    static getSingleFacultyMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield member_model_1.FacultyMemberModel.findById(id).populate('academicDepartment');
            return result;
        });
    }
    static updateFacultyMember(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = payload, remainingFacultyData = __rest(payload, ["name"]);
            // Prepare the update object
            const modifiedUpdatedData = Object.assign(Object.assign({}, remainingFacultyData), (name &&
                Object.keys(name).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [`name.${key}`]: name[key] })), {})));
            // Perform the database update
            const result = yield member_model_1.FacultyMemberModel.findByIdAndUpdate(id, modifiedUpdatedData, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
    static deleteFacultyMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, mongoose_1.startSession)();
            try {
                session.abortTransaction();
                const deletedFacultyMember = yield member_model_1.FacultyMemberModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
                if (!deletedFacultyMember) {
                    throw new Error('Failed to delete faculty');
                }
                const userId = deletedFacultyMember.user;
                const deletedFacultyUser = yield user_model_1.UserModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
                if (!deletedFacultyUser) {
                    throw new Error('Failed to delete faculty user');
                }
                yield session.commitTransaction();
                yield session.endSession();
                return deletedFacultyMember;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw new Error(String(error));
            }
        });
    }
}
exports.FacultymemberServices = FacultymemberServices;
