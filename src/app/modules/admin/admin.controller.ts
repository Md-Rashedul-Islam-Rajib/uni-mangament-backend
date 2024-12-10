import catchAsync from "../../utilities/catchAsyncFn";
import sendResponse from "../../utilities/sendResponse";
import { AdminServices } from "./admin.service";

export class AdminControllers {

    static getAllAdmins = catchAsync(async (req, res) => {
        const result = await AdminServices.getAllAdmin(req.query);
        sendResponse(res,200,true,"admins are retrieved successfully",result);
    });



    static getSingleAdmin = catchAsync(async (req, res) => {
        const result = await AdminServices.getSingleAdmin(req.params.id);
        sendResponse(res,200,true,"admin is retrieved successfully", result);
    });


}