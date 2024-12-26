import { NextFunction, Request, Response, Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.zodSchema';
import { createFacultyMemberValidationSchema } from '../facultyMember/member.zodSchema';
import { createAdminValidationSchema } from '../admin/admin.zodSchema';
import { upload } from '../../utilities/cloudinaryHandler';

const UserRouter: Router = Router();

UserRouter.post(
    '/create-student',
    upload.single('file'),
    ,
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent,
);

UserRouter.post(
    '/create-faculty-member',
    validateRequest(createFacultyMemberValidationSchema),
    UserControllers.createFacultyMember,
);

UserRouter.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
);

export default UserRouter;
