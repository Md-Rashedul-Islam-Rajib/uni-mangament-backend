import catchAsync from '../../utilities/catchAsyncFn';
import sendResponse from '../../utilities/sendResponse';
import { CourseServices } from './course.service';

export class CourseControllers {
    static createCourse = catchAsync(async (req, res) => {
        const result = await CourseServices.createCourse(req.body);
        sendResponse(res, 201, true, 'Course is created successfully', result);
    });

    static getAllCourses = catchAsync(async (req, res) => {
        const result = await CourseServices.getAllCourse(req.query);
        sendResponse(
            res,
            200,
            true,
            'Courses are retrieved successfully',
            result,
        );
    });

    static getSingleCourse = catchAsync(async (req, res) => {
        const result = await CourseServices.getSingleCourse(req.params.id);
        sendResponse(
            res,
            200,
            true,
            'Course is retrieved successfully',
            result,
        );
    });

    static updateCourse = catchAsync(async (req, res) => {
        const result = await CourseServices.updateCourse(
            req.params.id,
            req.body,
        );
        sendResponse(res, 200, true, 'Course is updated successfully', result);
    });

    static deleteCourse = catchAsync(async (req, res) => {
        const result = await CourseServices.deleteCourse(req.params.id);
        sendResponse(res, 200, true, 'Course is deleted successfully', result);
    });

    static assignFacultiesToACourse = catchAsync(async (req, res) => {
        const result = await CourseServices.assignFacultiesToACourse(
            req.params.id,
            req.body,
        );
        sendResponse(res, 200, true, 'Faculties assigned successfully', result);
    });

    static removeFacultiesFromCourse = catchAsync(async (req, res) => {
        const result = await CourseServices.removeFacultiesFromCourse(
            req.params.id,
            req.body,
        );
        sendResponse(res, 200, true, 'Faculties removed successfully', result);
    });
}
