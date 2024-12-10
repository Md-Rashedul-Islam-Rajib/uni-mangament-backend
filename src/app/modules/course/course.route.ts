import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createCourseValidationSchema } from "./course.zodSchema";
import { CourseServices } from "./course.service";

const CourseRouter: Router = Router();

CourseRouter.post('/create-course', validateRequest(createCourseValidationSchema), CourseServices.createCourse);



export default CourseRouter;