import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.zodSchema';
import { createFacultyMemberValidationSchema } from '../facultyMember/member.zodSchema';

const UserRouter: Router = Router();

UserRouter.post(
    '/create-student',
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent,
);


UserRouter.post('/create-faculty-member',validateRequest(createFacultyMemberValidationSchema),UserControllers.createFacultyMember);

export default UserRouter;
