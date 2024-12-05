import { Request, Response } from 'express';
import sendResponse from '../../utilities/sendResponse';
import catchAsync from '../../utilities/catchAsyncFn';
import { SemesterServices } from './semester.service';

export class SemesterControllers {
    static createSemester = catchAsync(async (req: Request, res: Response) => {
        const result = await SemesterServices.createSemesterIntoDB(req.body);

        sendResponse(res, 201, true, 'Semester created successfully', result);
    });

    static getAllSemester = catchAsync(async (req: Request, res: Response) => {
        const semesters = await SemesterServices.getAllSemester();
        sendResponse(
            res,
            200,
            true,
            'Semesters are retrieved successfully',
            semesters,
        );
    });

    static getSingleSemester = catchAsync(
        async (req: Request, res: Response) => {
            const semester = await SemesterServices.getSingleSemester(
                req.params.id,
            );
            if (!semester) {
                throw new Error('Semester not found');
            }
            sendResponse(
                res,
                200,
                true,
                'Semester is retrieved successfully',
                semester,
            );
        },
    );

    static updateSemester = catchAsync(async (req: Request, res: Response) => {
        const semester = await SemesterServices.updateSemester(
            req.params.id,
            req.body,
        );
        if (!semester) {
            throw new Error('Semester not updatable');
        }
        sendResponse(
            res,
            200,
            true,
            'Semester is updated successfully',
            semester,
        );
    });
}
