import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.zodSchema';
import { createFacultyMemberValidationSchema } from '../facultyMember/member.zodSchema';
import { createAdminValidationSchema } from '../admin/admin.zodSchema';

const UserRouter: Router = Router();

UserRouter.post(
    '/create-student',
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent,
);


UserRouter.post('/create-faculty-member',validateRequest(createFacultyMemberValidationSchema),UserControllers.createFacultyMember);

UserRouter.post('/create-admin',validateRequest(createAdminValidationSchema),UserControllers.createA);


export default UserRouter;
