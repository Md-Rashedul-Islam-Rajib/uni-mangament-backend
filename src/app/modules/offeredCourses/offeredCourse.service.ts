import { TOfferedCourse } from "./offeredCourse.types";

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

        const isRegSemesterExists = await Seme;


    };













}