import config from '../../config';
import catchAsync from '../../utilities/catchAsyncFn';
import sendResponse from '../../utilities/sendResponse';
import { AuthServices } from './auth.service';

export class AuthControllers {
    static loginUser = catchAsync(async (req, res) => {
        const result = await AuthServices.loginUser(req.body);
        const { refreshToken, accessToken, needsPasswordChange } = result;

        res.cookie('refreshToken', refreshToken, {
            secure: config.NODE_ENV === 'production',
            httpOnly: true,
        });
        const data = { accessToken, needsPasswordChange };

        sendResponse(res, 200, true, 'user logged in successfully', data);
    });

    static changePassword = catchAsync(async (req, res) => {
        const { ...passwordData } = req.body;

        const result = await AuthServices.changePassword(
            req.user,
            passwordData,
        );
        sendResponse(res, 200, true, 'password changed successfully', result);
    });

    static refreshToken = catchAsync(async (req, res) => {
        const { refreshToken } = req.cookies;
        const result = await AuthServices.refreshToken(refreshToken);
        sendResponse(
            res,
            200,
            true,
            'access token is renewed successfully',
            result,
        );
    });

    static forgetPassword = catchAsync(async (req, res) => {
        await AuthServices.forgetPassword(req.body.id);
        sendResponse(res, 200, true, 'reset password link sent to your email');
    });
}
