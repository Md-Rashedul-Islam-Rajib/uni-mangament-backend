import { Request, Response } from 'express';
import catchAsync from '../../utilities/catchAsyncFn';
import { FacultyServices } from './faculty.service';
import sendResponse from '../../utilities/sendResponse';

export class FacultyControllers {
    static createFaculty = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultyServices.createFaculty(req.body);
        sendResponse(res, 201, true, 'Faculty is created successfully', result);
    });

    static getAllFaculties = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultyServices.getAllFaculties();
        sendResponse(
            res,
            200,
            true,
            'Faculties are retrieved successfully',
            result,
        );
    });

    static getSingleFaculty = catchAsync(
        async (req: Request, res: Response) => {
            const result = await FacultyServices.getSingleFaculty(
                req.params.id,
            );
            sendResponse(
                res,
                200,
                true,
                'Faculty is retrieved successfully',
                result,
            );
        },
    );

    static updateFaculty = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultyServices.updateFaculty(
            req.params.id,
            req.body,
        );
        sendResponse(res, 200, true, 'Faculty updated successfully', result);
    });
}
