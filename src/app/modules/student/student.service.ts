import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { UserModel } from '../user/user.model';

export class StudentServices {
    static async getAllStudentsFromDB() {
        const result = await StudentModel.find().populate("admissionSemester").populate({
            path: "academicDepartment",
            populate: {
                path : "academicFaculty"
            }
        });
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

    static async deleteStudentFromDB(id: string) {

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            
            const deletedStudent = await StudentModel.findOneAndUpdate(
                { id },
                { isDeleted: true },
                {new:true,session}
            );
            if (!deletedStudent) {
                throw new Error("failed to delete student");
            }
            const deletedUser = await UserModel.findOneAndUpdate(
                { id },
                { isDeleted: true },
                {new:true,session}
            );
            if (!deletedUser) {
                throw new Error("failed to delete user");
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
