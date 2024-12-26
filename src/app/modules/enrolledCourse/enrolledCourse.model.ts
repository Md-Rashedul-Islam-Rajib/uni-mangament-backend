import mongoose, { Schema } from 'mongoose';
import { Grade } from './enrolledCourse.constant';
import { TEnrolledCourse, TEnrolledCourseMarks } from './enrolledCourse.types';


const courseMarksSchema = new Schema<TEnrolledCourseMarks>(
    {
        classTest1: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        midTerm: {
            type: Number,
            min: 0,
            max: 30,
            default: 0,
        },
        classTest2: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        finalTerm: {
            type: Number,
            min: 0,
            max: 50,
            default: 0,
        },
    },
    {
        _id: false,
    },
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        ref: 'RegSemester',
        required: true,
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Semester',
        required: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    offeredCourse: {
        type: Schema.Types.ObjectId,
        ref: 'OfferedCourse',
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'FacultyMember',
        required: true,
    },
    isEnrolled: {
        type: Boolean,
        default: false,
    },
    courseMarks: {
        type: courseMarksSchema,
        default: {},
    },
    grade: {
        type: String,
        enum: Grade,
        default: 'N/A',
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const EnrolledCourse = mongoose.model<TEnrolledCourse>(
    'EnrolledCourse',
    enrolledCourseSchema,
);

export default EnrolledCourse;
