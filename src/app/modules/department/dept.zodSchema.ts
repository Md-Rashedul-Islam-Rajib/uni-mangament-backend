import { z } from 'zod';

export const departmentCreationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Name is required!',
    }),
    code: z
        .string({
            required_error: 'Department Code is required!',
        })
        .length(3, {
            message: 'Department code must be exactly 3 characters long!',
        })
        .toUpperCase(),
    academicFaculty: z.string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
    }),
});

export const departmentUpdateSchema = departmentCreationSchema.partial();
