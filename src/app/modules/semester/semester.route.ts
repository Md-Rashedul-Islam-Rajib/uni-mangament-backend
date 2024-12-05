import validateRequest from '../../middlewares/validateRequest';
import { SemesterControllers } from './semester.controller';
import { Router } from 'express';
import {
    createSemesterValidationSchema,
    updateSemesterValidationSchema,
} from './semester.zodSchema';

const SemesterRouter: Router = Router();

SemesterRouter.post(
    '/create-semester',
    validateRequest(createSemesterValidationSchema),
    SemesterControllers.createSemester,
);

SemesterRouter.get('/', SemesterControllers.getAllSemester);
SemesterRouter.get('/:id', SemesterControllers.getSingleSemester);
SemesterRouter.patch(
    '/:id',
    validateRequest(updateSemesterValidationSchema),
    SemesterControllers.updateSemester,
);

export default SemesterRouter;
