import { SemesterModel } from "./semester.model";
import { TSemester } from "./semester.types";

export class SemesterServices {
    static async createSemesterIntoDB(payload : TSemester) {
        const result = await SemesterModel.create(payload);
        return result;
    }
}