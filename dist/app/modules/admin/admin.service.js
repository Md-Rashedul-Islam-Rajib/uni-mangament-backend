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
exports.AdminServices = void 0;
const mongoose_1 = require("mongoose");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const admin_constant_1 = require("./admin.constant");
const admin_model_1 = require("./admin.model");
const user_model_1 = require("../user/user.model");
class AdminServices {
    static getAllAdmin(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminQuery = new queryBuilder_1.default(admin_model_1.AdminModel.find(), query)
                .search(admin_constant_1.AdminSearchableFields)
                .filter()
                .sort()
                .paginate()
                .fields();
            const result = adminQuery.getQuery;
            return result;
        });
    }
    static getSingleAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield admin_model_1.AdminModel.findById(id);
            return result;
        });
    }
    static updateAdmin(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = payload, remainingAdminData = __rest(payload, ["name"]);
            const modifiedUpdatedData = Object.assign(Object.assign({}, remainingAdminData), (name &&
                Object.keys(name).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [`name.${key}`]: name[key] })), {})));
            const result = yield admin_model_1.AdminModel.findByIdAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
            return result;
        });
    }
    static deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield (0, mongoose_1.startSession)();
            session.startTransaction();
            try {
                const deletedAdmin = yield admin_model_1.AdminModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
                if (!deletedAdmin) {
                    throw new Error('failed to delete admin');
                }
                const userId = deletedAdmin.user;
                const deletedUser = yield user_model_1.UserModel.findOneAndUpdate(userId, { isDeleted: true }, { new: true, session });
                if (!deletedUser) {
                    throw new Error('failed to delete user');
                }
                yield session.commitTransaction();
                yield session.endSession();
                return deletedAdmin;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        });
    }
}
exports.AdminServices = AdminServices;
