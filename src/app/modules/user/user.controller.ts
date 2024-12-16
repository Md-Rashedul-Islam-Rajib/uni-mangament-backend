import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utilities/catchAsyncFn';

export class UserControllers {
    static createStudent = catchAsync(async (req: Request, res: Response) => {
        const { password, student } = req.body;

        const result = await UserServices.createStudentIntoDB(
            password,
            student,
        );

        sendResponse(res, 201, true, 'User created successfully', result);
    });

    static createFacultyMember = catchAsync(async (req, res) => {
        const { password, facultyMember } = req.body;
        const result = await UserServices.createFacultyMemberIntoDb(
            password,
            facultyMember,
        );
        sendResponse(res, 201, true, 'Faculty is created successfully', result);
    });

    static createAdmin = catchAsync(async (req, res) => {
        const { password, admin } = req.body;
        const result = await UserServices.createAdmin(password, admin);
        sendResponse(res, 201, true, 'Admin is created successfully', result);
    });
}
