import { z } from 'zod';

export const createEnrolledCourseValidationZodSchema = z.object({

        offeredCourse: z.string(),

});

export const updateEnrolledCourseMarksValidationZodSchema = z.object({

        semesterRegistration: z.string(),
        offeredCourse: z.string(),
        student: z.string(),
        courseMarks: z.object({
            classTest1: z.number().optional(),
            midTerm: z.number().optional(),
            classTest2: z.number().optional(),
            finalTerm: z.number().optional(),
        }),

});
