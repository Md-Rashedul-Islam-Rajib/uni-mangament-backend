import {  Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utilities/catchAsyncFn';

export class SemesterControllers {
    static createSemester = catchAsync(async (req: Request, res: Response) => {
        const { password, studentData } = req.body;

        const result = await SemesterServices.createSemesterIntoDB(
            password,
            studentData,
        );

        sendResponse(res, 201, true, 'User created successfully', result);
    });
}
