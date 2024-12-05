import { Request, Response } from "express";
import catchAsync from "../../utilities/catchAsyncFn";
import { FacultyServices } from "./faculty.service";
import sendResponse from "../../utilities/sendResponse";

export class FacultyControllers {
    static createFaculty = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultyServices.createFaculty(req.body);
        sendResponse(res, 201, true, "Faculty is created successfully", result);
    });

    static getAllFaculties = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultyServices.getAllFaculties();
        sendResponse(res,200,true,"Faculties are retrieved successfully",result);
    });

    

}