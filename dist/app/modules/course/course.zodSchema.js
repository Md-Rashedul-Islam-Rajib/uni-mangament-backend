"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultiesWithCourseValidationSchema = exports.updateCourseValidationSchema = exports.updatePreRequisiteCourseValidationSchema = exports.createCourseValidationSchema = exports.PreRequisiteCourseValidationSchema = void 0;
const zod_1 = require("zod");
exports.PreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createCourseValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    prefix: zod_1.z.string(),
    code: zod_1.z.number(),
    credits: zod_1.z.number(),
    preRequisiteCourses: zod_1.z.array(exports.PreRequisiteCourseValidationSchema).optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updatePreRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateCourseValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    prefix: zod_1.z.string().optional(),
    code: zod_1.z.number().optional(),
    credits: zod_1.z.number().optional(),
    preRequisiteCourses: zod_1.z
        .array(exports.updatePreRequisiteCourseValidationSchema)
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.facultiesWithCourseValidationSchema = zod_1.z.object({
    faculties: zod_1.z.array(zod_1.z.string()),
});
