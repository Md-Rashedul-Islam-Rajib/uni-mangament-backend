import QueryBuilder from '../../builder/queryBuilder';
import { CourseModel } from '../course/course.model';
import { DepartmentModel } from '../department/dept.model';
import { FacultyModel } from '../faculty/faculty.model';
import { FacultyMemberModel } from '../facultyMember/member.model';
import { RegSemesterModel } from '../SemesterRegistration/regSemester.model';
import { OfferedCourseModel } from './offeredCourse.model';
import { TOfferedCourse } from './offeredCourse.types';
import { hasTimeConflict } from './offeredCourse.utilities';

export class OfferedCourseServices {
    static async createOfferedCourse(payload: TOfferedCourse) {
        const {
            semesterRegistration,
            academicFaculty,
            academicDepartment,
            course,
            section,
            faculty,
            days,
            startTime,
            endTime,
        } = payload;

        const isRegSemesterExists =
            await RegSemesterModel.findById(semesterRegistration);
        if (!isRegSemesterExists) {
            throw new Error('semester registration not found');
        }

        const semester = isRegSemesterExists?.semester;

        const isFacultyExists = await FacultyModel.findById(academicFaculty);

        if (!isFacultyExists) {
            throw new Error('faculty not found');
        }

        const isDeptExists = await DepartmentModel.findById(academicDepartment);

        if (!isDeptExists) {
            throw new Error('department not found');
        }

        const isCourseExists = await CourseModel.findById(course);
        
        if (!isCourseExists) {
            throw new Error('course not found');
        }
        const isFacultyMemberExists = await FacultyMemberModel.findById(faculty);

        if (!isFacultyMemberExists) {
            throw new Error('faculty member not found');
        }

        const isDeptBelongToFaculty = await DepartmentModel.findOne({
            _id: academicDepartment,
            academicFaculty
        });

        if (!isDeptBelongToFaculty) {
            throw new Error(`This ${isDeptExists.name} is not belong to this ${isFacultyExists.name}`);
        }

        const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
            await OfferedCourseModel.findOne({
                semesterRegistration,
                course,
                section,
            });

        if (
            isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection
        ) {
            throw new Error(
                `Offered course with same section is already exist!`,
            );
        }


        const assignedSchedules = await OfferedCourseModel.find({
            semesterRegistration,
            faculty,
            days: { $in: days },
        }).select('days startTime endTime');

        const newSchedule = {
            days,
            startTime,
            endTime,
        };

        if (hasTimeConflict(assignedSchedules, newSchedule)) {
            throw new Error(
                `This faculty is not available at that time ! Choose other time or day`,
            );
        }


        const result = await OfferedCourseModel.create({
            ...payload
        });
        return result;
    }


    static async getAllOfferedCourses(query: Record<string, unknown>) {
        const offeredCourseQuery = new QueryBuilder(
            OfferedCourseModel.find(),
            query,
        )
            .filter()
            .sort()
            .paginate()
            .fields();
        
        const result = offeredCourseQuery.getQuery;
        return result;
    };
































}
