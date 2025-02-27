import { Router } from 'express';
import StudentRouter from '../modules/student/student.route';
import UserRouter from '../modules/user/user.route';
import SemesterRouter from '../modules/semester/semester.route';
import FacultyRouter from '../modules/faculty/faculty.route';
import DepartmentRouter from '../modules/department/dept.route';
import FacultyMemberRouter from '../modules/facultyMember/member.route';
import AdminRouter from '../modules/admin/admin.route';
import CourseRouter from '../modules/course/course.route';
import RegSemesterRouter from '../modules/SemesterRegistration/regSemester.route';
import OfferedCourseRouter from '../modules/offeredCourses/offeredCourse.route';
import AuthRouter from '../modules/auth/auth.route';

const router: Router = Router();

const allRoutes = [
    {
        path: '/students',
        route: StudentRouter,
    },
    {
        path: '/users',
        route: UserRouter,
    },
    {
        path: '/semesters',
        route: SemesterRouter,
    },
    {
        path: '/faculties',
        route: FacultyRouter,
    },
    {
        path: '/departments',
        route: DepartmentRouter,
    },
    {
        path: '/faculty-members',
        route: FacultyMemberRouter,
    },
    {
        path: '/admins',
        route: AdminRouter,
    },
    {
        path: '/courses',
        route: CourseRouter,
    },
    {
        path: '/semester-registrations',
        route: RegSemesterRouter,
    },
    {
        path: '/offered-course',
        route: OfferedCourseRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
];

allRoutes.forEach((singleRoute) =>
    router.use(singleRoute.path, singleRoute.route),
);

export default router;
