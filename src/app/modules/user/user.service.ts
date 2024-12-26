import { FacultyMemberModel } from './../facultyMember/member.model';
import config from '../../config';
import { SemesterModel } from '../semester/semester.model';
import { StudentModel } from '../student/student.model';
import { TStudent } from '../student/student.types';
import { UserModel } from './user.model';
import { TUser } from './user.types';
import {
    generateAdminId,
    generateFacultyMemberID,
    generateStudentId,
} from './user.utilities';
import { DepartmentModel } from '../department/dept.model';
import mongoose, { startSession } from 'mongoose';
import { TFacultyMember } from '../facultyMember/member.types';
import { FacultyMemberModel } from '../facultyMember/member.model';
import { TAdmin } from '../admin/admin.types';
import { AdminModel } from '../admin/admin.model';

export class UserServices {
    static async createStudentIntoDB(password: string, payload: TStudent) {
        // checking user existence
        const userExists = await UserModel.findById(payload.id);
        if (userExists) {
            throw new Error('User with this id already exists');
        }

        //creating a user object
        const userData: Partial<TUser> = {};

        //using default password if password is not provided
        userData.password = password || (config.default_password as string);

        // setting student role
        userData.role = 'student';
        userData.email = payload.email;


        const semester = await SemesterModel.findById(
            payload.admissionSemester,
        );
        if (!semester) {
            throw new Error('Semester is not found');
        }

        const department = await DepartmentModel.findById(
            payload.academicDepartment,
        );
        if (!department) {
            throw new Error('Department is not found');
        }

        const session = await mongoose.startSession();

        session.startTransaction();

        try {
            // setting id
            userData.id = await generateStudentId(semester, department);
            // creating user
            const newUser = await UserModel.create([userData], { session });

            // creating a student
            if (newUser.length) {
                payload.id = newUser[0]?.id;
                payload.user = newUser[0]?._id;
            }
            const newStudent = await StudentModel.create([payload], {
                session,
            });

            await session.commitTransaction();
            session.endSession();

            return newStudent[0];
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    static async createFacultyMemberIntoDb(
        password: string,
        payload: TFacultyMember,
    ) {
        const userData: Partial<TUser> = {};

        userData.password = password || config.default_password;

        userData.role = 'faculty';
        userData.email = payload.email;

        const department = await DepartmentModel.findById(
            payload.academicDepartment,
        );

        if (!department) {
            throw new Error('department is not found');
        }

        const session = await startSession();
        session.startTransaction();
        try {
            userData.id = await generateFacultyMemberID(department);

            const newUser = await UserModel.create([userData], { session });

            if (!newUser.length) {
                throw new Error('Failed to create user');
            }

            payload.id = newUser[0].id;
            payload.user = newUser[0]._id;

            const newFacultyMember = await FacultyMemberModel.create(
                [payload],
                { session },
            );

            if (!newFacultyMember) {
                throw new Error('Failed to create faculty');
            }

            await session.commitTransaction();
            await session.endSession();
            return newFacultyMember;
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }

    static async createAdmin(password: string, payload: TAdmin) {
        const userData: Partial<TUser> = {};

        userData.password = password || config.default_password;

        userData.role = 'admin';
        userData.email = payload.email;

        const admin = await AdminModel.findOne(payload.user);

        if (!admin) {
            throw new Error('admin is not found');
        }

        const session = await startSession();
        session.startTransaction();

        try {
            userData.id = await generateAdminId(admin);

            const newUser = await UserModel.create([userData], { session });

            if (!newUser.length) {
                throw new Error('failed to create user');
            }

            payload.id = newUser[0].id;
            payload.user = newUser[0]._id;

            const newAdmin = await AdminModel.create([payload], { session });

            if (!newAdmin) {
                throw new Error('failed to create admin');
            }

            await session.commitTransaction();
            await session.endSession();
            return newAdmin;
        } catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }

    static async getMe(userId: string, role: string) {
        let result = null;
        if (role === 'student') {
            result = await StudentModel.findOne({ id: userId }).populate('user');
        }
        if (role === 'admin') {
            result = await AdminModel.findOne({ id: userId }).populate('user');
        }

        if (role === 'faculty') {
            result = await FacultyMemberModel.findOne({ id: userId }).populate('user');
        }

        return result;
     }
}
