import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createOfferedCourseValidationSchema, updateOfferedCourseValidationSchema } from "./offeredCourse.zodSchema";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const OfferedCourseRouter: Router = Router();

OfferedCourseRouter.post('/create-offered-course', validateRequest(createOfferedCourseValidationSchema), OfferedCourseControllers.createOfferedCourse);

OfferedCourseRouter.get('/', OfferedCourseControllers.getAllOfferedCourse);

OfferedCourseRouter.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);

OfferedCourseRouter.patch('/:id', validateRequest(updateOfferedCourseValidationSchema), OfferedCourseControllers.updateOfferedCourse);

OfferedCourseRouter.delete("/:id",OfferedCourseControllers.deleteOfferedCourse);

export default OfferedCourseRouter;