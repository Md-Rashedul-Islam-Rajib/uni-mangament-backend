"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_route_1 = __importDefault(require("../modules/student/student.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const semester_route_1 = __importDefault(require("../modules/semester/semester.route"));
const faculty_route_1 = __importDefault(require("../modules/faculty/faculty.route"));
const dept_route_1 = __importDefault(require("../modules/department/dept.route"));
const member_route_1 = __importDefault(require("../modules/facultyMember/member.route"));
const admin_route_1 = __importDefault(require("../modules/admin/admin.route"));
const course_route_1 = __importDefault(require("../modules/course/course.route"));
const regSemester_route_1 = __importDefault(require("../modules/SemesterRegistration/regSemester.route"));
const offeredCourse_route_1 = __importDefault(require("../modules/offeredCourses/offeredCourse.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const router = (0, express_1.Router)();
const allRoutes = [
    {
        path: '/students',
        route: student_route_1.default,
    },
    {
        path: '/users',
        route: user_route_1.default,
    },
    {
        path: '/semesters',
        route: semester_route_1.default,
    },
    {
        path: '/faculties',
        route: faculty_route_1.default,
    },
    {
        path: '/departments',
        route: dept_route_1.default,
    },
    {
        path: '/faculty-members',
        route: member_route_1.default,
    },
    {
        path: '/admins',
        route: admin_route_1.default,
    },
    {
        path: '/courses',
        route: course_route_1.default,
    },
    {
        path: '/semester-registrations',
        route: regSemester_route_1.default,
    },
    {
        path: '/offered-course',
        route: offeredCourse_route_1.default,
    },
    {
        path: '/auth',
        route: auth_route_1.default,
    }
];
allRoutes.forEach((singleRoute) => router.use(singleRoute.path, singleRoute.route));
exports.default = router;
