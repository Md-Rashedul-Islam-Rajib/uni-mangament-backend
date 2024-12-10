import catchAsync from "../../utilities/catchAsyncFn";
import sendResponse from "../../utilities/sendResponse";
import { CourseServices } from "./course.service";

export class CourseControllers {
    static createCourse = catchAsync(async (req, res) => {
        const result = await CourseServices.createCourse(req.body);
        sendResponse(res, 201, true, "Course is created successfully", result);
    });

























































}