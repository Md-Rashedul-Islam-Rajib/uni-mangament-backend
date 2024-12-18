import config from "../../config";
import catchAsync from "../../utilities/catchAsyncFn";
import sendResponse from "../../utilities/sendResponse";
import { AuthServices } from "./auth.service";

export class AuthControllers {

    static loginUser = catchAsync(async (req, res) => {
        const result = await AuthServices.loginUser(req.body);
        const { refreshToken, accessToken, needsPasswordChange } = result;

        res.cookie('refreshToken', refreshToken, {
            secure: config.NODE_ENV === 'production',
            httpOnly: true,
        });
        const data = {accessToken,needsPasswordChange};

        sendResponse(res,200,true, 'user logged in successfully',data);
    });


    static changePassword = catchAsync(async (req, res) => {
       const { ...passwordData } = req.body;

        const result = await AuthServices.changePassword(req.user, passwordData);
        sendResponse(res,200,true,"password changed successfully",result); 
    });










}