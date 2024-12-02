import { Router } from 'express';
import { UserControllers } from './user.controller';

const UserRouter: Router =Router();

UserRouter.post('/create-student', UserControllers.createStudent);

export default UserRouter;
