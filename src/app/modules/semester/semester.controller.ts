import {  Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';
import catchAsync from '../../utilities/catchAsyncFn';
import { SemesterServices } from './semester.service';

export class SemesterControllers {
    static createSemester = catchAsync(async (req: Request, res: Response) => {

        const result = await SemesterServices.createSemesterIntoDB(
            req.body
        );

        sendResponse(res, 201, true, 'Semester created successfully', result);
    });
}
