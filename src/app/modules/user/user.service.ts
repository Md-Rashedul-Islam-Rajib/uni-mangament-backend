import config from "../../config";
import { UserModel } from "./user.model";
import { TNewUser, TUser } from "./user.types";

export class UserServices {
    static async createStudentIntoDB(password: string, userData: TUser) {
        // checking user existence
        const userExists = await UserModel.findById(userData.id);
        if (userExists) {
            throw new Error("User with this id already exists");
        }
        
        //creating a user object
        const newUser : TNewUser = {};
        
        //using default password if password is not provided
        newUser.password = password || config.default_password as string;

        // setting student role
        newUser.role = "student";

        const result = await UserModel.create(userData);
        return result;
    }
}