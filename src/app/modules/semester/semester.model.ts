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
    timestamps: true,
    versionKey:false
}
);

semesterSchema.pre("save", async function (next) {
    const isSemesterExists = await SemesterModel.findOne({
        year: this.year,
        name : this.year
    });
    if (isSemesterExists) {
        throw new Error("Semester is already exists");
    }
    next();
});

export const SemesterModel = model("Semester", semesterSchema);