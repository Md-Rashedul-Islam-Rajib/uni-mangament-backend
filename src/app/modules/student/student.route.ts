import { Router } from 'express';
import { StudentControllers } from './student.controller';


const StudentRouter: Router = Router();

StudentRouter.get('/:studentId', StudentControllers.getSingleStudent);

StudentRouter.delete('/:studentId', StudentControllers.deleteStudent);

StudentRouter.get('/', StudentControllers.getAllStudents);

export default StudentRouter;
