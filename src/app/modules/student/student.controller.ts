import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utilities/sendResponse';
import catchAsync from '../../utilities/catchAsyncFn';

export class StudentControllers {
    static getSingleStudent = catchAsync(
        async (req: Request, res: Response) => {
            const { studentId } = req.params;
            const result =
                await StudentServices.getSingleStudentFromDB(studentId);

            sendResponse(
                res,
                200,
                true,
                'Student is retrieved successfully',
                result,
            );
        },
    );

    static getAllStudents = catchAsync(async (req: Request, res: Response) => {
        const result = await StudentServices.getAllStudentsFromDB();

        sendResponse(
            res,
            200,
            true,
            'Student is retrieved succesfully',
            result,
        );
    });

    static deleteStudent = catchAsync(async (req: Request, res: Response) => {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);

        sendResponse(res, 200, true, 'Student is deleted succesfully', result);
    });
}
