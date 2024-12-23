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
exports.CourseServices = void 0;
const mongoose_1 = require("mongoose");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
class CourseServices {
    static createCourse(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.CourseModel.create(payload);
            return result;
        });
    }
    static getAllCourse(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseQuery = new queryBuilder_1.default(course_model_1.CourseModel.find(), query)
                .search(course_constant_1.CourseSearchableFields)
                .filter()
                .sort()
                .paginate()
                .fields();
            const result = courseQuery.getQuery;
            return result;
        });
    }
    static getSingleCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.CourseModel.findById(id).populate('preRequisiteCourses.course');
            return result;
        });
    }
    static updateCourse(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { preRequisiteCourses } = payload, courseRemainingData = __rest(payload, ["preRequisiteCourses"]);
            const session = yield (0, mongoose_1.startSession)();
            session.startTransaction();
            try {
                const updatedData = yield course_model_1.CourseModel.findByIdAndUpdate(id, courseRemainingData, {
                    new: true,
                    runValidators: true,
                    session,
                });
                if (!updatedData) {
                    throw new Error('failed to update course');
                }
                const deletedPreRequisites = (preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.length)
                    ? preRequisiteCourses.reduce((acc, element) => {
                        if ((element === null || element === void 0 ? void 0 : element.course) && (element === null || element === void 0 ? void 0 : element.isDeleted)) {
                            acc.push(element.course.toString());
                        }
                        return acc;
                    }, [])
                    : [];
                const deletedPreRequisiteCourses = yield course_model_1.CourseModel.findByIdAndUpdate(id, {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: deletedPreRequisites },
                        },
                    },
                }, {
                    new: true,
                    runValidators: true,
                    session,
                });
                if (!deletedPreRequisiteCourses) {
                    throw new Error('failed to update course');
                }
                const newPreRequisites = preRequisiteCourses === null || preRequisiteCourses === void 0 ? void 0 : preRequisiteCourses.filter((element) => element.course && !element.isDeleted);
                const newPreRequisiteCourses = yield course_model_1.CourseModel.findByIdAndUpdate(id, {
                    $addToSet: {
                        preRequisiteCourses: { $each: newPreRequisites },
                    },
                }, {
                    new: true,
                    runValidators: true,
                    session,
                });
                if (!newPreRequisiteCourses) {
                    throw new Error('Failed to update course!');
                }
                const result = yield course_model_1.CourseModel.findById(id).populate('preRequisiteCourses.course');
                yield session.commitTransaction();
                yield session.endSession();
                return result;
            }
            catch (error) {
                yield session.abortTransaction();
                yield session.endSession();
                throw error;
            }
        });
    }
    static deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.CourseModel.findByIdAndUpdate(id, { isDeleted: true }, {
                new: true,
            });
            return result;
        });
    }
    static assignFacultiesToACourse(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.CourseFacultyModel.findByIdAndUpdate(id, {
                course: id,
                $addToSet: { faculties: { $each: payload } },
            }, {
                upsert: true,
                new: true,
            });
            return result;
        });
    }
    static removeFacultiesFromCourse(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield course_model_1.CourseFacultyModel.findByIdAndUpdate(id, {
                $pull: { faculties: { $in: payload } },
            }, {
                new: true,
            });
            return result;
        });
    }
}
exports.CourseServices = CourseServices;
