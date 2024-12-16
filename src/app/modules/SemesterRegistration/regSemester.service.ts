import QueryBuilder from "../../builder/queryBuilder";
import { SemesterModel } from "../semester/semester.model";
import { RegistrationStatus } from "./regSemester.constant";
import { RegSemesterModel } from "./regSemester.model";
import { TRegSemester } from "./regSemester.types";

export class RegSemesterServices {

    static async createRegSemester(payload: TRegSemester) {
        const semester = payload?.semester;

        const isSemesterUpcomingOrOngoing = await RegSemesterModel.findOne(
            {
                $or: [
                    {status: RegistrationStatus.UPCOMING},
                    {status: RegistrationStatus.ONGOING}
                ],
            });
        if (isSemesterUpcomingOrOngoing) {
            throw new Error(
                `There is already an ${isSemesterUpcomingOrOngoing.status} registered semester !`,
            );
        }

        const isSemesterExists = await SemesterModel.findById(semester);
        if (!isSemesterExists) {
            throw new Error('This semester not found');
        }

        const isRegSemesterExists = await RegSemesterModel.findOne({ semester });
        
        if (isRegSemesterExists) {
            throw new Error('This semester is already registered!');
        }

        const result = await RegSemesterModel.create(payload);
        return result;

    };


    static async getAllRegSemesters(query: Record<string, unknown>) {
        const regSemesterQuery = new QueryBuilder(RegSemesterModel.find().populate('semester'), query)
            .filter()
            .sort()
            .paginate()
            .fields();
        const result = await regSemesterQuery.getQuery;
        return result;
    };

    static async getSingleRegSemester(id: string) {
        const result = await RegSemesterModel.findById(id);
        return result;
    };




















}