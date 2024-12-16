import { z } from "zod";
import { SemesterRegistrationStatus } from "./regSemester.constant";

export const createSemesterRegistrationValidationSchema = z.object({
        academicSemester: z.string(),
        status: z.enum([
            ...(SemesterRegistrationStatus as [string, ...string[]]),
        ]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number(),
});

const upadateSemesterRegistrationValidationSchema = z.object({
        academicSemester: z.string().optional(),
        status: z
            .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
            .optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
});
