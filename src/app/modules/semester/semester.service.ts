import { semesterNameCodeMapper } from "./semester.constans";
import { SemesterModel } from "./semester.model";
import { TSemester } from "./semester.types";

export class SemesterServices {
    static async createSemesterIntoDB(payload: TSemester) {
        // Check semester name-code combination
        if (semesterNameCodeMapper[payload.name] !== payload.code) {
            throw new Error(
                'Invalid Semester Code!'
            );
        }
        const result = await SemesterModel.create(payload);
        return result;
    }

    static async getAllSemester() {
        const result = await SemesterModel.find();
        return result;
    }
}