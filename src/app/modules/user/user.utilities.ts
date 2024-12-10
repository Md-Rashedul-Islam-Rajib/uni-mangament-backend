import { Document, ObjectId, Types } from 'mongoose';
import { TDepartment } from '../department/dept.types';
import { TSemester } from '../semester/semester.types';
import { StudentModel } from '../student/student.model';
import { FacultyMemberModel } from '../facultyMember/member.model';
import { AdminModel } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.types';

const findLastStudentId = async (
    semesterId: ObjectId,
    departmentId: ObjectId,
) => {
    const studentCount = await StudentModel.countDocuments({
        admissionSemester: semesterId,
        academicDepartment: departmentId,
    });
    return studentCount;
};

export const generateStudentId = async (
    payload1: TSemester & Document,
    payload2: TDepartment & Document,
) => {
    const currentId = await findLastStudentId(
        payload1._id as ObjectId,
        payload2._id as ObjectId,
    );
    console.log(currentId);
    const incrementId = (currentId + 1).toString().padStart(4, '0'); // Increment and pad to 4 digits
    return `${payload1.year}${payload1.code}${payload2.code}${incrementId}`;
};

const findLastFacultyMemberId = async (departmentId: Types.ObjectId) => {
    const lastFacultyMember = await FacultyMemberModel.findOne({
        academicDepartment: departmentId,
    })
        .sort({ id: -1 }) // Sort by ID in descending order
        .select('id') // Select only the ID field
        .lean();

    // Extract the numeric part of the ID, e.g., from "F-0003" to "0003"
    const lastId = lastFacultyMember?.id
        ? parseInt(lastFacultyMember.id.split('-')[1], 10)
        : 0;

    return lastId; // Return the numeric portion of the last ID
};

export const generateFacultyMemberID = async (
    payload: TDepartment & Document,
) => {
    const lastId = await findLastFacultyMemberId(payload._id as Types.ObjectId);

    // Increment and pad with zeroes to maintain the "F-XXXX" format
    const incrementedId = (lastId + 1).toString().padStart(4, '0');

    return `F-${incrementedId}`;
};


const findLastAdminId = async (adminId: Types.ObjectId) => {
    const lastAdmin = await AdminModel.findOne({ user: adminId })
        .sort({ id: -1 }) // Sort by ID in descending order
        .select('id') // Select only the ID field
        .lean();
    
    const lastId = lastAdmin?.id ?
        parseInt(lastAdmin.id.split("-")[1], 10)
        : 0;
    
    return lastId;

};

    export const generateAdminId = async (payload: TAdmin & Document) => {
        const lastId = await findLastAdminId(payload._id as Types.ObjectId);

        const incrementedId = (lastId + 1).toString().padStart(4, '0');
        
        return `A-${incrementedId}`;
    };