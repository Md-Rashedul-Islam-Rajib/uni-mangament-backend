import { TDepartment } from "../department/dept.types";
import { TSemester } from "../semester/semester.types";
import { StudentModel } from "../student/student.model";

const findLastStudentId = async () => {
    const lastStudent = await StudentModel.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    
    return lastStudent?.id ? Number(lastStudent.id.substring(6)) : 0;
};

export const generateStudentId = async (payload1: TSemester, payload2 : TDepartment) => {
      const currentId = await findLastStudentId();
      const incrementId = (currentId + 1).toString().padStart(4, '0'); // Increment and pad to 4 digits
    return `${payload1.year}${payload1.code}${payload2.code}${incrementId}`;
    return incrementId;
};