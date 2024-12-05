import { FacultyModel } from "./faculty.model";
import { TFaculty } from "./faculty.types";

export class FacultyServices {
    static async createFaculty(payload:TFaculty) {
        const result = await FacultyModel.create(payload);
        return result;
    }
}