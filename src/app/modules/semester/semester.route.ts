import validateRequest from '../../middlewares/validateRequest';
import { SemesterControllers } from './semester.controller';
import { Router } from "express";
import { createSemesterValidationSchema } from './semester.zodSchema';

const SemesterRouter: Router = Router();

SemesterRouter.post('/create-semester',validateRequest(createSemesterValidationSchema),SemesterControllers.createSemester);

export default SemesterRouter;