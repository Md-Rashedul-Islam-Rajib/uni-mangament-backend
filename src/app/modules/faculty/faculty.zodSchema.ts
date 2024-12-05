import { z } from 'zod';

export const facultyCreationSchema = z.object({
    name: z.string({ message: 'Name for faculty is required!' }).min(2),
});

export const updateFacultySchema = facultyCreationSchema.partial();
