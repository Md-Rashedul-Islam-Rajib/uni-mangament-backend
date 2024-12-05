import { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.types';

const FacultySchema = new Schema<TFaculty>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

export const FacultyModel = model<TFaculty>('Faculty', FacultySchema);
