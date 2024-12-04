import type { Types } from 'mongoose';

export type TDepartment = {
    name: string;
    code: string;
    faculty: Types.ObjectId;
};