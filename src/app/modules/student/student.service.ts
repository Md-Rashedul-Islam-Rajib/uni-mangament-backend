import { StudentModel } from './student.model';

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
        const result = await StudentModel.updateOne(
            { id },
            { isDeleted: true },
        );
        return result;
    }
}
