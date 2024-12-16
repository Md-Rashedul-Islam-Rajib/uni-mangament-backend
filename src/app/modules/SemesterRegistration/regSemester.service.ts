import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { SemesterModel } from '../semester/semester.model';
import { RegistrationStatus } from './regSemester.constant';
import { RegSemesterModel } from './regSemester.model';
import { TRegSemester } from './regSemester.types';
import { OfferedCourseModel } from '../offeredCourses/offeredCourse.model';

export class RegSemesterServices {
    static async createRegSemester(payload: TRegSemester) {
        const semester = payload?.semester;

        const isSemesterUpcomingOrOngoing = await RegSemesterModel.findOne({
            $or: [
                { status: RegistrationStatus.UPCOMING },
                { status: RegistrationStatus.ONGOING },
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

        const isRegSemesterExists = await RegSemesterModel.findOne({
            semester,
        });

        if (isRegSemesterExists) {
            throw new Error('This semester is already registered!');
        }

        const result = await RegSemesterModel.create(payload);
        return result;
    }

    static async getAllRegSemesters(query: Record<string, unknown>) {
        const regSemesterQuery = new QueryBuilder(
            RegSemesterModel.find().populate('semester'),
            query,
        )
            .filter()
            .sort()
            .paginate()
            .fields();
        const result = await regSemesterQuery.getQuery;
        return result;
    }

    static async getSingleRegSemester(id: string) {
        const result = await RegSemesterModel.findById(id);
        return result;
    }

    static async updateRegSemester(id: string, payload: Partial<TRegSemester>) {
        const isRegSemesterExists = await RegSemesterModel.findById(id);

        if (!isRegSemesterExists) {
            throw new Error('This semester is found');
        }

        const currentSemesterStatus = isRegSemesterExists?.status;
        const requestedStatus = payload?.status;

        if (currentSemesterStatus === RegistrationStatus.ENDED) {
            throw new Error(
                `This semester is already ${currentSemesterStatus}`,
            );
        }

        if (
            currentSemesterStatus === RegistrationStatus.UPCOMING &&
            requestedStatus === RegistrationStatus.ENDED
        ) {
            throw new Error(
                `you can not change status from ${currentSemesterStatus} to ${requestedStatus}`,
            );
        }

        if (
            currentSemesterStatus === RegistrationStatus.ONGOING &&
            requestedStatus === RegistrationStatus.UPCOMING
        ) {
            throw new Error(
                `you can not change status from ${currentSemesterStatus} to ${requestedStatus}`,
            );
        }

        const result = await RegSemesterModel.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return result;
    }

    static async deleteRegSemester(id: string) {
        const isRegSemesterExists = await RegSemesterModel.findById(id);

        if (!isRegSemesterExists) {
            throw new Error('this registered semester is not found');
        }


        const regSemesterStatus = isRegSemesterExists?.status;

        if (regSemesterStatus !== RegistrationStatus.UPCOMING) {
            throw new Error(`you can not update as the registered semester is ${regSemesterStatus}`);
        }

        const session = await startSession();
        session.startTransaction();

        try {
            const deletedOfferedCourse = await OfferedCourseModel.deleteMany(
                {
                    semesterRegistration : id
                },
                {
                    session
                }
            );

            if (!deletedOfferedCourse) {
                throw new Error('Failed to delete semester registration');
            }
            
            const deletedSemesterRegistration = await RegSemesterModel.findByIdAndUpdate(id, { session, new: true });
            
            if (!deletedSemesterRegistration) {
                throw new Error('Failed to delete semester registration');
            }

            await session.commitTransaction();
            await session.endSession();
            
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
}
