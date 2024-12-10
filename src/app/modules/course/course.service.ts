import { CourseModel } from "./course.model";
import { TCourse } from "./course.types";

export class CourseServices {
    static async createCourse(payload: TCourse) {
        const result = await CourseModel.create(payload);
        return result;
    };
}