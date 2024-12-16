import catchAsync from "../../utilities/catchAsyncFn";
import sendResponse from "../../utilities/sendResponse";
import { RegSemesterServices } from "./regSemester.service";

export class RegSemesterControllers {

    static createRegSemester = catchAsync(async (req, res) => {
        const result = await RegSemesterServices.createRegSemester(req.body);
        sendResponse(res, 201, true, "semester registration is created successfully", result);
    });

    static getAllRegSemester = catchAsync(async (req, res) => {
        const result = await RegSemesterServices.getAllRegSemesters(req.query);
        sendResponse(res,200,true,'Semester Registration is retrieved successfully',result);
    });

    static getSingleRegSemester = catchAsync(async (req, res) => {
        const result = await RegSemesterServices.getSingleRegSemester(req.params.id);
        sendResponse(res,200,true,'Semester Registration is retrieved successfully',result);
    });

}