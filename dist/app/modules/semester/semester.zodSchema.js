"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemesterValidationSchema = exports.createSemesterValidationSchema = void 0;
const zod_1 = require("zod");
const semester_constans_1 = require("./semester.constans");
exports.createSemesterValidationSchema = zod_1.z.object({
    name: zod_1.z.enum([...semester_constans_1.semesterName]),
    year: zod_1.z.string().length(4, 'Year must be 4 digits!'),
    code: zod_1.z.enum([...semester_constans_1.semesterCode]),
    startMonth: zod_1.z.enum([...semester_constans_1.months]),
    endMonth: zod_1.z.enum([...semester_constans_1.months]),
});
exports.updateSemesterValidationSchema = exports.createSemesterValidationSchema.partial();
