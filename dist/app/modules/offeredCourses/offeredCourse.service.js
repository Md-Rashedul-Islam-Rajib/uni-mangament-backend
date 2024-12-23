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
exports.OfferedCourseServices = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const course_model_1 = require("../course/course.model");
const dept_model_1 = require("../department/dept.model");
const faculty_model_1 = require("../faculty/faculty.model");
const member_model_1 = require("../facultyMember/member.model");
const regSemester_model_1 = require("../SemesterRegistration/regSemester.model");
const offeredCourse_model_1 = require("./offeredCourse.model");
const offeredCourse_utilities_1 = require("./offeredCourse.utilities");
class OfferedCourseServices {
    static createOfferedCourse(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { semesterRegistration, academicFaculty, academicDepartment, course, section, faculty, days, startTime, endTime, } = payload;
            const isRegSemesterExists = yield regSemester_model_1.RegSemesterModel.findById(semesterRegistration);
            if (!isRegSemesterExists) {
                throw new Error('semester registration not found');
            }
            const semester = isRegSemesterExists === null || isRegSemesterExists === void 0 ? void 0 : isRegSemesterExists.semester;
            const isFacultyExists = yield faculty_model_1.FacultyModel.findById(academicFaculty);
            if (!isFacultyExists) {
                throw new Error('faculty not found');
            }
            const isDeptExists = yield dept_model_1.DepartmentModel.findById(academicDepartment);
            if (!isDeptExists) {
                throw new Error('department not found');
            }
            const isCourseExists = yield course_model_1.CourseModel.findById(course);
            if (!isCourseExists) {
                throw new Error('course not found');
            }
            const isFacultyMemberExists = yield member_model_1.FacultyMemberModel.findById(faculty);
            if (!isFacultyMemberExists) {
                throw new Error('faculty member not found');
            }
            const isDeptBelongToFaculty = yield dept_model_1.DepartmentModel.findOne({
                _id: academicDepartment,
                academicFaculty,
            });
            if (!isDeptBelongToFaculty) {
                throw new Error(`This ${isDeptExists.name} is not belong to this ${isFacultyExists.name}`);
            }
            const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = yield offeredCourse_model_1.OfferedCourseModel.findOne({
                semesterRegistration,
                course,
                section,
            });
            if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
                throw new Error(`Offered course with same section is already exist!`);
            }
            const assignedSchedules = yield offeredCourse_model_1.OfferedCourseModel.find({
                semesterRegistration,
                faculty,
                days: { $in: days },
            }).select('days startTime endTime');
            const newSchedule = {
                days,
                startTime,
                endTime,
            };
            if ((0, offeredCourse_utilities_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
                throw new Error(`This faculty is not available at that time ! Choose other time or day`);
            }
            const result = yield offeredCourse_model_1.OfferedCourseModel.create(Object.assign({}, payload));
            return result;
        });
    }
    static getAllOfferedCourses(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const offeredCourseQuery = new queryBuilder_1.default(offeredCourse_model_1.OfferedCourseModel.find(), query)
                .filter()
                .sort()
                .paginate()
                .fields();
            const result = offeredCourseQuery.getQuery;
            return result;
        });
    }
    static getSingleOfferedCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const offeredCourse = yield offeredCourse_model_1.OfferedCourseModel.findById(id);
            if (!offeredCourse) {
                throw new Error('Offered Course not found');
            }
            return offeredCourse;
        });
    }
    static updateOfferedCourse(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { faculty, days, startTime, endTime } = payload;
            const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourseModel.findById(id);
            if (!isOfferedCourseExists) {
                throw new Error('Offered course not found !');
            }
            const isFacultyExists = yield member_model_1.FacultyMemberModel.findById(faculty);
            if (!isFacultyExists) {
                throw new Error('Faculty member not found !');
            }
            const semesterRegistration = isOfferedCourseExists.semesterRegistration;
            // get the schedules of the faculties
            // Checking the status of the semester registration
            const semesterRegistrationStatus = yield regSemester_model_1.RegSemesterModel.findById(semesterRegistration);
            if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
                throw new Error(`You can not update this offered course as it is ${semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status}`);
            }
            // check if the faculty is available at that time.
            const assignedSchedules = yield offeredCourse_model_1.OfferedCourseModel.find({
                semesterRegistration,
                faculty,
                days: { $in: days },
            }).select('days startTime endTime');
            const newSchedule = {
                days,
                startTime,
                endTime,
            };
            if ((0, offeredCourse_utilities_1.hasTimeConflict)(assignedSchedules, newSchedule)) {
                throw new Error(`This faculty is not available at that time ! Choose other time or day`);
            }
            const result = yield offeredCourse_model_1.OfferedCourseModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            return result;
        });
    }
    ;
    static deleteOfferedCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isOfferedCourseExists = yield offeredCourse_model_1.OfferedCourseModel.findById(id);
            if (!isOfferedCourseExists) {
                throw new Error('Offered Course not found');
            }
            const semesterRegistation = isOfferedCourseExists.semesterRegistration;
            const semesterRegistrationStatus = yield regSemester_model_1.RegSemesterModel.findById(semesterRegistation).select('status');
            if ((semesterRegistrationStatus === null || semesterRegistrationStatus === void 0 ? void 0 : semesterRegistrationStatus.status) !== 'UPCOMING') {
                throw new Error(`Offered course can not update ! because the semester ${semesterRegistrationStatus}`);
            }
            const result = yield offeredCourse_model_1.OfferedCourseModel.findByIdAndDelete(id);
            return result;
        });
    }
    ;
}
exports.OfferedCourseServices = OfferedCourseServices;
