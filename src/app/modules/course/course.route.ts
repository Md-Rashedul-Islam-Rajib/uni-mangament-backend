import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createCourseValidationSchema, updateCourseValidationSchema } from "./course.zodSchema";
import { CourseServices } from "./course.service";
import { CourseControllers } from "./course.controller";

const CourseRouter: Router = Router();

CourseRouter.post('/create-course', validateRequest(createCourseValidationSchema), CourseServices.createCourse);

CourseRouter.get("/", CourseControllers.getAllCourses);

CourseRouter.post("/:id", CourseServices.getSingleCourse);

CourseRouter.patch("/:id", validateRequest(updateCourseValidationSchema), CourseControllers.updateCourse);

CourseRouter.delete("/:id",CourseControllers.deleteCourse);

export default CourseRouter;