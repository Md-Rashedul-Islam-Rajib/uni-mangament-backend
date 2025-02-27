import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    middleName: z.string(),
    lastName: z.string(),
});

const guardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

export const createStudentValidationSchema = z.object({

        name: userNameValidationSchema,
        gender: z.enum(['male', 'female', 'other']),
        dateOfBirth: z.string().optional(),
        email: z.string().email(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        academicDepartment: z.string(),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        guardian: guardianValidationSchema,
        localGuardian: localGuardianValidationSchema,
        admissionSemester: z.string(),
        profileImg: z.string(),
});

export const updateUserNameSchema = userNameValidationSchema.partial().strict();
export const updateGuardianSchema = guardianValidationSchema.partial().strict();
export const updateLocalGuardianSchema = localGuardianValidationSchema.partial().strict();
export const updateStudentSchema = createStudentValidationSchema.partial().strict();

export const studentValidations = {
    createStudentValidationSchema,
};
