"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultySchema = exports.facultyCreationSchema = void 0;
const zod_1 = require("zod");
exports.facultyCreationSchema = zod_1.z.object({
    name: zod_1.z.string({ message: 'Name for faculty is required!' }).min(2),
});
exports.updateFacultySchema = exports.facultyCreationSchema.partial();
