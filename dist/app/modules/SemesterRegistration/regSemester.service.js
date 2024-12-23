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
exports.RegSemesterServices = void 0;
const mongoose_1 = require("mongoose");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const semester_model_1 = require("../semester/semester.model");
const regSemester_constant_1 = require("./regSemester.constant");
const regSemester_model_1 = require("./regSemester.model");
const offeredCourse_model_1 = require("../offeredCourses/offeredCourse.model");
class RegSemesterServices {
    static createRegSemester(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = payload === null || payload === void 0 ? void 0 : payload.semester;
            const isSemesterUpcomingOrOngoing = yield regSemester_model_1.RegSemesterModel.findOne({
                $or: [
                    { status: regSemester_constant_1.RegistrationStatus.UPCOMING },
                    { status: regSemester_constant_1.RegistrationStatus.ONGOING },
                ],
            });
            if (isSemesterUpcomingOrOngoing) {
                throw new Error(`There is already an ${isSemesterUpcomingOrOngoing.status} registered semester !`);
            }
            const isSemesterExists = yield semester_model_1.SemesterModel.findById(semester);
            if (!isSemesterExists) {
                throw new Error('This semester not found');
            }
            const isRegSemesterExists = yield regSemester_model_1.RegSemesterModel.findOne({
                semester,
            });
            if (isRegSemesterExists) {
                throw new Error('This semester is already registered!');
            }
            const result = yield regSemester_model_1.RegSemesterModel.create(payload);
            return result;
        });
    }
    static getAllRegSemesters(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const regSemesterQuery = new queryBuilder_1.default(regSemester_model_1.RegSemesterModel.find().populate('semester'), query)
                .filter()
                .sort()
                .paginate()
                .fields();
            const result = yield regSemesterQuery.getQuery;
            return result;
        });
    }
    static getSingleRegSemester(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield regSemester_model_1.RegSemesterModel.findById(id);
            return result;
        });
    }
    static updateRegSemester(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const isRegSemesterExists = yield regSemester_model_1.RegSemesterModel.findById(id);
            if (!isRegSemesterExists) {
                throw new Error('This semester is found');
            }
            const currentSemesterStatus = isRegSemesterExists === null || isRegSemesterExists === void 0 ? void 0 : isRegSemesterExists.status;
            const requestedStatus = payload === null || payload === void 0 ? void 0 : payload.status;
            if (currentSemesterStatus === regSemester_constant_1.RegistrationStatus.ENDED) {
                throw new Error(`This semester is already ${currentSemesterStatus}`);
            }
            if (currentSemesterStatus === regSemester_constant_1.RegistrationStatus.UPCOMING &&
                requestedStatus === regSemester_constant_1.RegistrationStatus.ENDED) {
                throw new Error(`you can not change status from ${currentSemesterStatus} to ${requestedStatus}`);
            }
            if (currentSemesterStatus === regSemester_constant_1.RegistrationStatus.ONGOING &&
                requestedStatus === regSemester_constant_1.RegistrationStatus.UPCOMING) {
                throw new Error(`you can not change status from ${currentSemesterStatus} to ${requestedStatus}`);
            }
            const result = yield regSemester_model_1.RegSemesterModel.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
            });
            return result;
        });
    }
    static deleteRegSemester(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isRegSemesterExists = yield regSemester_model_1.RegSemesterModel.findById(id);
            if (!isRegSemesterExists) {
                throw new Error('this registered semester is not found');
            }
            const regSemesterStatus = isRegSemesterExists === null || isRegSemesterExists === void 0 ? void 0 : isRegSemesterExists.status;
            if (regSemesterStatus !== regSemester_constant_1.RegistrationStatus.UPCOMING) {
                throw new Error(`you can not update as the registered semester is ${regSemesterStatus}`);
            }
            const session = yield (0, mongoose_1.startSession)();
            session.startTransaction();
            try {
                const deletedOfferedCourse = yield offeredCourse_model_1.OfferedCourseModel.deleteMany({
                    semesterRegistration: id
                }, {
                    session
                });
                if (!deletedOfferedCourse) {
                    throw new Error('Failed to delete semester registration');
                }
                const deletedSemesterRegistration = yield regSemester_model_1.RegSemesterModel.findByIdAndUpdate(id, { session, new: true });
                if (!deletedSemesterRegistration) {
                    throw new Error('Failed to delete semester registration');
                }
                yield session.commitTransaction();
                yield session.endSession();
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        });
    }
}
exports.RegSemesterServices = RegSemesterServices;
