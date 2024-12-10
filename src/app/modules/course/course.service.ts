import { startSession } from "mongoose";
import QueryBuilder from "../../builder/queryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { CourseFacultyModel, CourseModel } from "./course.model";
import { TCourse, TCoursefaculty } from "./course.types";

export class CourseServices {
    static async createCourse(payload: TCourse) {
        const result = await CourseModel.create(payload);
        return result;
    };


    static async getAllCourse(query: Record<string, unknown>) {
        const courseQuery = new QueryBuilder(
            CourseModel.find(),
            query,
        )
            .search(CourseSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = courseQuery.getQuery;
        return result;
    };


    static async getSingleCourse(id: string) {
        const result = await CourseModel.findById(id).populate("preRequisiteCourses.course");
        return result;
    };

    static async updateCourse(id: string, payload: Partial<TCourse>) {
        const { preRequisiteCourses, ...courseRemainingData } = payload;

        const session = await startSession();
        session.startTransaction();

        try {
            const updatedData = await CourseModel.findByIdAndUpdate(
                id,
                courseRemainingData,
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );

            if (!updatedData) {
                throw new Error("failed to update course");
            }

            const deletedPreRequisites = preRequisiteCourses?.length
                ? preRequisiteCourses.reduce<string[]>((acc, element) => {
                    if (element?.course && element?.isDeleted) {
                        acc.push(element.course.toString());
                    }
                    return acc;
                }, [])
                : [];

            
            
            const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: { $in: deletedPreRequisites },
                        },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );
            
            if (!deletedPreRequisiteCourses) {
                throw new Error("failed to update course");
            }

            const newPreRequisites = preRequisiteCourses?.filter((element) => element.course && !element.isDeleted);

            const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!newPreRequisiteCourses) {
                throw new Error('Failed to update course!');
            }
      
      
            const result = await CourseModel.findById(id).populate(
                'preRequisiteCourses.course',
            );
            await session.commitTransaction();
            await session.endSession();
        
            return result;
        }

        catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
        
    };


    static async deleteCourse(id: string) {
        const result = await CourseModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            {
                new:true
            }
        );
        return result;
    }; 


    static async assignFacultiesWithCourse(id: string, payload: Partial<TCoursefaculty>) {
        const result = await CourseFacultyModel.findByIdAndUpdate(
            id,
            {
                course: id,
                $addToSet: {faculties : {$each : payload}}
            },
            {
                upsert: true,
                new:true
            }
        );
        return result;
    };

}



