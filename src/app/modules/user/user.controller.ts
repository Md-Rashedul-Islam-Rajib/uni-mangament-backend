import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';
import { UserServices } from './user.service';


export class UserControllers {

static async createStudent (
        req: Request,
        res: Response,
        next: NextFunction,
    ){
    try {
        const { password, userData } = req.body;


        const result = await UserServices.createStudentIntoDB(
            password,
            userData,
        );
        
        sendResponse(
            res,
            201,
            true,
            "User created successfully",
            result
        );
    } catch (err) {
        next(err);
    }
};

    }