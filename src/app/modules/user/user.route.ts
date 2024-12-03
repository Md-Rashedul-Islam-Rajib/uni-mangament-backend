import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRquest';
import { createStudentValidationSchema } from '../student/student.zodSchema';

const UserRouter: Router =Router();

UserRouter.post(
    '/create-student',
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent,
);

export default UserRouter;
