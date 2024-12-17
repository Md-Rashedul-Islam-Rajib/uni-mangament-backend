import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createOfferedCourseValidationSchema } from "./offeredCourse.zodSchema";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const OfferedCourseRouter: Router = Router();

OfferedCourseRouter.post('/create-offered-course', validateRequest(createOfferedCourseValidationSchema), OfferedCourseControllers.createOfferedCourse);

OfferedCourseRouter

export default OfferedCourseRouter;