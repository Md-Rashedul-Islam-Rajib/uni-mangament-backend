import { model, Schema } from "mongoose";
import { TSemester } from "./semester.types";

const months = [
    'January' ,
        'February' ,
        'March' ,
        'April' ,
        'May' ,
        'June' ,
        'July' ,
        'August' ,
        'September' ,
        'October' ,
        'November' ,
        'December'
];
const semesterSchema = new Schema<TSemester>({
    name: {
        type: String,
        enum: ['Autumn', 'Summer', 'Fall'],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: ['01', '02', '03'],
        required: true,
    },
    startMonth: {
        type: String,
        enum: months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: months,
        required: true
    },
}, {
    timestamps : true
}
);

export const SemesterModel = model("semester", semesterSchema);