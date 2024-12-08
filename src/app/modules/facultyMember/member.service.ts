import QueryBuilder from "../../builder/queryBuilder";
import { FacultyModel } from "../faculty/faculty.model";
import { FacultySearchableFields } from "./member.constant";

export class FacultymemberServices {
    static async getAllFacultyMembers(query: Record<string, unknown>) {
        const facultyQuery = new QueryBuilder(
            FacultyModel.find().populate('academicDepartment'),
            query,
        )
            .search(FacultySearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = facultyQuery.getQuery;
        return result;

    }

    static async getSingleFacultyMember(id:string) {
        const result =
            await FacultyModel.findById(id).populate('academicDepartment');

        return result;
    }
}