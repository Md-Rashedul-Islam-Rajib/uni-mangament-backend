import catchAsync from "../../utilities/catchAsyncFn";
import sendResponse from "../../utilities/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";


export class OfferedCourseControllers 
    static createOfferedCourse = catchAsync(async (req, res) => {
        const result = await OfferedCourseServices.createOfferedCourse(req.body);
        sendResponse(res, 201, true, "offered course is created successfully", result);
    });
}