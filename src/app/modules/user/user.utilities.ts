import { Document, ObjectId } from 'mongoose';
import { TDepartment } from '../department/dept.types';
import { TSemester } from '../semester/semester.types';
import { StudentModel } from '../student/student.model';

const findLastStudentId = async (semesterId : ObjectId,departmentId: ObjectId) => {
    // const lastStudent = await StudentModel.findOne({role: 'student'},{id: 1,_id: 0}).sort({createdAt: -1}).lean();
    const studentCount = await StudentModel.countDocuments({
        admissionSemester: semesterId,
        academicDepartment: departmentId,
    });
    console.log({ studentCount });
    return studentCount;
};

export const generateStudentId = async (
    payload1: TSemester & Document,
    payload2: TDepartment & Document,
) => {
    const currentId = await findLastStudentId(payload1._id as ObjectId, payload2._id as ObjectId);
    console.log(currentId);
    const incrementId = (currentId + 1).toString().padStart(4, '0'); // Increment and pad to 4 digits
    console.log(incrementId);
    return `${payload1.year}${payload1.code}${payload2.code}${incrementId}`;
    
};
