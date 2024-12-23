"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentUpdateSchema = exports.departmentCreationSchema = void 0;
const zod_1 = require("zod");
exports.departmentCreationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Name is required!',
    }),
    code: zod_1.z
        .string({
        required_error: 'Department Code is required!',
    })
        .length(3, {
        message: 'Department code must be exactly 3 characters long!',
    })
        .toUpperCase(),
    academicFaculty: zod_1.z.string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
    }),
});
exports.departmentUpdateSchema = exports.departmentCreationSchema.partial();
