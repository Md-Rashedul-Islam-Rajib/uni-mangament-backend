import { Request, Response } from "express";
import catchAsync from "../../utilities/catchAsyncFn";
import { FacultymemberServices } from "./member.service";
import sendResponse from "../../utilities/sendResponse";

export class FacultyMemberControllers {

    static getAllFacultyMembers = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultymemberServices.getAllFacultyMembers(req.query);
        
        sendResponse(res,200,true,"Faculty members are retrieved successfully",result);
    });
}