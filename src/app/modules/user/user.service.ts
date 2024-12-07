import { TSemester } from './../semester/semester.types';
import config from '../../config';
import { SemesterModel } from '../semester/semester.model';
import { StudentModel } from '../student/student.model';
import { TStudent } from '../student/student.types';
import { UserModel } from './user.model';
import { TUser } from './user.types';
import { generateStudentId } from './user.utilities';
import { DepartmentModel } from '../department/dept.model';
import mongoose, { startSession } from 'mongoose';

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
            console.log(userData);

            // creating user
            const newUser = await UserModel.create([userData],{session});

            // creating a student
            if (newUser.length) {
                payload.id = newUser[0]?.id;
                payload.user = newUser[0]?._id;
            }
            const newStudent = await StudentModel.create([payload],{session});
            
            await session.commitTransaction();
            session.endSession();

            return newStudent[0];
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
}
