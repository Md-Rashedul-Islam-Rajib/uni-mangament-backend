import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';
import QueryBuilder from '../../builder/queryBuilder';
import { studentSearchableFields } from './student.constants';
import { TStudent } from './student.types';

export class StudentServices {
    static async getAllStudentsFromDB(query: Record<string, unknown>) {
        const studentQuery = new QueryBuilder(
            StudentModel.find()
                .populate('admissionSemester')
                .populate({
                    path: 'academicDepartment',
                    populate: {
                        path: 'academicFaculty',
                    },
                }),
            query,
        )
            .search(studentSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = studentQuery.getQuery;
        return result;
    }

    static async getSingleStudentFromDB(id: string) {
        const result = await StudentModel.findById(id)
            .populate('admissionSemester')
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                },
            });
        return result;
    }

    static async updateStudent(id: string, payload: Partial<TStudent>) {
         const { name, guardian, localGuardian, ...remainingStudentData } =
             payload;

         const modifiedUpdatedData: Record<string, unknown> = {
             ...remainingStudentData,
         };
         if (name && Object.keys(name).length) {
             for (const [key, value] of Object.entries(name)) {
                 modifiedUpdatedData[`name.${key}`] = value;
             }
         }

         if (guardian && Object.keys(guardian).length) {
             for (const [key, value] of Object.entries(guardian)) {
                 modifiedUpdatedData[`guardian.${key}`] = value;
             }
         }

         if (localGuardian && Object.keys(localGuardian).length) {
             for (const [key, value] of Object.entries(localGuardian)) {
                 modifiedUpdatedData[`localGuardian.${key}`] = value;
             }
         }

         const result = await StudentModel.findByIdAndUpdate(
             id,
             modifiedUpdatedData,
             {
                 new: true,
                 runValidators: true,
             },
         );
         return result;
    }

    static async deleteStudentFromDB(id: string) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const deletedStudent = await StudentModel.findOneAndUpdate(
                { id },
                { isDeleted: true },
                { new: true, session },
            );
            if (!deletedStudent) {
                throw new Error('failed to delete student');
            }
            const deletedUser = await UserModel.findOneAndUpdate(
                { id },
                { isDeleted: true },
                { new: true, session },
            );
            if (!deletedUser) {
                throw new Error('failed to delete user');
            }

            await session.commitTransaction();
            await session.endSession();

            return deletedStudent;
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
}
