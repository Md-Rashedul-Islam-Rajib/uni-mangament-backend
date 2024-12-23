"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userZodSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be string',
    })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});
exports.default = userZodSchema;
