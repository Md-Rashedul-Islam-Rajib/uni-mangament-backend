import mongoose, { Schema } from "mongoose";
import { TRegSemester } from "./regSemester.types";
import { SemesterRegistrationStatus } from "./regSemester.constant";

const regSemesterSchema = new mongoose.Schema<TRegSemester>(
    {
        semester: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            ref: 'Semester',
        },
        status: {
            type: String,
            enum: SemesterRegistrationStatus,
            default: 'UPCOMING',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        minCredit: {
            type: Number,
            default: 3,
        },
        maxCredit: {
            type: Number,
            default: 15,
        },
    },
    {
        timestamps: true,
    },
);

export const RegSemesterModel = mongoose.model<TRegSemester>(
    'RegSemester',
    regSemesterSchema,
);
