import { Request, Response } from "express";
import catchAsync from "../../utilities/catchAsyncFn";
import { DepartmentServices } from "./dept.service";
import sendResponse from "../../utilities/sendResponse";

export class DepartmentControllers {
    static createDepartment = catchAsync(async (req: Request, res: Response) => {
        const result = await DepartmentServices.createDepartment(req.body);
        sendResponse(res,201,true,"Department created successfully", result);
    });

    static getAllDepartment = catchAsync(async (req: Request, res: Response) => {
        const result = await DepartmentServices.getAllDepartments();
        sendResponse(res, 200, true, "Departments are retrieved successfully", result);
    });
}