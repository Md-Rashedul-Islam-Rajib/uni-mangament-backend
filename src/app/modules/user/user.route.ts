import { NextFunction, Request, Response, Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.zodSchema';
import { createFacultyMemberValidationSchema } from '../facultyMember/member.zodSchema';
import { createAdminValidationSchema } from '../admin/admin.zodSchema';
import { upload } from '../../utilities/cloudinaryHandler';
import { parsingRequest } from '../../middlewares/parsingRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constants';
import { changeStatusValidationSchema } from './user.zodschema';

const UserRouter: Router = Router();

UserRouter.post(
    '/create-student',
    upload.single('file'),
    parsingRequest,
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent,
);

UserRouter.post(
    '/create-faculty-member',
    auth(USER_ROLE.admin),
    upload.single('file'),
    parsingRequest,
    validateRequest(createFacultyMemberValidationSchema),
    UserControllers.createFacultyMember,
);

UserRouter.post(
    '/create-admin',
    upload.single('file'),
    parsingRequest,
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
);

UserRouter.post('/change-status/:id', auth(USER_ROLE.admin), validateRequest(changeStatusValidationSchema), UserControllers.changeStatus);

UserRouter.get('/me', auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student), UserControllers.getMe);

export default UserRouter;
