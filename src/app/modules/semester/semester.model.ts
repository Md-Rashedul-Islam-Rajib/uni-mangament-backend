import { model, Schema } from "mongoose";
import { TSemester } from "./semester.types";
import { months, semesterCode, semesterName } from "./semester.constans";


const semesterSchema = new Schema<TSemester>({
    name: {
        type: String,
        enum: semesterName,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: semesterCode,
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