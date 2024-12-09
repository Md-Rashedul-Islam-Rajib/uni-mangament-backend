import { Request, Response } from "express";
import catchAsync from "../../utilities/catchAsyncFn";
import { FacultymemberServices } from "./member.service";
import sendResponse from "../../utilities/sendResponse";

export class FacultyMemberControllers {

    static getAllFacultyMembers = catchAsync(async (req: Request, res: Response) => {
        const result = await FacultymemberServices.getAllFacultyMembers(req.query);

        sendResponse(res,200,true,"Faculty members are retrieved successfully",result);
    });
    
    static getSingleFacultyMember = catchAsync(async (req, res) => {
        const result = await FacultymemberServices.getSingleFacultyMember(req.params.id);
        
        sendResponse(res,200,true,"Faculty member is retrieved successfully",result);
        
    });
    
    static updateFacultyMember = catchAsync(async (req, res) => {
        const result = await FacultymemberServices.updateFacultyMember(req.params.id, req.body);

        sendResponse(res,200,true,"Faculty member is updated successfully",result);
        

    });

    static deleteFacultyMember = catchAsync(async (req, res) => {
        const result = await FacultymemberServices.deleteFacultyMember(req.params.id);
        
        sendResponse(res,200,true,"Faculty member is deleted successfully",result);
        
    });











}