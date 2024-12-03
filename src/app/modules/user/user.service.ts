import config from "../../config";
import { StudentModel } from "../student/student.model";
import { TStudent } from "../student/student.types";
import { UserModel } from "./user.model";
import { TUser} from "./user.types";

export class UserServices {
    static async createStudentIntoDB(password: string, studentData: TStudent) {
        // checking user existence
        const userExists = await UserModel.findById(studentData.id);
        if (userExists) {
            throw new Error("User with this id already exists");
        }
        
        //creating a user object
        const userData : Partial<TUser> = {};
        
        //using default password if password is not provided
        userData.password = password || config.default_password as string;

        // setting student role
        userData.role = "student";

        // setting id manually
        userData.id = "2025010001";

        // creating user
        const newUser = await UserModel.create(userData);
        
        // creating a student
        if (Object.keys(newUser).length) {
            studentData.id = newUser.id;
            studentData.user = newUser._id;
        }
        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }
}