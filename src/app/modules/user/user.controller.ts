import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';


export class UserController {

static async createStudent (
        req: Request,
        res: Response,
        next: NextFunction,
    ){
    try {
        const { password, student: studentData } = req.body;


        const result = await UserServices.createStudentIntoDB(
            password,
            studentData,
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