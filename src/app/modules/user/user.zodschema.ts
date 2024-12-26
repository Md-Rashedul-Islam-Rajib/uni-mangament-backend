import { z } from 'zod';
import { UserStatus } from './user.constants';

export const userZodSchema = z.object({
    password: z
        .string({
            invalid_type_error: 'Password must be string',
        })
        .max(20, { message: 'Password can not be more than 20 characters' })
        .optional(),
});


export const changeStatusValidationSchema = z.object({
        status: z.enum([...UserStatus] as [string, ...string[]]),
    
});

