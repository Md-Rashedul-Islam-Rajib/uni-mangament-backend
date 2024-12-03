import { z } from "zod";

export const createSemesterValidationSchema = z.object({
    name: z.enum
});