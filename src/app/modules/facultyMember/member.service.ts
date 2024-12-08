import QueryBuilder from "../../builder/queryBuilder";
import { FacultyModel } from "../faculty/faculty.model";
import { FacultySearchableFields } from "./member.constant";
import { TFacultyMember } from "./member.types";

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

    static async updateFacultyMember(id: string, payload: Partial<TFacultyMember>) {
        const { name, ...remainingFacultyData } = payload;

        // Prepare the update object
        const modifiedUpdatedData = {
            ...remainingFacultyData,
            ...(name &&
                Object.keys(name).reduce(
                    (acc, key) => ({
                        ...acc,
                        [`name.${key}`]: name[key as keyof typeof name],
                    }),
                    {},
                )),
        };

        // Perform the database update
        const result = await FacultyModel.findByIdAndUpdate(
            id,
            modifiedUpdatedData,
            {
                new: true,
                runValidators: true,
            },
        );

        return result;
    }
}