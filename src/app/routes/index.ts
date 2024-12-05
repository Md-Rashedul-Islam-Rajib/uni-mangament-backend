import { Router } from 'express';
import path from 'path';
import StudentRouter from '../modules/student/student.route';
import UserRouter from '../modules/user/user.route';
import SemesterRouter from '../modules/semester/semester.route';
import FacultyRouter from '../modules/faculty/faculty.route';
import DepartmentRouter from '../modules/department/dept.route';

const router: Router = Router();

const allRoutes = [
    {
        path: '/students',
        route: StudentRouter
    },
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: "/semesters",
        route: SemesterRouter
    },
    {
        path: "/faculties",
        route: FacultyRouter
    },
    {
        path: "/departments",
        route: DepartmentRouter
    }
];

allRoutes.forEach((singleRoute) =>
    router.use(singleRoute.path, singleRoute.route),
);

export default router;
