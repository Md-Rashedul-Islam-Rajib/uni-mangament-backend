import catchAsync from '../../utilities/catchAsyncFn';
import sendResponse from '../../utilities/sendResponse';
import { AdminServices } from './admin.service';

export class AdminControllers {
    static getAllAdmins = catchAsync(async (req, res) => {
        const result = await AdminServices.getAllAdmin(req.query);
        sendResponse(
            res,
            200,
            true,
            'admins are retrieved successfully',
            result,
        );
    });

    static getSingleAdmin = catchAsync(async (req, res) => {
        const result = await AdminServices.getSingleAdmin(req.params.id);
        sendResponse(res, 200, true, 'admin is retrieved successfully', result);
    });

    static updateAdmin = catchAsync(async (req, res) => {
        const result = await AdminServices.updateAdmin(req.params.id, req.body);
        sendResponse(res, 200, true, 'admin is updated successfully', result);
    });

    static deleteAdmin = catchAsync(async (req, res) => {
        const result = await AdminServices.deleteAdmin(req.params.id);
        sendResponse(res, 200, true, 'Admin is deleted successfully', result);
    });
}
