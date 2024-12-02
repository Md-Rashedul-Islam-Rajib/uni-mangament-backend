import { StudentModel } from "./student.model";

export class StudentService {

    static async getAllStudentsFromDB(){
        const result = await StudentModel.find();
        return result;
    };
    
    static async getSingleStudentFromDB (id: string) {
        const result = await StudentModel.aggregate([{ $match: { id } }]);
        return result;
    };
    
    static async deleteStudentFromDB (id: string) {
        const result = await StudentModel.updateOne({ id }, { isDeleted: true });
        return result;
    };
}


