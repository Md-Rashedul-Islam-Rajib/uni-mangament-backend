import { z } from 'zod';
import { months, semesterCode, semesterName } from './semester.constans';

export const createSemesterValidationSchema = z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    year: z.string().length(4, 'Year must be 4 digits!'),
    code: z.enum([...semesterCode] as [string, ...string[]]),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
});
export const updateSemesterValidationSchema =
    createSemesterValidationSchema.partial().strict();
