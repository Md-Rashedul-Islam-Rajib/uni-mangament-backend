import QueryBuilder from "../../builder/queryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { CourseModel } from "./course.model";
import { TCourse } from "./course.types";

export class CourseServices {
    static async createCourse(payload: TCourse) {
        const result = await CourseModel.create(payload);
        return result;
    };


    static async getAllCourse(query: Record<string, unknown>) {
        const courseQuery = new QueryBuilder(
            CourseModel.find(),
            query,
        )
            .search(CourseSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = courseQuery.getQuery;
        return result;
    };


    static async getSingleCourse(id: string) {
        const result = await CourseModel.findById(id).populate("preRequisiteCourses.course");
        return result;
    };








}