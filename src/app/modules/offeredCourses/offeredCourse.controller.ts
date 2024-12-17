import catchAsync from "../../utilities/catchAsyncFn";
import sendResponse from "../../utilities/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";


export class OfferedCourseControllers {
    static createOfferedCourse = catchAsync(async (req, res) => {
        const result = await OfferedCourseServices.createOfferedCourse(req.body);
        sendResponse(res, 201, true, "offered course is created successfully", result);
    });

    static getAllOfferedCourse = catchAsync(async (req, res) => {
        const result = await OfferedCourseServices.getAllOfferedCourses(req.query);
        sendResponse(res, 200, true, "offered course retrieved successfully", result);
    });

    static getSingleOfferedCourse = catchAsync(async (req, res) => {
        const result = await OfferedCourseServices.getSingleOfferedCourse(req.params.id);
        sendResponse(res, 200, true, "offered course retrieved successfully", result);
    });

    static updateOfferedCourse = catchAsync(async (req, res) => {
        const result = await OfferedCourseServices.updateOfferedCourse(req.params.id, req.body);
        sendResponse(res,200,true,"offered course updated successfully",result);
    });

    static deleteOfferedCourse = catchAsync(async (req, res) => {
        const result = await OfferedCourseServices.deleteOfferedCourse(req.params.id);
        sendResponse(res,200,true,'offered course deleted successfully', result);
    });

}