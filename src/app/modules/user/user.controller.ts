import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utilities/catchAsyncFn';

export class UserControllers {
    static createStudent = catchAsync(async (req: Request, res: Response) => {
        const { password, studentData } = req.body;

        const result = await UserServices.createStudentIntoDB(
            password,
            studentData,
        );

        sendResponse(res, 201, true, 'User created successfully', result);
    });
}
