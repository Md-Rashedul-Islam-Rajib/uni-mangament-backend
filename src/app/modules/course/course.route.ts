import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createCourseValidationSchema } from "./course.zodSchema";
import { CourseServices } from "./course.service";
import { CourseControllers } from "./course.controller";

const CourseRouter: Router = Router();

CourseRouter.post('/create-course', validateRequest(createCourseValidationSchema), CourseServices.createCourse);

CourseRouter.get("/", CourseControllers.getAllCourses);

CourseRouter.post("/:id", CourseServices.getSingleCourse);

export default CourseRouter;