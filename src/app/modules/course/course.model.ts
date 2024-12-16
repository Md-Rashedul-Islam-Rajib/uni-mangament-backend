import { model, Schema } from 'mongoose';
import { TCourse, TCoursefaculty, TPreRequisiteCourses } from './course.types';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    },
);

const courseSchema = new Schema<TCourse>(
    {
        title: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        prefix: {
            type: String,
            trim: true,
            required: true,
        },
        code: {
            type: Number,
            trim: true,
            required: true,
        },
        credits: {
            type: Number,
            trim: true,
            required: true,
        },
        preRequisiteCourses: [preRequisiteCoursesSchema],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const CourseModel = model<TCourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TCoursefaculty>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
    },
    faculties: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
});

export const CourseFacultyModel = model<TCoursefaculty>(
    'CourseFaculty',
    courseFacultySchema,
);
