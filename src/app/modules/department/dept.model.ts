import { Schema, model } from 'mongoose';
import { TDepartment } from './dept.types';

const departmentSchema = new Schema<TDepartment>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        code: {
            type: String,
            required: true,
            uppercase: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

departmentSchema.pre('save', async function (next) {
    const departmentExists = await DepartmentModel.findOne({
        name: this.name,
    });

    if (departmentExists) {
        throw new Error(` Department with ${this.name} is already exists!`);
    }

    next();
});

departmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const departmentExists = await DepartmentModel.findOne(query);

    if (!departmentExists) {
        throw new Error('This department does not exist!');
    }

    next();
});

export const DepartmentModel = model<TDepartment>(
    'Department',
    departmentSchema,
);
