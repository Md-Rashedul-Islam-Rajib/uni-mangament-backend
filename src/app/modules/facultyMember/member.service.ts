import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { FacultySearchableFields } from './member.constant';
import { TFacultyMember } from './member.types';
import { FacultyMemberModel } from './member.model';
import { UserModel } from '../user/user.model';

export class FacultymemberServices {
    static async getAllFacultyMembers(query: Record<string, unknown>) {
        const facultyQuery = new QueryBuilder(
            FacultyMemberModel.find().populate('academicDepartment'),
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

    static async getSingleFacultyMember(id: string) {
        const result =
            await FacultyMemberModel.findById(id).populate(
                'academicDepartment',
            );

        return result;
    }

    static async updateFacultyMember(
        id: string,
        payload: Partial<TFacultyMember>,
    ) {
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
        const result = await FacultyMemberModel.findByIdAndUpdate(
            id,
            modifiedUpdatedData,
            {
                new: true,
                runValidators: true,
            },
        );

        return result;
    }

    static async deleteFacultyMember(id: string) {
        const session = await startSession();

        try {
            session.abortTransaction();

            const deletedFacultyMember =
                await FacultyMemberModel.findByIdAndUpdate(
                    id,
                    { isDeleted: true },
                    { new: true, session },
                );

            if (!deletedFacultyMember) {
                throw new Error('Failed to delete faculty');
            }

            const userId = deletedFacultyMember.user;

            const deletedFacultyUser = await UserModel.findByIdAndUpdate(
                userId,
                { isDeleted: true },
                { new: true, session },
            );

            if (!deletedFacultyUser) {
                throw new Error('Failed to delete faculty user');
            }
            await session.commitTransaction();
            await session.endSession();

            return deletedFacultyMember;
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw new Error(String(error));
        }
    }
}
